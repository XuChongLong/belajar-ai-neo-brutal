# Research Notes — Hermes Agent, 9Router, and AWS Architecture

> Status: source notes for course authoring. Commands and configuration in lessons must be framed as examples, tested against the current official documentation, and never include real credentials.

## Hermes Agent

The official Hermes Agent repository documents a Linux/macOS/WSL2 installation command, the `hermes setup` wizard, provider/model setup, and the gateway entry point for messaging platforms. The repository describes Hermes as capable of running locally, on a VPS, or other terminal backends and explicitly points learners to official messaging and security documentation. [1]

The official quickstart recommends a staged path: first obtain a clean CLI conversation, then add a gateway only after the base provider/model works. It also notes that a custom endpoint must be verified for base URL, model name, and compatibility before relying on it. [2]

Telegram setup is based on a BotFather token plus an explicit numeric allowlist. The documentation stresses that the BotFather token is secret and group privacy mode changes what a bot can see. Lessons should use placeholder values and make allowlisting the default. [3]

Hermes’ WhatsApp guide uses a Baileys-based bridge rather than the official WhatsApp Business API. It explicitly documents a restriction risk, recommends a dedicated bot number, warns against bulk or unsolicited outbound messaging, and explains that session data is sensitive credential material. The course needs to present the official Meta Business Cloud API as the production-stability alternative. [4]

## 9Router

The 9Router official repository is the required source link: <https://github.com/decolua/9router>. It documents a locally running dashboard and an OpenAI-compatible endpoint at `http://localhost:20128/v1` in the default setup. The repository also documents provider management, routing, model fallback, and local state. [5]

The 9Router architecture document describes the system as a local AI routing gateway with OpenAI-compatible `/v1/*` APIs, provider connections, model/combination fallback, and request/usage persistence. It notes that provider secrets are persisted locally and that request logging can include sensitive headers or bodies when enabled; lessons must advise learners to protect local storage and keep deep logging off unless debugging. [6]

## AWS Cloud Architecture

AWS Well-Architected teaches that cloud architecture should be evaluated against operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability. The lesson will use this as the organizing mental model rather than presenting a service catalogue. [7]

AWS publishes an official Architecture Icons package and explicitly permits customers and partners to use its toolkits/assets in architecture diagrams and related materials. The course can therefore create an original educational diagram using the current official icon package, with attribution and a source link. [8]

## Practitioner Video Cross-check

A practitioner walkthrough by Caleb / meticsmedia was analyzed to identify beginner pitfalls for the Hermes VPS lesson. The video reinforces the value of a VPS for persistent uptime, recommends setting provider spend guardrails, and emphasizes reading dangerous-command approval prompts. It should be cited as an optional walkthrough only; official documentation remains the source of truth for commands and configuration. [9]

## Proposed Asset Strategy

1. Capture clearly labeled reference screenshots of the official Hermes/9Router setup pages only where their licenses and terms allow educational display.
2. Use original Paper Playground callout cards for all secret-bearing screens, not screenshots containing tokens, QR codes, numbers, hostnames, or session details.
3. Build an original AWS architecture diagram using official AWS icons and link the official icon package plus Well-Architected guidance.

## Visual References Reviewed

An official Hermes Web Dashboard screenshot was reviewed for the lesson. It demonstrates the real navigation language used for sessions, models, logs, cron, skills, plugins, MCP, pairing, and configuration. It contains no user credential visible in the selected image. [10]

A 9Router provider dashboard screenshot was reviewed for the router setup lesson. It provides a concrete visual for provider categories and the custom OpenAI-compatible connection affordance. The lesson will caption it as a product interface that may vary by release and direct learners to the official repository before copying settings. [11]

## References

[1]: [Nous Research — Hermes Agent GitHub repository](https://github.com/nousresearch/hermes-agent)
[2]: [Hermes Agent Quickstart](https://hermes-agent.nousresearch.com/docs/getting-started/quickstart)
[3]: [Hermes Agent — Telegram Setup](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram)
[4]: [Hermes Agent — WhatsApp Setup](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/whatsapp)
[5]: [decolua/9router GitHub repository](https://github.com/decolua/9router)
[6]: [9Router Architecture](https://github.com/decolua/9router/blob/master/docs/ARCHITECTURE.md)
[7]: [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
[8]: [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)
[9]: [Hermes Agent: The Ultimate Beginner's Guide — YouTube](https://www.youtube.com/watch?v=CwPUOVUdApE)
[10]: [Hermes Agent Web Dashboard screenshot](https://hermes-agent.nousresearch.com/docs/)
[11]: [9Router provider dashboard reference](https://github.com/decolua/9router)
