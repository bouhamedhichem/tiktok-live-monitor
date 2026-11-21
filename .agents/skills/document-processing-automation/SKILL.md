---
name: document-processing-automation
description: Use for PDFs, scans, forms, and business documents.
---

# Automate document intake and processing

## When to use
Use for PDFs, scans, forms, and business documents.

## Workflow
1. Validate file type and size.
2. Scan uploads.
3. Extract text/OCR.
4. Classify document.
5. Extract schema fields.
6. Validate against rules.
7. Flag low confidence.
8. Preserve source references.
9. Route exceptions..

## Safety and quality requirements
- Treat documents as untrusted input and restrict access to extracted data.
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
