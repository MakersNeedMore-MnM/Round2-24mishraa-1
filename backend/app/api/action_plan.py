"""
KISANIQ Backend — Action Plan API Routes
"""
from fastapi import APIRouter, Query
from app.schemas.schemas import APIResponse
from app.services.action_service import ActionPlanEngine
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/action-plan", tags=["action-plan"])

@router.get("", response_model=APIResponse)
async def get_action_plan(
    crop: str = Query("Cotton"),
    crop_stage: str = Query("Vegetative"),
    disease_name: str = Query(None),
    weather_risk: str = Query(None)
):
    """
    Get customized action plan for current crop conditions.
    """
    actions = ActionPlanEngine.generate_plan(
        crop=crop,
        crop_stage=crop_stage,
        disease_name=disease_name,
        weather_risk=weather_risk
    )
    return APIResponse(success=True, data=actions)
