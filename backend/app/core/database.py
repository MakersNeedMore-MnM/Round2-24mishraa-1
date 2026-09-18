"""
KISANIQ Backend — Database Client (Supabase)
"""
from supabase import create_client, Client
from app.core.config import settings
from typing import Optional
import logging

logger = logging.getLogger(__name__)

_supabase_client: Optional[Client] = None


def get_supabase() -> Optional[Client]:
    """Get or create the Supabase client. Returns None if not configured."""
    global _supabase_client

    if _supabase_client is not None:
        return _supabase_client

    if not settings.supabase_url or not settings.supabase_service_key:
        logger.warning(
            "Supabase credentials not configured. "
            "Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env"
        )
        return None

    try:
        _supabase_client = create_client(
            settings.supabase_url,
            settings.supabase_service_key,
        )
        logger.info("Supabase client initialized successfully.")
        return _supabase_client
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
        return None
