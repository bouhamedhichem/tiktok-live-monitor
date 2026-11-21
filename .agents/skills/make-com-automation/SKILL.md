---
name: make-com-automation
description: Use for Make scenarios connecting SaaS apps, routers, iterators, aggregators, and webhooks.
---

# Build Make scenario automations

## When to use
Use for Make scenarios connecting SaaS apps, routers, iterators, aggregators, and webhooks.

## Workflow
1. Document scenario trigger and data contract.
2. Choose modules.
3. Normalize payloads.
4. Use filters and routers.
5. Handle pagination and bundles.
6. Configure error handlers and replay-safe operations.
7. Inspect operation usage.
8. Test with representative bundles.
9. Document schedule and ownership..

## Safety and quality requirements
- Avoid infinite scenario loops and duplicate writes. Protect connection credentials.
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
