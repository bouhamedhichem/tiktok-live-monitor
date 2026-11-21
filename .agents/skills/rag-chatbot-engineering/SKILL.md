---
name: rag-chatbot-engineering
description: Use for question answering over private or changing documents.
---

# Build retrieval-augmented chatbots

## When to use
Use for question answering over private or changing documents.

## Workflow
1. Ingest authorized sources.
2. Parse and chunk with metadata.
3. Select embedding and retrieval strategy.
4. Apply access filters.
5. Rerank.
6. Cite retrieved passages.
7. Abstain when evidence is weak.
8. Evaluate retrieval and answer quality separately..

## Safety and quality requirements
- Do not expose chunks across user or tenant boundaries.
- Use least privilege and keep credentials in the platform's secret manager.
- Make side effects observable, auditable, and reversible where possible.
- Validate assumptions against the actual platform version and enabled integrations.
- Include a test plan, failure handling, and a concise operator handover.

## Expected deliverables
- Workflow or architecture diagram and a clear trigger-to-outcome description.
- Configuration or implementation steps with explicit dependencies.
- Input/output contracts, permissions, and environment requirements.
- Positive, negative, duplicate, and recovery test cases with results.
- Monitoring, maintenance, rollback, and ownership notes.
