"use client";

import React, { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  Badge,
  Button,
  PageHeader,
  Alert,
  LoadingState,
} from "@/components/ui";
import { analyzeDisease } from "@/lib/api/client";
import type { DiseaseAnalysisResult } from "@/types";

export default function DiseaseDoctorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseAnalysisResult | null>(null);

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please drop a valid image file.");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeDisease(selectedFile);
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to analyze image.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <PageHeader
          title="AI Disease Doctor 🔬"
          subtitle="Don't just detect the problem. Decide what to do next."
        />

        {error && (
          <Alert variant="error" onDismiss={() => setError(null)}>
            {error}
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="flex flex-col justify-between p-6">
            <div>
              <h2 className="text-xl font-semibold text-emerald-950 mb-2">
                Crop Leaf Upload
              </h2>
              <p className="text-sm text-emerald-700/80 mb-6">
                Upload a clear close-up photo of the affected plant leaf for AI diagnosis.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />

              {!previewUrl ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors flex flex-col items-center justify-center min-h-[260px]"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl mb-4 text-emerald-700">
                    📸
                  </div>
                  <p className="text-emerald-900 font-medium mb-1">
                    Click to upload or drag & drop leaf photo
                  </p>
                  <p className="text-xs text-emerald-600">
                    Supports JPG, PNG, WEBP up to 10MB
                  </p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-emerald-200 bg-black/5 flex justify-center items-center max-h-[300px]">
                  <img
                    src={previewUrl}
                    alt="Selected leaf preview"
                    className="object-contain max-h-[280px] rounded-lg"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2 text-xs hover:bg-red-700 shadow"
                    title="Remove photo"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="primary"
                onClick={handleAnalyze}
                disabled={!selectedFile || loading}
                loading={loading}
                className="flex-1 justify-center py-3 text-base"
              >
                {loading ? "Analyzing Leaf Image..." : "Analyze Image 🔍"}
              </Button>
              {selectedFile && (
                <Button variant="secondary" onClick={handleReset} disabled={loading}>
                  Reset
                </Button>
              )}
            </div>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {loading && (
              <Card className="p-8 flex flex-col items-center justify-center min-h-[380px]">
                <LoadingState message="Running MobileNetV2 Vision Model & Decision Rules..." />
              </Card>
            )}

            {!loading && !result && (
              <Card className="p-8 text-center flex flex-col items-center justify-center min-h-[380px] border-dashed border-emerald-200">
                <div className="text-4xl mb-3">🌿</div>
                <h3 className="text-lg font-medium text-emerald-900 mb-1">
                  Ready for AI Analysis
                </h3>
                <p className="text-sm text-emerald-700/70 max-w-xs">
                  Upload a crop leaf image on the left and click &apos;Analyze Image&apos; to receive instant diagnosis & action recommendations.
                </p>
              </Card>
            )}

            {!loading && result && (
              <Card className="p-6 space-y-6">
                {/* Primary Diagnosis Header */}
                <div className="border-b border-emerald-100 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                      Primary Diagnosis
                    </span>
                    <Badge
                      color={
                        result.predictions[0]?.is_healthy ? "green" : "red"
                      }
                    >
                      {result.predictions[0]?.is_healthy ? "Healthy" : "Infected / Disease Detected"}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-950">
                    {result.primary_diagnosis.replace(/___/g, " — ").replace(/_/g, " ")}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-emerald-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          result.predictions[0]?.is_healthy
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }`}
                        style={{
                          width: `${Math.round(
                            (result.predictions[0]?.confidence || 0) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-emerald-800">
                      {Math.round((result.predictions[0]?.confidence || 0) * 100)}% Confidence
                    </span>
                  </div>
                </div>

                {/* Description & Treatment */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-900 mb-1">
                      Disease Summary
                    </h4>
                    <p className="text-sm text-emerald-800/90 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                      {result.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-emerald-900 mb-1 flex items-center gap-1">
                      <span>💡</span> Recommended Action
                    </h4>
                    <p className="text-sm text-emerald-950 leading-relaxed bg-emerald-100/60 p-3 rounded-lg border border-emerald-200 font-medium">
                      {result.recommended_treatment}
                    </p>
                  </div>
                </div>

                {/* ML Model Confidence Breakdown */}
                <div className="border-t border-emerald-100 pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3">
                    Top ML Predictions Breakdown
                  </h4>
                  <div className="space-y-2">
                    {result.predictions.map((pred, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-emerald-900">
                        <span className="truncate max-w-[220px]">
                          {pred.disease_name.replace(/___/g, " — ").replace(/_/g, " ")}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-600"
                              style={{ width: `${Math.round(pred.confidence * 100)}%` }}
                            />
                          </div>
                          <span className="font-mono text-emerald-700 w-10 text-right">
                            {Math.round(pred.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
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
