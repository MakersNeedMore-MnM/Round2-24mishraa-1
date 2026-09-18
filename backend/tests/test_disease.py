import io
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_analyze_disease_invalid_file():
    # Send a text file instead of an image
    response = client.post(
        "/api/disease/analyze",
        files={"file": ("test.txt", b"not an image", "text/plain")}
    )
    assert response.status_code == 400
    data = response.json()
    assert data["success"] is False
    assert data["error"]["code"] == "INVALID_FILE"

def test_analyze_disease_valid_image():
    # Create a dummy image
    from PIL import Image
    image = Image.new('RGB', (100, 100))
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()

    response = client.post(
        "/api/disease/analyze",
        files={"file": ("test.jpg", img_byte_arr, "image/jpeg")}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    
    result = data["data"]
    assert "primary_diagnosis" in result
    assert "predictions" in result
    assert len(result["predictions"]) == 3
