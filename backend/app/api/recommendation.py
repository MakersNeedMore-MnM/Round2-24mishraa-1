"""
KISANIQ Backend — Crop Recommendation API
"""
from fastapi import APIRouter, HTTPException, Query
from app.schemas.schemas import (
    APIResponse,
    ErrorDetail,
    CropRecommendationRequest,
)
from app.services.recommendation_service import RecommendationEngine
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/recommendation", tags=["recommendation"])

@router.post("", response_model=APIResponse)
async def get_crop_recommendation(req: CropRecommendationRequest):
    """
    Get crop suitability recommendation based on soil, water, season, and region.
    """
    try:
        res = RecommendationEngine.evaluate(req)
        return APIResponse(success=True, data=res.model_dump())
    except Exception as e:
        logger.error(f"Crop recommendation failed: {e}")
        return APIResponse(
            success=False,
            error=ErrorDetail(code="RECOMMENDATION_ERROR", message=str(e))
        )

@router.get("", response_model=APIResponse)
async def get_recommendation_by_params(
    state: str = Query(...),
    district: str = Query(...),
    soil_type: str = Query(...),
    water_availability: str = Query(...),
    crop: str = Query(None),
    season: str = Query(None)
):
    """
    GET query parameter wrapper for crop recommendation.
    """
    req = CropRecommendationRequest(
        state=state,
        district=district,
        soil_type=soil_type,
        water_availability=water_availability,
        crop=crop,
        season=season
    )
    return await get_crop_recommendation(req)
