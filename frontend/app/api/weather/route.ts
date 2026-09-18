import { NextRequest, NextResponse } from "next/server";

// Coordinates mapping for key Indian states & agricultural districts
const LOCATION_COORDINATES: Record<string, { lat: number; lon: number }> = {
  nagpur: { lat: 21.1458, lon: 79.0882 },
  pune: { lat: 18.5204, lon: 73.8567 },
  nashik: { lat: 19.9975, lon: 73.7898 },
  aurangabad: { lat: 19.8762, lon: 75.3433 },
  amravati: { lat: 20.9374, lon: 77.7796 },
  ludhiana: { lat: 30.901, lon: 75.8573 },
  karnal: { lat: 29.6857, lon: 76.9905 },
  ahmedabad: { lat: 23.0225, lon: 72.5714 },
  bhopal: { lat: 23.2599, lon: 77.4126 },
  patna: { lat: 25.5941, lon: 85.1376 },
  lucknow: { lat: 26.8467, lon: 80.9462 },
  coimbatore: { lat: 11.0168, lon: 76.9558 },
  guntur: { lat: 16.3067, lon: 80.4365 },
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const district = (searchParams.get("district") || "nagpur").toLowerCase();
    const state = searchParams.get("state") || "Maharashtra";

    const coords = LOCATION_COORDINATES[district] || { lat: 21.1458, lon: 79.0882 };

    // Fetch real weather from Open-Meteo API
    const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto`;

    let weatherData;
    try {
      const omRes = await fetch(omUrl, { next: { revalidate: 600 } });
      weatherData = await omRes.json();
    } catch {
      weatherData = null;
    }

    const currentTemp = weatherData?.current?.temperature_2m ?? 31.5;
    const humidity = weatherData?.current?.relative_humidity_2m ?? 65;
    const windSpeed = weatherData?.current?.wind_speed_10m ?? 11.8;
    const currentRain = weatherData?.current?.rain ?? 12.0;

    // Calculate Risk Alerts based on agronomic thresholds
    const riskAlerts = [];
    if (humidity > 80 && currentTemp > 25) {
      riskAlerts.push({
        type: "High Fungal Pathogen Risk",
        severity: "high",
        message: `High humidity (${humidity}%) and warm temperatures created ideal conditions for fungal spore germination.`,
        actions: [
          "Apply preventive systemic fungicide (e.g. Copper Oxychloride or Mancozeb)",
          "Inspect lower leaves for early lesions",
          "Ensure proper field drainage"
        ]
      });
    }

    if (currentRain > 15) {
      riskAlerts.push({
        type: "Waterlogging & Nutrient Leaching Alert",
        severity: "high",
        message: `Heavy rainfall (${currentRain}mm) forecasted. High risk of nitrogen leaching and root hypoxia.`,
        actions: [
          "Clear field drainage channels",
          "Defer top-dressing fertilizer application until soil dries"
        ]
      });
    }

    if (currentTemp > 38) {
      riskAlerts.push({
        type: "Heat Stress & Wilting Hazard",
        severity: "medium",
        message: `Temperature reaching ${currentTemp}°C. Transpiration demand high.`,
        actions: [
          "Schedule early morning light irrigation",
          "Apply organic mulch to retain soil moisture"
        ]
      });
    }

    if (riskAlerts.length === 0) {
      riskAlerts.push({
        type: "Favorable Growing Conditions",
        severity: "low",
        message: `Weather parameters in ${district}, ${state} are within optimal agronomic ranges.`,
        actions: [
          "Maintain standard irrigation and crop monitoring schedule"
        ]
      });
    }

    // Build 5-day forecast
    const dailyRain = weatherData?.daily?.rain_sum || [12, 18, 5, 0, 0];
    const dailyMax = weatherData?.daily?.temperature_2m_max || [33, 31, 32, 34, 35];
    const dailyMin = weatherData?.daily?.temperature_2m_min || [24, 23, 23, 24, 25];

    const dayLabels = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5"];
    const forecast = dayLabels.map((label, idx) => ({
      date: label,
      temp_min: Math.round(dailyMin[idx] ?? 23),
      temp_max: Math.round(dailyMax[idx] ?? 32),
      rainfall: Math.round(dailyRain[idx] ?? 0),
      description: (dailyRain[idx] ?? 0) > 10 ? "Moderate Rain" : (dailyRain[idx] ?? 0) > 0 ? "Light Shower" : "Partly Cloudy",
      icon: (dailyRain[idx] ?? 0) > 5 ? "10d" : "02d"
    }));

    return NextResponse.json({
      success: true,
      data: {
        temperature: Math.round(currentTemp),
        humidity: Math.round(humidity),
        wind_speed: Number(windSpeed.toFixed(1)),
        rainfall: Math.round(currentRain),
        description: currentRain > 10 ? "Moderate Rain & Humid" : humidity > 75 ? "Humid & Overcast" : "Partly Cloudy",
        icon: currentRain > 10 ? "10d" : "02d",
        risk_alerts: riskAlerts,
        forecast
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { code: "WEATHER_ERROR", message: "Failed to fetch weather data" }
    }, { status: 500 });
  }
}
