"use client"

import type { TabKey } from "@/components/layout/bottom-nav"
import { cn } from "@/lib/utils"
import { Calculator, Library, Users } from "lucide-react"
import { AttendanceCard } from "./attendance-card"
import { MessCard } from "./mess-card"
import { ScheduleCard } from "./schedule-card"
import { UtilityWidgets } from "./utility-widgets"

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 17) return "Good afternoon"
  return "Good evening"
}

const QUICK: { key: TabKey; label: string; icon: typeof Library; tone: string }[] = [
  { key: "shelf", label: "The Shelf", icon: Library, tone: "var(--accent-blue)" },
  { key: "tools", label: "GPA Tools", icon: Calculator, tone: "var(--success)" },
  { key: "connect", label: "Connect", icon: Users, tone: "var(--ring-move)" },
]

export function Dashboard({ onNavigate }: { onNavigate: (t: TabKey) => void }) {
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })

  return (
    <div className="space-y-4">
      <div className="px-1">
        <p className="text-sm text-muted-foreground">{today}</p>
        <h2 className="text-3xl font-bold tracking-tight text-balance">{greeting()}.</h2>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {QUICK.map((q) => {
          const Icon = q.icon
          return (
            <button
              key={q.key}
              type="button"
              onClick={() => onNavigate(q.key)}
              className={cn(
                "tactile flex flex-col items-center gap-2 rounded-3xl border border-border bg-card/60 p-4 backdrop-blur-sm",
              )}
            >
              <span className="grid size-10 place-items-center rounded-2xl" style={{ backgroundColor: `color-mix(in oklch, ${q.tone} 14%, transparent)`, color: q.tone }}>
                <Icon className="size-5" />
              </span>
              <span className="text-xs font-medium">{q.label}</span>
            </button>
          )
        })}
      </div>

      <AttendanceCard />
      <ScheduleCard />
      <div className="grid gap-4">
        <UtilityWidgets />
        <MessCard />
      </div>
    </div>
  )
}
