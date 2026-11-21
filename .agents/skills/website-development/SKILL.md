---
name: website-development
description: Plan, implement, test, secure, and deploy full-stack websites and web applications.
---
# Website Development
Before coding, inspect repository structure, framework, scripts, conventions, tests, and deployment setup. Preserve existing behavior and avoid unrelated rewrites.
1. Confirm requirements, routes, data model, authentication, integrations, and deployment target.
2. Use the project's established framework and package manager.
3. Build reusable typed components and clear API boundaries.
4. Validate untrusted input on the server and enforce authorization on protected resources.
5. Store secrets only in environment variables or a secret manager; commit no real credentials.
6. Use repeatable database migrations and add loading, empty, error, success, and offline states.
7. Make interfaces responsive, semantic, keyboard-accessible, and respectful of reduced motion.

Run available lint, typecheck, unit, integration, and production-build commands. Test critical flows where possible. Report exactly what passed, failed, or was not run. Never claim zero bugs or a successful deployment without evidence.

Use preview deployments first; verify health and critical journeys before production promotion. Document environment variables, migrations, rollback, and operational checks.
