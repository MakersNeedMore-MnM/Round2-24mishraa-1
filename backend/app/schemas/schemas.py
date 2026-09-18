"""
KISANIQ Backend — Pydantic Schemas
"""
from pydantic import BaseModel, Field
from typing import Optional, Any, List
from datetime import datetime


# ── Standard API Response ──────────────────────────
class ErrorDetail(BaseModel):
    code: str
    message: str


class APIResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    error: Optional[ErrorDetail] = None


# ── Farm ───────────────────────────────────────────
class FarmCreate(BaseModel):
    farmer_name: Optional[str] = Field(None, max_length=100)
    state: str = Field(..., min_length=1, max_length=100)
    district: str = Field(..., min_length=1, max_length=100)
    crop: str = Field(..., min_length=1, max_length=100)
    crop_stage: str = Field(..., min_length=1, max_length=50)
    soil_type: str = Field(..., min_length=1, max_length=50)
    water_availability: str = Field(..., min_length=1, max_length=20)
    nitrogen: Optional[float] = Field(None, ge=0, le=500)
    phosphorus: Optional[float] = Field(None, ge=0, le=500)
    potassium: Optional[float] = Field(None, ge=0, le=500)
    ph: Optional[float] = Field(None, ge=0, le=14)


class FarmResponse(BaseModel):
    id: str
    farmer_name: Optional[str] = None
    state: str
    district: str
    crop: str
    crop_stage: str
    soil_type: str
    water_availability: str
    nitrogen: Optional[float] = None
    phosphorus: Optional[float] = None
    potassium: Optional[float] = None
    ph: Optional[float] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


# ── Disease Analysis ───────────────────────────────
class DiseaseAnalysisResponse(BaseModel):
    id: str
    farm_id: str
    image_url: Optional[str] = None
    disease_name: str
    confidence: float
    severity: str
    affected_area_pct: float
    explanation: str
    recommended_actions: list[str]
    prevention_steps: list[str]
    disclaimer: str
    created_at: Optional[str] = None


# ── Follow-up ─────────────────────────────────────
class FollowUpResponse(BaseModel):
    id: str
    original_analysis_id: str
    farm_id: str
    image_url: Optional[str] = None
    previous_affected_pct: float
    current_affected_pct: float
    change_pct: float
    status: str
    created_at: Optional[str] = None


# ── Crop Recommendation ──────────────────────────
class CropRecommendationRequest(BaseModel):
    state: str
    district: str
    soil_type: str
    water_availability: str
    crop: Optional[str] = None
    season: Optional[str] = None


class CropRecommendationFactor(BaseModel):
    name: str
    score: float
    status: str  # "good", "moderate", "poor"
    detail: str


class CropRecommendationResponse(BaseModel):
    recommended_crop: str
    suitability_score: float
    risk_level: str
    explanation: str
    factors: list[CropRecommendationFactor]


# ── Weather ───────────────────────────────────────
class WeatherResponse(BaseModel):
    temperature: float
    humidity: float
    wind_speed: float
    rainfall: float
    description: str
    icon: Optional[str] = None
    risk_alerts: list[dict[str, Any]]
    forecast: Optional[list[dict[str, Any]]] = None

# ── Disease Schemas ───────────────────────────────

class DiseasePrediction(BaseModel):
    disease_name: str
    confidence: float
    is_healthy: bool

class DiseaseAnalysisResult(BaseModel):
    predictions: List[DiseasePrediction]
    primary_diagnosis: str
    description: str
    recommended_treatment: str
