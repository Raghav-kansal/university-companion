"use client"

import { Card, Modal, Pill, SectionTitle } from "@/components/kit"
import { ACADEMIC_CALENDAR, COUNTDOWN_TARGETS } from "@/lib/data"
import { cn } from "@/lib/utils"
import { CalendarDays, GraduationCap, PartyPopper, Timer } from "lucide-react"
import { useEffect, useState } from "react"

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, new Date(target).getTime() - now)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)
  return { days, hours, mins, secs }
}

function CountdownTile({ label, date }: { label: string; date: string }) {
  const { days, hours, mins, secs } = useCountdown(date)
  const Icon = label.toLowerCase().includes("exam") ? GraduationCap : PartyPopper
  const accent = label.toLowerCase().includes("exam")

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border p-4",
        accent ? "border-[var(--ring-move)]/30 bg-[var(--ring-move)]/6" : "border-[var(--success)]/30 bg-[var(--success)]/6",
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4", accent ? "text-[var(--ring-move)]" : "text-[var(--success)]")} />
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 text-center">
        {[
          { v: days, l: "days" },
          { v: hours, l: "hrs" },
          { v: mins, l: "min" },
          { v: secs, l: "sec" },
        ].map((u) => (
          <div key={u.l} className="rounded-xl bg-card/70 py-2">
            <p className="text-lg font-bold tabular-nums leading-none">{String(u.v).padStart(2, "0")}</p>
            <p className="mt-1 text-[0.6rem] text-muted-foreground">{u.l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const kindTone: Record<string, "accent" | "muted" | "warning" | "danger" | "success"> = {
  exam: "danger",
  break: "success",
  holiday: "success",
  event: "accent",
  deadline: "warning",
}

export function UtilityWidgets() {
  const [calOpen, setCalOpen] = useState(false)

  return (
    <Card>
      <SectionTitle
        title="Countdowns"
        subtitle="Time to the moments that matter"
        action={
          <button
            type="button"
            onClick={() => setCalOpen(true)}
            className="tactile inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/70"
          >
            <CalendarDays className="size-3.5" /> Calendar
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {COUNTDOWN_TARGETS.map((t) => (
          <CountdownTile key={t.id} label={t.label} date={t.date} />
        ))}
      </div>

      <Modal open={calOpen} onClose={() => setCalOpen(false)} title="Academic Calendar">
        <ol className="relative space-y-3 before:absolute before:left-[0.7rem] before:top-2 before:bottom-2 before:w-px before:bg-border">
          {[...ACADEMIC_CALENDAR]
            .sort((a, b) => +new Date(a.date) - +new Date(b.date))
            .map((e) => {
              const past = +new Date(e.date) < Date.now()
              return (
                <li key={e.id} className={cn("relative flex items-center gap-4", past && "opacity-50")}>
                  <span className="z-10 grid size-6 place-items-center rounded-full border border-border bg-card">
                    <Timer className="size-3 text-muted-foreground" />
                  </span>
                  <div className="flex flex-1 items-center justify-between gap-2 rounded-2xl border border-border bg-muted/30 px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium">{e.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(e.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <Pill tone={kindTone[e.kind]}>{e.kind}</Pill>
                  </div>
                </li>
              )
            })}
        </ol>
      </Modal>
    </Card>
  )
}
