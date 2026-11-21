---
name: android-java-xml
description: Build native Android apps in Java with XML layouts, Material Design 3, MVVM, Retrofit, Socket.IO, and secure storage.
---
# Android Java and XML
- Use Java only; do not introduce Kotlin or Jetpack Compose.
- Use XML layouts and Material 3 components with consistent themes and dimensions.
- Organize by feature and layer: models/data, network, repository, viewmodel, UI, and security.
- Use lifecycle-aware ViewModel + LiveData; keep business logic out of Activities and Fragments.
- Use Retrofit/OkHttp for REST and a compatible Socket.IO Java client for realtime.
- Keep network work off the main thread; expose loading, empty, offline, error, and success states.
- Store credentials using Android Keystore-backed encryption; never hardcode secrets.
- Require HTTPS in production, disable cleartext, review exported components and backup rules.
- Provide complete file paths, Gradle dependencies, manifest entries, XML, and Java classes when implementing.
