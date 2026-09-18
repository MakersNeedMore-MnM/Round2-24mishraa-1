"""
KISANIQ Backend — Farm Service
"""
from app.core.database import get_supabase
from app.schemas.schemas import FarmCreate, FarmResponse
from typing import Optional
import uuid
import logging
from datetime import datetime, timezone

logger = logging.getLogger(__name__)


class FarmService:
    """Service for farm CRUD operations."""

    @staticmethod
    async def create_farm(farm_data: FarmCreate) -> FarmResponse:
        """Create a new farm profile in Supabase."""
        db = get_supabase()
        if db is None:
            raise ConnectionError(
                "Database not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY."
            )

        farm_id = str(uuid.uuid4())
        now = datetime.now(timezone.utc).isoformat()

        record = {
            "id": farm_id,
            "farmer_name": farm_data.farmer_name,
            "state": farm_data.state,
            "district": farm_data.district,
            "crop": farm_data.crop,
            "crop_stage": farm_data.crop_stage,
            "soil_type": farm_data.soil_type,
            "water_availability": farm_data.water_availability,
            "nitrogen": farm_data.nitrogen,
            "phosphorus": farm_data.phosphorus,
            "potassium": farm_data.potassium,
            "ph": farm_data.ph,
            "created_at": now,
            "updated_at": now,
        }

        try:
            result = db.table("farms").insert(record).execute()
            inserted = result.data[0] if result.data else record
            return FarmResponse(**inserted)
        except Exception as e:
            logger.error(f"Failed to create farm: {e}")
            raise

    @staticmethod
    async def get_farm(farm_id: str) -> Optional[FarmResponse]:
        """Get a farm by ID from Supabase."""
        db = get_supabase()
        if db is None:
            raise ConnectionError(
                "Database not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY."
            )

        try:
            result = (
                db.table("farms")
                .select("*")
                .eq("id", farm_id)
                .execute()
            )
            if result.data and len(result.data) > 0:
                return FarmResponse(**result.data[0])
            return None
        except Exception as e:
            logger.error(f"Failed to get farm: {e}")
            raise
