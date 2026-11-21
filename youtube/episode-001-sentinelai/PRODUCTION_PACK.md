# CodeCram — Episode 001: SentinelAI Production Pack

## Concept
**Recommended title:** I Built an AI System That Detects Machine Anomalies in Real Time 🤖

Target length: 8–10 minutes. Language: English. Format: 16:9, 1080p or higher. Style: fast-paced engineering documentary with genuine screen recordings.

This episode demonstrates SentinelAI, an industrial monitoring prototype. It collects simulated sensor telemetry, visualizes machine readings, flags threshold-based anomalies, and creates incidents for review. A separate Isolation Forest demo service is also included and trained with synthetic data.

## Accuracy rules
- The API's current main anomaly scoring uses transparent threshold rules.
- The separate Isolation Forest service is a demo trained on synthetic data; it has not been validated against real industrial failures.
- Do not call a threshold flag a verified prediction or display fabricated accuracy percentages.
- The simulator is not a physical sensor.
- SentinelAI is a prototype and decision-support tool, not an industrial safety controller.
- Only use systems and data you own or are authorized to test.
- Never expose passwords, tokens, environment variables, personal data, or private endpoints in the recording.

---

# Full narration script

## 0:00–0:20 — Cold open
**Visual:** Show normal dashboard readings. Cut to a real synthetic sensor spike, the resulting incident, and the incident detail screen.

**Voice-over:**
“What if a machine could tell us something is wrong before it stops working? I built SentinelAI: an industrial monitoring prototype that collects sensor readings, highlights abnormal behavior, and turns suspicious readings into incidents. Today, I’ll show you how it works—and what it can and cannot do.”

On-screen: SENSOR DATA → ANOMALY → INCIDENT

## 0:20–0:55 — The problem
**Visual:** A simple diagram: machine → sensor readings → API → database → dashboard.

**Voice-over:**
“Factories and workshops rely on machines every day. Temperature, vibration, pressure, and other signals can reveal changes in machine behavior. But raw numbers are difficult to monitor manually. I wanted to build one place where those readings could be collected, visualized, and reviewed.”

## 0:55–1:35 — Architecture
**Visual:** Show the real SentinelAI interface and architecture.

**Voice-over:**
“SentinelAI has a React and TypeScript dashboard, a FastAPI backend, a SQL database, a telemetry simulator, and a separate machine-learning demo service. The backend validates incoming telemetry, stores readings, and currently uses transparent threshold rules for its main anomaly scoring. The separate ML service includes an Isolation Forest demonstration trained on synthetic data.”

On-screen label: “Prototype • Synthetic demo data • Not production-validated”

## 1:35–2:20 — Start the project
**Visual:** Screen-record the terminal. Keep text readable and do not show local secrets.

**Voice-over:**
“I’m running the project locally with Docker Compose. First, I enter the SentinelAI folder, create my local environment file, and start the services.”

Show these commands:
- cd sentinel-ai
- cp .env.example .env
- docker compose up --build

**Voice-over:**
“When the containers are ready, the dashboard is available on port 5173, the API documentation on port 8000, and the ML service health endpoint on port 8001.”

## 2:20–3:15 — Configure the fleet
**Visual:** Open the dashboard. Create an organization. Add demo machines with external IDs MOTOR-001, PRESS-002, and PUMP-003.

**Voice-over:**
“First, I create an organization. Then I register three demo machines: a motor, a press, and a pump. This gives the dashboard a small fleet to monitor.”

On-screen: MOTOR-001 • PRESS-002 • PUMP-003

## 3:15–4:20 — Generate telemetry
**Visual:** Open a second terminal and start the simulator. Return to the dashboard and show charts updating.

Show these commands:
- cd sentinel-ai
- docker compose --profile demo up simulator

**Voice-over:**
“Now I start the demo simulator in a second terminal. It sends synthetic readings, and the dashboard begins updating. These are simulated values—not measurements from a real physical machine.”

Capture several seconds of normal readings. Keep chart labels legible.

## 4:20–5:35 — Trigger and inspect an anomaly
**Visual:** Wait for the simulator's synthetic fault injection. Capture the actual abnormal reading and resulting incident. Open the incident detail.

**Voice-over:**
“The simulator occasionally injects a synthetic fault. The backend compares incoming values with configured thresholds. When a reading crosses a threshold, the system can flag it and create an incident for review. This is rule-based anomaly detection, so we can explain exactly why the event was flagged.”

On-screen: “Threshold-based flag — not a verified prediction”

## 5:35–6:25 — Incident workflow
**Visual:** Review the incident details and resolve one incident in the dashboard.

**Voice-over:**
“An alert is only useful if someone can investigate it. Here, I can inspect the incident and resolve it after reviewing the event. This is the beginning of an operational workflow—not an automatic machine shutdown or repair system.”

## 6:25–7:20 — Machine-learning component
**Visual:** Show the ML service health endpoint. If the documented demo-training action works in the current build, demonstrate it and show only actual output.

