import Link from "next/link";

/**
 * KISANIQ Landing Page
 *
 * Professional, trustworthy, agricultural.
 * No fake statistics. No unsupported claims.
 */

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
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-[var(--shadow-card)] flex items-center justify-center text-3xl sm:text-4xl">
          {icon}
        </div>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-kisan-green-700 text-white text-xs font-bold flex items-center justify-center">
          {number}
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold text-kisan-charcoal">{label}</p>
    </div>
  );
}

// ── Connector Arrow ──────────────────────────

function Arrow() {
  return (
    <div className="hidden sm:flex items-center text-kisan-green-300 mx-1">
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
    <div className="bg-white rounded-2xl border border-kisan-border p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200">
      <span className="text-3xl mb-4 block" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-lg font-bold text-kisan-charcoal mb-2">{title}</h3>
      <p className="text-sm text-kisan-text-light leading-relaxed">
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
      <span className="flex-1 text-right text-kisan-text-light line-through decoration-kisan-danger/40">
        {before}
      </span>
      <span className="text-kisan-green-600 font-bold text-lg" aria-hidden="true">
        →
      </span>
      <span className="flex-1 text-kisan-green-800 font-semibold">{after}</span>
    </div>
  );
}

// ══════════════════════════════════════════════
// Landing Page
// ══════════════════════════════════════════════

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-kisan-bg">
      {/* ── Navigation ─────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-kisan-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-kisan-green-700 flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <span className="font-bold text-kisan-charcoal text-xl tracking-tight">
              KISANIQ
            </span>
          </div>
          <Link
            href="/farm/new"
            className="bg-kisan-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-kisan-green-800 transition-colors"
          >
            Start Farm Analysis
          </Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23256741' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-kisan-green-50 border border-kisan-green-200 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-kisan-green-500 rounded-full" />
              <span className="text-xs font-semibold text-kisan-green-800 tracking-wide uppercase">
                AI-Powered Farmer Decision Support
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-kisan-charcoal leading-tight tracking-tight">
              KISAN
              <span className="text-kisan-green-700">IQ</span>
            </h1>

            {/* Tagline */}
            <p className="mt-6 text-lg sm:text-xl text-kisan-text-light max-w-2xl mx-auto leading-relaxed">
              Don&apos;t just detect the problem.
              <br />
              <span className="text-kisan-green-700 font-semibold">
                Decide what to do next.
              </span>
            </p>

            {/* Description */}
            <p className="mt-4 text-base text-kisan-text-light max-w-xl mx-auto">
              Combining farm context, weather intelligence, and AI crop analysis
              to help farmers make informed decisions — from planting to
              follow-up.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/farm/new"
                className="w-full sm:w-auto bg-kisan-green-700 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-kisan-green-800 transition-colors shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] text-center"
                id="cta-start-analysis"
              >
                🌱 Start Farm Analysis
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto border-2 border-kisan-green-600 text-kisan-green-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-kisan-green-50 transition-colors text-center"
                id="cta-how-it-works"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem Section ────────────────── */}
      <section className="bg-white border-y border-kisan-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-kisan-charcoal mb-6">
              The Problem
            </h2>
            <p className="text-kisan-text-light text-lg leading-relaxed mb-8">
              Most crop disease tools stop at{" "}
              <span className="font-semibold text-kisan-text">detection</span>.
              They tell you <em>what</em> the disease is — but not{" "}
              <em>what to do about it</em>. Without understanding severity,
              weather risk, and the right timing, detection alone isn&apos;t
              enough to protect your crop.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-kisan-earth-50 rounded-xl p-5">
                <span className="text-3xl block mb-2" aria-hidden="true">
                  📱
                </span>
                <p className="text-sm text-kisan-text font-medium">
                  Existing tools give you a disease name
                </p>
              </div>
              <div className="bg-kisan-earth-50 rounded-xl p-5">
                <span className="text-3xl block mb-2" aria-hidden="true">
                  ❓
                </span>
                <p className="text-sm text-kisan-text font-medium">
                  But not how severe it is or what to do
                </p>
              </div>
              <div className="bg-kisan-earth-50 rounded-xl p-5">
                <span className="text-3xl block mb-2" aria-hidden="true">
                  🌧️
                </span>
                <p className="text-sm text-kisan-text font-medium">
                  And ignore weather, soil, and timing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────── */}
      <section id="how-it-works" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-kisan-charcoal text-center mb-4">
            How KISANIQ Works
          </h2>
          <p className="text-kisan-text-light text-center max-w-xl mx-auto mb-12">
            From your farm data to actionable decisions — a complete pipeline.
          </p>

          {/* Pipeline */}
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

      {/* ── Core Capabilities ──────────────── */}
      <section className="bg-white border-y border-kisan-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-kisan-charcoal text-center mb-12">
            Core Capabilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CapabilityCard
              icon="🌱"
              title="Crop Recommendation"
              description="Get crop suitability scores based on your soil, water availability, season, and expected weather — with transparent factor-by-factor breakdown."
            />
            <CapabilityCard
              icon="🌦️"
              title="Weather Risk Awareness"
              description="Live weather data converted into farming-specific risk alerts — waterlogging risk, heat stress, dry spell warnings, and more."
            />
            <CapabilityCard
              icon="🦠"
              title="AI Disease Analysis"
              description="Upload a crop leaf image for AI-powered disease classification with confidence scoring and estimated visible affected area."
            />
            <CapabilityCard
              icon="📊"
              title="Severity Assessment"
              description="Estimate the visible affected area of your crop using image analysis. Understand whether the situation is low, moderate, or high severity."
            />
            <CapabilityCard
              icon="📋"
              title="Action Plan"
              description="Context-aware recommendations: what to do now, what to monitor, and when to seek expert help — tailored to your crop, stage, and conditions."
            />
            <CapabilityCard
              icon="🔄"
              title="Follow-up Monitoring"
              description="Track your crop's recovery by comparing images over time. See whether conditions are improving, stable, or worsening."
            />
          </div>
        </div>
      </section>

      {/* ── Detection → Decision ──────────── */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-kisan-charcoal text-center mb-4">
              From Detection to Decision
            </h2>
            <p className="text-kisan-text-light text-center mb-10">
              KISANIQ goes beyond identification.
            </p>

            <div className="bg-white rounded-2xl border border-kisan-border p-6 sm:p-8 shadow-[var(--shadow-card)] space-y-5">
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

      {/* ── Final CTA ─────────────────────── */}
      <section className="bg-kisan-green-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to make better decisions for your farm?
          </h2>
          <p className="text-kisan-green-200 mb-8 max-w-lg mx-auto">
            Start with your farm profile. Get crop recommendations, weather
            alerts, and AI-powered disease analysis.
          </p>
          <Link
            href="/farm/new"
            className="inline-block bg-white text-kisan-green-800 px-8 py-4 rounded-xl text-lg font-bold hover:bg-kisan-green-50 transition-colors shadow-[var(--shadow-elevated)]"
            id="cta-footer-start"
          >
            🌱 Start Farm Analysis
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────── */}
      <footer className="bg-kisan-charcoal text-gray-400 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-kisan-green-700 flex items-center justify-center text-white font-bold text-sm">
                K
              </div>
              <span className="font-bold text-white text-sm">KISANIQ</span>
            </div>
            <p className="text-xs text-center sm:text-right">
              Built by Team 4Bits for Morrow 1.0
              <br />
              <span className="opacity-70">
                This tool provides decision support and does not replace
                agricultural experts.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
