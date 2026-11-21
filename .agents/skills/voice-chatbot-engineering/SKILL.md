---
name: voice-chatbot-engineering
description: Use for speech interfaces and call-center automation.
---

# Build voice-enabled conversational assistants

## When to use
Use for speech interfaces and call-center automation.

## Workflow
1. Define turn-taking and interruption behavior.
2. Choose speech-to-text and text-to-speech.
3. Handle latency.
4. Detect silence and barge-in.
5. Confirm critical entities.
6. Support fallback to keypad or human.
7. Test accents and noisy audio..

## Safety and quality requirements
- Do not infer identity from voice alone or record without appropriate notice and consent.
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