**Voice-over:**
“There is also a separate Isolation Forest demo service. Isolation Forest is an unsupervised anomaly-detection method. In this project, the demonstration model uses synthetic training data. It is useful for showing the model lifecycle, but it has not been validated on real factory data. The dashboard's current main scoring path remains transparent threshold logic, so I won't pretend this is a production predictive-maintenance model.”

On-screen: “Isolation Forest demo • Synthetic training data • No real-world accuracy claim”

## 7:20–8:10 — Security and limitations
**Visual:** Show the architecture and organization boundary. Never reveal secrets or private endpoints.

**Voice-over:**
“I also designed the backend around authenticated users and organization-scoped resources. But before real deployment, the project still needs stronger device identity, secret rotation, production-grade role controls, rate limits, database migration and backup procedures, and full security testing. It is a prototype and decision-support tool—not an industrial safety controller.”

## 8:10–8:45 — Roadmap
**Visual:** Roadmap slide: authorized physical sensor gateway, licensed real-world datasets, time-aware evaluation, MQTT, real-time updates, and security hardening.

**Voice-over:**
“The next steps are connecting authorized physical sensors, collecting a properly governed real dataset, evaluating false positives and missed detections, and hardening the deployment. Only after that kind of validation could we make meaningful claims about real-world performance.”

## 8:45–9:10 — Outro
**Visual:** Return to the dashboard, then CodeCram end screen.

**Voice-over:**
“That’s SentinelAI: a prototype that takes simulated telemetry and turns it into something we can monitor and investigate. If you want the source code and the next development episode, subscribe to CodeCram and tell me in the comments: should I connect an ESP32 sensor next, or improve the anomaly-detection pipeline first?”

On-screen: “Subscribe • Comment: ESP32 or ML?”

---

# Recording and editing plan

| Time | Shot | Direction |
|---|---|---|
| 0:00–0:20 | Dashboard cold open | Normal readings → synthetic anomaly → incident. Fast cuts, genuine UI only. |
| 0:20–0:55 | Problem | Voice-over with simple machine-to-dashboard diagram. |
| 0:55–1:35 | Architecture | Real dashboard plus clean architecture overlay. |
| 1:35–2:20 | Docker startup | Terminal commands; crop out secrets and unrelated windows. |
| 2:20–3:15 | Fleet setup | Create organization and three demo machine IDs. |
| 3:15–4:20 | Telemetry | Start simulator; show real chart updates. |
| 4:20–5:35 | Anomaly | Capture an actual synthetic fault and incident. Do not fabricate. |
| 5:35–6:25 | Incident | Open and resolve an incident in the app. |
| 6:25–7:20 | ML service | Show only actual health/output; explain synthetic training. |
| 7:20–8:10 | Security | Architecture overlay; never reveal secrets. |
| 8:10–8:45 | Roadmap | Animated list of next engineering milestones. |
| 8:45–9:10 | Outro | CodeCram end screen and next-video question. |

Capture setup:
- Record 16:9 at 1080p minimum and 30 fps.
- Maximize the browser, hide personal tabs, and use readable zoom.
- Use a large terminal font and show only relevant commands.
- Move the cursor deliberately and pause after important actions.
- Record narration in a quiet room; use a separate audio track if possible.
- Use your own application footage and licensed stock footage only.
- Keep music low under narration. Use licensed or royalty-free music and sound effects.
- Add accurate captions, concise labels, and subtle zooms; avoid excessive glitch effects.
- Keep a visible caveat on anomaly/ML scenes: “Demo data — not real-world validated”.

## Thumbnail concept
16:9, high contrast, one focal point. Left side: genuine dashboard screenshot with a visible incident card. Right side: large text “ANOMALY DETECTED!” with a simple glowing machine/sensor graphic. Keep text to 2–4 words. Do not imply a real factory breach.

---

# YouTube metadata

## Recommended title
I Built an AI System That Detects Machine Anomalies in Real Time 🤖

## Alternate titles
1. I Built an Industrial Monitoring System with AI
2. Can AI Detect Machine Problems? I Built SentinelAI
3. Building SentinelAI: Sensors, FastAPI, React & Anomaly Detection

## Description
I built SentinelAI, an industrial monitoring prototype that collects sensor telemetry, visualizes machine readings, flags threshold-based anomalies, and creates incidents for investigation.

In this video, I'll show you the architecture, run the project with Docker Compose, register demo machines, generate simulated sensor data, trigger a synthetic fault, and inspect the incident workflow.

**Tech stack**
- React + TypeScript dashboard
- FastAPI backend
- SQL database
- Docker Compose
- Sensor telemetry simulator
- Separate Isolation Forest demo service

**Important:** This is an educational prototype. The current API anomaly scoring uses transparent threshold rules. The separate Isolation Forest demonstration is trained on synthetic data and has not been validated against real industrial failures. The simulator does not represent a physical sensor. SentinelAI is not a production safety controller.

**Source code:** Add the public GitHub repository or episode branch link here after confirming what you want to share.

