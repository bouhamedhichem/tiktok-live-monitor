---
name: crm-automation
description: Use for lead capture, enrichment, assignment, and follow-up.
---

# Automate CRM data and sales workflows

## When to use
Use for lead capture, enrichment, assignment, and follow-up.

## Workflow
1. Define lifecycle stages.
2. Validate contacts.
3. Deduplicate.
4. Enrich from permitted sources.
5. Apply assignment rules.
6. Create activity history.
7. Sync safely.
8. Monitor failures..

## Safety and quality requirements
- Respect consent, suppression lists, and role-based access.
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
