# Copilot instructions for this repository

These instructions guide AI coding agents. They do not change runtime behavior.

- Read the existing source, package scripts, environment examples, and architecture before suggesting edits.
- Do not modify application code unless explicitly asked. Keep skill/instruction installation separate from product implementation.
- Preserve current React/Vite frontend, Node/Express/Socket.IO backend, and existing API/event contracts unless a migration is requested.
- Do not claim a feature, security control, database, test, or deployment exists unless verified in source and tested.
- Never commit credentials, real .env files, tokens, signing keys, user data, or runtime exports.
- Keep dependencies minimal. Explain new packages and compatibility impact before adding them.
- Treat user input and realtime events as untrusted. Validate server-side and enforce authorization at every sensitive boundary.
- Design for accessibility, responsive layouts, reduced motion, performance, and clear loading/empty/error/offline states.
- For TikTok monitoring, support only rooms the operator owns or is authorized to monitor. Respect platform rules, privacy, and data minimization.
- For Android work, use Java + XML (not Kotlin or Compose), Material Design 3, MVVM, Retrofit, Socket.IO, and secure credential storage.
- Before completion, run relevant tests/lint/build where possible and report exact results and remaining limitations.
