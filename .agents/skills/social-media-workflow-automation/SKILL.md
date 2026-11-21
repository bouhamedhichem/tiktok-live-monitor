---
name: social-media-workflow-automation
description: Use for content calendars, asset review, approvals, and publishing coordination.
---

# Automate social content operations

## When to use
Use for content calendars, asset review, approvals, and publishing coordination.

## Workflow
1. Create content records.
2. Attach approved assets.
3. Validate platform dimensions.
4. Schedule with authorized integrations.
5. Require review.
6. Track publish status.
7. Capture URLs and analytics.
8. Support rollback or correction..

## Safety and quality requirements
- Do not automate fake engagement or bypass platform rate limits.
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
