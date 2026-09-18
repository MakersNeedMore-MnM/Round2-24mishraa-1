"""
KISANIQ Backend — Disease Service
"""
import logging
from typing import Any
from app.ml.disease_model import disease_model
from app.schemas.schemas import DiseaseAnalysisResult, DiseasePrediction

logger = logging.getLogger(__name__)

# Basic dictionary of treatments for some known diseases to enrich the ML output.
# In a full production system, this would be in the database.
DISEASE_INFO = {
    "Tomato___Late_blight": {
        "description": "Late blight is a potentially devastating disease of tomato, infecting leaves, stems, and fruits.",
        "treatment": "Apply fungicides like Chlorothalonil or Mancozeb. Destroy infected plants immediately.",
    },
    "Tomato___Early_blight": {
        "description": "Early blight causes 'bullseye' patterned spots on lower leaves.",
        "treatment": "Ensure good air circulation. Apply copper-based fungicides or protectants.",
    },
    "Potato___Late_blight": {
        "description": "Late blight causes water-soaked spots on leaves and can rot tubers.",
        "treatment": "Apply systemic fungicides. Do not leave infected tubers in the field.",
    },
    "Corn_(maize)___Common_rust_": {
        "description": "Common rust produces rust-colored pustules on both surfaces of the leaf.",
        "treatment": "Plant resistant hybrids. Apply foliar fungicides if disease is severe early in season.",
    }
}

class DiseaseService:
    """Orchestrates disease detection logic."""

    @staticmethod
    def analyze_image(image_bytes: bytes) -> DiseaseAnalysisResult:
        """
        Run inference and format the result.
        """
        # Run ML model
        predictions_raw = disease_model.predict(image_bytes)
        
        # Format predictions
        predictions = []
        for p in predictions_raw:
            predictions.append(DiseasePrediction(
                disease_name=p["class"],
                confidence=p["confidence"],
                is_healthy=p["is_healthy"]
            ))

        # Get primary prediction
        primary = predictions[0]
        
        # Enrich with treatment info if available
        description = "This crop appears to be healthy." if primary.is_healthy else "Disease detected. Monitor closely."
        treatment = "No action required." if primary.is_healthy else "Consult local agricultural extension for specific chemical controls."
        
        if primary.disease_name in DISEASE_INFO:
            info = DISEASE_INFO[primary.disease_name]
            description = info["description"]
            treatment = info["treatment"]

        return DiseaseAnalysisResult(
            predictions=predictions,
            primary_diagnosis=primary.disease_name,
            description=description,
            recommended_treatment=treatment
        )
