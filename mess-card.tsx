"use client"

import { Card, SectionTitle, Segmented } from "@/components/kit"
import { MESS_MENU } from "@/lib/data"
import type { DayKey, MealKey } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Coffee, Cookie, Moon, Sun, UtensilsCrossed } from "lucide-react"
import { useState } from "react"

const DAYS: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
]

const MEALS: { key: MealKey; label: string; icon: typeof Coffee; time: string }[] = [
  { key: "breakfast", label: "Breakfast", icon: Coffee, time: "7:30 – 9:30" },
  { key: "lunch", label: "Lunch", icon: Sun, time: "12:30 – 2:30" },
  { key: "snacks", label: "Snacks", icon: Cookie, time: "5:00 – 6:00" },
  { key: "dinner", label: "Dinner", icon: Moon, time: "7:30 – 9:30" },
]

const JS_TO_DAY: Record<number, DayKey> = { 0: "sun", 1: "mon", 2: "tue", 3: "wed", 4: "thu", 5: "fri", 6: "sat" }

function currentMeal(): MealKey {
  const h = new Date().getHours()
  if (h < 10) return "breakfast"
  if (h < 15) return "lunch"
  if (h < 18) return "snacks"
  return "dinner"
}

export function MessCard() {
  const today = JS_TO_DAY[new Date().getDay()]
  const [day, setDay] = useState<DayKey>(today)
  const [meal, setMeal] = useState<MealKey>(currentMeal())

  const menu = MESS_MENU.find((m) => m.day === day)!
  const items = menu[meal]

  return (
    <Card>
      <SectionTitle title="Hostel Mess" subtitle="What's cooking today" />

      <Segmented
        className="mb-4"
        value={day}
        onChange={setDay}
        options={DAYS.map((d) => ({ value: d.key, label: d.label }))}
      />

      <div className="mb-4 grid grid-cols-4 gap-2">
        {MEALS.map((m) => {
          const Icon = m.icon
          const active = m.key === meal
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setMeal(m.key)}
              className={cn(
                "tactile flex flex-col items-center gap-1 rounded-2xl border p-2.5",
                active ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/8 text-foreground" : "border-border bg-muted/30 text-muted-foreground",
              )}
            >
              <Icon className={cn("size-5", active && "text-[var(--accent-blue)]")} />
              <span className="text-[0.65rem] font-medium">{m.label}</span>
            </button>
          )
        })}
      </div>

      <div className="rounded-2xl border border-border bg-muted/30 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm">
          <UtensilsCrossed className="size-4 text-[var(--accent-blue)]" />
          <span className="font-semibold">{MEALS.find((m) => m.key === meal)?.label}</span>
          <span className="text-xs text-muted-foreground">· {MEALS.find((m) => m.key === meal)?.time}</span>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 rounded-xl bg-card/70 px-3 py-2 text-sm">
              <span className="size-1.5 rounded-full bg-[var(--accent-blue)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
