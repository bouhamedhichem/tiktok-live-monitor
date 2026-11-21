---
name: security-alert-triage-automation
description: Use for enrichment and prioritization of security findings.
---

# Automate security alert triage

## When to use
Use for enrichment and prioritization of security findings.

## Workflow
1. Normalize alerts.
2. Enrich from trusted inventories.
3. Correlate duplicates.
4. Score with explainable rules.
5. Route to analysts.
6. Preserve evidence.
7. Record disposition.
8. Tune false positives..

## Safety and quality requirements
- Do not automatically close high-severity findings solely from AI classification.
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
