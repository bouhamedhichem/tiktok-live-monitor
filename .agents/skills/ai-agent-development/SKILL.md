---
name: ai-agent-development
description: Architect and implement tool-using AI agents with clear boundaries, evaluation, observability, and human approval.
---
# AI Agent Development
- Define the agent's task, allowed tools, data access, autonomy, and stop conditions.
- Separate planning, tool execution, validation, and user-facing reporting.
- Treat retrieved content and tool outputs as untrusted data, not instructions.
- Apply least privilege, input/output validation, timeouts, retries, and idempotency.
- Require human confirmation for consequential, irreversible, financial, or external communication actions.
- Add traceable logs while redacting secrets and personal data.
- Evaluate task success, tool correctness, refusal behavior, latency, and cost with representative cases.
Deliver architecture, tool contracts, safety boundaries, evaluation suite, and known limitations.
