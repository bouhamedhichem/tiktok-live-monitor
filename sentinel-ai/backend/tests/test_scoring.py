from app import Telemetry, score

def make(**overrides):
    values = dict(machine_external_id="M-01", temperature=45, vibration=2, pressure=100, energy=4)
    values.update(overrides)
    return Telemetry(**values)

def test_normal_telemetry():
    assert score(make()) == (0.0, "normal")

def test_high_temperature_critical():
    value, severity = score(make(temperature=110))
    assert value >= 0.75
    assert severity == "critical"

def test_warning_threshold():
    value, severity = score(make(temperature=90))
    assert value >= 0.3
    assert severity == "warning"
