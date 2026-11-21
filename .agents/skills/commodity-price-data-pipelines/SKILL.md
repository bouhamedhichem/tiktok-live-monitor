---
name: commodity-price-data-pipelines
description: Professional guidance for commodity price data pipelines research, analytics, and software workflows.
---

# Commodity Price Data Pipelines

## Workflow
1. Define the instrument, market, benchmark, currency, unit, horizon, and research question.
2. Obtain authorized, timestamped data and record source, licensing, missing values, and delays.
3. Normalize calendars, time zones, contract rolls, corporate/contract adjustments, and units.
4. Explore drivers and establish transparent baselines before fitting complex models.
5. Use chronological or walk-forward validation; prevent look-ahead and survivorship bias.
6. Include transaction costs, slippage, liquidity, volatility, drawdowns, and stress scenarios when relevant.
7. Report uncertainty, scenario ranges, sensitivity, limitations, and out-of-sample performance.
8. Keep simulations separate from live market data and require explicit authorization for any external action.

## Financial safety requirements
- Research and educational analytics only; this skill is not personalized investment advice.
- No model or strategy can guarantee profit; never imply certainty or guaranteed returns.
- Default to offline analysis and paper trading; do not connect live order execution automatically.
- Label delayed, synthetic, simulated, and derived data clearly; respect data-provider licenses.
- Preserve independent risk review and human approval for consequential decisions.

## Deliverables
- Reproducible data pipeline and assumptions.
- Analysis or backtest with leakage controls and realistic costs.
- Risk, uncertainty, and limitations report.
- Dashboard and monitoring plan where applicable.
