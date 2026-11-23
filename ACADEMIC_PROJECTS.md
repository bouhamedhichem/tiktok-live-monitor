# Academic Projects

Three software engineering portfolio projects developed as practical demonstrations of frontend engineering, backend API design, data visualization and applied machine learning.

> The project source directories are currently maintained on the `feat/three-portfolio-websites` branch. Use the links below to inspect the code and project-specific documentation.

## 1. NexusERP — ERP/CRM Management Dashboard

**Overview:** A responsive business management interface for customer relationships, sales orders, inventory visibility and business analytics.

**Technologies:** React, JavaScript, Vite, Recharts, Lucide React.

**Key features**
- Executive dashboard with revenue and business analytics visualizations.
- Customer directory with search and add-customer workflow.
- Sales orders, inventory and analytics views.
- CSV export and browser-local persistence for customer records.

**Source code:** [NexusERP](https://github.com/bouhamedhichem/tiktok-live-monitor/tree/feat/three-portfolio-websites/apps/nexus-erp)

**Current scope:** Portfolio frontend prototype. Customer records are stored locally in the browser; other business records and KPIs are illustrative. No shared database or production authentication is connected.

## 2. QuantVision AI — Commodity Research Dashboard

**Overview:** An interactive research dashboard for exploring gold, silver and petroleum with chart views, technical snapshots, watchlists and simulated paper orders.

**Technologies:** React, JavaScript, Vite, Recharts, Lucide React.

**Key features**
- Commodity selection and interactive chart periods.
- Technical-indicator snapshots and research methodology.
- Persistent watchlists and simulated buy/sell paper orders.
- Portfolio view and CSV export.

**Source code:** [QuantVision AI](https://github.com/bouhamedhichem/tiktok-live-monitor/tree/feat/three-portfolio-websites/apps/quantvision-ai)

**Current scope:** Educational prototype. Prices and indicators are illustrative, not live market data; paper orders are simulations and no real trades are executed.

## 3. SentinelAI — Industrial Monitoring & Predictive Maintenance

**Overview:** An industrial monitoring prototype for managing organizations, machines, telemetry and incidents, with a separate anomaly-scoring service.

**Technologies:** Python, FastAPI, PostgreSQL, SQLAlchemy, JWT, React, TypeScript, Docker.

**Key features**
- Organization registration and authentication.
- Tenant-scoped machine and incident APIs.
- Industrial telemetry dashboard and sensor simulator.
- Incident creation and resolution workflows.
- Baseline anomaly scoring and a separate ML inference service.
- Docker Compose development environment and API documentation.

**Source code:** [SentinelAI](https://github.com/bouhamedhichem/tiktok-live-monitor/tree/feat/three-portfolio-websites/sentinel-ai)

**Current scope:** Working software foundation and demonstration environment. Included ML data is synthetic and the scoring is not validated for real-world or safety-critical decisions. Production hardening and validation remain necessary.

## Portfolio architecture and setup

See the [Portfolio Applications Overview](https://github.com/bouhamedhichem/tiktok-live-monitor/blob/feat/three-portfolio-websites/apps/PORTFOLIO_OVERVIEW.md) for local setup, build checks, architecture and the next production-readiness milestones.
