"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

// ══════════════════════════════════════════════
// KISANIQ — Navigation Layout with Multi-Language Support
// ══════════════════════════════════════════════

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-emerald-800 transition-colors">
        K
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-emerald-950 text-lg tracking-tight">
          KISANIQ
        </span>
        <span className="text-[9px] text-emerald-600 font-medium tracking-wider uppercase">
          Decision Support
        </span>
      </div>
    </Link>
  );
}

// ── Desktop Sidebar ─────────────────────────

function DesktopNav({ pathname }: { pathname: string }) {
  const { t } = useLanguage();

  const navItems = [
    { href: "/dashboard", label: t.navDashboard, icon: "🏠" },
    { href: "/recommendation", label: t.navRecommendation, icon: "🌱" },
    { href: "/weather", label: t.navWeather, icon: "🌦️" },
    { href: "/disease", label: t.navDisease, icon: "🔬" },
    { href: "/actions", label: t.navActionPlan, icon: "📋" },
    { href: "/followup", label: t.navFollowUp, icon: "🔄" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-emerald-100 min-h-screen fixed left-0 top-0 z-30 shadow-sm">
      <div className="p-5 border-b border-emerald-100 flex items-center justify-between">
        <Logo />
      </div>
      <div className="p-4 border-b border-emerald-100 bg-emerald-950">
        <LanguageSelector />
      </div>
      <nav className="flex-1 py-4 px-3" aria-label="Main navigation">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                    transition-colors duration-150
                    ${
                      isActive
                        ? "bg-emerald-100/70 text-emerald-950 font-semibold shadow-xs"
                        : "text-emerald-800 hover:bg-emerald-50 hover:text-emerald-950"
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-emerald-100">
        <p className="text-[10px] text-emerald-600 text-center font-medium">
          KISANIQ v0.1 — Team 4Bits
        </p>
      </div>
    </aside>
  );
}

// ── Mobile Top Bar ──────────────────────────

function MobileTopBar({
  menuOpen,
  onToggle,
}: {
  menuOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-emerald-950 border-b border-emerald-900 text-white shadow-md">
      <div className="flex items-center justify-between px-3 h-14">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-emerald-200 hover:bg-emerald-800 transition-colors"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Mobile Bottom Nav ───────────────────────

function MobileBottomNav({ pathname }: { pathname: string }) {
  const { t } = useLanguage();
  const bottomItems = [
    { href: "/dashboard", label: t.navDashboard, icon: "🏠" },
    { href: "/recommendation", label: t.navRecommendation, icon: "🌱" },
    { href: "/disease", label: t.navDisease, icon: "🔬" },
    { href: "/actions", label: t.navActionPlan, icon: "📋" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-emerald-100 shadow-lg">
      <div className="flex items-stretch">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex-1 flex flex-col items-center justify-center py-2 gap-0.5
                text-[10px] font-medium transition-colors
                ${isActive ? "text-emerald-800 font-bold" : "text-emerald-600/70"}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate max-w-[70px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// ── AppLayout ───────────────────────────────

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-emerald-50/20">
      <DesktopNav pathname={pathname} />

      <MobileTopBar
        menuOpen={menuOpen}
        onToggle={() => setMenuOpen((v) => !v)}
      />

      <main className="lg:ml-64 pt-14 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>

      <MobileBottomNav pathname={pathname} />
    </div>
  );
}
