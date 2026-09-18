"""
KISANIQ Backend — Disease API Routes
"""
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from app.schemas.schemas import APIResponse, ErrorDetail, DiseaseAnalysisResult
from app.services.disease_service import DiseaseService
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/disease", tags=["disease"])

@router.post("/analyze", response_model=APIResponse)
async def analyze_disease(file: UploadFile = File(...)):
    """Analyze an uploaded leaf image for disease."""
    if not file.content_type.startswith("image/"):
        return JSONResponse(
            status_code=400,
            content=APIResponse(success=False, error=ErrorDetail(code="INVALID_FILE", message="File must be an image.")).model_dump()
        )
    try:
        image_bytes = await file.read()
        result: DiseaseAnalysisResult = DiseaseService.analyze_image(image_bytes)
        return APIResponse(success=True, data=result)
    except ValueError as e:
        return JSONResponse(
            status_code=400,
            content=APIResponse(success=False, error=ErrorDetail(code="INVALID_IMAGE", message=str(e))).model_dump()
        )
    except Exception as e:
        logger.error(f"Disease analysis failed: {e}")
        return JSONResponse(
            status_code=500,
            content=APIResponse(success=False, error=ErrorDetail(code="ANALYSIS_ERROR", message="An error occurred while analyzing the image.")).model_dump()
        )
