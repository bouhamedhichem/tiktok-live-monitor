---
name: enterprise-integration-patterns
description: Professional guidance for enterprise integration patterns architecture, implementation, and operations.
---

# Enterprise Integration Patterns

## Workflow
1. Identify business capabilities, users, owners, service levels, and measurable outcomes.
2. Map systems, events, entities, dependencies, data ownership, and trust boundaries.
3. Define canonical schemas, identifiers, lifecycle states, and integration contracts.
4. Design for idempotency, retries, timeouts, reconciliation, observability, and graceful failure.
5. Implement role-based access, approval paths, audit trails, and secure secret handling.
6. Test end-to-end flows, duplicate messages, partial outages, data mismatches, and recovery.
7. Monitor throughput, latency, backlog, service levels, data quality, and exceptions.
8. Document runbooks, escalation, business continuity, and rollback.

## Guardrails
- Enforce tenant and role boundaries on the server side.
- Require human approval for financial commitments and irreversible operations.
- Do not silently drop failed records or conceal partial completion.
- Keep sensitive operational and customer data access-controlled.

## Deliverables
- Process maps and system architecture.
- Data contracts and integration implementation.
- Test scenarios and reconciliation evidence.
- Operational dashboards, runbooks, and recovery procedures.
