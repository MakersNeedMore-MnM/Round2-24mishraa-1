import io
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_action_plan_api():
    response = client.get("/api/action-plan?crop=Cotton&crop_stage=Vegetative&weather_risk=Heavy%20Rain")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    actions = data["data"]
    assert len(actions) >= 3
    # Check that heavy rain triggered clear drainage channels action
    titles = [a["title"] for a in actions]
    assert any("Drainage" in t for t in titles)

def test_followup_compare_api():
    from PIL import Image
    image = Image.new('RGB', (100, 100))
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()

    response = client.post(
        "/api/follow-up/compare",
        files={"file": ("followup.jpg", img_byte_arr, "image/jpeg")},
        data={"previous_affected_pct": "40.0"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    res = data["data"]
    assert "status" in res
    assert "change_pct" in res
    assert res["status"] in ["IMPROVING", "STABLE", "WORSENING"]
