# CodeCram AIoT Lab — Arduino + ESP32 + AI

A safe, educational IoT demonstration: Arduino samples an analog input, sends a newline-delimited JSON reading over UART to an ESP32, the ESP32 forwards it over Wi-Fi to a FastAPI backend, and a React dashboard displays the measurement and an optional AI-generated explanation.

## Architecture

`Arduino Uno (A0)` → UART → `ESP32 (3.3 V logic)` → Wi-Fi/HTTP → `FastAPI` → optional AI provider → `React dashboard`

The dashboard always distinguishes the raw measurement from the generated explanation. Without AI credentials, the backend returns a clearly labelled local rule-based explanation. It never pretends that fallback text came from an AI model.

## Hardware assumptions

- Arduino Uno R3 (or compatible 5 V Arduino).
- ESP32 development board with Wi-Fi.
- A potentiometer wired as a low-voltage analog test input: one outer pin to Arduino 5 V, the other to GND, wiper to A0. Alternatively connect a compatible 0–5 V analog sensor only after checking its output range.
- USB power for each board and jumper wires.
- Common ground between boards.

**Important 5 V / 3.3 V UART warning:** Arduino Uno TX is 5 V logic; ESP32 RX is not 5 V tolerant. Use a resistor divider or a proper level shifter on Arduino TX → ESP32 RX. ESP32 TX (3.3 V) can generally be read by the Uno RX. Connect grounds together. Verify the pinout of your exact boards before wiring.

This first build is a low-voltage measurement demo. Do not connect mains voltage, high-current loads, motors, heaters, or safety-critical equipment.

## Repository layout

- `firmware/arduino_sender/arduino_sender.ino` — reads A0 and sends JSON over Serial1-style UART pins (configurable).
- `firmware/esp32_gateway/esp32_gateway.ino` — receives newline JSON and posts it to the backend.
- `backend/main.py` — validated API, health route, telemetry ingestion, and optional AI-compatible endpoint.
- `dashboard/` — responsive React/Vite dashboard.

## Start the backend

From this directory:

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend binds to all interfaces for LAN access. Use your computer's LAN IP in the ESP32 firmware, not `localhost`. Keep the backend on a trusted private network during this demo.

## Start the dashboard

```bash
cd dashboard
npm install
npm run dev -- --host 0.0.0.0
```

Set `VITE_API_BASE_URL` to the backend URL if it is not running on `http://localhost:8000`.

## Configure AI (optional)

The AI call is server-side only. Configure `AI_API_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` in backend `.env` for an OpenAI-compatible chat-completions endpoint. Never put the API key in Arduino firmware, ESP32 firmware, browser code, Git, screenshots, or logs. Without these settings, the backend clearly reports `local_rules` as its explanation source.

## Test without hardware

```bash
curl -X POST http://localhost:8000/api/telemetry \
  -H 'Content-Type: application/json' \
  -d '{"device_id":"demo-arduino","sequence":1,"raw_adc":512,"voltage":2.50,"source":"simulator"}'
```

Open the dashboard and select **Send test reading**. The API accepts simulator readings explicitly; the UI labels them as simulated.

## Flashing and wiring sequence

1. Confirm the exact Arduino and ESP32 board variants.
2. Wire potentiometer wiper to Arduino A0; outer pins to 5 V and GND.
3. Connect Arduino GND and ESP32 GND.
4. Place a level shifter/resistor divider between Arduino TX and ESP32 RX.
5. Connect Arduino TX to ESP32 RX (default GPIO 16) through the divider; connect ESP32 TX (default GPIO 17) to Arduino RX if needed.
6. Upload Arduino firmware and check its serial output.
7. Upload ESP32 firmware after setting Wi-Fi name/password and backend LAN URL locally in the sketch. Do not commit real credentials.
8. Start backend and dashboard, then confirm a live reading appears.

The exact UART pins and serial peripheral availability vary by board. Check your board's pinout and choose a UART that does not conflict with USB programming.

## API

- `GET /health` — service status.
- `GET /api/latest` — most recent reading.
- `GET /api/history?limit=50` — recent readings.
- `POST /api/telemetry` — validated telemetry ingestion.
- `POST /api/explain` — request a fresh explanation for the latest reading.

## Video integrity checklist

- Film the actual board and wiring you used.
- Show the raw ADC/voltage reading separately from AI interpretation.
- Do not call the fallback explanation “AI”.
- Show a real end-to-end test before claiming it works.
- Blur Wi-Fi credentials, tokens, private IPs if desired, and any personal information.
- Mention that the analog input demo is a controlled educational signal, not a calibrated scientific instrument.
