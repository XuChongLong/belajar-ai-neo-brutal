This source-grounded extraction provides a detailed framework for an Indonesian AI Engineering curriculum rework based on the visual and audio content provided by Anas Riad.

### (A) Speaker/Creator, Audience, and Teaching Scope
*   **Speaker/Creator:** Anas Riad (presenting content based on the book *AI Engineering: Building Applications with Foundation Models* by Chip Huyen).
*   **Target Audience:** Developers, students, and engineers aiming to transition from building simple AI demos to production-ready AI products.
*   **Teaching Scope:** The full lifecycle of AI engineering, including foundation model mechanics, evaluation strategies, prompt engineering, Retrieval Augmented Generation (RAG), and agentic system design.

### (B) Near-Exact Quotes with Topic Labels
1.  **The Big Idea:** "AI engineering turns foundation models into useful, safe, fast, and reliable products."
2.  **The Core Skill:** "Evaluation turns AI development from guesswork into engineering."
3.  **Prompting Philosophy:** "Clarity beats cleverness."
4.  **RAG Strategy:** "Treat RAG as a system to optimize, not just a vector search add-on."
5.  **Agent Definition:** "Agents are workflows with feedback, not just one model call."
6.  **Contextual Importance:** "Grounded answers need grounded context."
7.  **Evaluation Reality:** "AI quality is not a single metric."
8.  **Model Evolution:** "Scale + post-training + better interfaces made modern AI applications possible."
9.  **Security/Safety:** "Least privilege: give the agent only the tools and access it truly needs."
10. **Lifecycle Goal:** "The book is about moving from a simple demo to a real product."

### (C) Tools, Architecture Components, Workflows, and Named Concepts
*   **Foundation Models Mentioned:** GPT (OpenAI), Claude (Opus, Sonnet by Anthropic), Gemini (Google), Llama (Meta).
*   **Architecture Components:**
    *   **Evaluation:** Test data, Evaluator (Human or AI Judge), Success metrics, Private benchmarks.
    *   **Prompting:** Role/System, Task, Context, Examples, Output format, Output parser/validator.
    *   **RAG:** Retriever, Document corpus, Vector store/index, Embeddings, Reranker/Filter.
    *   **Agents:** Planner/Reasoning, Tool selection, Tool call (via MCP), Memory/State update.
*   **Workflows:**
    *   **Full Lifecycle:** Use case -> Model choice -> Evaluation -> Prompt/RAG/Agents/Finetuning -> Production architecture -> Monitoring -> Feedback loop.
    *   **RAG Pipeline:** Offline/Indexing (Cleaning, Chunking, Embedding) and Online/Query time.
    *   **Agent Loop:** Plan -> Act -> Observe -> Iterate.
*   **Named Concepts:**
    *   **Tokens:** Basic units a model reads and predicts.
    *   **Self-Supervision:** Learning by predicting the next token from unlabeled text.
    *   **Hallucination:** Confident-sounding but unsupported or incorrect information.
    *   **Temperature:** Controls randomness (0 = factual, 1 = creative).
    *   **Top-p / Top-k:** Parameters limiting token choices.
    *   **Prompt Injection:** Untrusted input overriding intended system behavior.
    *   **BM25:** Keyword-based retrieval method.
*   **Numbers:**
    *   **2026:** Cited as the year AI Engineering will be a top in-demand skill.
    *   **7 Billion / 120 Billion:** Examples of model parameter scales.
    *   **May 2025:** Hypothetical training data cutoff date used to explain hallucinations.

### (D) Step-by-Step Proposed Lesson Sequence
**Prerequisites:** Basic programming (Python), understanding of APIs, familiarity with chat-based AI.

1.  **Module 1: The Big Picture of AI Engineering**
    *   **Concept:** Moving from Demo (one prompt, low stakes) to Production (system design, monitoring).
    *   **Task:** Define a business use case and map out the 7-step AI Engineering Lifecycle.
2.  **Module 2: Foundation Model Mechanics**
    *   **Concept:** Tokens, self-supervision, and probabilistic generation (Temperature, Top-p).
    *   **Task:** Experiment with temperature settings to see how outputs change for the same prompt.
3.  **Module 3: The Art and Science of Evaluation**
    *   **Concept:** Why "you can't improve what you don't measure." Subjective vs. Exact evaluation.
    *   **Task:** Build a "LLM-as-a-Judge" workflow to score the quality of another model's responses.
4.  **Module 4: Advanced Prompt Engineering & Security**
    *   **Concept:** Anatomy of a good prompt and defending against prompt injection.
    *   **Task:** Create a prompt using the 5-part anatomy (Role, Task, Context, Examples, Format) and attempt to "break" it with injection attacks.
5.  **Module 5: RAG (Retrieval Augmented Generation) Pipelines**
    *   **Concept:** Grounding models in private data. Offline indexing vs. Online retrieval.
    *   **Task:** Set up a basic RAG system using chunking, embeddings, and a vector store.
6.  **Module 6: Agentic Systems**
    *   **Concept:** Planning, tool use, and memory design.
    *   **Task:** Design an agent workflow that uses a search tool and a database tool to solve a multi-step query.

### (E) Cautions, Limits, Security Notes, and Assumptions
*   **Cautions:** Hallucinations are reduced by better context and guardrails but are inherent to probabilistic models.
*   **Limits:** Public leaderboards rarely reflect exact business use cases; private benchmarks are necessary.
*   **Security:** Treat all retrieved content as "untrusted." Use an "allowlist" for tools. Implement a permission layer for agents.
*   **Memory Risks:** Agent memory can lead to "stale memory," privacy issues, and growing context costs.
*   **Assumptions:** The curriculum assumes that "Clarity beats cleverness" in all engineering stages and that a feedback loop is mandatory for production.

### (F) Stance and Confidence
*   **Stance:** The presentation is authoritative, structured, and emphasizes the transition from "guesswork" to "engineering." It advocates for a systematic, data-driven approach rather than relying on model "magic."
*   **Confidence:** High. The speaker relies on established engineering principles (system design, evaluation pipelines) applied to the specific nuances of foundation models.