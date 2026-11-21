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
This milestone uses illustrative sample records. New customer entries live only in React state and disappear on refresh. No database, authentication, accounting ledger, payments or stock synchronization is connected. Do not use as a system of record. Next milestone: API, PostgreSQL schema, tenant isolation/RBAC, audit events, migrations and integration tests.
