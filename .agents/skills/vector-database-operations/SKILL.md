---
name: vector-database-operations
description: Use for embedding indexes and semantic retrieval systems.
---

# Operate vector search infrastructure

## When to use
Use for embedding indexes and semantic retrieval systems.

## Workflow
1. Choose embedding model and dimensions.
2. Define namespaces.
3. Batch ingestion.
4. Attach access metadata.
5. Monitor index freshness.
6. Tune retrieval.
7. Rebuild safely on model changes.
8. Test recall and latency..

## Safety and quality requirements
- Enforce authorization filters before returning retrieved records.
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
