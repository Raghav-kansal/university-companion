"use client"

import { Pill } from "@/components/kit"
import { MATERIALS, SUBJECTS } from "@/lib/data"
import { TrendingUp } from "lucide-react"
import { useMemo } from "react"

const kindLabel: Record<string, string> = {
  slides: "Slides",
  notes: "Notes",
  pyq: "PYQ",
  assignment: "Assignment",
}

export function Trending({ onOpen }: { onOpen: (subjectId: string) => void }) {
  const top = useMemo(
    () => [...MATERIALS].sort((a, b) => b.views + b.downloads - (a.views + a.downloads)).slice(0, 6),
    [],
  )

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 px-1">
        <TrendingUp className="size-4 text-[var(--ring-move)]" />
        <h3 className="text-sm font-semibold">Trending in the last 24h</h3>
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
        {top.map((m, i) => {
          const subject = SUBJECTS.find((s) => s.id === m.subjectId)
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onOpen(m.subjectId)}
              className="tactile flex w-56 shrink-0 flex-col gap-2 rounded-3xl border border-border bg-card/60 p-4 text-left backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-7 place-items-center rounded-full bg-[var(--ring-move)]/12 text-xs font-bold text-[var(--ring-move)]">
                  {i + 1}
                </span>
                <Pill tone="muted">{kindLabel[m.kind]}</Pill>
              </div>
              <p className="line-clamp-2 text-sm font-medium leading-snug text-balance">{m.title}</p>
              <p className="text-xs text-muted-foreground">{subject?.name}</p>
              <div className="mt-1 flex items-center gap-3 text-[0.65rem] text-muted-foreground">
                <span>{m.views.toLocaleString()} views</span>
                <span>{m.downloads.toLocaleString()} downloads</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
