---
name: workflow-cost-optimization
description: Use when workflow runs, model calls, or SaaS operations are expensive.
---

# Optimize automation platform costs

## When to use
Use when workflow runs, model calls, or SaaS operations are expensive.

## Workflow
1. Measure runs and cost per outcome.
2. Remove redundant polling.
3. Batch safely.
4. Cache stable lookups.
5. Filter early.
6. Use smaller models for simple tasks.
7. Cap retries.
8. Set budgets and alerts..

## Safety and quality requirements
- Do not reduce validation or safety controls to save cost.
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
