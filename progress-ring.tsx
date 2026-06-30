import { cn } from "@/lib/utils"

interface ProgressRingProps {
  value: number // 0 - 100
  size?: number
  stroke?: number
  color?: string // css color, defaults to accent-blue
  trackClassName?: string
  className?: string
  children?: React.ReactNode
}

export function ProgressRing({
  value,
  size = 140,
  stroke = 14,
  color = "var(--accent-blue)",
  trackClassName,
  className,
  children,
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (clamped / 100) * c

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className={cn("stroke-muted", trackClassName)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={color}
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.7s cubic-bezier(0.22,1,0.36,1)",
            filter: `drop-shadow(0 0 6px color-mix(in oklch, ${color} 45%, transparent))`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  )
}
