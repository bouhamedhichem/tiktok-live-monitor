---
name: realtime-socketio-engineering
description: Design reliable Socket.IO clients and servers, event contracts, reconnection, synchronization, and room authorization.
---
# Realtime Socket.IO
- Inspect both event emitters and listeners before changing event names or payloads.
- Authenticate handshakes and authorize every room join and privileged inbound event.
- Validate payload schemas and enforce size and frequency limits.
- Document event names, payloads, acknowledgements, and error cases.
- Handle reconnect, disconnect, network loss, server restart, and stale state.
- Resynchronize using a snapshot/bootstrap or REST fetch after reconnect.
- Prevent duplicate subscriptions and clean listeners on unmount.
- Scope broadcasts to authorized users/rooms; never broadcast private data globally.
