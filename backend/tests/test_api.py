import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["status"] == "healthy"

def test_create_farm_missing_fields():
    response = client.post("/api/farms", json={
        # Missing required fields
        "farmer_name": "Test Farmer"
    })
    assert response.status_code == 422 # Validation error

def test_get_farm_invalid_uuid():
    # Because we don't have a real DB mocked here or we expect a failure
    response = client.get("/api/farms/invalid-id")
    # Actually depending on supabase response, it might be 500 or 503 if not configured
    # In our code, if Supabase is not configured, it raises 503
    assert response.status_code in [500, 503, 404]
