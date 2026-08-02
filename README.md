# TikTok Live Monitor

A real-time dashboard that connects to a public **TikTok LIVE** room, streams
in every public comment as it arrives, flags comments that contain a phone
number, an @mention, or a custom keyword, and lets you search, filter, sort,
and export everything to CSV/Excel — all through a modern, dark/light-mode
web dashboard.

![status](https://img.shields.io/badge/status-portfolio--ready-2dd4bf)

---

## ⚠️ Legal & ethical use — read this first

This project reads TikTok's **public** LIVE chat using
[`tiktok-live-connector`](https://github.com/zerodytrash/TikTok-Live-Connector),
an unofficial, community-maintained library. There is no official TikTok API
for this. Before you use this tool:

- **Only monitor rooms you own, operate, or are explicitly authorized to
  monitor** (e.g. your own live-selling stream, or a client's stream with
  their permission). Watching someone else's LIVE without authorization to
  harvest their commenters' data is not what this tool is for.
- **This is a reverse-engineering integration, not an official API.** TikTok
  can change its protocol at any time, which may break the connection until
  the `tiktok-live-connector` dependency is updated. Treat it as a monitoring
  tool for demos, moderation, and your own streams — not as production
  infrastructure you'd bet a business on without your own risk assessment.
- **A phone number typed into a live chat is not consent to be contacted.**
  The "leads" table is meant for things like a live-selling stream where
  viewers voluntarily post their number because *you* asked them to (e.g.
  "drop your number for the discount code"). It is **not** a tool for
  scraping contact lists from other people's streams to cold-call or spam.
  Exporting is a manual, explicit action for exactly this reason — nothing
  in this app auto-contacts anyone.
- **Comply with the law where you operate.** Rules on unsolicited contact,
  telemarketing, and data protection (e.g. TCPA, GDPR, CCPA, or your local
  equivalent) apply to what you *do* with the numbers this tool surfaces,
  regardless of where they came from.
- **No spam, no abuse.** Don't use the keyword/lead features to identify
  people to harass, mass-message, or deceive.

If you're building this for a client, put a version of this section in front
of them too — it's part of using the tool responsibly, not boilerplate.

---

## Features

- 🔴 **Live connection** to a public TikTok LIVE room with automatic
  reconnect (bounded retries with backoff)
- 💬 **Real-time comment feed** over WebSocket (Socket.IO), newest-first
- 📞 **Phone number detection** — normalizes and validates digit sequences
  found in comments
- 🏷️ **Custom keyword flagging** — add/remove keywords live, no restart
  needed
- 🔎 **@mention extraction** from comment text
- 🧹 **Automatic de-duplication** — repeated webcast events are dropped;
  leads are keyed by normalized phone number so the same number never
  appears twice (it just bumps a "seen ×N" counter instead)
- 🕒 **Timestamps** on every comment and every lead (first seen / last seen)
- 💾 **One-click export** to CSV and Excel (`.xlsx`), for both the comment
  log and the leads table
- ⏸️ **Pause / Resume / Clear** controls — pausing keeps the connection
  alive but stops recording new comments, so you don't need to reconnect
  (and risk rate limits) just to take a break
- 🔍 **Search, filter, and sort** on both the live feed (by text/username,
  by tag, by time) and the leads table (by phone/username, by any column)
- 🟢 **Connection status indicator** — idle / connecting / listening /
  paused / disconnected / error, with a live "pulse" animation
- 📝 **Structured logging** (Winston) to console + rotating log files, plus
  a live event log panel in the dashboard
- 🌗 **Dark and light mode**, persisted across sessions
- 📱 **Responsive layout** — sidebar collapses to a stacked layout on
  narrow screens

---

## Architecture

```
tiktok-live-monitor/
├── backend/                    Node.js + Express + Socket.IO
│   ├── src/
│   │   ├── config/             Centralized env-based configuration
│   │   ├── services/
│   │   │   ├── tiktokService.js      Connects to TikTok LIVE, emits events
│   │   │   ├── extractionService.js  Phone/keyword/@mention detection
│   │   │   ├── storageService.js     JSON-file persistence + dedupe
│   │   │   ├── exportService.js      CSV / Excel export
│   │   │   └── logger.js             Winston logger (console + files)
│   │   ├── websocket/           Socket.IO event wiring
│   │   ├── routes/              REST API (health, data, exports, config)
│   │   ├── data/                Runtime data: comments.json, leads.json,
│   │   │                        app.log, errors.log, exports/
│   │   └── server.js            App entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/                   React 18 + Vite
    └── src/
        ├── components/         Header, ConnectionPanel, LiveFeed,
        │                       LeadsTable, EmptyState
        ├── contexts/            ThemeContext (dark/light mode)
        ├── hooks/               useSocket — the single Socket.IO connection
        ├── services/            api.js — REST + export download helper
        ├── utils/               format.js, tiktok.js (link/username parsing)
        ├── index.css            Design tokens + all component styles
        ├── App.jsx
        └── main.jsx
```

**Data flow:** `tiktokService` opens a connection to the TikTok webcast feed
→ each `chat` event is analyzed by `extractionService` (phone numbers,
mentions, keyword matches) → the enriched comment is deduplicated and
persisted by `storageService` → `websocket/index.js` broadcasts it to every
connected dashboard over Socket.IO → the React `useSocket` hook updates
state → `LiveFeed` and `LeadsTable` re-render. Exports and history reads
also go through a plain REST API for anything that doesn't need to be
real-time (fetching the full backlog, downloading a file).

Storage is a small JSON-file-backed store (not a database) with debounced,
atomic writes — a deliberate choice to keep the project dependency-free and
trivially portable across Windows/macOS/Linux for a demo or client handoff.
Swapping in SQLite/Postgres later only touches `storageService.js`.

---

## Prerequisites

- Node.js 18+ and npm
- A TikTok account that is currently LIVE (yours, or one you're authorized
  to monitor) to test against

---

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env if you want to change the port, default keywords, etc.
npm run dev        # starts on http://localhost:4000 with auto-reload
# or: npm start     # plain node, no auto-reload
```

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env   # only needed if the backend isn't on localhost:4000
npm run dev             # starts on http://localhost:5173
```

Open `http://localhost:5173`, enter a TikTok username that is currently
live (without the `@`), and click **Connect**.

### 3. Production build (frontend)

```bash
cd frontend
npm run build      # outputs static files to frontend/dist/
npm run preview    # serve the production build locally to sanity-check it
```

Serve `frontend/dist/` with any static host (Nginx, Vercel, Netlify, etc.),
and run the backend as a long-lived Node process (pm2, systemd, Docker —
whatever fits your deployment).

---

## Deploying (Render, free tier)

This is the easiest path to a public URL with no credit card. It uses two
Render services from one repo: a **Web Service** for the backend (needs a
persistent process for the TikTok connection + WebSocket) and a **Static
Site** for the frontend build.

**0. Push this project to a GitHub (or GitLab) repo** — Render deploys from
Git.

### Option A — one-click with the included Blueprint

1. In the Render dashboard: **New +****Blueprint** → select your repo.
   Render reads `render.yaml` at the repo root and proposes both services.
2. Review and click **Apply**. Both services deploy automatically, already
   wired to each other's URLs via the `CORS_ORIGIN` / `VITE_API_URL`
   variables defined in `render.yaml`.
3. If either service name is already taken on Render, rename it when
   prompted — then update the matching `fromService.name` in the other
   service's env var (Dashboard → that service → Environment) so they
   still point at each other, and redeploy.

### Option B — manual, one service at a time

1. **New +****Web Service** → select the repo.
   - Root Directory: `backend`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
   - Add the env vars from `backend/.env.example` (skip `PORT` — Render
     sets that for you automatically). Leave `CORS_ORIGIN` for step 3.
2. **New +****Static Site** → select the repo again.
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Add env var `VITE_API_URL` = the backend service's URL from step 1
     (e.g. `https://tiktok-monitor-backend.onrender.com`)
3. Go back to the **backend** service → Environment → set `CORS_ORIGIN` to
   the frontend service's URL from step 2, save (triggers a redeploy).
4. Open the frontend's URL and connect to a room.

### Free-tier behavior worth knowing

- **Cold start:** a free service spins down after 15 minutes with no
  traffic and takes roughly 30–60 seconds to wake back up on the next
  request or connection. While you're actively watching a live (steady
  WebSocket traffic), it stays up; it's only idle periods between sessions
  that trigger this.
- **Ephemeral filesystem:** Render wipes local file changes on every
  restart/redeploy/spin-down. This app stores comments/leads as JSON files
  on disk, so **that history resets** whenever the free service restarts —
  export to CSV/Excel before you're done with a session if you want to
  keep it. (A paid Render plan can attach a persistent disk to avoid this;
  swapping in a real database, per the Future Improvements section below,
  is the more durable fix either way.)
- No credit card is required for this path, and both services include free
  HTTPS on their `onrender.com` subdomain.

---

## Example configuration (`backend/.env`)

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
DEFAULT_TIKTOK_USERNAME=
DEFAULT_KEYWORDS=giveaway,discount,order,interested,price
PHONE_MIN_DIGITS=8
PHONE_MAX_DIGITS=15
RECONNECT_MAX_ATTEMPTS=5
RECONNECT_DELAY_MS=4000
LOG_LEVEL=info
```

- `DEFAULT_KEYWORDS` seeds the keyword chips shown in the dashboard on
  first load; you can add/remove keywords live from the UI afterwards.
- `PHONE_MIN_DIGITS` / `PHONE_MAX_DIGITS` tune what counts as a plausible
  phone number, so short numeric strings (like "45" for a price) aren't
  misflagged.

---

## How it works, end to end

1. You type a TikTok username into the dashboard and hit **Connect**.
2. The frontend sends a `connect-room` event over Socket.IO to the backend.
3. The backend opens a `TikTokLiveConnection` to that room. If it's live,
   TikTok's webcast service starts pushing chat events.
4. Every `chat` event is run through `extractionService`, which pulls out
   phone-number-looking sequences, `@mentions`, and any of your configured
   keywords.
5. The enriched comment is checked against recent history to drop
   duplicates, then saved to `comments.json` and broadcast to the
   dashboard.
6. If a phone number was found, it's checked against the leads store by
   normalized number: new numbers become a new lead row; numbers seen
   before just bump a "seen ×N" counter and update "last seen" — so the
   same number is never listed twice.
7. You can pause (stop recording without disconncting), resume, clear the
   session, or export the comment log / leads table to CSV or Excel at any
   time via the sidebar.
8. If TikTok drops the connection (stream ends, network hiccup), the
   backend retries with a delay, up to a configurable number of attempts,
   and reflects `disconnected` / `error` in the status pill the whole time.

---

## Future improvements

- **Swap JSON-file storage for SQLite/Postgres** for larger sessions and
  proper querying (the storage module is already isolated behind a small
  API to make this a contained change)
- **Multi-room monitoring** — watch several LIVE rooms at once, with a
  room switcher in the UI
- **Gift/like/follow tracking** — `tiktok-live-connector` also exposes
  gift, like, share, and follow events that aren't wired up yet
- **Authentication** on the dashboard itself, if this is deployed somewhere
  more than one person can reach
- **Rate-limit / consent banner workflow** — an explicit "I confirm I have
  permission to monitor this room" checkbox before connecting, logged with
  a timestamp, for teams that need an audit trail
- **CRM webhook** for leads (opt-in, off by default) so a captured lead can
  be pushed to a system the *streamer themselves* already uses to follow up
  with customers who asked to be contacted — as opposed to any kind of
  automatic outreach
- **Unit/integration test suite** (Jest for the backend, Vitest + React
  Testing Library for the frontend) — the extraction and storage logic in
  particular are pure functions that are easy to cover
- **Dockerfile + docker-compose** for one-command local spin-up of both
  services

---

## Tech stack

**Backend:** Node.js, Express, Socket.IO, `tiktok-live-connector`, Winston,
ExcelJS, csv-stringify, dotenv

**Frontend:** React 18, Vite, Socket.IO client, lucide-react icons, plain
CSS with custom properties (no framework lock-in)
