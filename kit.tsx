"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useEffect, forwardRef, type HTMLAttributes, type ReactNode } from "react"

/* ---------------- Card ---------------- */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-border/70 bg-card/60 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = "Card"

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-balance">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  )
}

/* ---------------- Pill / Badge ---------------- */
export function Pill({
  children,
  className,
  tone = "muted",
}: {
  children: ReactNode
  className?: string
  tone?: "muted" | "accent" | "success" | "warning" | "danger"
}) {
  const tones: Record<string, string> = {
    muted: "bg-muted text-muted-foreground",
    accent: "bg-[var(--accent-blue)]/12 text-[var(--accent-blue)]",
    success: "bg-[var(--success)]/14 text-[var(--success)]",
    warning: "bg-[var(--warning)]/16 text-[color-mix(in_oklch,var(--warning)_70%,black)] dark:text-[var(--warning)]",
    danger: "bg-destructive/12 text-destructive",
  }
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  )
}

/* ---------------- Segmented control / tabs ---------------- */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: T; label: ReactNode }[]
  value: T
  onChange: (v: T) => void
  className?: string
}) {
  return (
    <div className={cn("inline-flex w-full gap-1 rounded-2xl bg-muted/70 p-1 backdrop-blur-sm", className)}>
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "tactile flex-1 rounded-xl px-3 py-1.5 text-sm font-medium whitespace-nowrap",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/* ---------------- Buttons ---------------- */
export function ActionButton({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline"
  size?: "sm" | "md" | "lg"
}) {
  const variants: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "text-foreground hover:bg-muted",
    outline: "border border-border bg-transparent hover:bg-muted",
    danger: "bg-destructive/12 text-destructive hover:bg-destructive/20",
  }
  const sizes: Record<string, string> = {
    sm: "h-8 px-3 text-sm rounded-xl",
    md: "h-10 px-4 text-sm rounded-2xl",
    lg: "h-12 px-6 text-base rounded-2xl",
  }
  return (
    <button
      className={cn(
        "tactile inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/* ---------------- Inputs ---------------- */
export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

const inputBase =
  "w-full rounded-2xl border border-border bg-card/60 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[var(--accent-blue)] focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]/30"

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputBase, className)} {...props} />
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(inputBase, "min-h-24 resize-none", className)} {...props} />
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(inputBase, "appearance-none bg-card", className)} {...props}>
      {children}
    </select>
  )
}

/* ---------------- Modal / bottom sheet ---------------- */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-black/40 backdrop-blur-[2px]"
      />
      <div className="animate-sheet-up glass-strong relative z-10 w-full max-w-lg rounded-t-[2rem] border border-border/70 p-5 pb-8 sm:rounded-[2rem] sm:pb-5 max-h-[88vh] overflow-y-auto hide-scrollbar">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="tactile grid size-8 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
        {footer ? <div className="mt-5 flex gap-2">{footer}</div> : null}
      </div>
    </div>
  )
}

/* ---------------- Empty state ---------------- */
export function EmptyState({ icon, title, description }: { icon?: ReactNode; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-12 text-center">
      {icon ? <div className="mb-3 text-muted-foreground">{icon}</div> : null}
      <p className="font-medium">{title}</p>
      {description ? <p className="mt-1 max-w-xs text-sm text-muted-foreground text-pretty">{description}</p> : null}
    </div>
  )
}
