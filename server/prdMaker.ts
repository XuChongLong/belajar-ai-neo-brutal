import { TRPCError } from "@trpc/server";

const MAX_PROVIDER_RESPONSE = 300_000;

export type PrdMakerRequest = {
  baseUrl: string;
  apiKey: string;
  model: string;
  projectName: string;
  problem: string;
  audience: string;
  stack: string;
};

export function resolveProviderBaseUrl(baseUrl: string) {
  let url: URL;
  try { url = new URL(baseUrl.trim()); } catch { throw new TRPCError({ code: "BAD_REQUEST", message: "Base URL harus berupa URL yang valid." }); }
  if (url.username || url.password || url.hash) throw new TRPCError({ code: "BAD_REQUEST", message: "Base URL tidak boleh berisi kredensial atau fragment." });
  if (url.protocol !== "https:") throw new TRPCError({ code: "BAD_REQUEST", message: "PRD Maker hanya menerima endpoint HTTPS publik agar API key tidak dikirim melalui jaringan tidak aman." });
  if (["localhost", "127.0.0.1", "::1"].includes(url.hostname) || /^(10\.|127\.|169\.254\.|172\.(1[6-9]|2\d|3[0-1])\.|192\.168\.)/.test(url.hostname)) throw new TRPCError({ code: "BAD_REQUEST", message: "Endpoint lokal atau jaringan privat tidak dapat dijangkau aman dari PRD Maker yang terdeploy." });
  return url.toString().replace(/\/$/, "");
}

function providerHeaders(apiKey: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` };
}

async function providerFetch(url: string, init: RequestInit) {
  let response: Response;
  try { response = await fetch(url, { ...init, signal: AbortSignal.timeout(25_000) }); } catch { throw new TRPCError({ code: "BAD_GATEWAY", message: "Tidak dapat menghubungi endpoint AI. Periksa Base URL dan jaringan." }); }
  const raw = await response.text();
  if (raw.length > MAX_PROVIDER_RESPONSE) throw new TRPCError({ code: "BAD_GATEWAY", message: "Respons provider terlalu besar." });
  if (!response.ok) throw new TRPCError({ code: "BAD_GATEWAY", message: `Provider menolak permintaan (${response.status}). Periksa API key, model, atau endpoint.` });
  try { return JSON.parse(raw) as Record<string, unknown>; } catch { throw new TRPCError({ code: "BAD_GATEWAY", message: "Provider tidak mengembalikan JSON yang dapat dibaca." }); }
}

export async function discoverProviderModels(baseUrl: string, apiKey: string) {
  const endpoint = resolveProviderBaseUrl(baseUrl);
  const payload = await providerFetch(`${endpoint}/models`, { headers: providerHeaders(apiKey) });
  const models = Array.isArray(payload.data) ? payload.data.flatMap((item) => typeof item === "object" && item && typeof (item as { id?: unknown }).id === "string" ? [(item as { id: string }).id] : []) : [];
  if (!models.length) throw new TRPCError({ code: "BAD_GATEWAY", message: "Tidak ada model yang ditemukan. Pastikan endpoint mengikuti format OpenAI-compatible `/v1/models`." });
  return models.sort((a, b) => a.localeCompare(b)).slice(0, 100);
}

export function buildPrdSystemPrompt() {
  return "You are a senior product manager and solution architect. Write precise Indonesian Markdown for a project PRD. Be concrete, concise, privacy-aware, and never invent integrations. Include: problem, goals, non-goals, users, user stories, functional requirements, acceptance criteria, risks, assumptions, milestones, and open questions.";
}

export function buildPrdUserPrompt(input: Pick<PrdMakerRequest, "projectName" | "problem" | "audience" | "stack">) {
  return `Project: ${input.projectName}\nAudience: ${input.audience}\nPreferred stack: ${input.stack}\nGeneral brief:\n${input.problem}\n\nWrite a complete prd.md only. State assumptions explicitly and use Markdown headings.`;
}

export async function generatePrdMarkdown(input: PrdMakerRequest) {
  const endpoint = resolveProviderBaseUrl(input.baseUrl);
  const payload = await providerFetch(`${endpoint}/chat/completions`, {
    method: "POST",
    headers: providerHeaders(input.apiKey),
    body: JSON.stringify({ model: input.model, temperature: 0.35, messages: [{ role: "system", content: buildPrdSystemPrompt() }, { role: "user", content: buildPrdUserPrompt(input) }] }),
  });
  const content = (payload.choices as Array<{ message?: { content?: unknown } }> | undefined)?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) throw new TRPCError({ code: "BAD_GATEWAY", message: "Provider tidak mengembalikan isi PRD. Coba model lain." });
  return content.trim().slice(0, 80_000);
}
