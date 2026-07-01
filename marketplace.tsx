"use client"

import { Button } from "@/components/ui/button"
import { ALL_SKILLS, STUDENTS, branchName, getStudent } from "@/lib/data"
import { ME_ID, useStore } from "@/lib/store"
import { Search, UserPlus, Users } from "lucide-react"
import { useMemo, useState } from "react"

export function Marketplace() {
  const { allProjects, connections, sendConnection } = useStore()
  const [activeTab, setActiveTab] = useState<"projects" | "students">("projects")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  // Filter Projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.pitch.toLowerCase().includes(searchQuery.toLowerCase())
      const matchSkill = selectedSkill ? p.tags.includes(selectedSkill) : true
      return matchQuery && matchSkill
    })
  }, [allProjects, searchQuery, selectedSkill])

  // Filter Students
  const filteredStudents = useMemo(() => {
    return STUDENTS.filter((s) => {
      if (s.id === ME_ID) return false // hide self
      const matchQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.bio.toLowerCase().includes(searchQuery.toLowerCase())
      const matchSkill = selectedSkill ? s.skills.includes(selectedSkill) : true
      return matchQuery && matchSkill
    })
  }, [searchQuery, selectedSkill])

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Connect</h1>
        <p className="text-muted-foreground text-sm">Find collaborators for your next big idea.</p>
      </header>

      <div className="flex flex-col gap-4">
        {/* Search & Filter */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 gap-2 no-scrollbar">
            <button
              onClick={() => setSelectedSkill(null)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedSkill === null ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              All Skills
            </button>
            {ALL_SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedSkill === skill ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-secondary/50 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === "projects" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === "students" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Students
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 mt-2">
          {activeTab === "projects" ? (
            filteredProjects.length > 0 ? (
              filteredProjects.map((p) => (
                <div key={p.id} className="bg-card rounded-3xl p-5 border border-border/50 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold leading-tight">{p.title}</h3>
                    <span className="text-[10px] uppercase tracking-wider font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.pitch}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs bg-secondary px-2 py-0.5 rounded-md text-secondary-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Users className="size-3.5" />
                      <span>{p.filled}/{p.teamSize} Filled</span>
                    </div>
                    {(() => {
                      const isOwnerMe = p.ownerId === ME_ID
                      const isPending = connections.some(c => c.toId === p.ownerId && c.fromId === ME_ID && c.status === "pending")
                      const isAccepted = connections.some(c => ((c.toId === p.ownerId && c.fromId === ME_ID) || (c.fromId === p.ownerId && c.toId === ME_ID)) && c.status === "accepted")

                      if (isOwnerMe) {
                        return (
                          <Button size="sm" variant="secondary" className="rounded-full px-4 h-7 cursor-default pointer-events-none">
                            Your Project
                          </Button>
                        )
                      }
                      if (isAccepted) {
                        return (
                          <Button size="sm" variant="outline" className="rounded-full px-4 h-7 cursor-default pointer-events-none">
                            Connected
                          </Button>
                        )
                      }
                      if (isPending) {
                        return (
                          <Button size="sm" variant="secondary" className="rounded-full px-4 h-7 cursor-default pointer-events-none">
                            Pending
                          </Button>
                        )
                      }
                      return (
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => sendConnection(p.ownerId, `Hi! I'm interested in joining "${p.title}".`)}
                          className="rounded-full px-4 h-7 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          Contact
                        </Button>
                      )
                    })()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-10">No projects found.</p>
            )
          ) : (
            filteredStudents.length > 0 ? (
              filteredStudents.map((s) => {
                const isPending = connections.some(c => c.toId === s.id && c.fromId === ME_ID && c.status === "pending")
                const isAccepted = connections.some(c => (c.toId === s.id && c.fromId === ME_ID) || (c.fromId === s.id && c.toId === ME_ID) && c.status === "accepted")
                
                return (
                  <div key={s.id} className="bg-card rounded-3xl p-5 border border-border/50 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-full bg-secondary overflow-hidden shrink-0">
                        {/* Assuming avatars exist or using fallback */}
                        <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{s.name}</h3>
                          {s.openToCollaborate && (
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{branchName(s.branchId)} • Sem {s.semester}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.bio}</p>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {s.skills.map(skill => (
                        <span key={skill} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md text-secondary-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-2 flex justify-end">
                      {isAccepted ? (
                        <Button size="sm" variant="outline" className="rounded-full px-4 h-7 cursor-default pointer-events-none">
                          Connected
                        </Button>
                      ) : isPending ? (
                        <Button size="sm" variant="secondary" className="rounded-full px-4 h-7 cursor-default pointer-events-none">
                          Pending
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => sendConnection(s.id, "Hi! I'd love to connect and discuss potential collaborations.")}
                          className="rounded-full px-4 h-7 gap-1.5"
                        >
                          <UserPlus className="size-3.5" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-sm text-muted-foreground text-center py-10">No students found.</p>
            )
          )}
        </div>
      </div>
    </div>
  )
}
