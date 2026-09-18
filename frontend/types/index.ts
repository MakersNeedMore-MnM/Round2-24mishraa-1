/**
 * KISANIQ — Shared TypeScript Types
 *
 * These types mirror the backend Pydantic schemas for type safety
 * across the frontend ↔ backend boundary.
 */

// ── API Response ────────────────────────────

export interface ErrorDetail {
  code: string;
  message: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: ErrorDetail | null;
}

// ── Farm ────────────────────────────────────

export interface FarmCreate {
  farmer_name?: string;
  state: string;
  district: string;
  crop: string;
  crop_stage: string;
  soil_type: string;
  water_availability: string;
  nitrogen?: number | null;
  phosphorus?: number | null;
  potassium?: number | null;
  ph?: number | null;
}

export interface Farm {
  id: string;
  farmer_name?: string | null;
  state: string;
  district: string;
  crop: string;
  crop_stage: string;
  soil_type: string;
  water_availability: string;
  nitrogen?: number | null;
  phosphorus?: number | null;
  potassium?: number | null;
  ph?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ── Crop Recommendation ─────────────────────

export interface CropRecommendationFactor {
  name: string;
  score: number;
  status: "good" | "moderate" | "poor";
  detail: string;
}

export interface CropRecommendation {
  recommended_crop: string;
  suitability_score: number;
  risk_level: string;
  explanation: string;
  factors: CropRecommendationFactor[];
}

// ── Weather ─────────────────────────────────

export interface RiskAlert {
  type: string;
  severity: string;
  message: string;
  actions: string[];
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  rainfall: number;
  description: string;
  icon?: string;
  risk_alerts: RiskAlert[];
  forecast?: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
  rainfall: number;
  icon?: string;
}

// ── Disease Analysis ────────────────────────

export interface DiseasePrediction {
  disease_name: string;
  confidence: number;
  is_healthy: boolean;
}

export interface DiseaseAnalysisResult {
  predictions: DiseasePrediction[];
  primary_diagnosis: string;
  description: string;
  recommended_treatment: string;
}

export interface DiseaseAnalysis {
  id: string;
  farm_id: string;
  image_url?: string;
  disease_name: string;
  confidence: number;
  severity: string;
  affected_area_pct: number;
  explanation: string;
  recommended_actions: string[];
  prevention_steps: string[];
  disclaimer: string;
  created_at?: string;
}

// ── Follow-up ───────────────────────────────

export interface FollowUpAnalysis {
  id: string;
  original_analysis_id: string;
  farm_id: string;
  image_url?: string;
  previous_affected_pct: number;
  current_affected_pct: number;
  change_pct: number;
  status: "IMPROVING" | "STABLE" | "WORSENING";
  created_at?: string;
}

// ── Form Options ────────────────────────────

export const CROP_STAGES = [
  "Seedling",
  "Vegetative",
  "Flowering",
  "Fruiting",
  "Harvest",
] as const;

export const SOIL_TYPES = [
  "Black",
  "Red",
  "Alluvial",
  "Loamy",
  "Sandy",
  "Clay",
  "Other",
] as const;

export const WATER_AVAILABILITY = ["Low", "Moderate", "High"] as const;

export const INDIAN_STATES: Record<string, string[]> = {
  "Maharashtra": [
    "Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Solapur",
    "Kolhapur", "Satara", "Sangli", "Amravati", "Akola", "Wardha",
    "Yavatmal", "Jalgaon", "Dhule", "Nanded", "Latur", "Osmanabad",
    "Beed", "Parbhani", "Hingoli", "Washim", "Buldhana", "Chandrapur",
    "Gadchiroli", "Bhandara", "Gondia", "Ratnagiri", "Sindhudurg",
    "Raigad", "Thane", "Palghar",
  ],
  "Madhya Pradesh": [
    "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar",
    "Rewa", "Satna", "Khandwa", "Chhindwara", "Hoshangabad", "Betul",
    "Dewas", "Dhar", "Khargone", "Mandla", "Seoni", "Balaghat",
  ],
  "Karnataka": [
    "Bangalore", "Mysore", "Hubli-Dharwad", "Belgaum", "Gulbarga",
    "Mangalore", "Shimoga", "Tumkur", "Raichur", "Bijapur", "Bellary",
    "Davangere", "Hassan", "Chitradurga",
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar",
    "Junagadh", "Kutch", "Mehsana", "Anand", "Kheda", "Patan",
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner",
    "Alwar", "Bharatpur", "Sikar", "Tonk", "Nagaur", "Churu",
  ],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad", "Meerut",
    "Noida", "Gorakhpur", "Bareilly", "Aligarh", "Moradabad", "Mathura",
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli",
    "Erode", "Vellore", "Thanjavur", "Dindigul", "Cuddalore",
  ],
  "Andhra Pradesh": [
    "Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore",
    "Kurnool", "Tirupati", "Kadapa", "Anantapur", "Rajahmundry",
  ],
  "Punjab": [
    "Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala",
    "Bathinda", "Mohali", "Sangrur", "Mansa", "Ferozepur",
  ],
  "Haryana": [
    "Gurgaon", "Faridabad", "Hisar", "Karnal", "Panipat", "Ambala",
    "Sonipat", "Rohtak", "Sirsa", "Bhiwani",
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Bardhaman",
    "Malda", "Murshidabad", "Nadia", "Hooghly",
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam",
    "Mahbubnagar", "Nalgonda", "Adilabad", "Medak",
  ],
};

export const COMMON_CROPS = [
  "Soybean",
  "Cotton",
  "Rice",
  "Wheat",
  "Maize",
  "Sugarcane",
  "Tomato",
  "Potato",
  "Onion",
  "Chickpea",
  "Groundnut",
  "Sunflower",
  "Jowar (Sorghum)",
  "Bajra (Pearl Millet)",
  "Tur (Pigeon Pea)",
  "Moong (Green Gram)",
  "Urad (Black Gram)",
  "Gram (Bengal Gram)",
  "Mustard",
  "Chilli",
  "Grapes",
  "Pomegranate",
  "Orange",
  "Banana",
] as const;
