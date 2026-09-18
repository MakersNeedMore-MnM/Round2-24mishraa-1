"use client";

import React, { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  Badge,
  PageHeader,
  Alert,
  LoadingState,
  ProgressBar,
} from "@/components/ui";
import { getActionPlan } from "@/lib/api/client";
import type { Farm } from "@/types";

interface ActionTask {
  id: string;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  timeline: string;
  description: string;
}

export default function ActionPlanPage() {
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<ActionTask[]>([]);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    getActionPlan({
      crop: farm?.crop || "Cotton",
      crop_stage: farm?.crop_stage || "Vegetative",
      weather_risk: "Heavy Rain",
    })
      .then((data) => {
        if (isMounted) setTasks(data);
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Failed to load action plan.";
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

  const toggleTask = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPct = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <PageHeader
          title="Smart Action Plan 📋"
          subtitle="Prioritized, step-by-step decision support tailored to your farm's stage and weather risks."
        />

        {error && (
          <Alert variant="error" onDismiss={() => setError(null)}>
            {error}
          </Alert>
        )}

        {loading && (
          <Card className="p-8 flex flex-col items-center justify-center min-h-[300px]">
            <LoadingState message="Generating personalized agricultural action plan..." />
          </Card>
        )}

        {!loading && tasks.length > 0 && (
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="p-6 bg-emerald-50/60 border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-emerald-950">
                    Action Plan Progress
                  </h3>
                  <p className="text-xs text-emerald-800">
                    {completedCount} of {tasks.length} tasks completed
                  </p>
                </div>
                <Badge color={progressPct === 100 ? "green" : "yellow"} className="text-sm px-3 py-1">
                  {progressPct === 100 ? "Complete 🎉" : "In Progress"}
                </Badge>
              </div>

              <ProgressBar value={progressPct} color="green" showValue={false} />
            </Card>

            {/* Task List */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-kisan-charcoal flex items-center gap-2">
                <span>⚡</span> Recommended Action Steps
              </h3>

              {tasks.map((task) => {
                const isDone = !!completed[task.id];
                return (
                  <Card
                    key={task.id}
                    className={`p-5 transition-all duration-200 border-l-4 ${
                      isDone
                        ? "bg-gray-50/70 border-l-gray-400 opacity-75"
                        : task.priority === "high"
                        ? "border-l-red-500 hover:border-l-red-600"
                        : task.priority === "medium"
                        ? "border-l-amber-500 hover:border-l-amber-600"
                        : "border-l-emerald-500 hover:border-l-emerald-600"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleTask(task.id)}
                        className="mt-1 h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />

                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4
                            className={`text-base font-bold ${
                              isDone ? "line-through text-gray-500" : "text-kisan-charcoal"
                            }`}
                          >
                            {task.title}
                          </h4>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                              {task.category}
                            </span>
                            <Badge
                              color={
                                task.priority === "high"
                                  ? "red"
                                  : task.priority === "medium"
                                  ? "yellow"
                                  : "green"
                              }
                            >
                              {task.priority.toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        <p className={`text-sm leading-relaxed ${isDone ? "text-gray-400" : "text-kisan-text"}`}>
                          {task.description}
                        </p>

                        <div className="pt-2 text-xs font-medium text-emerald-700 flex items-center gap-1">
                          <span>⏱️ Timeline:</span> {task.timeline}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
