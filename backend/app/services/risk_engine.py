"""
KISANIQ Backend — Risk Engine (Weather -> Farming Decision)
"""
from typing import Any, Optional

class RiskEngine:
    """Evaluates agricultural risk based on weather and farm context."""

    @staticmethod
    def generate_alerts(weather_data: dict[str, Any], forecast_data: Optional[list[dict[str, Any]]] = None) -> list[dict[str, Any]]:
        """
        Generate risk alerts from current weather and forecast.
        Converts generic weather data into actionable agricultural intelligence.
        """
        alerts = []
        
        if not weather_data:
            return alerts
            
        temp = weather_data.get("temperature", 0)
        humidity = weather_data.get("humidity", 0)
        wind = weather_data.get("wind_speed", 0)
        rainfall = weather_data.get("rainfall", 0)
        
        # 1. High Heat Risk
        if temp >= 35:
            alerts.append({
                "type": "High Heat",
                "severity": "high",
                "message": "Potential heat stress for crop.",
                "actions": [
                    "Review irrigation requirements immediately.",
                    "Avoid applying fertilizers during peak heat.",
                    "Monitor crop for wilting or sunburn."
                ]
            })
        elif temp >= 32:
            alerts.append({
                "type": "Elevated Heat",
                "severity": "moderate",
                "message": "Temperatures are higher than normal.",
                "actions": [
                    "Ensure adequate soil moisture.",
                    "Avoid unnecessary field activity during midday."
                ]
            })
            
        # 2. Heavy Rain / Waterlogging
        # 10mm in 1-3 hours is significant
        if rainfall > 10:
            alerts.append({
                "type": "Heavy Rain",
                "severity": "high",
                "message": "Possible waterlogging and soil erosion risk.",
                "actions": [
                    "Inspect field drainage systems.",
                    "Avoid unnecessary irrigation.",
                    "Do not apply foliar sprays until leaves dry."
                ]
            })
        elif rainfall > 0:
            alerts.append({
                "type": "Rain",
                "severity": "low",
                "message": "Recent rainfall detected.",
                "actions": [
                    "Pause scheduled irrigation.",
                    "Monitor for increased disease pressure due to moisture."
                ]
            })
            
        # 3. High Humidity & Disease Risk
        if humidity > 85 and temp > 20 and temp < 30:
            alerts.append({
                "type": "Fungal Disease Risk",
                "severity": "moderate",
                "message": "High humidity and warm temperatures create ideal conditions for fungal diseases.",
                "actions": [
                    "Inspect crop closely for early disease symptoms.",
                    "Improve air circulation if possible.",
                    "Consider preventive fungicide if history of disease exists."
                ]
            })
            
        # 4. Strong Wind
        # OWM wind speed is in m/s. > 10 m/s is ~36 km/h
        if wind > 10:
            alerts.append({
                "type": "Strong Wind",
                "severity": "moderate",
                "message": "High wind speeds detected.",
                "actions": [
                    "Inspect crop for lodging (bending over) damage.",
                    "Check vulnerable plants or support structures.",
                    "Do not spray chemicals."
                ]
            })
            
        # 5. Forecast-based risks (Dry Spell)
        if forecast_data:
            total_forecast_rain = sum(f.get("rainfall", 0) for f in forecast_data)
            max_forecast_temp = max((f.get("temp_max", 0) for f in forecast_data), default=temp)
            
            if total_forecast_rain == 0 and max_forecast_temp > 30 and rainfall == 0:
                alerts.append({
                    "type": "Dry Spell",
                    "severity": "moderate",
                    "message": "No rain expected with high temperatures over the next 5 days.",
                    "actions": [
                        "Plan irrigation schedule proactively.",
                        "Monitor soil moisture closely."
                    ]
                })

        # Default "All clear" if no alerts
        if not alerts:
            alerts.append({
                "type": "Weather Favorable",
                "severity": "low",
                "message": "Current weather conditions are favorable.",
                "actions": [
                    "Continue normal farm operations."
                ]
            })
            
        return alerts
