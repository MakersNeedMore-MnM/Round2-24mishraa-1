"""
KISANIQ Backend — Action Plan Decision Engine
"""
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class ActionPlanEngine:
    """Generates context-aware, prioritized action steps for the farmer."""

    @staticmethod
    def generate_plan(
        crop: str,
        crop_stage: str,
        disease_name: str = None,
        weather_risk: str = None
    ) -> List[Dict[str, Any]]:
        actions = []

        # 1. Disease Mitigation (Highest Priority if active)
        if disease_name and "healthy" not in disease_name.lower():
            clean_disease = disease_name.replace("___", " — ").replace("_", " ")
            actions.append({
                "id": "act-1",
                "title": f"Foliar Treatment for {clean_disease}",
                "category": "Treatment",
                "priority": "high",
                "timeline": "Immediate (Next 24h)",
                "description": f"Isolate infected crops and apply targeted organic/chemical protectant for {clean_disease}. Avoid overhead spraying.",
            })
            actions.append({
                "id": "act-2",
                "title": "Prune & Dispose Affected Leaves",
                "category": "Sanitation",
                "priority": "high",
                "timeline": "Day 1-2",
                "description": "Carefully trim heavily diseased foliage using sterilized tools and burn/bury infected plant matter outside the field.",
            })

        # 2. Weather Risk Mitigations
        if weather_risk:
            if "Rain" in weather_risk or "Waterlogging" in weather_risk:
                actions.append({
                    "id": "act-w1",
                    "title": "Clear Field Drainage Channels",
                    "category": "Irrigation",
                    "priority": "high",
                    "timeline": "Immediate",
                    "description": "Inspect and unblock trench lines to prevent root-zone waterlogging from forecasted heavy rains.",
                })
            elif "Heat" in weather_risk or "Dry" in weather_risk:
                actions.append({
                    "id": "act-w2",
                    "title": "Early Morning Drip Irrigation & Soil Mulching",
                    "category": "Irrigation",
                    "priority": "high",
                    "timeline": "Daily (6 AM - 8 AM)",
                    "description": "Irrigate during cooler morning hours and apply straw mulch to conserve moisture against heatwave stress.",
                })

        # 3. Stage-based Routine Care
        actions.append({
            "id": "act-stage-1",
            "title": f"Stage Care: {crop_stage} Nutrient Application",
            "category": "Soil Care",
            "priority": "medium",
            "timeline": "This Week",
            "description": f"Apply split dose of nitrogen/potash suited for {crop}'s {crop_stage} growth phase.",
        })

        actions.append({
            "id": "act-prevent-1",
            "title": "Regular Bio-Pest Sentinel Inspection",
            "category": "Prevention",
            "priority": "low",
            "timeline": "Every 3 Days",
            "description": "Check under leaf surfaces for early aphid/mite clusters or fungal spots.",
        })

        return actions
