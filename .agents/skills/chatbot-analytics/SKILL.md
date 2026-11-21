---
name: chatbot-analytics
description: Use for conversation funnels, containment, and support analytics.
---

# Measure chatbot usage and outcomes

## When to use
Use for conversation funnels, containment, and support analytics.

## Workflow
1. Define event taxonomy.
2. Minimize personal data.
3. Measure intent distribution, resolution, fallback, escalation, latency, and abandonment.
4. Segment responsibly.
5. Build dashboards.
6. Validate event completeness..

## Safety and quality requirements
- Avoid storing raw sensitive conversations by default.
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
