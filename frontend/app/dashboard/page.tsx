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
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
  const badgeColor =
    status === "ready"
      ? "green"
      : status === "active"
      ? "blue"
      : "gray";
  const defaultStatusLabel =
    status === "ready"
      ? t.ready
      : status === "active"
      ? "Active"
      : "Coming Next";

  return (
    <Card hover={status !== "coming"} onClick={status !== "coming" ? onClick : undefined}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-emerald-950">
              {title}
            </h3>
            <Badge color={badgeColor}>
              {statusLabel || defaultStatusLabel}
            </Badge>
          </div>
          <p className="text-sm text-emerald-700/80">{description}</p>
          {status !== "coming" && ctaLabel && (
            <p className="mt-2 text-sm font-semibold text-emerald-700">
              {ctaLabel}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("kisaniq_farm");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFarm(parsed);
        getWeather(parsed.state, parsed.district)
          .then(data => setWeather(data))
          .catch(() => {});
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

  const farmerName = farm.farmer_name || "Farmer";

  return (
    <AppLayout>
      {/* Header */}
      <PageHeader
        title={`${t.greeting}, ${farmerName}`}
        subtitle={t.farmOverviewSub}
      />

      {/* Farm Overview Card */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl flex-shrink-0">
              🌾
            </div>
            <div>
              <p className="text-sm text-emerald-700/80">{t.farmLocation}</p>
              <p className="text-lg font-bold text-emerald-950">
                {farm.district}, {farm.state}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="bg-emerald-50 rounded-xl px-4 py-2">
              <p className="text-[10px] text-emerald-600 uppercase font-semibold tracking-wide">
                {t.cropLabel}
              </p>
              <p className="text-sm font-bold text-emerald-900">
                {farm.crop}
              </p>
            </div>
            <div className="bg-amber-50/60 rounded-xl px-4 py-2">
              <p className="text-[10px] text-amber-700 uppercase font-semibold tracking-wide">
                {t.stageLabel}
              </p>
              <p className="text-sm font-bold text-amber-900">
                {farm.crop_stage}
              </p>
            </div>
            <div className="bg-sky-50 rounded-xl px-4 py-2">
              <p className="text-[10px] text-sky-700 uppercase font-semibold tracking-wide">
                {t.soilLabel}
              </p>
              <p className="text-sm font-bold text-sky-900">
                {farm.soil_type}
              </p>
            </div>
            <div className="bg-emerald-100/60 rounded-xl px-4 py-2">
              <p className="text-[10px] text-emerald-800 uppercase font-semibold tracking-wide">
                {t.waterLabel}
              </p>
              <p className="text-sm font-bold text-emerald-950">
                {farm.water_availability}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Today's Overview */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-emerald-950 mb-4">
          {t.todaysOverview}
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
                <p className="text-sm font-bold text-emerald-950">{weather.temperature}°C, {weather.description}</p>
                <p className="text-xs text-emerald-700/80">Wind: {weather.wind_speed}m/s | Rain: {weather.rainfall}mm</p>
              </div>
            </Card>

            {weather.risk_alerts && weather.risk_alerts.length > 0 ? (
              <Card padding="sm" className={`border-l-4 ${weather.risk_alerts[0].severity === 'high' ? 'border-l-red-600' : 'border-l-amber-500'}`}>
                <p className="text-xs font-semibold text-emerald-700 uppercase">{t.highestRisk}</p>
                <p className="text-sm font-bold text-emerald-950">{weather.risk_alerts[0].type}</p>
                <p className="text-xs text-emerald-700/80 truncate">{weather.risk_alerts[0].message}</p>
              </Card>
            ) : (
              <Card padding="sm" className="border-l-4 border-l-emerald-500">
                <p className="text-xs font-semibold text-emerald-700 uppercase">{t.highestRisk}</p>
                <p className="text-sm font-bold text-emerald-800">Favorable Conditions</p>
                <p className="text-xs text-emerald-700/80">No significant weather risks detected.</p>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Feature Cards */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-emerald-950 mb-4">
          {t.whatWouldYouLikeToDo}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon="🌱"
            title={t.navRecommendation}
            description="Check how suitable your current crop is for your farm conditions."
            status="ready"
            onClick={() => router.push("/recommendation")}
            ctaLabel={t.getRecommendation}
          />

          <FeatureCard
            icon="🌦️"
            title={t.navWeather}
            description="View current weather and farming-specific risk alerts."
            status="ready"
            onClick={() => router.push("/weather")}
            ctaLabel={t.checkWeather}
          />

          <FeatureCard
            icon="🔬"
            title={t.navDisease}
            description="Upload a crop leaf image for AI-powered disease analysis."
            status="ready"
            onClick={() => router.push("/disease")}
            ctaLabel={t.analyzeCrop}
          />

          <FeatureCard
            icon="📋"
            title={t.navActionPlan}
            description="Get context-aware recommendations based on your analysis."
            status="ready"
            onClick={() => router.push("/actions")}
            ctaLabel={t.viewActions}
          />

          <FeatureCard
            icon="🔄"
            title={t.navFollowUp}
            description="Track your crop's progress by comparing images over time."
            status="ready"
            onClick={() => router.push("/followup")}
            ctaLabel={t.trackProgress}
          />
        </div>
      </div>
    </AppLayout>
  );
}
