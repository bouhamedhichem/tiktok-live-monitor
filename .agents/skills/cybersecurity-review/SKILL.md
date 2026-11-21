---
name: cybersecurity-review
description: Review application security, threat models, authentication, authorization, dependencies, and secure configuration.
---
# Cybersecurity Review
1. Map assets, trust boundaries, entry points, data flows, and attacker goals.
2. Threat-model authentication, authorization, sessions, APIs, uploads, secrets, and integrations.
3. Check input validation, injection, SSRF, CSRF, XSS, IDOR, insecure deserialization, and rate limits as relevant.
4. Review dependency and configuration risks using available scanners and current advisories.
5. Verify least privilege, secure defaults, secret rotation, audit logs, and safe error handling.
6. Prioritize findings by likelihood and impact; provide reproduction steps only for authorized environments.
7. Recommend practical fixes and regression tests.
Never exploit third-party systems or expose credentials. Distinguish confirmed vulnerabilities from potential risks; do not claim a clean audit without evidence.
