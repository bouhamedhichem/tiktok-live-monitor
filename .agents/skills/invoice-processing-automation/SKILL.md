---
name: invoice-processing-automation
description: Use for invoice capture, matching, and approval preparation.
---

# Automate invoice extraction and review

## When to use
Use for invoice capture, matching, and approval preparation.

## Workflow
1. Extract supplier, invoice number, dates, currency, totals, and line items.
2. Validate arithmetic.
3. Detect duplicates.
4. Match purchase orders.
5. Flag anomalies.
6. Route approval.
7. Export to accounting only after authorization..

## Safety and quality requirements
- Never autonomously pay invoices or alter bank details.
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
