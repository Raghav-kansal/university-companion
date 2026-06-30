"use client"

import { ActionButton, Card, Field, Input, Modal, Pill, SectionTitle } from "@/components/kit"
import { ProgressRing } from "@/components/progress-ring"
import { useStore } from "@/lib/store"
import type { AttendanceSubject } from "@/lib/types"
import { cn } from "@/lib/utils"
import { AlertTriangle, Check, Minus, Plus, Trash2, X } from "lucide-react"
import { useMemo, useState } from "react"

function pct(a: AttendanceSubject) {
  return a.total === 0 ? 0 : (a.present / a.total) * 100
}

// How many consecutive classes can be skipped while staying >= threshold,
// or how many must be attended to recover.
function advice(a: AttendanceSubject) {
  const p = pct(a)
  const t = a.threshold
  if (a.total === 0) return { tone: "muted" as const, text: "No classes logged yet" }
  if (p >= t) {
    let skips = 0
    let present = a.present
    let total = a.total
    while ((present / (total + 1)) * 100 >= t) {
      total += 1
      skips += 1
    }
    return { tone: "success" as const, text: skips > 0 ? `Can skip ${skips} more` : "On the edge — attend next" }
  }
  let need = 0
  let present = a.present
  let total = a.total
  while ((present + 1) / (total + 1) * 100 < t) {
    present += 1
    total += 1
    need += 1
  }
  need += 1
  return { tone: "danger" as const, text: `Attend ${need} to recover` }
}

function ringColor(p: number, threshold: number) {
  if (p >= threshold) return "var(--success)"
  if (p >= threshold - 10) return "var(--warning)"
  return "var(--ring-move)"
}

export function AttendanceCard() {
  const { attendance, addAttendanceSubject, removeAttendanceSubject, logAttendance, undoAttendance } = useStore()
  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState("")
  const [threshold, setThreshold] = useState(75)

  const overall = useMemo(() => {
    const tot = attendance.reduce((s, a) => s + a.total, 0)
    const pre = attendance.reduce((s, a) => s + a.present, 0)
    return tot === 0 ? 0 : (pre / tot) * 100
  }, [attendance])

  const atRisk = attendance.filter((a) => a.total > 0 && pct(a) < a.threshold).length

  const submit = () => {
    if (!name.trim()) return
    addAttendanceSubject(name.trim(), threshold)
    setName("")
    setThreshold(75)
    setAddOpen(false)
  }

  return (
    <Card>
      <SectionTitle
        title="Attendance"
        subtitle={atRisk > 0 ? `${atRisk} subject${atRisk > 1 ? "s" : ""} below minimum` : "You're on track"}
        action={
          <ActionButton size="sm" variant="secondary" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" /> Subject
          </ActionButton>
        }
      />

      <div className="mb-5 flex items-center gap-5">
        <ProgressRing value={overall} size={120} stroke={12} color={ringColor(overall, 75)}>
          <span className="text-2xl font-bold tracking-tight">{overall.toFixed(0)}%</span>
          <span className="text-[0.65rem] text-muted-foreground">overall</span>
        </ProgressRing>
        <div className="flex-1 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subjects</span>
            <span className="font-semibold">{attendance.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Classes logged</span>
            <span className="font-semibold">{attendance.reduce((s, a) => s + a.total, 0)}</span>
          </div>
          {atRisk > 0 ? (
            <Pill tone="danger">
              <AlertTriangle className="size-3" /> {atRisk} below threshold
            </Pill>
          ) : (
            <Pill tone="success">
              <Check className="size-3" /> All above minimum
            </Pill>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        {attendance.map((a) => {
          const p = pct(a)
          const tip = advice(a)
          const below = a.total > 0 && p < a.threshold
          return (
            <div
              key={a.id}
              className={cn(
                "group flex items-center gap-3 rounded-2xl border p-3",
                below ? "border-[var(--ring-move)]/30 bg-[var(--ring-move)]/5" : "border-border bg-muted/30",
              )}
            >
              <ProgressRing value={p} size={48} stroke={6} color={ringColor(p, a.threshold)}>
                <span className="text-[0.6rem] font-bold">{p.toFixed(0)}</span>
              </ProgressRing>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{a.name}</p>
                  <button
                    type="button"
                    aria-label={`Remove ${a.name}`}
                    onClick={() => removeAttendanceSubject(a.id)}
                    className="tactile text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {a.present}/{a.total} · min {a.threshold}% ·{" "}
                  <span
                    className={cn(
                      tip.tone === "danger" && "text-destructive",
                      tip.tone === "success" && "text-[var(--success)]",
                    )}
                  >
                    {tip.text}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label={`Mark absent for ${a.name}`}
                  onClick={() => logAttendance(a.id, false)}
                  className="tactile grid size-9 place-items-center rounded-xl bg-[var(--ring-move)]/12 text-[var(--ring-move)] hover:bg-[var(--ring-move)]/20"
                >
                  <X className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label={`Mark present for ${a.name}`}
                  onClick={() => logAttendance(a.id, true)}
                  className="tactile grid size-9 place-items-center rounded-xl bg-[var(--success)]/14 text-[var(--success)] hover:bg-[var(--success)]/24"
                >
                  <Check className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label={`Undo last present for ${a.name}`}
                  onClick={() => undoAttendance(a.id, true)}
                  className="tactile grid size-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted"
                >
                  <Minus className="size-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add subject"
        footer={
          <>
            <ActionButton variant="outline" className="flex-1" onClick={() => setAddOpen(false)}>
              Cancel
            </ActionButton>
            <ActionButton className="flex-1" onClick={submit}>
              Add
            </ActionButton>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Field label="Subject name">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Operating Systems" autoFocus />
          </Field>
          <Field label="Minimum required %" hint="Most universities mandate 75%.">
            <Input
              type="number"
              min={0}
              max={100}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </Field>
        </div>
      </Modal>
    </Card>
  )
}
