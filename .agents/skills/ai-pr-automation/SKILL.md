---
name: ai-pr-automation
description: Use for changelog drafts, test summaries, and PR metadata.
---

# Automate pull request preparation

## When to use
Use for changelog drafts, test summaries, and PR metadata.

## Workflow
1. Inspect issue and branch.
2. Summarize actual diff.
3. Run tests.
4. Generate concise description.
5. Link evidence.
6. Request review.
7. Respect branch protections.
8. Report failures honestly..

## Safety and quality requirements
- Do not push directly to protected branches or fabricate passing tests.
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
