---
name: react-vite-engineering
description: Build, refactor, debug, and optimize React applications using Vite and maintainable component architecture.
---
# React + Vite engineering
- Read package scripts and current conventions before changes; do not migrate frameworks without request.
- Keep components focused and extract hooks/services where they reduce coupling.
- Keep API calls in service modules; model loading, success, empty, offline, and error states.
- Clean up Socket.IO listeners and effects; prevent duplicate subscriptions and stale closures.
- Use stable keys and bounded rendering for live feeds; profile before adding memoization.
- Validate external payloads and treat Vite-exposed environment variables as public.
- Run the actual lint, test, and build scripts and report results.
