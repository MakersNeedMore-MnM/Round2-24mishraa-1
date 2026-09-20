"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const options: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "hi", label: "हिंदी (Hindi)", flag: "🇮🇳" },
    { code: "mr", label: "मराठी (Marathi)", flag: "🇮🇳" },
    { code: "te", label: "తెలుగు (Telugu)", flag: "🇮🇳" },
    { code: "ta", label: "தமிழ் (Tamil)", flag: "🇮🇳" },
  ];

  return (
    <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-700/60 rounded-xl px-3 py-1.5 shadow-sm">
      <span className="text-sm">🌐</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-transparent text-emerald-100 font-medium text-xs sm:text-sm focus:outline-none cursor-pointer pr-1"
      >
        {options.map((opt) => (
          <option key={opt.code} value={opt.code} className="bg-emerald-950 text-white py-1">
            {opt.flag} {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
