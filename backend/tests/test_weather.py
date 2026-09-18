import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.risk_engine import RiskEngine

client = TestClient(app)

def test_risk_engine_heavy_rain():
    weather_data = {
        "temperature": 25,
        "humidity": 80,
        "wind_speed": 5,
        "rainfall": 15
    }
    alerts = RiskEngine.generate_alerts(weather_data, [])
    # Should have Heavy Rain risk
    alert_types = [a["type"] for a in alerts]
    assert "Heavy Rain" in alert_types

def test_risk_engine_high_heat():
    weather_data = {
        "temperature": 38,
        "humidity": 40,
        "wind_speed": 2,
        "rainfall": 0
    }
    alerts = RiskEngine.generate_alerts(weather_data, [])
    alert_types = [a["type"] for a in alerts]
    assert "High Heat" in alert_types

def test_weather_api_demo_fallback(monkeypatch):
    # Enable demo mode explicitly in settings singleton
    from app.services.weather_service import settings
    monkeypatch.setattr(settings, "demo_mode", True)
    
    response = client.get("/api/weather?state=Maharashtra&district=Pune")
    
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    
    # Check that risk alerts are generated based on demo data (which has rainfall 12.0 -> Heavy Rain)
    alerts = data["data"]["risk_alerts"]
    assert any(a["type"] == "Heavy Rain" for a in alerts)
