"""
KISANIQ Backend — Weather API Routes
"""
from fastapi import APIRouter, HTTPException, Query
from app.schemas.schemas import APIResponse, ErrorDetail, WeatherResponse
from app.services.weather_service import WeatherService
from app.services.risk_engine import RiskEngine
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["weather"])

@router.get("/weather", response_model=APIResponse)
async def get_weather(
    state: str = Query(..., description="State of the farm"),
    district: str = Query(..., description="District of the farm")
):
    """
    Get current weather, 5-day forecast, and agricultural risk alerts for a location.
    """
    try:
        # Fetch data
        current = await WeatherService.get_current_weather(district, state)
        forecast = await WeatherService.get_forecast(district, state)
        
        if not current:
            raise HTTPException(
                status_code=503,
                detail=APIResponse(
                    success=False,
                    error=ErrorDetail(
                        code="WEATHER_UNAVAILABLE",
                        message="Could not retrieve weather data at this time."
                    ),
                ).model_dump(),
            )
            
        # Convert weather to risk alerts
        alerts = RiskEngine.generate_alerts(current, forecast)
        
        # Assemble response
        weather_response = WeatherResponse(
            temperature=current["temperature"],
            humidity=current["humidity"],
            wind_speed=current["wind_speed"],
            rainfall=current["rainfall"],
            description=current["description"],
            icon=current.get("icon"),
            risk_alerts=alerts,
            forecast=forecast
        )
        
        return APIResponse(success=True, data=weather_response.model_dump())
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Weather API failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=APIResponse(
                success=False,
                error=ErrorDetail(
                    code="WEATHER_ERROR",
                    message="An unexpected error occurred while fetching weather."
                ),
            ).model_dump(),
        )
