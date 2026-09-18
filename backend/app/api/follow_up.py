"""
KISANIQ Backend — Follow-Up API Routes
"""
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from app.schemas.schemas import APIResponse, ErrorDetail
from app.services.followup_service import FollowUpEngine
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/follow-up", tags=["follow-up"])

@router.post("/compare", response_model=APIResponse)
async def compare_followup(
    file: UploadFile = File(...),
    previous_affected_pct: float = Form(35.0),
):
    """
    Upload a follow-up leaf photo to compare against baseline affected area.
    """
    if not file.content_type.startswith("image/"):
        return JSONResponse(
            status_code=400,
            content=APIResponse(
                success=False,
                error=ErrorDetail(code="INVALID_FILE", message="File must be an image.")
            ).model_dump()
        )

    try:
        # Simulate ML vision segmentation of current affected area %
        # (In real deployment, vision model calculates leaf mask)
        import random
        current_affected_pct = round(max(5.0, previous_affected_pct - random.uniform(10.0, 25.0)), 1)
        
        res = FollowUpEngine.compare_scans(previous_affected_pct, current_affected_pct)
        return APIResponse(success=True, data=res)
    except Exception as e:
        logger.error(f"Follow-up comparison failed: {e}")
        return JSONResponse(
            status_code=500,
            content=APIResponse(
                success=False,
                error=ErrorDetail(code="FOLLOWUP_ERROR", message=str(e))
            ).model_dump()
        )
