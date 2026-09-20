"use client";

import React, { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  Button,
  PageHeader,
  Alert,
  LoadingState,
  StatusBadge,
} from "@/components/ui";
import { compareFollowUp } from "@/lib/api/client";
import { useLanguage } from "@/context/LanguageContext";

interface ComparisonResult {
  previous_affected_pct: number;
  current_affected_pct: number;
  change_pct: number;
  status: "IMPROVING" | "STABLE" | "WORSENING";
  summary: string;
  recommendation: string;
}

export default function FollowUpPage() {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previousPct, setPreviousPct] = useState<number>(35.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  };

  const handleCompare = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    try {
      const data = await compareFollowUp(selectedFile, previousPct);
      setResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to run follow-up comparison.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <PageHeader
          title={t.followupTitle}
          subtitle={t.followupSubtitle}
        />

        {error && (
          <Alert variant="error" onDismiss={() => setError(null)}>
            {error}
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Card */}
          <Card className="flex flex-col justify-between p-6">
            <div>
              <h2 className="text-xl font-semibold text-emerald-950 mb-2">
                {t.uploadFollowupTitle}
              </h2>
              <p className="text-sm text-emerald-700/80 mb-4">
                {t.uploadFollowupSub}
              </p>

              <div className="mb-6 bg-emerald-50 p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 uppercase">
                    Baseline Affected Area
                  </label>
                  <span className="text-xs text-emerald-700">Initial scan leaf damage</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={previousPct}
                    onChange={(e) => setPreviousPct(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-right text-sm font-bold border rounded border-emerald-300 bg-white"
                  />
                  <span className="text-sm font-bold text-emerald-900">%</span>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />

              {!previewUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors flex flex-col items-center justify-center min-h-[220px]"
                >
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-2xl mb-3 text-emerald-700">
                    📷
                  </div>
                  <p className="text-emerald-900 font-medium mb-1">
                    {t.uploadFollowupTitle}
                  </p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-emerald-200 bg-black/5 flex justify-center items-center max-h-[260px]">
                  <img
                    src={previewUrl}
                    alt="Follow-up preview"
                    className="object-contain max-h-[240px] rounded-lg"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2 text-xs hover:bg-red-700 shadow"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="primary"
                onClick={handleCompare}
                disabled={!selectedFile || loading}
                loading={loading}
                className="flex-1 justify-center py-3 text-base"
              >
                {loading ? "Analyzing Recovery..." : t.compareButton}
              </Button>
            </div>
          </Card>

          {/* Results Column */}
          <div className="space-y-6">
            {loading && (
              <Card className="p-8 flex flex-col items-center justify-center min-h-[350px]">
                <LoadingState message="Comparing leaf lesion area & computing recovery trajectory..." />
              </Card>
            )}

            {!loading && !result && (
              <Card className="p-8 text-center flex flex-col items-center justify-center min-h-[350px] border-dashed border-emerald-200">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="text-lg font-medium text-emerald-900 mb-1">
                  Ready for Recovery Tracking
                </h3>
                <p className="text-sm text-emerald-700/70 max-w-xs">
                  Upload your follow-up leaf photo to compare affected leaf area against baseline disease metrics.
                </p>
              </Card>
            )}

            {!loading && result && (
              <Card className="p-6 space-y-6 border-t-4 border-t-emerald-600">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                      {t.recoveryStatus}
                    </span>
                    <h3 className="text-2xl font-bold text-emerald-950">
                      {result.status === "IMPROVING"
                        ? `${t.improvingStatus} 🌿`
                        : result.status === "STABLE"
                        ? `${t.stableStatus} ⚖️`
                        : `${t.worseningStatus} ⚠️`}
                    </h3>
                  </div>

                  <StatusBadge status={result.status.toLowerCase() as "improving" | "stable" | "worsening"} />
                </div>

                {/* Leaf Area Delta Stat Cards */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <p className="text-[10px] uppercase font-semibold text-gray-500">Baseline Area</p>
                    <p className="text-lg font-bold text-gray-800">{result.previous_affected_pct}%</p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <p className="text-[10px] uppercase font-semibold text-emerald-700">Current Area</p>
                    <p className="text-lg font-bold text-emerald-900">{result.current_affected_pct}%</p>
                  </div>
                  <div className={`p-3 rounded-xl border ${result.change_pct <= 0 ? 'bg-green-100 border-green-300 text-green-900' : 'bg-red-100 border-red-300 text-red-900'}`}>
                    <p className="text-[10px] uppercase font-semibold">Change</p>
                    <p className="text-lg font-bold">{result.change_pct}%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-950 mb-1">
                      Assessment Summary
                    </h4>
                    <p className="text-sm text-emerald-900 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                      {result.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-emerald-950 mb-1 flex items-center gap-1">
                      <span>💡</span> Recommended Follow-Up Action
                    </h4>
                    <p className="text-sm text-emerald-950 bg-emerald-100/60 p-3 rounded-xl border border-emerald-200 font-medium">
                      {result.recommendation}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
