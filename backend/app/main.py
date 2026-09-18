"""
KISANIQ Backend — FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.farms import router as farms_router
from app.api.weather import router as weather_router
from app.api.disease import router as disease_router
from app.api.recommendation import router as recommendation_router
from app.api.action_plan import router as action_plan_router
from app.api.follow_up import router as followup_router
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="KISANIQ API",
    description="AI-Powered Farmer Decision Support System",
    version="0.1.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(farms_router)
app.include_router(weather_router)
app.include_router(disease_router)
app.include_router(recommendation_router)
app.include_router(action_plan_router)
app.include_router(followup_router)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "success": True,
        "data": {
            "status": "healthy",
            "service": "kisaniq-api",
            "version": "0.1.0",
        },
        "error": None,
    }


@app.on_event("startup")
async def startup():
    logger.info("KISANIQ API starting up...")
    logger.info(f"CORS origins: {settings.cors_origin_list}")
    logger.info(f"Demo mode: {settings.demo_mode}")
    if not settings.supabase_url:
        logger.warning("SUPABASE_URL not set — database features will be unavailable.")
    if not settings.openweathermap_api_key:
        logger.warning("OPENWEATHERMAP_API_KEY not set — weather features will be unavailable.")
