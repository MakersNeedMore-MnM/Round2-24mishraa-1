"""
KISANIQ Backend — Crop Recommendation Engine
"""
import logging
from typing import Optional, List, Dict, Any
from app.schemas.schemas import (
    CropRecommendationRequest,
    CropRecommendationResponse,
    CropRecommendationFactor,
)

logger = logging.getLogger(__name__)

# Agricultural suitability matrix for Indian regions and soil conditions
CROP_DATABASE: Dict[str, Dict[str, Any]] = {
    "Rice": {
        "soils": ["Clay", "Alluvial", "Loamy"],
        "water_min": "High",
        "seasons": ["Kharif", "Rainy"],
        "ideal_ph": (5.5, 7.5),
        "ideal_n": (80, 120),
        "description": "High water requirement cereal crop suitable for clayey and alluvial soils."
    },
    "Wheat": {
        "soils": ["Loamy", "Alluvial", "Clay Loam"],
        "water_min": "Moderate",
        "seasons": ["Rabi", "Winter"],
        "ideal_ph": (6.0, 7.5),
        "ideal_n": (100, 140),
        "description": "Staple rabi crop thriving in well-drained loamy soils under moderate irrigation."
    },
    "Cotton": {
        "soils": ["Black", "Alluvial", "Deep Loam"],
        "water_min": "Moderate",
        "seasons": ["Kharif"],
        "ideal_ph": (6.0, 8.0),
        "ideal_n": (60, 90),
        "description": "Commercial cash crop well-suited for black cotton soil with medium rainfall."
    },
    "Maize": {
        "soils": ["Loamy", "Alluvial", "Red"],
        "water_min": "Moderate",
        "seasons": ["Kharif", "Rabi"],
        "ideal_ph": (5.8, 7.2),
        "ideal_n": (75, 110),
        "description": "Versatile cereal crop requiring good soil drainage and sunny weather."
    },
    "Sugarcane": {
        "soils": ["Alluvial", "Black", "Loamy"],
        "water_min": "High",
        "seasons": ["Year-round", "Kharif"],
        "ideal_ph": (6.5, 7.5),
        "ideal_n": (150, 250),
        "description": "Long-duration cash crop requiring heavy irrigation and nutrient-rich soil."
    },
    "Groundnut": {
        "soils": ["Sandy", "Sandy Loam", "Red"],
        "water_min": "Low",
        "seasons": ["Kharif"],
        "ideal_ph": (6.0, 7.0),
        "ideal_n": (20, 40),
        "description": "Oilseed legume suitable for loose sandy loam soils and moderate rainfall."
    },
    "Pulses (Chickpea/Pigeonpea)": {
        "soils": ["Loamy", "Black", "Red"],
        "water_min": "Low",
        "seasons": ["Rabi", "Kharif"],
        "ideal_ph": (6.0, 7.5),
        "ideal_n": (15, 30),
        "description": "Low-water nitrogen-fixing pulse crop ideal for dryland farming."
    }
}

class RecommendationEngine:
    """Evaluates soil, water, season, and location to recommend optimal crops."""

    @staticmethod
    def evaluate(req: CropRecommendationRequest) -> CropRecommendationResponse:
        target_crop = req.crop if req.crop and req.crop in CROP_DATABASE else "Rice"
        
        # Calculate suitability for target crop
        crop_data = CROP_DATABASE.get(target_crop, CROP_DATABASE["Rice"])
        factors: List[CropRecommendationFactor] = []
        score = 100.0

        # 1. Soil Suitability
        soil_match = req.soil_type in crop_data["soils"] or any(s.lower() in req.soil_type.lower() for s in crop_data["soils"])
        if soil_match:
            factors.append(CropRecommendationFactor(
                name="Soil Compatibility",
                score=95.0,
                status="good",
                detail=f"{req.soil_type} soil is well-suited for {target_crop}."
            ))
        else:
            score -= 25.0
            factors.append(CropRecommendationFactor(
                name="Soil Compatibility",
                score=60.0,
                status="moderate",
                detail=f"{req.soil_type} soil is sub-optimal; requires organic amendments for {target_crop}."
            ))

        # 2. Water Availability
        water_req = crop_data["water_min"]
        if req.water_availability == water_req or (req.water_availability == "High" and water_req == "Moderate"):
            factors.append(CropRecommendationFactor(
                name="Water Availability",
                score=90.0,
                status="good",
                detail=f"Water availability ({req.water_availability}) meets {target_crop} requirements."
            ))
        elif req.water_availability == "Low" and water_req == "High":
            score -= 35.0
            factors.append(CropRecommendationFactor(
                name="Water Availability",
                score=40.0,
                status="poor",
                detail=f"High drought risk! {target_crop} requires high irrigation, but farm has Low water availability."
            ))
        else:
            score -= 15.0
            factors.append(CropRecommendationFactor(
                name="Water Availability",
                score=70.0,
                status="moderate",
                detail=f"Water supply is adequate but requires careful irrigation management."
            ))

        # 3. Regional / Season Match
        season_label = req.season if req.season else "Kharif"
        if season_label in crop_data["seasons"] or "Year-round" in crop_data["seasons"]:
            factors.append(CropRecommendationFactor(
                name="Seasonal Timing",
                score=95.0,
                status="good",
                detail=f"{season_label} season matches optimal sowing cycle for {target_crop}."
            ))
        else:
            score -= 20.0
            factors.append(CropRecommendationFactor(
                name="Seasonal Timing",
                score=65.0,
                status="moderate",
                detail=f"Off-season planting for {target_crop} in {season_label}; expect lower yield."
            ))

        # Final score clamping
        final_score = max(30.0, min(98.0, score))
        risk_level = "Low" if final_score >= 80 else ("Moderate" if final_score >= 60 else "High")
        
        explanation = f"{target_crop} has a suitability score of {round(final_score)}% in {req.district}, {req.state}. " + (
            "Soil and water conditions are favorable." if risk_level == "Low" else "Consider micro-irrigation or soil conditioning to mitigate risk."
        )

        return CropRecommendationResponse(
            recommended_crop=target_crop,
            suitability_score=final_score,
            risk_level=risk_level,
            explanation=explanation,
            factors=factors
        )
