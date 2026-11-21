---
name: synthetic-data-generation
description: Use for test fixtures, simulations, and privacy-aware prototyping.
---

# Generate and validate synthetic datasets

## When to use
Use for test fixtures, simulations, and privacy-aware prototyping.

## Workflow
1. Define schema and intended use.
2. Generate controlled distributions.
3. Preserve constraints.
4. Test for duplicates and leakage.
5. Document synthetic origin.
6. Validate downstream behavior..

## Safety and quality requirements
- Never present synthetic records as real observations or use them to substantiate factual claims.
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
