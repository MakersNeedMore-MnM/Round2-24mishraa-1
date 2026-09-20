"use client";

import React, { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  PageHeader,
  EmptyState,
  LoadingState,
  Alert,
} from "@/components/ui";
import { getWeather, APIError } from "@/lib/api/client";
import type { Farm, WeatherData } from "@/types";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function WeatherPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchWeather(state: string, district: string) {
    try {
      const data = await getWeather(state, district);
      setWeather(data);
    } catch (err) {
      if (err instanceof APIError) {
        setError(err.message);
      } else {
        setError("Failed to fetch weather data.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("kisaniq_farm");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFarm(parsed);
        fetchWeather(parsed.state, parsed.district);
      } catch {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <LoadingState message="Loading weather data..." />
      </AppLayout>
    );
  }

  if (!farm) {
    return (
      <AppLayout>
        <EmptyState
          icon="🌾"
          title="No farm profile found"
          description="Create a farm profile to see weather intelligence."
          action={
            <button
              onClick={() => router.push("/farm/new")}
              className="bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-800"
            >
              Create Farm Profile
            </button>
          }
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader
        title={t.weatherTitle}
        subtitle={`${t.weatherSubtitle} (${farm.district}, ${farm.state})`}
      />

      {error && (
        <Alert variant="error" title="Could not load weather" className="mb-6">
          {error}
        </Alert>
      )}

      {weather && (
        <>
          {/* Current Weather Card */}
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-emerald-950 mb-4 flex items-center gap-2">
              <span aria-hidden="true">🌤️</span> {t.currentConditions}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-emerald-50/60 rounded-xl px-4 py-3">
                <p className="text-[10px] text-emerald-700 uppercase font-semibold">Temperature</p>
                <p className="text-xl font-bold text-emerald-950">{weather.temperature}°C</p>
              </div>
              <div className="bg-emerald-50/60 rounded-xl px-4 py-3">
                <p className="text-[10px] text-emerald-700 uppercase font-semibold">{t.rainfallLabel}</p>
                <p className="text-xl font-bold text-emerald-950">{weather.rainfall} mm</p>
              </div>
              <div className="bg-emerald-50/60 rounded-xl px-4 py-3">
                <p className="text-[10px] text-emerald-700 uppercase font-semibold">{t.humidityLabel}</p>
                <p className="text-xl font-bold text-emerald-950">{weather.humidity}%</p>
              </div>
              <div className="bg-emerald-50/60 rounded-xl px-4 py-3">
                <p className="text-[10px] text-emerald-700 uppercase font-semibold">{t.windSpeedLabel}</p>
                <p className="text-xl font-bold text-emerald-950">{weather.wind_speed} m/s</p>
              </div>
            </div>
          </Card>

          {/* Risk Alerts */}
          <h2 className="text-lg font-bold text-emerald-950 mb-4">
            {t.riskAlertsTitle}
          </h2>
          {weather.risk_alerts && weather.risk_alerts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 mb-8">
              {weather.risk_alerts.map((alert, idx) => {
                const isHigh = alert.severity === "high";
                const isModerate = alert.severity === "moderate";
                const variant = isHigh ? "error" : isModerate ? "warning" : "info";
                
                return (
                  <Alert key={idx} variant={variant} title={alert.type}>
                    <p className="mb-2">{alert.message}</p>
                    {alert.actions && alert.actions.length > 0 && (
                      <ul className="list-disc list-inside text-sm mt-2 font-medium">
                        {alert.actions.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    )}
                  </Alert>
                );
              })}
            </div>
          ) : (
            <Alert variant="success" title="Weather Favorable" className="mb-8">
              Current conditions are favorable for farming operations.
            </Alert>
          )}

          {/* Forecast */}
          {weather.forecast && weather.forecast.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-emerald-950 mb-4">
                {t.forecastTitle}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {weather.forecast.map((day, idx) => {
                  const parsedDate = new Date(day.date);
                  const dateLabel = !isNaN(parsedDate.getTime())
                    ? parsedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
                    : day.date;
                  return (
                    <div key={idx} className="bg-white border border-emerald-100 rounded-xl p-3 text-center flex flex-col items-center shadow-xs">
                      <p className="text-xs font-semibold text-emerald-700 mb-1">{dateLabel}</p>
                      {day.icon && (
                        <img 
                          src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                          alt={day.description}
                          className="w-10 h-10 my-1"
                        />
                      )}
                      <p className="text-sm font-bold text-emerald-950 mb-1">
                        {Math.round(day.temp_max)}°C
                      </p>
                      <p className="text-[10px] text-emerald-700/80 capitalize truncate w-full">
                        {day.description}
                      </p>
                      {day.rainfall > 0 && (
                        <p className="text-[10px] font-semibold text-sky-600 mt-1">
                          {day.rainfall.toFixed(1)} mm
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </AppLayout>
  );
}
