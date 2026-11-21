---
name: scheduled-job-automation
description: Use for cron tasks, periodic reports, cleanup, and synchronization.
---

# Design scheduled and recurring jobs

## When to use
Use for cron tasks, periodic reports, cleanup, and synchronization.

## Workflow
1. Choose schedule and timezone.
2. Define concurrency policy.
3. Add lock or deduplication.
4. Set timeout and retries.
5. Record run status.
6. Alert on missed runs.
7. Support manual rerun..

## Safety and quality requirements
- Avoid overlapping runs and unbounded retry loops.
- Use least privilege and keep credentials in the platform's secret manager.
- Make side effects observable, auditable, and reversible where possible.
- Validate assumptions against the actual platform version and enabled integrations.
- Include a test plan, failure handling, and a concise operator handover.

## Expected deliverables
- Workflow or architecture diagram and a clear trigger-to-outcome description.
- Configuration or implementation steps with explicit dependencies.
- Input/output contracts, permissions, and environment requirements.
- Positive, negative, duplicate, and recovery test cases with results.
- Monitoring, maintenance, rollback, and ownership notes.
