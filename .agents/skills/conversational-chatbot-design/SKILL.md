---
name: conversational-chatbot-design
description: Use for customer support, internal help, and guided conversational experiences.
---

# Design helpful conversational chatbots

## When to use
Use for customer support, internal help, and guided conversational experiences.

## Workflow
1. Identify audience and top intents.
2. Define tone and conversation boundaries.
3. Design greeting, clarification, fallback, escalation, and closure.
4. Maintain context safely.
5. Test ambiguous and adversarial prompts.
6. Measure resolution and handoff rates..

## Safety and quality requirements
- Never fabricate policies or pretend a bot completed an action it did not perform.
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
