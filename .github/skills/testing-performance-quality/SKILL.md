---
name: testing-performance-quality
description: Build automated tests, diagnose regressions, and optimize frontend/backend reliability and performance.
---
# Testing and performance
- Identify existing test runner and scripts before adding tools.
- Test domain logic, API boundaries, Socket.IO flows, validation, auth failures, reconnects, and empty states.
- Mock TikTok connectivity; tests must not require a real LIVE stream.
- Use deterministic fixtures and assert observable behavior, not implementation trivia.
- Watch unbounded arrays/files, event fan-out, memory growth, large exports, and live-feed rendering.
- Run tests, lint, and production builds; report exact outcomes and blockers.
