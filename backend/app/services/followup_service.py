"""
KISANIQ Backend — Follow-Up Monitoring Engine
"""
import logging
import random
from typing import Dict, Any

logger = logging.getLogger(__name__)

class FollowUpEngine:
    """Compares past disease diagnosis with follow-up scan to compute progress."""

    @staticmethod
    def compare_scans(
        previous_affected_pct: float,
        current_affected_pct: float
    ) -> Dict[str, Any]:
        change_pct = current_affected_pct - previous_affected_pct

        if change_pct <= -5.0:
            status = "IMPROVING"
            summary = "Great news! The disease infection area has reduced. Treatment is effective."
            recommendation = "Continue current treatment protocol and monitor weekly until full recovery."
        elif change_pct >= 5.0:
            status = "WORSENING"
            summary = "Warning: Disease infection has expanded despite treatment."
            recommendation = "Switch to systemic treatment or consult an agricultural extension officer immediately."
        else:
            status = "STABLE"
            summary = "Disease infection is stabilized and has not spread further."
            recommendation = "Maintain current sanitation practices and repeat protective spray if weather is humid."

        return {
            "previous_affected_pct": previous_affected_pct,
            "current_affected_pct": current_affected_pct,
            "change_pct": round(change_pct, 1),
            "status": status,
            "summary": summary,
            "recommendation": recommendation,
        }
