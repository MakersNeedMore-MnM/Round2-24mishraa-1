"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  Badge,
  Button,
  PageHeader,
  EmptyState,
  LoadingState,
  Alert,
} from "@/components/ui";
import { getWeather } from "@/lib/api/client";
import type { Farm, WeatherData } from "@/types";

/**
 * KISANIQ — Farm Dashboard
 *
 * The farmer's home base. Shows farm overview and
 * entry points to all core features.
 */

// ── Feature Card ─────────────────────────────

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  status: "ready" | "coming" | "active";
  statusLabel?: string;
  onClick?: () => void;
  ctaLabel?: string;
}

function FeatureCard({
  icon,
  title,
  description,
  status,
  statusLabel,
  onClick,
  ctaLabel,
}: FeatureCardProps) {
  const badgeColor =
    status === "ready"
      ? "green"
      : status === "active"
      ? "blue"
      : "gray";
  const defaultStatusLabel =
    status === "ready"
      ? "Ready"
      : status === "active"
      ? "Active"
      : "Coming Next";

  return (
    <Card hover={status !== "coming"} onClick={status !== "coming" ? onClick : undefined}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-kisan-green-50 flex items-center justify-center text-2xl flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-kisan-charcoal">
              {title}
            </h3>
            <Badge color={badgeColor}>
              {statusLabel || defaultStatusLabel}
            </Badge>
          </div>
          <p className="text-sm text-kisan-text-light">{description}</p>
          {status !== "coming" && ctaLabel && (
            <p className="mt-2 text-sm font-semibold text-kisan-green-700">
              {ctaLabel} →
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

// ── Time-based greeting ──────────────────────

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

// ══════════════════════════════════════════════
// Dashboard Page
// ══════════════════════════════════════════════

export default function DashboardPage() {
  const router = useRouter();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load farm from localStorage (set during onboarding)
    const stored = localStorage.getItem("kisaniq_farm");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFarm(parsed);
        // Fetch weather for overview
        getWeather(parsed.state, parsed.district)
          .then(data => setWeather(data))
          .catch(() => {}); // silent fail for dashboard overview
      } catch {
        // Invalid JSON
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <LoadingState message="Loading your farm..." />
      </AppLayout>
    );
  }

  if (!farm) {
    return (
      <AppLayout>
        <EmptyState
          icon="🌾"
          title="No farm profile found"
          description="Create a farm profile to get started with crop recommendations, weather alerts, and AI-powered disease analysis."
          action={
            <Button onClick={() => router.push("/farm/new")}>
              Create Farm Profile
            </Button>
          }
        />
      </AppLayout>
    );
  }

  const greeting = getGreeting();
  const farmerName = farm.farmer_name || "Farmer";

  return (
    <AppLayout>
      {/* ── Header ──────────────────────── */}
      <PageHeader
        title={`${greeting}, ${farmerName}`}
        subtitle="Here's your farm overview and tools."
      />

      {/* ── Farm Overview Card ──────────── */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-kisan-green-100 flex items-center justify-center text-2xl flex-shrink-0">
              🌾
            </div>
            <div>
              <p className="text-sm text-kisan-text-light">Farm Location</p>
              <p className="text-lg font-bold text-kisan-charcoal">
                {farm.district}, {farm.state}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="bg-kisan-green-50 rounded-xl px-4 py-2">
              <p className="text-[10px] text-kisan-text-light uppercase font-semibold tracking-wide">
                Crop
              </p>
              <p className="text-sm font-bold text-kisan-green-800">
                {farm.crop}
              </p>
            </div>
            <div className="bg-kisan-earth-50 rounded-xl px-4 py-2">
              <p className="text-[10px] text-kisan-text-light uppercase font-semibold tracking-wide">
                Stage
              </p>
              <p className="text-sm font-bold text-kisan-earth-700">
                {farm.crop_stage}
              </p>
            </div>
            <div className="bg-kisan-sky-100 rounded-xl px-4 py-2">
              <p className="text-[10px] text-kisan-text-light uppercase font-semibold tracking-wide">
                Soil
              </p>
              <p className="text-sm font-bold text-kisan-sky-500">
                {farm.soil_type}
              </p>
            </div>
            <div className="bg-amber-50 rounded-xl px-4 py-2">
              <p className="text-[10px] text-kisan-text-light uppercase font-semibold tracking-wide">
                Water
              </p>
              <p className="text-sm font-bold text-amber-700">
                {farm.water_availability}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Today's Overview ────────────── */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-kisan-charcoal mb-4">
          Today&apos;s Overview
        </h2>

        {!weather ? (
          <Alert variant="info">
            Loading weather and risk intelligence for your location...
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card padding="sm" className="flex items-center gap-4">
              {weather.icon ? (
                <img src={`https://openweathermap.org/img/wn/${weather.icon}.png`} alt="" className="w-12 h-12" />
              ) : (
                <div className="text-3xl">🌤️</div>
              )}
              <div>
                <p className="text-sm font-bold text-kisan-charcoal">{weather.temperature}°C, {weather.description}</p>
                <p className="text-xs text-kisan-text-light">Wind: {weather.wind_speed}m/s | Rain: {weather.rainfall}mm</p>
              </div>
            </Card>
            
            {weather.risk_alerts && weather.risk_alerts.length > 0 ? (
              <Card padding="sm" className={`border-l-4 ${weather.risk_alerts[0].severity === 'high' ? 'border-l-kisan-danger' : weather.risk_alerts[0].severity === 'moderate' ? 'border-l-kisan-warning' : 'border-l-kisan-sky-500'}`}>
                <p className="text-xs font-semibold text-kisan-text-light uppercase">Highest Risk</p>
                <p className="text-sm font-bold text-kisan-charcoal">{weather.risk_alerts[0].type}</p>
                <p className="text-xs text-kisan-text-light truncate">{weather.risk_alerts[0].message}</p>
              </Card>
            ) : (
              <Card padding="sm" className="border-l-4 border-l-kisan-green-500">
                <p className="text-xs font-semibold text-kisan-text-light uppercase">Highest Risk</p>
                <p className="text-sm font-bold text-kisan-green-700">Favorable Conditions</p>
                <p className="text-xs text-kisan-text-light">No significant weather risks detected.</p>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* ── Feature Cards ──────────────── */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-kisan-charcoal mb-4">
          What would you like to do?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon="🌱"
            title="Crop Recommendation"
            description="Check how suitable your current crop is for your farm conditions."
            status="ready"
            onClick={() => router.push("/recommendation")}
            ctaLabel="Get Recommendation"
          />

          <FeatureCard
            icon="🌦️"
            title="Weather Risk"
            description="View current weather and farming-specific risk alerts."
            status="ready"
            onClick={() => router.push("/weather")}
            ctaLabel="Check Weather"
          />

          <FeatureCard
            icon="🦠"
            title="Disease Doctor"
            description="Upload a crop leaf image for AI-powered disease analysis."
            status="ready"
            onClick={() => router.push("/disease")}
            ctaLabel="Analyze Crop"
          />

          <FeatureCard
            icon="📋"
            title="Action Plan"
            description="Get context-aware recommendations based on your analysis."
            status="ready"
            onClick={() => router.push("/actions")}
            ctaLabel="View Actions"
          />

          <FeatureCard
            icon="🔄"
            title="Follow-up Monitoring"
            description="Track your crop's progress by comparing images over time."
            status="ready"
            onClick={() => router.push("/followup")}
            ctaLabel="Track Progress"
          />
        </div>
      </div>

      {/* ── Farm Info ───────────────────── */}
      {(farm.nitrogen || farm.phosphorus || farm.potassium || farm.ph) && (
        <Card className="mb-6">
          <h3 className="text-base font-bold text-kisan-charcoal mb-3 flex items-center gap-2">
            <span aria-hidden="true">🧪</span> Soil Test Values
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {farm.nitrogen != null && (
              <div className="bg-kisan-green-50 rounded-xl px-3 py-2 text-center">
                <p className="text-[10px] text-kisan-text-light uppercase font-semibold">
                  Nitrogen
                </p>
                <p className="text-base font-bold text-kisan-green-800">
                  {farm.nitrogen} <span className="text-xs font-normal">kg/ha</span>
                </p>
              </div>
            )}
            {farm.phosphorus != null && (
              <div className="bg-kisan-green-50 rounded-xl px-3 py-2 text-center">
                <p className="text-[10px] text-kisan-text-light uppercase font-semibold">
                  Phosphorus
                </p>
                <p className="text-base font-bold text-kisan-green-800">
                  {farm.phosphorus} <span className="text-xs font-normal">kg/ha</span>
                </p>
              </div>
            )}
            {farm.potassium != null && (
              <div className="bg-kisan-green-50 rounded-xl px-3 py-2 text-center">
                <p className="text-[10px] text-kisan-text-light uppercase font-semibold">
                  Potassium
                </p>
                <p className="text-base font-bold text-kisan-green-800">
                  {farm.potassium} <span className="text-xs font-normal">kg/ha</span>
                </p>
              </div>
            )}
            {farm.ph != null && (
              <div className="bg-kisan-earth-50 rounded-xl px-3 py-2 text-center">
                <p className="text-[10px] text-kisan-text-light uppercase font-semibold">
                  pH
                </p>
                <p className="text-base font-bold text-kisan-earth-700">
                  {farm.ph}
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* ── Disclaimer ─────────────────── */}
      <p className="text-xs text-kisan-text-light text-center mt-8">
        This tool provides decision support and does not replace agricultural
        experts.
      </p>
    </AppLayout>
  );
}
