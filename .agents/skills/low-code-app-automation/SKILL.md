---
name: low-code-app-automation
description: Use for forms, admin panels, and operational apps.
---

# Build internal tools with low-code platforms

## When to use
Use for forms, admin panels, and operational apps.

## Workflow
1. Map user roles and data sources.
2. Prototype workflows.
3. Validate server-side permissions.
4. Separate UI from business rules.
5. Handle errors.
6. Test responsive behavior.
7. Document ownership and limits..

## Safety and quality requirements
- Do not rely on hidden UI controls for access control.
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
