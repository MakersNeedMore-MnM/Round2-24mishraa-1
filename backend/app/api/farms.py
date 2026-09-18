"""
KISANIQ Backend — Farm API Routes
"""
from fastapi import APIRouter, HTTPException
from app.schemas.schemas import APIResponse, ErrorDetail, FarmCreate
from app.services.farm_service import FarmService
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["farms"])


@router.post("/farms", response_model=APIResponse)
async def create_farm(farm: FarmCreate):
    """Create a new farm profile."""
    try:
        result = await FarmService.create_farm(farm)
        return APIResponse(success=True, data=result.model_dump())
    except ConnectionError as e:
        raise HTTPException(
            status_code=503,
            detail=APIResponse(
                success=False,
                error=ErrorDetail(
                    code="DATABASE_NOT_CONFIGURED",
                    message=str(e),
                ),
            ).model_dump(),
        )
    except Exception as e:
        logger.error(f"Farm creation failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=APIResponse(
                success=False,
                error=ErrorDetail(
                    code="FARM_CREATION_FAILED",
                    message="Could not create farm. Please try again.",
                ),
            ).model_dump(),
        )


@router.get("/farms/{farm_id}", response_model=APIResponse)
async def get_farm(farm_id: str):
    """Get a farm profile by ID."""
    try:
        result = await FarmService.get_farm(farm_id)
        if result is None:
            raise HTTPException(
                status_code=404,
                detail=APIResponse(
                    success=False,
                    error=ErrorDetail(
                        code="FARM_NOT_FOUND",
                        message=f"Farm with ID {farm_id} not found.",
                    ),
                ).model_dump(),
            )
        return APIResponse(success=True, data=result.model_dump())
    except HTTPException:
        raise
    except ConnectionError as e:
        raise HTTPException(
            status_code=503,
            detail=APIResponse(
                success=False,
                error=ErrorDetail(
                    code="DATABASE_NOT_CONFIGURED",
                    message=str(e),
                ),
            ).model_dump(),
        )
    except Exception as e:
        logger.error(f"Farm retrieval failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=APIResponse(
                success=False,
                error=ErrorDetail(
                    code="FARM_RETRIEVAL_FAILED",
                    message="Could not retrieve farm. Please try again.",
                ),
            ).model_dump(),
        )
