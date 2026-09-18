/**
 * KISANIQ — API Client
 *
 * Centralized API layer. All backend calls go through here.
 * Never call fetch() directly from components.
 */

import type { APIResponse, Farm, FarmCreate, WeatherData, DiseaseAnalysisResult, CropRecommendation } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class APIError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = "APIError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData: APIResponse | null = null;
    try {
      errorData = await response.json();
    } catch {
      // Response was not JSON
    }

    const errorDetail = errorData?.error ?? (typeof errorData === "object" && errorData !== null && "detail" in errorData ? (errorData as Record<string, unknown>).detail as Record<string, unknown> : null);

    throw new APIError(
      (errorDetail as Record<string, string> | null)?.code ?? "UNKNOWN_ERROR",
      (errorDetail as Record<string, string> | null)?.message ??
        `Request failed with status ${response.status}`,
      response.status
    );
  }

  const data: APIResponse<T> = await response.json();

  if (!data.success && data.error) {
    throw new APIError(data.error.code, data.error.message, response.status);
  }

  return data.data as T;
}

// ── Farm API ──────────────────────────────────

export async function createFarm(farm: FarmCreate): Promise<Farm> {
  return request<Farm>("/api/farms", {
    method: "POST",
    body: JSON.stringify(farm),
  });
}

export async function getFarm(farmId: string): Promise<Farm> {
  return request<Farm>(`/api/farms/${farmId}`);
}

// ── Weather API ───────────────────────────────

export async function getWeather(state: string, district: string): Promise<WeatherData> {
  try {
    const params = new URLSearchParams({ state, district });
    return await request<WeatherData>(`/api/weather?${params.toString()}`);
  } catch {
    // Demo Fallback for Vercel when backend is offline
    return {
      temperature: 32,
      humidity: 68,
      wind_speed: 12.5,
      rainfall: 24,
      description: "Moderate Rain & Humid",
      icon: "10d",
      risk_alerts: [
        {
          type: "Heavy Rain & Waterlogging Risk",
          severity: "high",
          message: "24mm rainfall forecasted. Risk of water accumulation in low-lying crop zones.",
          actions: ["Clear field drainage channels", "Avoid applying nitrogen fertilizer today"]
        }
      ],
      forecast: [
        { date: "Today", temp_min: 24, temp_max: 33, rainfall: 24, description: "Moderate Rain", icon: "10d" },
        { date: "Tomorrow", temp_min: 23, temp_max: 31, rainfall: 15, description: "Light Rain", icon: "10d" },
        { date: "Day 3", temp_min: 22, temp_max: 32, rainfall: 0, description: "Partly Cloudy", icon: "02d" },
        { date: "Day 4", temp_min: 24, temp_max: 34, rainfall: 0, description: "Clear Sky", icon: "01d" },
        { date: "Day 5", temp_min: 25, temp_max: 35, rainfall: 0, description: "Sunny", icon: "01d" }
      ]
    };
  }
}

// ── Crop Recommendation API ─────────────────

export async function getCropRecommendation(params: {
  state: string;
  district: string;
  soil_type: string;
  water_availability: string;
  crop?: string;
  season?: string;
}): Promise<CropRecommendation> {
  try {
    return await request<CropRecommendation>("/api/recommendation", {
      method: "POST",
      body: JSON.stringify(params),
    });
  } catch {
    // Demo Fallback for Vercel when backend is offline
    return {
      recommended_crop: params.crop || "Cotton",
      suitability_score: 92,
      risk_level: "Low",
      explanation: `${params.crop || "Cotton"} is well-suited for ${params.district || "Nagpur"}, ${params.state || "Maharashtra"}. Soil and water availability match ideal growing conditions.`,
      factors: [
        { name: "Soil Compatibility", score: 95, status: "good", detail: `${params.soil_type || "Black"} soil provides optimal drainage and nutrient absorption.` },
        { name: "Water Availability", score: 90, status: "good", detail: `Water supply (${params.water_availability || "Moderate"}) meets growth requirements.` },
        { name: "Seasonal Timing", score: 90, status: "good", detail: "Sowing season aligns with favorable climate conditions." }
      ]
    };
  }
}

// ── Health & Utility ─────────────────────────

export async function analyzeDisease(file: File): Promise<DiseaseAnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_URL}/api/disease/analyze`, {
    method: 'POST',
    body: formData,
  });
  const data: APIResponse<DiseaseAnalysisResult> = await response.json();
  if (!data.success) {
    throw new Error(data.error?.message || 'Disease analysis failed');
  }
  return data.data as DiseaseAnalysisResult;
}


export async function getActionPlan(params: {
  crop?: string;
  crop_stage?: string;
  disease_name?: string;
  weather_risk?: string;
}): Promise<Array<{
  id: string;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  timeline: string;
  description: string;
}>> {
  const query = new URLSearchParams();
  if (params.crop) query.set("crop", params.crop);
  if (params.crop_stage) query.set("crop_stage", params.crop_stage);
  if (params.disease_name) query.set("disease_name", params.disease_name);
  if (params.weather_risk) query.set("weather_risk", params.weather_risk);

  return request(`/api/action-plan?${query.toString()}`);
}

export async function compareFollowUp(file: File, previousPct: number): Promise<{
  previous_affected_pct: number;
  current_affected_pct: number;
  change_pct: number;
  status: "IMPROVING" | "STABLE" | "WORSENING";
  summary: string;
  recommendation: string;
}> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("previous_affected_pct", previousPct.toString());

  const response = await fetch(`${API_URL}/api/follow-up/compare`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error?.message || "Follow-up comparison failed");
  }
  return data.data;
}

export { APIError };
