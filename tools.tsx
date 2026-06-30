"use client"

import { ProgressRing } from "@/components/progress-ring"
import { subjectsFor } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { Calculator, Target, TrendingUp, Plus, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"

const GRADES = [
  { label: "O", value: 10 },
  { label: "A+", value: 9 },
  { label: "A", value: 8 },
  { label: "B+", value: 7 },
  { label: "B", value: 6 },
  { label: "C", value: 5 },
  { label: "P", value: 4 },
  { label: "F", value: 0 },
]

export function Tools() {
  const { branchId, semester, profile, updateProfile, pastSemesters, addPastSemester, removePastSemester } = useStore()
  
  const [activeTab, setActiveTab] = useState<"sgpa" | "cgpa" | "target">("sgpa")
  
  const effBranchId = branchId || "cse"
  const effSemester = semester || 3
  
  // Get subjects for current branch/semester
  const subjects = useMemo(() => {
    return subjectsFor(effBranchId, effSemester)
  }, [effBranchId, effSemester])

  // State to hold selected grade values per subject ID
  const [grades, setGrades] = useState<Record<string, number>>({})
  const [toast, setToast] = useState<string | null>(null)
  
  function saveSgpa() {
    updateProfile({ savedSgpa: Number(sgpa.toFixed(2)) })
    setToast(`Expected SGPA of ${sgpa.toFixed(2)} saved to your profile!`)
    setTimeout(() => setToast(null), 2000)
  }

  // Calculate SGPA
  const { sgpa, totalCredits, totalEarned } = useMemo(() => {
    if (subjects.length === 0) return { sgpa: 0, totalCredits: 0, totalEarned: 0 }
    
    let totalC = 0
    let earned = 0
    let allSelected = true
    
    subjects.forEach((sub) => {
      totalC += sub.credits
      const grade = grades[sub.id]
      if (grade !== undefined) {
        earned += sub.credits * grade
      } else {
        allSelected = false
      }
    })

    const sgpaVal = totalC > 0 ? (earned / totalC) : 0
    return { sgpa: allSelected ? sgpaVal : 0, totalCredits: totalC, totalEarned: earned, allSelected }
  }, [subjects, grades])

  // CGPA Calculation
  const { cgpa, totalCreditsSoFar } = useMemo(() => {
    let pastEarned = 0
    let pastCredits = 0
    pastSemesters.forEach(ps => {
      pastCredits += ps.credits
      pastEarned += ps.sgpa * ps.credits
    })
    
    let currentEarned = sgpa * totalCredits
    let currentCredits = sgpa > 0 ? totalCredits : 0
    
    const overallCredits = pastCredits + currentCredits
    const overallEarned = pastEarned + currentEarned
    
    return {
      cgpa: overallCredits > 0 ? (overallEarned / overallCredits) : 0,
      totalCreditsSoFar: overallCredits
    }
  }, [pastSemesters, sgpa, totalCredits])

  // Target Planner
  const [targetSgpaStr, setTargetSgpaStr] = useState("")
  const targetSgpa = Number(targetSgpaStr)
  
  const targetMessage = useMemo(() => {
    if (!targetSgpa || targetSgpa <= 0 || targetSgpa > 10) return null
    if (totalCredits === 0) return "No subjects to calculate target."
    
    const requiredPoints = targetSgpa * totalCredits
    const maxPossible = totalCredits * 10
    
    if (requiredPoints > maxPossible) {
      return "Impossible target! Even with all O grades, you can't reach this SGPA."
    }
    
    return `You need a total of ${requiredPoints.toFixed(1)} grade points across your ${totalCredits} credits to achieve an SGPA of ${targetSgpa.toFixed(2)}.`
  }, [targetSgpa, totalCredits])

  // New Past Semester Form
  const [newPsSemStr, setNewPsSemStr] = useState("")
  const [newPsSgpaStr, setNewPsSgpaStr] = useState("")
  const [newPsCreditsStr, setNewPsCreditsStr] = useState("")

  function handleAddPastSemester() {
    const sem = Number(newPsSemStr)
    const sg = Number(newPsSgpaStr)
    const cr = Number(newPsCreditsStr)
    if (sem > 0 && sg >= 0 && sg <= 10 && cr > 0) {
      addPastSemester({ id: `ps-${Date.now()}`, sem, sgpa: sg, credits: cr })
      setNewPsSemStr("")
      setNewPsSgpaStr("")
      setNewPsCreditsStr("")
    } else {
      setToast("Please enter valid past semester details.")
      setTimeout(() => setToast(null), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Academic Tools</h1>
          {profile.savedSgpa && (
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <Calculator className="size-4" />
              Saved SGPA: {profile.savedSgpa.toFixed(2)}
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-sm">Calculate your expected SGPA based on current semester subjects.</p>
      </header>

      <div className="flex bg-secondary/50 p-1 rounded-full w-full max-w-sm mx-auto mb-4 border border-border/50">
        <button
          className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-colors ${activeTab === "sgpa" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("sgpa")}
        >
          SGPA
        </button>
        <button
          className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-colors ${activeTab === "cgpa" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("cgpa")}
        >
          CGPA
        </button>
        <button
          className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-colors ${activeTab === "target" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("target")}
        >
          Target
        </button>
      </div>

      <div className="grid gap-6">
        {activeTab === "sgpa" && (
          <>
            <section className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm relative overflow-hidden">
              <div className="flex flex-col items-center justify-center py-6">
                <ProgressRing
                  value={sgpa * 10}
                  size={180}
                  stroke={16}
                  color={sgpa >= 8 ? "var(--accent-green, #34C759)" : sgpa >= 6 ? "var(--accent-orange, #FF9500)" : "var(--accent-red, #FF3B30)"}
                >
                  <span className="text-4xl font-bold tracking-tighter">{sgpa > 0 ? sgpa.toFixed(2) : "--"}</span>
                  <span className="text-xs text-muted-foreground font-medium mt-1">ESTIMATED SGPA</span>
                </ProgressRing>
              </div>
              {sgpa > 0 && (
                <div className="mt-4 flex justify-center">
                  <Button onClick={saveSgpa} className="rounded-full px-6">Save to Profile</Button>
                </div>
              )}
            </section>

            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2 px-2 text-muted-foreground">
                <Calculator className="size-4" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Subject Grades</h2>
              </div>
              
              {subjects.length === 0 ? (
                <p className="text-sm text-muted-foreground px-2">No subjects found for your branch and semester.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {subjects.map((sub) => (
                    <div key={sub.id} className="bg-card/50 backdrop-blur-md rounded-2xl p-4 border border-border/50 flex flex-col gap-3 transition-colors hover:bg-card/80">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-base leading-tight">{sub.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{sub.code} • {sub.credits} Credits</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {GRADES.map((g) => {
                          const isSelected = grades[sub.id] === g.value
                          return (
                            <button
                              key={g.label}
                              onClick={() => setGrades(s => ({ ...s, [sub.id]: g.value }))}
                              className={`flex-1 min-w-[36px] h-9 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
                                isSelected 
                                  ? "bg-primary text-primary-foreground shadow-md scale-105 z-10" 
                                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              }`}
                            >
                              {g.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === "cgpa" && (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
            <section className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm relative overflow-hidden">
              <div className="flex flex-col items-center justify-center py-6">
                <ProgressRing
                  value={cgpa * 10}
                  size={180}
                  stroke={16}
                  color={cgpa >= 8 ? "var(--accent-green, #34C759)" : cgpa >= 6 ? "var(--accent-orange, #FF9500)" : "var(--accent-red, #FF3B30)"}
                >
                  <span className="text-4xl font-bold tracking-tighter">{cgpa > 0 ? cgpa.toFixed(2) : "--"}</span>
                  <span className="text-xs text-muted-foreground font-medium mt-1">OVERALL CGPA</span>
                </ProgressRing>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Based on {totalCreditsSoFar} total credits.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Past Semesters</h2>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {pastSemesters.map(ps => (
                  <div key={ps.id} className="bg-card/50 rounded-2xl p-4 border border-border/50 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">Semester {ps.sem}</h3>
                      <p className="text-xs text-muted-foreground">{ps.credits} Credits</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{ps.sgpa.toFixed(2)}</span>
                      <button onClick={() => removePastSemester(ps.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="bg-secondary/30 rounded-2xl p-4 border border-border/50 flex flex-col gap-3">
                  <h3 className="font-semibold text-sm">Add Past Semester</h3>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Sem" className="bg-background border rounded-lg px-3 py-1.5 text-sm w-16" value={newPsSemStr} onChange={e => setNewPsSemStr(e.target.value)} />
                    <input type="number" placeholder="SGPA" className="bg-background border rounded-lg px-3 py-1.5 text-sm flex-1" value={newPsSgpaStr} onChange={e => setNewPsSgpaStr(e.target.value)} />
                    <input type="number" placeholder="Credits" className="bg-background border rounded-lg px-3 py-1.5 text-sm w-20" value={newPsCreditsStr} onChange={e => setNewPsCreditsStr(e.target.value)} />
                    <Button size="icon" className="shrink-0" onClick={handleAddPastSemester}><Plus className="size-4" /></Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "target" && (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
            <section className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm relative overflow-hidden flex flex-col items-center">
              <Target className="size-12 text-primary mb-4 opacity-80" />
              <h2 className="text-xl font-bold mb-2">Target Grade Planner</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Enter your desired SGPA for the current semester to see what you need to score.
              </p>
              
              <div className="flex items-center gap-3 w-full max-w-xs mb-6">
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 9.0"
                  value={targetSgpaStr}
                  onChange={e => setTargetSgpaStr(e.target.value)}
                  className="bg-secondary border-none rounded-xl px-4 py-3 text-lg font-bold w-full text-center outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {targetMessage && (
                <div className="bg-secondary/50 rounded-2xl p-4 text-sm text-center border border-primary/20 text-foreground w-full">
                  {targetMessage}
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {toast ? (
        <div className="fixed inset-x-0 bottom-28 z-[70] flex justify-center px-4">
          <div className="glass-strong animate-fade-in rounded-full border border-border/70 px-4 py-2 text-sm font-medium shadow-lg bg-background text-foreground">
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  )
}
