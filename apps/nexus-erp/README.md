# NexusERP

ERP/CRM frontend for customer relationships, sales orders, inventory visibility and business analytics.

## Stack
React 19, Vite, Recharts, Lucide React.

## Run
```bash
npm install
npm run dev
npm run build
```

## Included
Executive overview and revenue chart; customer directory with search and add-customer workflow; orders table and CSV export; inventory and analytics views; responsive layout.

## Limitations
This milestone uses illustrative sample records. Customer records are persisted in browser localStorage on the current device. Orders, inventory, invoices and financial KPIs remain illustrative fixtures. No shared database, authentication, accounting ledger, payment gateway or stock synchronization is connected. This is a portfolio demo, not a system of record. Production milestone: authenticated API, PostgreSQL schema, tenant isolation/RBAC, audit events, migrations, backups and integration tests.
