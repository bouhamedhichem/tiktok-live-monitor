---
name: customer-support-chatbot
description: Use for FAQs, order status, troubleshooting, and support triage.
---

# Build customer support chatbot workflows

## When to use
Use for FAQs, order status, troubleshooting, and support triage.

## Workflow
1. Ground answers in approved knowledge.
2. Identify users.
3. Classify intent.
4. Collect only required details.
5. Call read-only tools first.
6. Confirm before account-changing actions.
7. Offer human handoff with context.
8. Review unresolved conversations..

## Safety and quality requirements
- Protect personal data and clearly disclose automation where required.
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
