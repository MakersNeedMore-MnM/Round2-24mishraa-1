"use client";

import React, { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  Badge,
  Button,
  PageHeader,
  Alert,
  LoadingState,
  Select,
  Input,
} from "@/components/ui";
import { getCropRecommendation } from "@/lib/api/client";
import type { CropRecommendation, Farm } from "@/types";
import { SOIL_TYPES, WATER_AVAILABILITY } from "@/types";

const CROP_OPTIONS = ["Rice", "Wheat", "Cotton", "Maize", "Sugarcane", "Groundnut", "Pulses (Chickpea/Pigeonpea)"];
const SEASONS = ["Kharif", "Rabi", "Zaid", "Year-round"];

export default function RecommendationPage() {
  const [farm] = useState<Farm | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("kisaniq_farm");
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  const [stateName, setStateName] = useState(() => farm?.state || "Maharashtra");
  const [district, setDistrict] = useState(() => farm?.district || "Nagpur");
  const [soilType, setSoilType] = useState(() => farm?.soil_type || "Black");
  const [waterAvailability, setWaterAvailability] = useState(() => farm?.water_availability || "Moderate");
  const [crop, setCrop] = useState(() => farm?.crop || "Cotton");
  const [season, setSeason] = useState("Kharif");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<CropRecommendation | null>(null);

  useEffect(() => {
    let isMounted = true;
    getCropRecommendation({
      state: stateName,
      district,
      soil_type: soilType,
      water_availability: waterAvailability,
      crop,
      season,
    })
      .then((res) => {
        if (isMounted) setRecommendation(res);
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Failed to generate recommendation.";
          setError(msg);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvaluate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCropRecommendation({
        state: stateName,
        district,
        soil_type: soilType,
        water_availability: waterAvailability,
        crop,
        season,
      });
      setRecommendation(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to generate recommendation.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <PageHeader
          title="Crop Recommendation Engine 🌱"
          subtitle="Evaluate crop suitability and risk based on soil, water availability, season, and regional climate."
        />

        {error && (
          <Alert variant="error" onDismiss={() => setError(null)}>
            {error}
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls / Parameters Column */}
          <Card className="p-6 space-y-5 lg:col-span-1 border-t-4 border-t-kisan-green-600">
            <div className="flex items-center justify-between border-b border-kisan-border pb-3">
              <h2 className="text-lg font-bold text-kisan-charcoal flex items-center gap-2">
                <span>⚙️</span> Parameters
              </h2>
              {farm && (
                <span className="text-xs bg-kisan-green-100 text-kisan-green-800 font-semibold px-2 py-0.5 rounded">
                  Farm Sync
                </span>
              )}
            </div>

            <Input
              label="State"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
            />

            <Input
              label="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />

            <Select
              label="Target Crop"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              options={CROP_OPTIONS.map((c) => ({ label: c, value: c }))}
            />

            <Select
              label="Soil Type"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              options={SOIL_TYPES.map((s) => ({ label: s, value: s }))}
            />

            <Select
              label="Water Availability"
              value={waterAvailability}
              onChange={(e) => setWaterAvailability(e.target.value)}
              options={WATER_AVAILABILITY.map((w) => ({ label: w, value: w }))}
            />

            <Select
              label="Sowing Season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              options={SEASONS.map((s) => ({ label: s, value: s }))}
            />

            <Button
              variant="primary"
              fullWidth
              onClick={handleEvaluate}
              loading={loading}
              className="mt-4"
            >
              Re-evaluate Suitability
            </Button>
          </Card>

          {/* Results Column */}
          <div className="lg:col-span-2 space-y-6">
            {loading && (
              <Card className="p-8 flex flex-col items-center justify-center min-h-[380px]">
                <LoadingState message="Calculating crop-soil compatibility & climate risk score..." />
              </Card>
            )}

            {!loading && recommendation && (
              <div className="space-y-6">
                {/* Main Score Banner */}
                <Card className="p-6 bg-gradient-to-br from-kisan-card to-emerald-50/40 border-kisan-green-200">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs font-semibold tracking-wider text-kisan-green-700 uppercase">
                        Recommended Crop Analysis
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-kisan-charcoal mt-0.5">
                        {recommendation.recommended_crop}
                      </h3>
                    </div>

                    <Badge
                      color={
                        recommendation.risk_level === "Low"
                          ? "green"
                          : recommendation.risk_level === "Moderate"
                          ? "yellow"
                          : "red"
                      }
                      className="text-sm px-3 py-1"
                    >
                      {recommendation.risk_level} Risk
                    </Badge>
                  </div>

                  {/* Score Bar */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-kisan-text">Suitability Score</span>
                      <span className="text-kisan-green-800 text-lg">
                        {Math.round(recommendation.suitability_score)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          recommendation.suitability_score >= 80
                            ? "bg-kisan-green-600"
                            : recommendation.suitability_score >= 60
                            ? "bg-amber-500"
                            : "bg-kisan-danger"
                        }`}
                        style={{ width: `${recommendation.suitability_score}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-kisan-text leading-relaxed bg-white/80 p-3.5 rounded-xl border border-kisan-border">
                    {recommendation.explanation}
                  </p>
                </Card>

                {/* Factors Breakdown Grid */}
                <div>
                  <h3 className="text-base font-bold text-kisan-charcoal mb-4 flex items-center gap-2">
                    <span>📊</span> Suitability Factors Breakdown
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recommendation.factors.map((factor, idx) => (
                      <Card key={idx} className="p-4 space-y-2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-kisan-charcoal truncate">
                              {factor.name}
                            </span>
                            <Badge
                              color={
                                factor.status === "good"
                                  ? "green"
                                  : factor.status === "moderate"
                                  ? "yellow"
                                  : "red"
                              }
                            >
                              {factor.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-kisan-text-light leading-snug">
                            {factor.detail}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                          <span className="text-gray-400">Factor Score</span>
                          <span className="font-mono font-semibold text-kisan-green-800">
                            {Math.round(factor.score)}/100
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
