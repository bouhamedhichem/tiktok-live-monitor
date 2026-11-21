---
name: react-frontend-engineering
description: Build maintainable React interfaces with components, hooks, state management, routing, and frontend testing.
---
# React Frontend Engineering
- Inspect existing framework, React version, conventions, dependencies, and build scripts before editing.
- Prefer small reusable components, explicit props, stable keys, and clear state ownership.
- Use effects only to synchronize with external systems; avoid derived state and unnecessary effects.
- Handle loading, error, empty, success, and disabled states for asynchronous operations.
- Keep API calls in a clear service layer; validate and safely render untrusted data.
- Use semantic HTML, accessible labels, keyboard support, responsive layouts, and reduced motion.
- Add tests for user-visible behavior and critical edge cases.
Run lint, typecheck, tests, and production build when available. Do not add dependencies without a clear need.
