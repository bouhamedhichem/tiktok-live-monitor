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
history: deque[dict] = deque(maxlen=200)
app = FastAPI(title="CodeCram AIoT Lab API", version="1.0.0")
origins = [v.strip() for v in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if v.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=False,
                   allow_methods=["GET", "POST"], allow_headers=["Content-Type"])

class TelemetryIn(BaseModel):
    model_config = ConfigDict(extra="forbid")
    device_id: str = Field(min_length=1, max_length=64, pattern=r"^[a-zA-Z0-9_-]+$")
    sequence: int = Field(ge=0)
    raw_adc: int = Field(ge=0, le=1023)
    voltage: float = Field(ge=0, le=5.1)
    source: Literal["arduino", "esp32", "simulator"] = "arduino"

def explain_with_rules(reading: dict) -> str:
    adc = reading["raw_adc"]
    if adc < 75:
        return "The analog input is near the lower end of its 10-bit range. Check the potentiometer position and wiring."
    if adc > 950:
        return "The analog input is near the upper end of its 10-bit range. Check the input voltage and wiring limits."
    return "The analog input is within the demo's middle range. This is a raw educational measurement, not a calibrated physical quantity."

async def ai_explanation(reading: dict) -> tuple[str, str]:
    base_url, api_key, model = (os.getenv(k, "").strip() for k in ("AI_API_BASE_URL", "AI_API_KEY", "AI_MODEL"))
    if not (base_url and api_key and model):
        return explain_with_rules(reading), "local_rules"
    endpoint = base_url.rstrip("/")
    if not endpoint.endswith("/chat/completions"):
        endpoint += "/chat/completions"
    payload = {"model": model, "temperature": 0.2, "messages": [
        {"role": "system", "content": "Explain this low-voltage educational analog input reading in one or two plain-English sentences. Do not infer a real-world temperature, health state, or safety condition. State uncertainty and remind the reader this is an uncalibrated ADC demo."},
        {"role": "user", "content": f"Raw ADC: {reading['raw_adc']}; reported voltage: {reading['voltage']:.3f} V."}
    ]}
    try:
        async with httpx.AsyncClient(timeout=12.0) as client:
            response = await client.post(endpoint, headers={"Authorization": f"Bearer {api_key}"}, json=payload)
            response.raise_for_status()
            content = response.json()["choices"][0]["message"]["content"]
        if not isinstance(content, str) or not content.strip():
            raise ValueError("Empty AI response")
        return content.strip()[:1000], "ai_provider"
    except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError):
        return explain_with_rules(reading), "local_rules_fallback"

@app.get("/health")
async def health():
    return {"status": "ok", "uptime_seconds": round(time.time() - APP_STARTED, 1)}

@app.post("/api/telemetry")
async def ingest(payload: TelemetryIn):
    record = payload.model_dump()
    record.update(received_at=time.time(), explanation=explain_with_rules(record), explanation_source="local_rules")
    history.appendleft(record)
    return {"accepted": True, "reading": record}

@app.get("/api/latest")
async def latest():
    return {"reading": history[0] if history else None}

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
    reading["explanation"], reading["explanation_source"] = explanation, source
    return {"explanation": explanation, "source": source, "reading": reading}
