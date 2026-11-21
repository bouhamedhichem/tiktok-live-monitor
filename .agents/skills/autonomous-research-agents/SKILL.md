---
name: autonomous-research-agents
description: Use for collecting sources, comparing evidence, and drafting research briefs.
---

# Build bounded research agents

## When to use
Use for collecting sources, comparing evidence, and drafting research briefs.

## Workflow
1. Define question and source policy.
2. Search iteratively.
3. Open primary sources.
4. Record citations.
5. Distinguish facts from inference.
6. Cross-check claims.
7. Stop at evidence threshold.
8. Produce uncertainty notes..

## Safety and quality requirements
- Do not fabricate citations or treat search snippets as verified evidence.
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
