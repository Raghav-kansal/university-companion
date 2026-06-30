"use client"

import { Card, Pill, SectionTitle, Segmented, Select } from "@/components/kit"
import { SCHEDULE } from "@/lib/data"
import type { DayKey } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Clock, MapPin, User } from "lucide-react"
import { useMemo, useState } from "react"

const DAYS: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
]

const JS_TO_DAY: Record<number, DayKey> = { 1: "mon", 2: "tue", 3: "wed", 4: "thu", 5: "fri" }

function toMins(t: string) {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

const typeTone: Record<string, "accent" | "muted" | "warning"> = {
  Lecture: "accent",
  Lab: "warning",
  Tutorial: "muted",
}

export function ScheduleCard() {
  const todayKey = JS_TO_DAY[new Date().getDay()] ?? "mon"
  const [day, setDay] = useState<DayKey>(todayKey)
  const [batch, setBatch] = useState<string>("all")

  const batches = useMemo(() => ["all", ...Array.from(new Set(SCHEDULE.map((s) => s.batch)))], [])

  const sessions = useMemo(() => {
    return SCHEDULE.filter((s) => s.day === day && (batch === "all" || s.batch === batch)).sort(
      (a, b) => toMins(a.start) - toMins(b.start),
    )
  }, [day, batch])

  const nowMins = new Date().getHours() * 60 + new Date().getMinutes()
  const isToday = day === todayKey

  return (
    <Card>
      <SectionTitle
        title="Schedule"
        subtitle="Your day, on a timeline"
        action={
          <Select value={batch} onChange={(e) => setBatch(e.target.value)} className="h-8 w-auto py-0 text-xs">
            {batches.map((b) => (
              <option key={b} value={b}>
                {b === "all" ? "All batches" : `Batch ${b}`}
              </option>
            ))}
          </Select>
        }
      />

      <Segmented
        className="mb-5"
        value={day}
        onChange={setDay}
        options={DAYS.map((d) => ({ value: d.key, label: d.label }))}
      />

      {sessions.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No classes scheduled. Enjoy the break.</p>
      ) : (
        <ol className="relative space-y-3 before:absolute before:left-[1.15rem] before:top-2 before:bottom-2 before:w-px before:bg-border">
          {sessions.map((s) => {
            const start = toMins(s.start)
            const end = toMins(s.end)
            const isCurrent = isToday && nowMins >= start && nowMins < end
            const isPast = isToday && nowMins >= end
            return (
              <li key={s.id} className="relative flex gap-4">
                <div className="z-10 flex w-9 flex-col items-center pt-1">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-full border text-[0.6rem] font-bold tabular-nums",
                      isCurrent
                        ? "animate-pulse-ring border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white"
                        : isPast
                          ? "border-border bg-muted text-muted-foreground"
                          : "border-border bg-card",
                    )}
                  >
                    {s.start}
                  </span>
                </div>
                <div
                  className={cn(
                    "flex-1 rounded-2xl border p-3 transition-opacity",
                    isCurrent
                      ? "border-[var(--accent-blue)]/40 bg-[var(--accent-blue)]/6"
                      : "border-border bg-muted/30",
                    isPast && "opacity-50",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold leading-tight">{s.subject}</p>
                      <p className="text-xs text-muted-foreground">{s.code}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isCurrent ? <Pill tone="accent">Now</Pill> : null}
                      <Pill tone={typeTone[s.type]}>{s.type}</Pill>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" /> {s.start}–{s.end}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3" /> {s.room}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="size-3" /> {s.faculty}
                    </span>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </Card>
  )
}
