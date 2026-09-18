"""
KISANIQ Backend — Weather Service
"""
import httpx
import logging
from typing import Optional, Any
from app.core.config import settings

logger = logging.getLogger(__name__)

class WeatherService:
    """Service to fetch weather data from OpenWeatherMap."""
    
    BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
    FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"
    
    @staticmethod
    async def get_current_weather(district: str, state: str) -> Optional[dict[str, Any]]:
        """Fetch current weather for a district."""
        if not settings.openweathermap_api_key:
            if settings.demo_mode:
                return WeatherService._get_demo_weather(district)
            else:
                logger.warning("Weather API key not configured and demo mode is off.")
                return None
                
        try:
            # For India, appending ,IN to the district usually works well
            query = f"{district},IN"
            
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    WeatherService.BASE_URL,
                    params={
                        "q": query,
                        "appid": settings.openweathermap_api_key,
                        "units": "metric"
                    },
                    timeout=10.0
                )
                
                if response.status_code != 200:
                    logger.error(f"OWM API error: {response.status_code} - {response.text}")
                    if settings.demo_mode:
                        return WeatherService._get_demo_weather(district)
                    return None
                    
                data = response.json()
                
                # Parse to a simplified structure matching our needs
                return {
                    "temperature": data.get("main", {}).get("temp", 0),
                    "humidity": data.get("main", {}).get("humidity", 0),
                    "wind_speed": data.get("wind", {}).get("speed", 0),
                    # OWM returns rain in mm for the last 1h or 3h
                    "rainfall": data.get("rain", {}).get("1h", 0) or data.get("rain", {}).get("3h", 0),
                    "description": data.get("weather", [{}])[0].get("description", "Unknown"),
                    "icon": data.get("weather", [{}])[0].get("icon", ""),
                    "raw_data": data
                }
                
        except Exception as e:
            logger.error(f"Error fetching weather: {e}")
            if settings.demo_mode:
                return WeatherService._get_demo_weather(district)
            return None

    @staticmethod
    async def get_forecast(district: str, state: str) -> Optional[list[dict[str, Any]]]:
        """Fetch 5-day forecast (every 3 hours) and simplify to daily max/min."""
        if not settings.openweathermap_api_key:
            if settings.demo_mode:
                return WeatherService._get_demo_forecast()
            return None
            
        try:
            query = f"{district},IN"
            
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    WeatherService.FORECAST_URL,
                    params={
                        "q": query,
                        "appid": settings.openweathermap_api_key,
                        "units": "metric"
                    },
                    timeout=10.0
                )
                
                if response.status_code != 200:
                    logger.error(f"OWM Forecast API error: {response.status_code} - {response.text}")
                    if settings.demo_mode:
                        return WeatherService._get_demo_forecast()
                    return None
                    
                data = response.json()
                
                # Group by day
                daily = {}
                for item in data.get("list", []):
                    # item["dt_txt"] looks like "2023-10-15 12:00:00"
                    date_str = item.get("dt_txt", "").split(" ")[0]
                    if not date_str:
                        continue
                        
                    temp = item.get("main", {}).get("temp", 0)
                    rain = item.get("rain", {}).get("3h", 0)
                    desc = item.get("weather", [{}])[0].get("description", "")
                    icon = item.get("weather", [{}])[0].get("icon", "")
                    
                    if date_str not in daily:
                        daily[date_str] = {
                            "date": date_str,
                            "temp_min": temp,
                            "temp_max": temp,
                            "rainfall": rain,
                            "description": desc,
                            "icon": icon
                        }
                    else:
                        daily[date_str]["temp_min"] = min(daily[date_str]["temp_min"], temp)
                        daily[date_str]["temp_max"] = max(daily[date_str]["temp_max"], temp)
                        daily[date_str]["rainfall"] += rain
                
                # Return list of daily forecasts (up to 5 days)
                forecasts = list(daily.values())[:5]
                return forecasts
                
        except Exception as e:
            logger.error(f"Error fetching forecast: {e}")
            if settings.demo_mode:
                return WeatherService._get_demo_forecast()
            return None

    @staticmethod
    def _get_demo_weather(district: str) -> dict[str, Any]:
        """Fallback demo weather when API is unavailable."""
        return {
            "temperature": 28.5,
            "humidity": 75,
            "wind_speed": 4.5,
            "rainfall": 12.0,
            "description": "moderate rain",
            "icon": "10d",
            "demo_fallback": True
        }
        
    @staticmethod
    def _get_demo_forecast() -> list[dict[str, Any]]:
        """Fallback demo forecast."""
        import datetime
        today = datetime.date.today()
        forecasts = []
        for i in range(1, 6):
            d = today + datetime.timedelta(days=i)
            forecasts.append({
                "date": d.isoformat(),
                "temp_min": 22.0 + i,
                "temp_max": 28.0 + i,
                "rainfall": 5.0 if i % 2 == 0 else 0.0,
                "description": "light rain" if i % 2 == 0 else "clear sky",
                "icon": "10d" if i % 2 == 0 else "01d"
            })
        return forecasts