If you enjoyed the build, subscribe to CodeCram and comment: should the next episode connect an ESP32 sensor or improve the anomaly-detection pipeline?

#AI #Python #IoT #MachineLearning #CodeCram

## Suggested chapters
00:00 The demo
00:20 The problem
00:55 SentinelAI architecture
01:35 Run the project
02:20 Register the machines
03:15 Simulate sensor data
04:20 Trigger an anomaly
05:35 Investigate an incident
06:25 The ML demo service
07:20 Security and limitations
08:10 What's next
08:45 Outro

Adjust chapter timestamps after final editing.

## Tags
SentinelAI, industrial IoT, anomaly detection, machine learning, Isolation Forest, Python, FastAPI, React, TypeScript, Docker Compose, predictive maintenance prototype, sensor monitoring, software engineering, AI project, coding project, CodeCram, full stack development, synthetic data

## Pinned comment
“What should I build next for SentinelAI: connect a real ESP32 sensor, or improve the anomaly-detection pipeline with a properly evaluated dataset? 👇”

## Upload settings
- Category: Science & Technology
- Language: English
- Video: 16:9, 1080p or higher
- Add subtitles/captions and review technical terms.
- Set the audience designation accurately.
- Add an end screen with Subscribe and a relevant next video when available.
- Add a playlist named “AI & IoT Projects”.

---

# Three Shorts scripts

## Short 1 — The anomaly appears (25–35 seconds)
**Hook:** “I made a machine-monitoring dashboard—and now watch this.”

**Visual:** Show normal simulated telemetry, then the synthetic fault event and incident card.

**Voice-over:** “SentinelAI receives simulated machine readings. When a value crosses a configured threshold, the backend flags the anomaly and creates an incident for review. This is a prototype using synthetic data—not a real factory prediction system.”

**End text:** “Full build on CodeCram”

Caption: A synthetic sensor fault becomes an incident in SentinelAI. #IoT #Python #AI

## Short 2 — What is Isolation Forest? (25–35 seconds)
**Hook:** “How can a model spot unusual data without labels?”

**Visual:** Simple animation of data points with one isolated point, then show the ML service.

**Voice-over:** “Isolation Forest is an unsupervised anomaly-detection algorithm. SentinelAI includes a separate demo service trained with synthetic data. That makes it a useful learning example—but it does not prove real-world industrial accuracy.”

**End text:** “Learn by building • CodeCram”

Caption: A quick look at Isolation Forest and its limits. #MachineLearning #Python #AI

## Short 3 — Build stack reveal (20–30 seconds)
**Hook:** “One project. Five technologies.”

**Visual:** Quick cuts: React dashboard, FastAPI docs, Docker containers, telemetry chart, incident detail.

**Voice-over:** “I built SentinelAI with React and TypeScript, FastAPI, SQL, Docker Compose, and a sensor simulator. The goal: turn machine telemetry into a dashboard and an incident workflow.”

**End text:** “Which stack should I build next?”

Caption: Building a full-stack industrial monitoring prototype. #React #FastAPI #Docker #CodeCram

---

# Final checklist

## Before recording
- [ ] Pull the latest intended branch and verify the exact commit.
- [ ] Start SentinelAI using the repository README instructions.
- [ ] Create a fresh demo organization and demo machines.
- [ ] Confirm the simulator sends telemetry.
- [ ] Wait for and capture a real synthetic fault event.
- [ ] Confirm incident creation and resolution work in the running build.
- [ ] Check ML service health; do not invent or stage outputs.
- [ ] Hide secrets, tokens, environment variables, emails, and private data.
- [ ] Prepare a clean browser and readable terminal.
- [ ] Test microphone levels and screen recording.

## Recording and editing
- [ ] Record the cold-open sequence.
- [ ] Record the actual workflow without hiding failures.
- [ ] Capture terminal and dashboard separately where possible.
- [ ] Record narration in a quiet room.
- [ ] Add accurate captions and technical labels.
- [ ] Add a simple architecture diagram.
- [ ] Use licensed music and keep it below narration.
- [ ] Keep synthetic-data and prototype caveats visible.
- [ ] Verify every command matches the current repository.
- [ ] Export the 16:9 video and three vertical Shorts.

## Publishing
- [ ] Finalize the title after checking keyword demand and competition.
- [ ] Create a readable thumbnail with 2–4 words.
- [ ] Add the correct source-code URL.
- [ ] Correct chapters after the final edit.
- [ ] Add and review subtitles.
- [ ] Set audience designation accurately.
- [ ] Preview on mobile and desktop.
- [ ] Publish or schedule only after final human review.
- [ ] Pin the comment and add the video to the playlist.

## After publishing
- [ ] Review impressions click-through rate and first-30-second retention.
- [ ] Review average view duration and traffic sources.
- [ ] Note comments and questions for the next episode.
- [ ] Compare Shorts retention and subscriber conversion.

## Production status
This package is prepared in the repository. It does not mean the video has been recorded, edited, uploaded, or published. Direct YouTube publishing requires a connected publishing workflow and your final approval.
