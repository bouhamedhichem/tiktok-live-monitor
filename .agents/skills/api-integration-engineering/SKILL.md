---
name: api-integration-engineering
description: Integrate third-party APIs and SaaS services with secure credentials, resilient requests, webhooks, and contract tests.
---
# API Integration Engineering
1. Read the provider's current official documentation and terms before implementation.
2. Confirm authentication scheme, scopes, quotas, pagination, webhook support, and data retention.
3. Store credentials securely and request minimum necessary scopes.
4. Implement timeouts, retries with backoff, rate-limit handling, and idempotency.
5. Validate provider responses and tolerate documented schema evolution.
6. Verify webhook signatures and prevent replay where supported.
7. Add contract tests, sandbox validation, monitoring, and graceful degradation.
Never fabricate provider capabilities or bypass access controls. Clearly state when a provider account or permission is required.
