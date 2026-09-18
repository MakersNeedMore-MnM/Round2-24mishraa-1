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
  const params = new URLSearchParams({ state, district });
  return request<WeatherData>(`/api/weather?${params.toString()}`);
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
  return request<CropRecommendation>("/api/recommendation", {
    method: "POST",
    body: JSON.stringify(params),
  });
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
