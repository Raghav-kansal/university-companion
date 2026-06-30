"use client"

import { AppShell } from "@/components/layout/app-shell"
import { CampusGateway } from "@/components/onboarding/campus-gateway"
import { useStore } from "@/lib/store"
import { GraduationCap } from "lucide-react"

export default function Page() {
  const { ready, campusId, branchId, semester } = useStore()

  if (!ready) {
    return (
      <main className="grid min-h-dvh place-items-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="grid size-12 animate-pulse place-items-center rounded-2xl bg-primary text-primary-foreground">
            <GraduationCap className="size-6" />
          </div>
          <p className="text-sm">Loading your campus…</p>
        </div>
      </main>
    )
  }

  const onboarded = campusId && branchId && semester
  return onboarded ? <AppShell /> : <CampusGateway />
}
