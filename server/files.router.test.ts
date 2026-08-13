import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  storagePut: vi.fn(),
  createStoredFile: vi.fn(),
  listStoredFilesByUser: vi.fn(),
  removeStoredFileByUser: vi.fn(),
}));

vi.mock("./storage", () => ({ storagePut: mocks.storagePut }));
vi.mock("./db", () => ({ createStoredFile: mocks.createStoredFile, listStoredFilesByUser: mocks.listStoredFilesByUser, removeStoredFileByUser: mocks.removeStoredFileByUser }));

import { appRouter } from "./routers";

function createContext(): TrpcContext {
  return {
    user: { id: 7, openId: "learner-7", name: "Learner", email: null, loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("files router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.storagePut.mockResolvedValue({ key: "7/study-files/catatan_abc.txt", url: "/manus-storage/7/study-files/catatan_abc.txt" });
    mocks.createStoredFile.mockResolvedValue({ id: 12, originalName: "catatan.txt" });
    mocks.listStoredFilesByUser.mockResolvedValue([]);
    mocks.removeStoredFileByUser.mockResolvedValue(true);
  });

  it("uploads a supported personal study file and records user-owned metadata", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.files.upload({ originalName: "catatan AI.txt", mimeType: "text/plain", base64: Buffer.from("halo").toString("base64"), purpose: "study-note" });
    expect(mocks.storagePut).toHaveBeenCalledWith(expect.stringContaining("7/study-files/"), expect.any(Buffer), "text/plain");
    expect(mocks.createStoredFile).toHaveBeenCalledWith(expect.objectContaining({ userId: 7, originalName: "catatan AI.txt", purpose: "study-note", sizeBytes: 4 }));
    expect(result).toEqual({ id: 12, originalName: "catatan.txt" });
  });

  it("rejects a file type outside the supported learning formats", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.files.upload({ originalName: "video.mp4", mimeType: "video/mp4", base64: "aGVsbG8=", purpose: "other" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.storagePut).not.toHaveBeenCalled();
  });

  it("reports a missing or non-owned file when removal is not permitted", async () => {
    mocks.removeStoredFileByUser.mockResolvedValue(false);
    const caller = appRouter.createCaller(createContext());
    await expect(caller.files.remove({ id: 999 })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
