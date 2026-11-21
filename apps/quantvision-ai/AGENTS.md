# QuantVision AI engineering guidance

Before changing this application, consult the compatible repository skills:
- `.agents/skills/react-frontend-engineering/SKILL.md`, `ui-ux-product-design/SKILL.md`, and `design-systems-engineering/SKILL.md` — frontend and product design.
- `.agents/skills/commodity-price-data-pipelines/SKILL.md` — source ingestion and data quality.
- `.agents/skills/gold-fundamental-analysis/SKILL.md`, `gold-price-technical-analysis/SKILL.md`, `silver-market-analytics/SKILL.md`, and `crude-oil-market-analysis/SKILL.md` — asset-specific research.
- `.agents/skills/financial-time-series-validation/SKILL.md` and `ai-forecasting-workflows/SKILL.md` — leakage-safe forecasting and evaluation.
- `.agents/skills/commodity-market-backtesting/SKILL.md` and `trading-strategy-risk-controls/SKILL.md` — realistic backtesting and risk constraints.
- `.agents/skills/paper-trading-simulator/SKILL.md` — simulated order lifecycle only.
- `.agents/skills/software-testing-qa/SKILL.md` — regression and data-integrity tests.

Never label sample prices as live, forecast outputs as validated before out-of-sample evaluation, or simulated orders as broker executions. Keep real-money execution out of scope unless separately requested and safely designed.