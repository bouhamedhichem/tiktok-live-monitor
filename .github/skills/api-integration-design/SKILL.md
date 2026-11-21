---
name: api-integration-design
description: Design and integrate REST APIs, versioned contracts, validation, error handling, and client-server compatibility.
---
# API integration
- Inspect actual routes and payloads; never invent endpoints or claim unimplemented behavior.
- Document methods, paths, auth requirements, request/response schemas, status codes, and errors.
- Use consistent error envelopes, pagination, filtering, and idempotency where appropriate.
- Validate inputs on the server and parse responses defensively on clients.
- Preserve backward compatibility or provide explicit versioning and migration notes.
- Add contract and integration tests for success and failure cases.
