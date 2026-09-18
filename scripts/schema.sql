-- ============================================
-- KISANIQ Database Schema (Supabase PostgreSQL)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Farms ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_name TEXT,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    crop TEXT NOT NULL,
    crop_stage TEXT NOT NULL,
    soil_type TEXT NOT NULL,
    water_availability TEXT NOT NULL,
    nitrogen FLOAT,
    phosphorus FLOAT,
    potassium FLOAT,
    ph FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Weather Records ──────────────────────────
CREATE TABLE IF NOT EXISTS weather_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    location TEXT,
    temperature FLOAT,
    humidity FLOAT,
    wind_speed FLOAT,
    rainfall FLOAT,
    description TEXT,
    forecast JSONB,
    risk_alerts JSONB,
    fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Crop Recommendations ─────────────────────
CREATE TABLE IF NOT EXISTS crop_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    recommended_crop TEXT NOT NULL,
    suitability_score FLOAT NOT NULL,
    risk_level TEXT NOT NULL,
    explanation TEXT,
    factors JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Disease Analyses ─────────────────────────
CREATE TABLE IF NOT EXISTS disease_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    image_url TEXT,
    disease_name TEXT NOT NULL,
    confidence FLOAT NOT NULL,
    severity TEXT NOT NULL,
    affected_area_pct FLOAT NOT NULL,
    explanation TEXT,
    recommended_actions JSONB,
    prevention_steps JSONB,
    raw_predictions JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Follow-up Analyses ───────────────────────
CREATE TABLE IF NOT EXISTS follow_up_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    original_analysis_id UUID REFERENCES disease_analyses(id) ON DELETE CASCADE,
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    image_url TEXT,
    previous_affected_pct FLOAT NOT NULL,
    current_affected_pct FLOAT NOT NULL,
    change_pct FLOAT NOT NULL,
    status TEXT NOT NULL,
    comparison_details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_weather_farm_id ON weather_records(farm_id);
CREATE INDEX IF NOT EXISTS idx_crop_rec_farm_id ON crop_recommendations(farm_id);
CREATE INDEX IF NOT EXISTS idx_disease_farm_id ON disease_analyses(farm_id);
CREATE INDEX IF NOT EXISTS idx_followup_farm_id ON follow_up_analyses(farm_id);
CREATE INDEX IF NOT EXISTS idx_followup_original ON follow_up_analyses(original_analysis_id);
