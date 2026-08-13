# Diagram Visual QA

The Transformer diagram renders as a wide, single-direction flow with readable labels for the core sequence: tokenization, embedding and position, self-attention, feed forward, next-token probability, and answer formation. Its width is intentional; the lesson UI uses a horizontally scrollable frame on small screens rather than shrinking the labels to an unreadable size.

The RAG diagram clearly separates the ingestion lane from the question-answering lane. The dotted connection from the vector database to relevant search communicates that stored knowledge is consulted when a question arrives. The labels remain short enough for a beginner-facing diagram, while the caption in the lesson explains the longer meaning.
