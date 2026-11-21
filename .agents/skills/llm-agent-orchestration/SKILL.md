---
name: llm-agent-orchestration
description: Use for agents that plan, call tools, and hand off subtasks.
---

# Coordinate multi-step LLM agents

## When to use
Use for agents that plan, call tools, and hand off subtasks.

## Workflow
1. Define bounded objective.
2. Select minimal tools.
3. Model explicit states.
4. Cap turns, time, and spend.
5. Validate tool arguments.
6. Track provenance.
7. Implement cancellation and resumability.
8. Evaluate task completion and tool errors..

## Safety and quality requirements
- Do not grant broad credentials or unrestricted shell/network access.
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
