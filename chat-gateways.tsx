"use client"

import { CHAT_GATEWAYS, subjectsFor } from "@/lib/data"
import { Card, EmptyState } from "@/components/kit"
import { MessageCircle, Send, Hash, ExternalLink, MessagesSquare } from "lucide-react"

const PLATFORM_META = {
  whatsapp: { label: "WhatsApp", icon: MessageCircle, tone: "text-[var(--success)]" },
  telegram: { label: "Telegram", icon: Send, tone: "text-[var(--accent-blue)]" },
  discord: { label: "Discord", icon: Hash, tone: "text-[var(--accent-blue)]" },
} as const

export function ChatGateways({ branchId, semester }: { branchId: string; semester: number }) {
  const subjects = subjectsFor(branchId, semester)
  const subjectIds = new Set(subjects.map((s) => s.id))
  const gateways = CHAT_GATEWAYS.filter((g) => subjectIds.has(g.subjectId))

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <MessagesSquare className="size-5 text-[var(--accent-blue)]" />
        <h3 className="font-semibold">Subject Chat Groups</h3>
      </div>

      {gateways.length === 0 ? (
        <EmptyState
          title="No groups linked yet"
          description="Chat groups for this branch and semester haven't been added. Check back soon."
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {gateways.map((g) => {
            const meta = PLATFORM_META[g.platform]
            const Icon = meta.icon
            const subject = subjects.find((s) => s.id === g.subjectId)
            return (
              <li key={`${g.subjectId}-${g.platform}`}>
                <a
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile flex items-center gap-3 rounded-2xl border border-border/70 bg-card/50 p-3 hover:bg-muted/60"
                >
                  <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-muted ${meta.tone}`}>
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{g.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {subject?.name} · {meta.label}
                    </span>
                  </span>
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
