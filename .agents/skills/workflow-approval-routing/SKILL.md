---
name: workflow-approval-routing
description: Use for expenses, content reviews, access requests, and operational changes.
---

# Route work through approval chains

## When to use
Use for expenses, content reviews, access requests, and operational changes.

## Workflow
1. Define policy matrix.
2. Resolve approvers.
3. Handle delegation and absence.
4. Prevent self-approval.
5. Capture comments.
6. Expire requests.
7. Revalidate payload.
8. Notify requester..

## Safety and quality requirements
- Approval must be tied to the exact request and authorized approver.
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
