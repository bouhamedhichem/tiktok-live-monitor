---
name: knowledge-base-automation
description: Use for syncing docs, FAQs, and operational knowledge.
---

# Maintain internal knowledge bases automatically

## When to use
Use for syncing docs, FAQs, and operational knowledge.

## Workflow
1. Identify canonical sources.
2. Detect changes.
3. Parse and normalize.
4. Preserve metadata and permissions.
5. Review conflicts.
6. Publish versioned updates.
7. Expire stale pages.
8. Track provenance..

## Safety and quality requirements
- Do not index content beyond the user's access rights.
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
