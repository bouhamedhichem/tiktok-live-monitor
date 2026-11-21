from __future__ import annotations

import os
import time
from collections import deque
from typing import Literal

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict

APP_STARTED = time.time()
MAX_HISTORY = 200
history: deque[dict] = deque(maxlen=MAX_HISTORY)

app = FastAPI(title="CodeCram AIoT Lab API", version="1.0.0")
origins = [v.strip() for v in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if v.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class TelemetryIn(BaseModel):
    model_config = ConfigDict(extra="forbid")
    device_id: str = Field(min_length=1, max_length=64, pattern=r"^[a-zA-Z0-9_-]+$")
    sequence: int = Field(ge=0)
    raw_adc: int = Field(ge=0, le=4095)
    voltage: float = Field(ge=0, le=5.5)
    source: Literal["arduino", "esp32", "simulator"] = "arduino"


def explain_with_rules(reading: dict) -> str:
    adc = reading["raw_adc"]
    if adc < 300:
        return "The analog input is near the lower end of its range. Check the potentiometer position and wiring."
    if adc > 3800:
        return "The analog input is near the upper end of its range. Check the input voltage and wiring limits."
    return "The analog input is within the demo's middle range. This is a raw educational measurement, not a calibrated physical quantity."


async def ai_explanation(reading: dict) -> tuple[str, str]:
    base_url = os.getenv("AI_API_BASE_URL", "").strip()
    api_key = os.getenv("AI_API_KEY", "").strip()
    model = os.getenv("AI_MODEL", "").strip()
    if not (base_url and api_key and model):
        return explain_with_rules(reading), "local_rules"

    endpoint = base_url.rstrip("/")
    if not endpoint.endswith("/chat/completions"):
        endpoint += "/chat/completions"
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {
        "model": model,
        "temperature": 0.2,
        "messages": [
            {
                "role": "system",
                "content": (
                    "Explain this low-voltage educational analog input reading in one or two plain-English "
                    "sentences. Do not infer a real-world temperature, health state, or safety condition. "
                    "State uncertainty and remind the reader this is an uncalibrated ADC demo."
                ),
            },
            {"role": "user", "content": f"Raw ADC: {reading['raw_adc']}; reported voltage: {reading['voltage']:.3f} V."},
        ],
    }
    try:
        async with httpx.AsyncClient(timeout=12.0) as client:
            response = await client.post(endpoint, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
        content = data["choices"][0]["message"]["content"]
        if not isinstance(content, str) or not content.strip():
            raise ValueError("AI provider returned empty content")
        return content.strip()[:1000], "ai_provider"
    except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError):
        # Do not expose provider details or credentials to the browser.
        return explain_with_rules(reading), "local_rules_fallback"


@app.get("/health")
async def health():
    return {"status": "ok", "uptime_seconds": round(time.time() - APP_STARTED, 1)}


@app.post("/api/telemetry")
async def ingest(payload: TelemetryIn):
    record = payload.model_dump()
    record["received_at"] = time.time()
    record["explanation"] = explain_with_rules(record)
    record["explanation_source"] = "local_rules"
    history.appendleft(record)
    return {"accepted": True, "reading": record}


@app.get("/api/latest")
async def latest():
    if not history:
        return {"reading": None}
    return {"reading": history[0]}


@app.get("/api/history")
async def get_history(limit: int = 50):
    if limit < 1 or limit > 200:
        raise HTTPException(status_code=400, detail="limit must be between 1 and 200")
    return {"items": list(history)[:limit]}


@app.post("/api/explain")
async def explain_latest():
    if not history:
        raise HTTPException(status_code=404, detail="No telemetry received yet")
    reading = history[0]
    explanation, source = await ai_explanation(reading)
    reading["explanation"] = explanation
    reading["explanation_source"] = source
    return {"explanation": explanation, "source": source, "reading": reading}
