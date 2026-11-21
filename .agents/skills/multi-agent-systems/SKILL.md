---
name: multi-agent-systems
description: Use when specialized agents collaborate on decomposable work.
---

# Design cooperative multi-agent systems

## When to use
Use when specialized agents collaborate on decomposable work.

## Workflow
1. Decide whether multiple agents are necessary.
2. Assign narrow roles.
3. Define shared artifact contracts.
4. Use a coordinator.
5. Prevent circular delegation.
6. Reconcile conflicting outputs.
7. Bound parallelism.
8. Compare against a single-agent baseline..

## Safety and quality requirements
- Do not assume agent consensus is evidence. Keep final responsibility explicit.
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
