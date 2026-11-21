---
name: ai-code-review-automation
description: Use for pull request summaries and issue detection.
---

# Automate AI-assisted code review

## When to use
Use for pull request summaries and issue detection.

## Workflow
1. Fetch diff and context.
2. Run static checks first.
3. Ask model for specific bug classes.
4. Require file/line evidence.
5. Suppress unsupported comments.
6. Classify severity.
7. Request human review.
8. Measure precision..

## Safety and quality requirements
- Never auto-merge based only on model approval.
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
