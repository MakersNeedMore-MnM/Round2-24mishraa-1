"""
KISANIQ Backend — ML Disease Model
"""
import io
import logging
import random
from typing import Any
from PIL import Image

logger = logging.getLogger(__name__)

# Mock PlantVillage Classes
PLANT_VILLAGE_CLASSES = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_", 
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy",
    "Grape___Black_rot", "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold", 
    "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
]

class DiseaseModel:
    """
    Wrapper for PyTorch disease classification model.
    Falls back to mock inference if model weights are unavailable.
    """
    def __init__(self, model_path: str = "models/mobilenetv2_plantvillage.pth"):
        self.model_path = model_path
        self.is_loaded = False
        self.model = None
        self.transform = None
        self._load_model()

    def _load_model(self):
        try:
            import torch
            import torchvision.transforms as transforms
            import torchvision.models as models
            import os

            # Standard ImageNet transforms
            self.transform = transforms.Compose([
                transforms.Resize(256),
                transforms.CenterCrop(224),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
            ])

            if os.path.exists(self.model_path):
                # Load actual model
                self.model = models.mobilenet_v2(pretrained=False)
                # Adjust classifier for our number of classes
                self.model.classifier[1] = torch.nn.Linear(self.model.last_channel, len(PLANT_VILLAGE_CLASSES))
                self.model.load_state_dict(torch.load(self.model_path, map_location=torch.device('cpu')))
                self.model.eval()
                self.is_loaded = True
                logger.info("Successfully loaded ML model for disease detection.")
            else:
                logger.warning(f"Model file not found at {self.model_path}. Using mock inference mode.")
        except ImportError:
            logger.warning("torch or torchvision not installed. Using mock inference mode.")
        except Exception as e:
            logger.error(f"Error loading model: {e}")

    def predict(self, image_bytes: bytes) -> list[dict[str, Any]]:
        """
        Run inference on the given image bytes.
        Returns top 3 predictions.
        """
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        except Exception as e:
            logger.error(f"Invalid image: {e}")
            raise ValueError("Invalid image data")

        if self.is_loaded and self.model and self.transform:
            return self._predict_real(image)
        else:
            return self._predict_mock()

    def _predict_real(self, image: Image.Image) -> list[dict[str, Any]]:
        import torch
        import torch.nn.functional as F
        
        input_tensor = self.transform(image)
        input_batch = input_tensor.unsqueeze(0) # create a mini-batch as expected by the model

        with torch.no_grad():
            output = self.model(input_batch)
        
        # Get probabilities
        probabilities = F.softmax(output[0], dim=0)
        
        # Get top 3
        top3_prob, top3_catid = torch.topk(probabilities, 3)
        
        results = []
        for i in range(top3_prob.size(0)):
            idx = top3_catid[i].item()
            prob = top3_prob[i].item()
            # Safety check
            if idx < len(PLANT_VILLAGE_CLASSES):
                class_name = PLANT_VILLAGE_CLASSES[idx]
                results.append({
                    "class": class_name,
                    "confidence": float(prob),
                    "is_healthy": "healthy" in class_name.lower()
                })
        
        return results

    def _predict_mock(self) -> list[dict[str, Any]]:
        """Mock inference for development/demo when no model is available."""
        # Randomly select a disease or healthy
        target = random.choice(PLANT_VILLAGE_CLASSES)
        # 1 high confidence, 2 low confidence
        other1 = random.choice([c for c in PLANT_VILLAGE_CLASSES if c != target])
        other2 = random.choice([c for c in PLANT_VILLAGE_CLASSES if c != target and c != other1])
        
        conf = random.uniform(0.75, 0.98)
        
        return [
            {
                "class": target,
                "confidence": conf,
                "is_healthy": "healthy" in target.lower()
            },
            {
                "class": other1,
                "confidence": (1 - conf) * 0.7,
                "is_healthy": "healthy" in other1.lower()
            },
            {
                "class": other2,
                "confidence": (1 - conf) * 0.3,
                "is_healthy": "healthy" in other2.lower()
            }
        ]

# Singleton instance
disease_model = DiseaseModel()
