from fastapi.testclient import TestClient
from main import app, history

client = TestClient(app)


def setup_function():
    history.clear()


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_ingest_and_latest():
    payload = {
        "device_id": "test-uno",
        "sequence": 1,
        "raw_adc": 512,
        "voltage": 2.502,
        "source": "arduino",
    }
    response = client.post("/api/telemetry", json=payload)
    assert response.status_code == 200
    assert response.json()["accepted"] is True
    latest = client.get("/api/latest").json()["reading"]
    assert latest["device_id"] == "test-uno"
    assert latest["raw_adc"] == 512
    assert latest["explanation_source"] == "local_rules"


def test_reject_out_of_range_adc():
    payload = {
        "device_id": "test-uno",
        "sequence": 2,
        "raw_adc": 5000,
        "voltage": 2.5,
        "source": "arduino",
    }
    assert client.post("/api/telemetry", json=payload).status_code == 422


def test_reject_extra_fields():
    payload = {
        "device_id": "test-uno",
        "sequence": 3,
        "raw_adc": 10,
        "voltage": 0.05,
        "source": "arduino",
        "api_key": "should-not-be-accepted",
    }
    assert client.post("/api/telemetry", json=payload).status_code == 422


def test_explain_without_reading():
    response = client.post("/api/explain")
    assert response.status_code == 404
