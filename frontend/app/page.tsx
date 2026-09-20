"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

// ── Pipeline Step ────────────────────────────

function PipelineStep({
  icon,
  label,
  number,
}: {
  icon: string;
  label: string;
  number: number;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl sm:text-4xl border border-emerald-100">
          {icon}
        </div>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
          {number}
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold text-emerald-950">{label}</p>
    </div>
  );
}

// ── Connector Arrow ──────────────────────────

function Arrow() {
  return (
    <div className="hidden sm:flex items-center text-emerald-300 mx-1">
      <svg
        width="32"
        height="16"
        viewBox="0 0 32 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 8h28m0 0l-6-6m6 6l-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ── Capability Card ──────────────────────────

function CapabilityCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-xs hover:shadow-md transition-shadow duration-200">
      <span className="text-3xl mb-4 block" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-lg font-bold text-emerald-950 mb-2">{title}</h3>
      <p className="text-sm text-emerald-700/80 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ── Differentiator Row ───────────────────────

function DifferentiatorRow({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base">
      <span className="flex-1 text-right text-gray-400 line-through">
        {before}
      </span>
      <span className="text-emerald-600 font-bold text-lg" aria-hidden="true">
        →
      </span>
      <span className="flex-1 text-emerald-900 font-semibold">{after}</span>
    </div>
  );
}

// ══════════════════════════════════════════════
// Landing Page with Top Bar Language Selector
// ══════════════════════════════════════════════

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-emerald-50/20">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-sm border-b border-emerald-900 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <span className="font-bold text-white text-xl tracking-tight">
              KISANIQ
            </span>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link
              href="/farm/new"
              className="bg-emerald-600 text-white px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
            >
              {t.startAnalysis}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-emerald-900 tracking-wide uppercase">
                AI-POWERED FARMER DECISION SUPPORT
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-emerald-950 leading-tight tracking-tight">
              KISAN<span className="text-emerald-700">IQ</span>
            </h1>

            {/* Tagline */}
            <p className="mt-6 text-xl sm:text-2xl text-emerald-800 max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle1}
              <br />
              <span className="text-emerald-700 font-bold">
                {t.heroSubtitle2}
              </span>
            </p>

            {/* Description */}
            <p className="mt-4 text-base text-emerald-700/80 max-w-xl mx-auto">
              {t.heroDescription}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/farm/new"
                className="w-full sm:w-auto bg-emerald-800 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-900 transition-colors shadow-md text-center"
              >
                🌱 {t.startAnalysis}
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto border-2 border-emerald-700 text-emerald-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-100/50 transition-colors text-center"
              >
                {t.howItWorks}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white border-y border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mb-6">
              {t.problemTitle}
            </h2>
            <p className="text-emerald-800 text-lg leading-relaxed mb-8">
              Most crop disease tools stop at <span className="font-semibold text-emerald-950">detection</span>. They tell you <em>what</em> the disease is — but not <em>what to do about it</em>. Without understanding severity, weather risk, and the right timing, detection alone isn&apos;t enough to protect your crop.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-emerald-50/60 rounded-xl p-5 border border-emerald-100">
                <span className="text-3xl block mb-2" aria-hidden="true">📱</span>
                <p className="text-sm text-emerald-900 font-medium">Existing tools give you a disease name</p>
              </div>
              <div className="bg-emerald-50/60 rounded-xl p-5 border border-emerald-100">
                <span className="text-3xl block mb-2" aria-hidden="true">❓</span>
                <p className="text-sm text-emerald-900 font-medium">But not how severe it is or what to do</p>
              </div>
              <div className="bg-emerald-50/60 rounded-xl p-5 border border-emerald-100">
                <span className="text-3xl block mb-2" aria-hidden="true">🌧️</span>
                <p className="text-sm text-emerald-900 font-medium">And ignore weather, soil, and timing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 text-center mb-4">
            {t.howItWorks}
          </h2>
          <p className="text-emerald-700/80 text-center max-w-xl mx-auto mb-12">
            From your farm data to actionable decisions — a complete pipeline.
          </p>

          <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-2">
            <PipelineStep icon="🌾" label="Farm Data" number={1} />
            <Arrow />
            <PipelineStep icon="🌦️" label="Weather" number={2} />
            <Arrow />
            <PipelineStep icon="📸" label="Crop Image" number={3} />
            <Arrow />
            <PipelineStep icon="🤖" label="AI Analysis" number={4} />
            <Arrow />
            <PipelineStep icon="⚠️" label="Risk" number={5} />
            <Arrow />
            <PipelineStep icon="✅" label="Decision" number={6} />
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="bg-white border-y border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 text-center mb-12">
            {t.capabilitiesTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CapabilityCard
              icon="🌱"
              title={t.navRecommendation}
              description="Get crop suitability scores based on your soil, water availability, season, and expected weather — with transparent factor-by-factor breakdown."
            />
            <CapabilityCard
              icon="🌦️"
              title={t.navWeather}
              description="Live weather data converted into farming-specific risk alerts — waterlogging risk, heat stress, dry spell warnings, and more."
            />
            <CapabilityCard
              icon="🔬"
              title={t.navDisease}
              description="Upload a crop leaf image for AI-powered disease classification with confidence scoring and estimated visible affected area."
            />
            <CapabilityCard
              icon="📊"
              title="Severity Assessment"
              description="Estimate the visible affected area of your crop using image analysis. Understand whether the situation is low, moderate, or high severity."
            />
            <CapabilityCard
              icon="📋"
              title={t.navActionPlan}
              description="Context-aware recommendations: what to do now, what to monitor, and when to seek expert help — tailored to your crop, stage, and conditions."
            />
            <CapabilityCard
              icon="🔄"
              title={t.navFollowUp}
              description="Track your crop's recovery by comparing images over time. See whether conditions are improving, stable, or worsening."
            />
          </div>
        </div>
      </section>

      {/* Detection -> Decision */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 text-center mb-4">
              From Detection to Decision
            </h2>
            <p className="text-emerald-700/80 text-center mb-10">
              KISANIQ goes beyond identification.
            </p>

            <div className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 shadow-xs space-y-5">
              <DifferentiatorRow
                before="Disease name only"
                after="Disease + severity + affected area"
              />
              <DifferentiatorRow
                before="No context"
                after="Weather + soil + crop stage"
              />
              <DifferentiatorRow
                before="Generic advice"
                after="Context-aware action plan"
              />
              <DifferentiatorRow
                before="One-time scan"
                after="Follow-up monitoring"
              />
              <DifferentiatorRow
                before="Black-box AI"
                after="Transparent confidence scoring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-emerald-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {t.readyToStart}
          </h2>
          <p className="text-emerald-200 mb-8 max-w-lg mx-auto">
            Start with your farm profile. Get crop recommendations, weather alerts, and AI-powered disease analysis.
          </p>
          <Link
            href="/farm/new"
            className="inline-block bg-white text-emerald-950 px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-100 transition-colors shadow-lg"
          >
            🌱 {t.startAnalysis}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-300/80 border-t border-emerald-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-sm">
                K
              </div>
              <span className="font-bold text-white text-sm">KISANIQ</span>
            </div>
            <p className="text-xs text-center sm:text-right text-emerald-400">
              Built by Team 4Bits for Morrow 1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
