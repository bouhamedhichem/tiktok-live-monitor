---
name: motion-ui-animation
description: Implement tasteful web interface animation, micro-interactions, transitions, scroll effects, and motion systems.
---
# Motion UI Animation
1. Identify each animation's purpose: feedback, orientation, continuity, emphasis, or delight.
2. Define consistent motion tokens for duration, easing, distance, and stagger.
3. Prefer CSS transitions/transforms for simple effects; reuse the project's existing library for complex sequences.
4. Animate opacity and transform where possible; avoid layout-thrashing properties.
5. Respect prefers-reduced-motion and provide a non-animated equivalent.
6. Ensure keyboard, touch, and screen-reader users receive equivalent feedback.
7. Test on low-powered mobile devices and avoid blocking core interactions.

Keep micro-interactions brief and purposeful. Avoid scroll-jacking, flashing, excessive parallax, and motion that obscures content. Make animation interruptible and never trap focus.

Specify trigger, states, duration, easing, reduced-motion behavior, and implementation notes.
