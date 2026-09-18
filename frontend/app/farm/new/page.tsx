"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Card,
  Input,
  Select,
  Alert,
  PageHeader,
} from "@/components/ui";
import { createFarm, APIError } from "@/lib/api/client";
import type { FarmCreate } from "@/types";
import {
  CROP_STAGES,
  SOIL_TYPES,
  WATER_AVAILABILITY,
  INDIAN_STATES,
  COMMON_CROPS,
} from "@/types";

/**
 * KISANIQ — Farm Profile Creation
 *
 * Mobile-first onboarding form.
 * Connected to POST /api/farms.
 */

type FormErrors = Partial<Record<keyof FarmCreate, string>>;

export default function NewFarmPage() {
  const router = useRouter();

  // ── Form State ─────────────────────────────
  const [form, setForm] = useState<FarmCreate>({
    farmer_name: "",
    state: "",
    district: "",
    crop: "",
    crop_stage: "",
    soil_type: "",
    water_availability: "",
    nitrogen: null,
    phosphorus: null,
    potassium: null,
    ph: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);

  // ── Districts for selected state ───────────
  const districts = useMemo(() => {
    if (!form.state) return [];
    return INDIAN_STATES[form.state] || [];
  }, [form.state]);

  // ── State Options ──────────────────────────
  const stateOptions = Object.keys(INDIAN_STATES);

  // ── Handlers ───────────────────────────────
  function updateField<K extends keyof FarmCreate>(
    field: K,
    value: FarmCreate[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on edit
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Reset district when state changes
    if (field === "state") {
      setForm((prev) => ({ ...prev, district: "" }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.state) newErrors.state = "Please select your state";
    if (!form.district) newErrors.district = "Please select your district";
    if (!form.crop) newErrors.crop = "Please select your crop";
    if (!form.crop_stage)
      newErrors.crop_stage = "Please select the crop stage";
    if (!form.soil_type) newErrors.soil_type = "Please select soil type";
    if (!form.water_availability)
      newErrors.water_availability = "Please select water availability";

    if (form.ph !== null && form.ph !== undefined) {
      if (form.ph < 0 || form.ph > 14)
        newErrors.ph = "pH must be between 0 and 14";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const farm = await createFarm(form);
      if (typeof window !== "undefined") {
        localStorage.setItem("kisaniq_farm_id", farm.id);
        localStorage.setItem("kisaniq_farm", JSON.stringify(farm));
      }
      router.push("/dashboard");
    } catch {
      // Demo Resilience: Save locally if backend server is offline
      const fallbackFarm = {
        id: "demo-farm-" + Date.now(),
        farmer_name: form.farmer_name || "Farmer",
        state: form.state,
        district: form.district,
        crop: form.crop,
        crop_stage: form.crop_stage,
        soil_type: form.soil_type,
        water_availability: form.water_availability,
        nitrogen: form.nitrogen ?? null,
        phosphorus: form.phosphorus ?? null,
        potassium: form.potassium ?? null,
        ph: form.ph ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("kisaniq_farm_id", fallbackFarm.id);
        localStorage.setItem("kisaniq_farm", JSON.stringify(fallbackFarm));
      }
      router.push("/dashboard");
    }
  }

  // ── Render ─────────────────────────────────
  return (
    <div className="min-h-screen bg-kisan-bg">
      {/* Top Bar */}
      <header className="bg-white border-b border-kisan-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-kisan-text-light hover:text-kisan-text transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
        <PageHeader
          title="Set Up Your Farm"
          subtitle="Tell us about your farm so we can provide relevant recommendations. Only a few fields are required."
        />

        <form onSubmit={handleSubmit} noValidate>
          {submitError && (
            <Alert
              variant="error"
              title="Could not save farm profile"
              className="mb-6"
              onDismiss={() => setSubmitError(null)}
            >
              {submitError}
            </Alert>
          )}

          {/* ── Basic Information ──────────── */}
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-kisan-charcoal mb-5 flex items-center gap-2">
              <span aria-hidden="true">👤</span> Basic Information
            </h2>

            <div className="space-y-4">
              <Input
                label="Farmer Name"
                placeholder="Enter your name (optional)"
                value={form.farmer_name || ""}
                onChange={(e) => updateField("farmer_name", e.target.value)}
                maxLength={100}
              />
            </div>
          </Card>

          {/* ── Location ──────────────────── */}
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-kisan-charcoal mb-5 flex items-center gap-2">
              <span aria-hidden="true">📍</span> Location
            </h2>

            <div className="space-y-4">
              <Select
                label="State"
                required
                placeholder="Select your state"
                options={stateOptions}
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                error={errors.state}
              />

              <Select
                label="District"
                required
                placeholder={
                  form.state
                    ? "Select your district"
                    : "First select your state"
                }
                options={districts}
                value={form.district}
                onChange={(e) => updateField("district", e.target.value)}
                disabled={!form.state}
                error={errors.district}
              />
            </div>
          </Card>

          {/* ── Crop Details ──────────────── */}
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-kisan-charcoal mb-5 flex items-center gap-2">
              <span aria-hidden="true">🌾</span> Crop Details
            </h2>

            <div className="space-y-4">
              <Select
                label="Crop"
                required
                placeholder="Select your crop"
                options={[...COMMON_CROPS]}
                value={form.crop}
                onChange={(e) => updateField("crop", e.target.value)}
                error={errors.crop}
              />

              <Select
                label="Crop Stage"
                required
                placeholder="Select current stage"
                options={[...CROP_STAGES]}
                value={form.crop_stage}
                onChange={(e) => updateField("crop_stage", e.target.value)}
                error={errors.crop_stage}
                hint="What stage is your crop currently in?"
              />
            </div>
          </Card>

          {/* ── Soil & Water ──────────────── */}
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-kisan-charcoal mb-5 flex items-center gap-2">
              <span aria-hidden="true">🏔️</span> Soil & Water
            </h2>

            <div className="space-y-4">
              <Select
                label="Soil Type"
                required
                placeholder="Select soil type"
                options={[...SOIL_TYPES]}
                value={form.soil_type}
                onChange={(e) => updateField("soil_type", e.target.value)}
                error={errors.soil_type}
              />

              <Select
                label="Water Availability"
                required
                placeholder="Select water availability"
                options={[...WATER_AVAILABILITY]}
                value={form.water_availability}
                onChange={(e) =>
                  updateField("water_availability", e.target.value)
                }
                error={errors.water_availability}
                hint="How much irrigation water is available?"
              />
            </div>
          </Card>

          {/* ── Optional Soil Test ─────────── */}
          <Card className="mb-8">
            <button
              type="button"
              className="w-full flex items-center justify-between text-left"
              onClick={() => setShowOptional(!showOptional)}
              aria-expanded={showOptional}
            >
              <h2 className="text-lg font-bold text-kisan-charcoal flex items-center gap-2">
                <span aria-hidden="true">🧪</span> Soil Test Values
                <span className="text-xs font-normal text-kisan-text-light bg-kisan-earth-100 px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </h2>
              <svg
                className={`w-5 h-5 text-kisan-text-light transition-transform ${
                  showOptional ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showOptional && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-kisan-text-light">
                  If you have recent soil test results, entering them will
                  improve crop recommendations.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Nitrogen (N)"
                    type="number"
                    placeholder="kg/ha"
                    min={0}
                    max={500}
                    value={form.nitrogen ?? ""}
                    onChange={(e) =>
                      updateField(
                        "nitrogen",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                  <Input
                    label="Phosphorus (P)"
                    type="number"
                    placeholder="kg/ha"
                    min={0}
                    max={500}
                    value={form.phosphorus ?? ""}
                    onChange={(e) =>
                      updateField(
                        "phosphorus",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                  <Input
                    label="Potassium (K)"
                    type="number"
                    placeholder="kg/ha"
                    min={0}
                    max={500}
                    value={form.potassium ?? ""}
                    onChange={(e) =>
                      updateField(
                        "potassium",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                  <Input
                    label="pH"
                    type="number"
                    placeholder="0–14"
                    min={0}
                    max={14}
                    step={0.1}
                    value={form.ph ?? ""}
                    onChange={(e) =>
                      updateField(
                        "ph",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    error={errors.ph}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* ── Submit ────────────────────── */}
          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={submitting}
            id="btn-create-farm"
          >
            {submitting ? "Saving farm profile..." : "Create Farm Profile"}
          </Button>

          <p className="text-center text-xs text-kisan-text-light mt-4">
            You can update your farm profile later.
          </p>
        </form>
      </div>
    </div>
  );
}
