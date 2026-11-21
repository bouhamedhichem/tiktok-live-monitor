---
name: model-drift-detection
description: Professional guidance for model drift detection projects and workflows.
---

# Model Drift Detection

## Workflow
1. Define the prediction or analytics objective, intended users, decision context, and success metric.
2. Audit data provenance, quality, permissions, coverage, labels, and point-in-time availability.
3. Establish a simple baseline and a reproducible training or analytical pipeline.
4. Select methods appropriate to data volume, target, assumptions, and operational constraints.
5. Split data correctly; prevent leakage; tune only on validation data; preserve a final holdout.
6. Evaluate error, calibration, robustness, subgroup behavior, uncertainty, and business impact.
7. Package reproducible artifacts; monitor drift and delayed outcomes; define retraining gates.
8. Document assumptions, limitations, versioning, and human oversight.

## Guardrails
- Never use future information in historical predictions or evaluation.
- Do not present model outputs as facts, causal proof, or guaranteed outcomes.
- Protect personal data and use authorized datasets.
- Keep human review for high-impact decisions and document model limitations.

## Deliverables
- Data dictionary and reproducible pipeline.
- Baseline, model comparison, and evaluation report.
- Validation tests, model card, and deployment plan.
- Monitoring and rollback procedures.
