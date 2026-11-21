---
name: etl-elt-automation
description: Use for moving and transforming data between systems.
---

# Build maintainable ETL and ELT jobs

## When to use
Use for moving and transforming data between systems.

## Workflow
1. Choose ETL/ELT based on workload.
2. Define incremental strategy.
3. Manage schema drift.
4. Use idempotent loads.
5. Reconcile counts.
6. Document dependencies.
7. Test backfills.
8. Monitor cost..

## Safety and quality requirements
- Do not drop or overwrite source data without a tested recovery plan.
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
