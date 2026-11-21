---
name: machine-learning-engineering
description: Build reproducible machine-learning pipelines for data preparation, training, validation, deployment, and monitoring.
---
# Machine Learning Engineering
1. Define prediction target, intended use, data provenance, and evaluation criteria.
2. Split data to prevent leakage; use time-aware or group-aware splits where appropriate.
3. Build reproducible preprocessing and training pipelines with versioned data and seeds.
4. Compare against simple baselines and select metrics aligned with real costs.
5. Evaluate calibration, subgroup performance, drift, and failure cases.
6. Package models with versioned artifacts and explicit input/output schemas.
7. Monitor production data quality and performance; define rollback and retraining triggers.
Never describe synthetic-data results as real-world validation. Document assumptions, limitations, and intended use.
