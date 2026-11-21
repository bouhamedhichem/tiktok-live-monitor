---
name: node-backend-security
description: Secure Express and Socket.IO services with authentication, authorization, validation, rate limiting, and safe logging.
---
# Node backend security
- Inspect routes, server setup, services, Socket.IO handlers, deployment files, and environment examples first.
- Threat-model anonymous access, unauthorized room control, cross-user access, abuse, injection, and data leakage.
- Enforce authentication and authorization on every sensitive REST route and Socket.IO event; CORS is not authorization.
- Validate input with bounded lengths, allowlists, and explicit schemas; cap body size and event frequency.
- Use modern password hashing, revocable sessions, secure token lifecycle, and strict secret management.
- Apply rate limits to login, connection attempts, exports, and mutations.
- Redact tokens and personal data from logs; protect exports and destructive operations.
- Add negative tests for unauthenticated access, expired sessions, cross-user access, malformed payloads, and unauthorized events.
