from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_crop_recommendation_post():
    payload = {
        "state": "Maharashtra",
        "district": "Nagpur",
        "soil_type": "Black",
        "water_availability": "Moderate",
        "crop": "Cotton",
        "season": "Kharif"
    }
    response = client.post("/api/recommendation", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    res = data["data"]
    assert res["recommended_crop"] == "Cotton"
    assert res["suitability_score"] >= 80.0
    assert res["risk_level"] == "Low"
    assert len(res["factors"]) == 3

def test_crop_recommendation_high_risk():
    payload = {
        "state": "Rajasthan",
        "district": "Jaisalmer",
        "soil_type": "Sandy",
        "water_availability": "Low",
        "crop": "Rice",
        "season": "Kharif"
    }
    response = client.post("/api/recommendation", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    res = data["data"]
    assert res["recommended_crop"] == "Rice"
    assert res["risk_level"] in ["Moderate", "High"]
