---
name: application-security-testing
description: Use for professional application security testing projects, implementation, evaluation, and maintenance.
---

# Application Security Testing

## When to use
Use for professional application security testing projects, implementation, evaluation, and maintenance.

## Professional workflow
1. Establish the business goal, users, scope, constraints, acceptance criteria, and success metrics.
2. Inspect the existing repository, platform version, data sources, dependencies, and established conventions before changing anything.
3. Propose a maintainable architecture and document key decisions, interfaces, data contracts, and trust boundaries.
4. Implement in small, reviewable increments using reusable components, typed interfaces, and clear separation of concerns.
5. Validate inputs and outputs; apply authentication, authorization, privacy, accessibility, and secure defaults appropriate to the system.
6. Add automated tests for normal, invalid, boundary, failure, and recovery scenarios; test realistic workloads and supported devices.
7. Measure correctness, usability, performance, reliability, and operating cost against the agreed acceptance criteria.
8. Document deployment, configuration, monitoring, troubleshooting, backup, rollback, and future maintenance.

## Quality and safety requirements
- Use least privilege and keep credentials in approved secret storage; never commit secrets.
- Use only authorized systems, data, assets, and integrations; respect licenses and platform terms.
- Preserve existing functionality and avoid unrelated changes.
- Make destructive or externally visible operations reversible where possible and require approval when appropriate.
- Distinguish measured results, estimates, simulations, and generated content; never fabricate evidence.
- Record assumptions, limitations, dependencies, test evidence, and known risks.

## Expected deliverables
- Requirements and implementation plan.
- Architecture or workflow diagram and interface/data contracts where relevant.
- Reusable source code, configuration, and setup instructions.
- Automated test suite and validation report.
- Deployment and operator documentation with monitoring and rollback steps.
