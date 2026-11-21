---
name: data-pipeline-orchestration
description: Use for batch and streaming ETL/ELT pipelines.
---

# Orchestrate data ingestion and transformation

## When to use
Use for batch and streaming ETL/ELT pipelines.

## Workflow
1. Define source contracts.
2. Stage raw data.
3. Validate schema.
4. Transform deterministically.
5. Track lineage.
6. Checkpoint.
7. Retry safely.
8. Quarantine bad records.
9. Monitor freshness and volume..

## Safety and quality requirements
- Protect PII and prevent partial loads from appearing complete.
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
