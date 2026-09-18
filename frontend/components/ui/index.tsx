"use client";

import React from "react";

// ══════════════════════════════════════════════
// KISANIQ Design System — UI Components
// ══════════════════════════════════════════════

// ── Button ──────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-kisan-green-700 text-white hover:bg-kisan-green-800 active:bg-kisan-green-900",
  secondary:
    "bg-kisan-earth-100 text-kisan-earth-900 hover:bg-kisan-earth-300 active:bg-kisan-earth-500",
  outline:
    "border-2 border-kisan-green-600 text-kisan-green-700 hover:bg-kisan-green-50 active:bg-kisan-green-100",
  ghost:
    "text-kisan-green-700 hover:bg-kisan-green-50 active:bg-kisan-green-100",
  danger:
    "bg-kisan-danger text-white hover:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-base rounded-xl",
  lg: "px-7 py-3.5 text-lg rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

// ── Card ────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({
  children,
  className = "",
  hover = false,
  onClick,
  padding = "md",
}: CardProps) {
  const Component = onClick ? "button" : "div";
  return (
    <Component
      className={`
        bg-kisan-card rounded-2xl border border-kisan-border
        shadow-[var(--shadow-card)]
        ${hover ? "hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200 cursor-pointer" : ""}
        ${paddingClasses[padding]}
        ${onClick ? "text-left w-full" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

// ── Badge ───────────────────────────────────

type BadgeColor = "green" | "yellow" | "red" | "blue" | "gray";

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const badgeColors: Record<BadgeColor, string> = {
  green: "bg-kisan-green-100 text-kisan-green-800",
  yellow: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
  blue: "bg-kisan-sky-100 text-kisan-sky-500",
  gray: "bg-gray-100 text-gray-700",
};

export function Badge({ children, color = "green", className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
        ${badgeColors[color]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// ── StatusBadge ─────────────────────────────

interface StatusBadgeProps {
  status: "improving" | "stable" | "worsening" | "healthy" | "warning" | "critical" | "pending";
  className?: string;
}

const statusConfig: Record<
  StatusBadgeProps["status"],
  { label: string; color: BadgeColor }
> = {
  improving: { label: "Improving", color: "green" },
  stable: { label: "Stable", color: "blue" },
  worsening: { label: "Worsening", color: "red" },
  healthy: { label: "Healthy", color: "green" },
  warning: { label: "Warning", color: "yellow" },
  critical: { label: "Critical", color: "red" },
  pending: { label: "Pending", color: "gray" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge color={config.color} className={className}>
      {config.label}
    </Badge>
  );
}

// ── Input ───────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-kisan-text mb-1.5"
      >
        {label}
        {props.required && <span className="text-kisan-danger ml-0.5">*</span>}
      </label>
      {hint && (
        <p className="text-xs text-kisan-text-light mb-1.5">{hint}</p>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-2.5 rounded-xl border border-kisan-border
          bg-white text-kisan-text placeholder-kisan-text-light
          transition-colors duration-200
          hover:border-kisan-green-300
          focus:border-kisan-green-500 focus:ring-2 focus:ring-kisan-green-100 focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-kisan-danger focus:border-kisan-danger focus:ring-red-100" : ""}
        `}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-kisan-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Select ──────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  error?: string;
  options: readonly { value: string; label: string }[] | readonly string[];
  placeholder?: string;
}

export function Select({
  label,
  hint,
  error,
  options,
  placeholder,
  id,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={className}>
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-kisan-text mb-1.5"
      >
        {label}
        {props.required && <span className="text-kisan-danger ml-0.5">*</span>}
      </label>
      {hint && (
        <p className="text-xs text-kisan-text-light mb-1.5">{hint}</p>
      )}
      <select
        id={selectId}
        className={`
          w-full px-4 py-2.5 rounded-xl border border-kisan-border
          bg-white text-kisan-text
          transition-colors duration-200 appearance-none
          bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22/%3E%3C/svg%3E')]
          bg-[length:1.25rem] bg-[position:right_0.75rem_center] bg-no-repeat
          hover:border-kisan-green-300
          focus:border-kisan-green-500 focus:ring-2 focus:ring-kisan-green-100 focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-kisan-danger focus:border-kisan-danger focus:ring-red-100" : ""}
        `}
        aria-invalid={error ? "true" : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const label = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && (
        <p className="mt-1 text-xs text-kisan-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Alert ───────────────────────────────────

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
}

const alertStyles: Record<AlertVariant, string> = {
  info: "bg-kisan-sky-100 border-kisan-sky-500 text-blue-800",
  success: "bg-kisan-green-50 border-kisan-green-500 text-kisan-green-800",
  warning: "bg-amber-50 border-kisan-warning text-amber-800",
  error: "bg-red-50 border-kisan-danger text-red-800",
};

const alertIcons: Record<AlertVariant, string> = {
  info: "ℹ️",
  success: "✅",
  warning: "⚠️",
  error: "❌",
};

export function Alert({
  variant = "info",
  title,
  children,
  className = "",
  onDismiss,
}: AlertProps) {
  return (
    <div
      className={`
        rounded-xl border-l-4 p-4
        ${alertStyles[variant]}
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0" aria-hidden="true">
          {alertIcons[variant]}
        </span>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm mb-1">{title}</p>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

// ── PageHeader ──────────────────────────────

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-kisan-charcoal">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-kisan-text-light text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {children && <div className="flex gap-3">{children}</div>}
      </div>
    </div>
  );
}

// ── EmptyState ──────────────────────────────

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      {icon && (
        <span className="text-5xl mb-4" aria-hidden="true">
          {icon}
        </span>
      )}
      <h3 className="text-lg font-semibold text-kisan-charcoal mb-2">
        {title}
      </h3>
      <p className="text-kisan-text-light max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}

// ── LoadingState ────────────────────────────

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <svg
        className="animate-spin h-8 w-8 text-kisan-green-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <p className="text-kisan-text-light text-sm">{message}</p>
    </div>
  );
}

// ── ErrorState ──────────────────────────────

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <span className="text-5xl mb-4" aria-hidden="true">
        😟
      </span>
      <h3 className="text-lg font-semibold text-kisan-charcoal mb-2">
        {title}
      </h3>
      <p className="text-kisan-text-light max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

// ── ProgressBar ─────────────────────────────

interface ProgressBarProps {
  value: number; // 0–100
  color?: "green" | "yellow" | "red";
  label?: string;
  showValue?: boolean;
  className?: string;
}

const progressColors = {
  green: "bg-kisan-green-500",
  yellow: "bg-kisan-warning",
  red: "bg-kisan-danger",
};

export function ProgressBar({
  value,
  color = "green",
  label,
  showValue = true,
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-sm font-medium text-kisan-text">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-kisan-text">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div
        className="h-2.5 bg-gray-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColors[color]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
