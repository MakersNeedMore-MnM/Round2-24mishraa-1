"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ══════════════════════════════════════════════
// KISANIQ — Navigation Layout
// ══════════════════════════════════════════════

interface NavItem {
  href: string;
  label: string;
  icon: string;
  mobileLabel?: string;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠", mobileLabel: "Home" },
  { href: "/recommendation", label: "Crop Recommendation", icon: "🌱", mobileLabel: "Crops" },
  { href: "/weather", label: "Weather", icon: "🌦️", mobileLabel: "Weather" },
  { href: "/disease", label: "Disease Doctor", icon: "🦠", mobileLabel: "Analyze" },
  { href: "/actions", label: "Action Plan", icon: "📋", mobileLabel: "Actions" },
  { href: "/followup", label: "Follow-up", icon: "🔄", mobileLabel: "Track" },
];

// ── Logo ────────────────────────────────────

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-9 h-9 rounded-xl bg-kisan-green-700 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-kisan-green-800 transition-colors">
        K
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-kisan-charcoal text-lg tracking-tight">
          KISANIQ
        </span>
        <span className="text-[9px] text-kisan-text-light font-medium tracking-wider uppercase">
          Decision Support
        </span>
      </div>
    </Link>
  );
}

// ── Desktop Sidebar ─────────────────────────

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-kisan-border min-h-screen fixed left-0 top-0 z-30">
      <div className="p-5 border-b border-kisan-border">
        <Logo />
      </div>
      <nav className="flex-1 py-4 px-3" aria-label="Main navigation">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                    transition-colors duration-150
                    ${
                      isActive
                        ? "bg-kisan-green-50 text-kisan-green-800"
                        : "text-kisan-text-light hover:bg-kisan-green-50/50 hover:text-kisan-text"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-kisan-border">
        <p className="text-[10px] text-kisan-text-light text-center">
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
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-kisan-border">
      <div className="flex items-center justify-between px-4 h-14">
        <Logo />
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-kisan-green-50 transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6 text-kisan-charcoal"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}

// ── Mobile Bottom Nav ───────────────────────

function MobileBottomNav({ pathname }: { pathname: string }) {
  const bottomItems = navItems.slice(0, 4);
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-kisan-border"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex-1 flex flex-col items-center justify-center py-2 gap-0.5
                text-[10px] font-medium transition-colors
                ${
                  isActive
                    ? "text-kisan-green-700"
                    : "text-kisan-text-light"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>
              {item.mobileLabel || item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// ── Mobile Drawer ───────────────────────────

function MobileDrawer({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  if (!open) return null;
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div className="fixed top-14 left-0 right-0 bottom-0 z-50 bg-white lg:hidden overflow-y-auto animate-[slideDown_0.2s_ease-out]">
        <nav className="p-4" aria-label="Mobile navigation menu">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium
                      transition-colors
                      ${
                        isActive
                          ? "bg-kisan-green-50 text-kisan-green-800"
                          : "text-kisan-text-light hover:bg-kisan-green-50/50"
                      }
                    `}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

// ── AppLayout ───────────────────────────────

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-kisan-bg">
      {/* Desktop */}
      <DesktopNav pathname={pathname} />

      {/* Mobile */}
      <MobileTopBar
        menuOpen={menuOpen}
        onToggle={() => setMenuOpen((v) => !v)}
      />
      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />

      {/* Main Content */}
      <main className="lg:ml-64 pt-14 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav pathname={pathname} />
    </div>
  );
}
