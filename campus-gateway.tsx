"use client"

import { ActionButton, Card, Select } from "@/components/kit"
import { BRANCHES, CAMPUSES } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { ArrowRight, Check, GraduationCap, MapPin } from "lucide-react"
import { useState } from "react"

export function CampusGateway() {
  const { setOnboarding } = useStore()
  const [step, setStep] = useState(0)
  const [campusId, setCampusId] = useState<string | null>(null)
  const [branchId, setBranchId] = useState<string>("cse")
  const [semester, setSemester] = useState<number>(3)

  const branch = BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0]

  return (
    <main className="relative mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 grid size-16 place-items-center rounded-[1.4rem] bg-primary text-primary-foreground shadow-lg">
          <GraduationCap className="size-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-balance">Campus Companion</h1>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Your entire university — attendance, schedules, resources and people — in one calm place.
        </p>
      </div>

      {step === 0 ? (
        <section className="animate-fade-in">
          <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">Select your campus</h2>
          <div className="flex flex-col gap-3">
            {CAMPUSES.map((c) => {
              const active = c.id === campusId
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCampusId(c.id)}
                  className={cn(
                    "tactile flex items-center gap-4 rounded-3xl border p-4 text-left",
                    active ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/8" : "border-border bg-card/60 hover:bg-muted/50",
                  )}
                >
                  <div className={cn("grid size-11 place-items-center rounded-2xl", active ? "bg-[var(--accent-blue)] text-white" : "bg-muted text-muted-foreground")}>
                    <MapPin className="size-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground text-pretty">{c.blurb}</p>
                  </div>
                  {active ? <Check className="size-5 text-[var(--accent-blue)]" /> : null}
                </button>
              )
            })}
          </div>
          <ActionButton
            size="lg"
            className="mt-6 w-full"
            disabled={!campusId}
            onClick={() => setStep(1)}
          >
            Continue <ArrowRight className="size-4" />
          </ActionButton>
        </section>
      ) : (
        <section className="animate-fade-in">
          <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">Your branch & semester</h2>
          <Card className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Branch</span>
              <Select value={branchId} onChange={(e) => setBranchId(e.target.value)}>
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.short})
                  </option>
                ))}
              </Select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Semester</span>
              <Select value={semester} onChange={(e) => setSemester(Number(e.target.value))}>
                {branch.semesters.map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </Select>
            </label>
          </Card>
          <div className="mt-6 flex gap-3">
            <ActionButton size="lg" variant="outline" className="flex-1" onClick={() => setStep(0)}>
              Back
            </ActionButton>
            <ActionButton
              size="lg"
              className="flex-[2]"
              onClick={() => campusId && setOnboarding(campusId, branchId, semester)}
            >
              Enter Dashboard <ArrowRight className="size-4" />
            </ActionButton>
          </div>
        </section>
      )}

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Designed for Students, by Students.
      </p>
    </main>
  )
}
