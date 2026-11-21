---
name: zapier-automation
description: Use for Zaps, multi-step actions, filters, paths, tables, and app integrations.
---

# Create reliable Zapier automations

## When to use
Use for Zaps, multi-step actions, filters, paths, tables, and app integrations.

## Workflow
1. Define trigger and expected outcome.
2. Select the narrowest trigger.
3. Map fields explicitly.
4. Add filters/paths.
5. Deduplicate records.
6. Configure delays only when justified.
7. Test each step.
8. Review task usage.
9. Add monitoring and recovery notes..

## Safety and quality requirements
- Do not assume a successful test means historical data is backfilled. Confirm production permissions.
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
