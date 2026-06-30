"use client"

import { Button } from "@/components/ui/button"
import { ALL_SKILLS, branchName, getStudent } from "@/lib/data"
import { ME_ID, useStore } from "@/lib/store"
import { Check, Code, Globe, Plus, User, X } from "lucide-react"
import { useMemo, useState } from "react"

export function ProfileScreen({ onNavigate }: { onNavigate?: (tab: any) => void }) {
  const { profile, updateProfile, connections, acceptConnection, declineConnection, userMaterials } = useStore()
  
  const [editingSkills, setEditingSkills] = useState(false)
  const [linkInput, setLinkInput] = useState<{ type: "github" | "linkedin" | "portfolio" | null }>({ type: null })
  const [tempLink, setTempLink] = useState("")

  const pendingRequests = useMemo(() => {
    return connections.filter(c => c.toId === ME_ID && c.status === "pending")
  }, [connections])

  const toggleSkill = (skill: string) => {
    if (profile.skills.includes(skill)) {
      updateProfile({ skills: profile.skills.filter(s => s !== skill) })
    } else {
      updateProfile({ skills: [...profile.skills, skill] })
    }
  }

  const handleSaveLink = () => {
    if (linkInput.type) {
      updateProfile({ [linkInput.type]: tempLink })
    }
    setLinkInput({ type: null })
    setTempLink("")
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Profile</h1>
          <p className="text-muted-foreground text-sm">Manage your identity and connections.</p>
        </div>
      </header>

      {/* Main Profile Card */}
      <section className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="size-20 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0 border-4 border-background shadow-sm">
            <User className="size-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">
              {branchName(profile.branchId || "")} • Sem {profile.semester}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 bg-secondary/30 rounded-xl p-3 border border-border/50 flex flex-col items-center">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Expected SGPA</span>
            <span className="text-xl font-bold">{profile.savedSgpa ? profile.savedSgpa.toFixed(2) : "--"}</span>
          </div>
          <div className="flex-1 bg-secondary/30 rounded-xl p-3 border border-border/50 flex flex-col items-center">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Uploads</span>
            <span className="text-xl font-bold">{userMaterials.length}</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Bio</label>
            <textarea
              className="w-full bg-secondary/50 border-none rounded-xl p-3 text-sm resize-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              rows={3}
              value={profile.bio}
              onChange={(e) => updateProfile({ bio: e.target.value })}
              placeholder="Tell others about your interests..."
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl border border-border/50">
            <div>
              <p className="text-sm font-medium">Open to Collaborate</p>
              <p className="text-xs text-muted-foreground">Let others know you're looking for teams</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={profile.openToCollaborate}
                onChange={(e) => updateProfile({ openToCollaborate: e.target.checked })}
              />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Skills & Tech Stack</h2>
          <button 
            onClick={() => setEditingSkills(!editingSkills)}
            className="text-xs font-medium text-primary hover:underline"
          >
            {editingSkills ? "Done" : "Edit Skills"}
          </button>
        </div>
        
        <div className="bg-card rounded-3xl p-5 border border-border/50 shadow-sm flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {profile.skills.length === 0 && !editingSkills && (
              <p className="text-sm text-muted-foreground italic">No skills added yet.</p>
            )}
            {profile.skills.map(skill => (
              <span key={skill} className="text-xs font-medium bg-secondary px-3 py-1.5 rounded-full text-secondary-foreground flex items-center gap-1.5">
                {skill}
                {editingSkills && (
                  <button onClick={() => toggleSkill(skill)} className="hover:text-destructive transition-colors">
                    <X className="size-3" />
                  </button>
                )}
              </span>
            ))}
            {editingSkills && ALL_SKILLS.filter(s => !profile.skills.includes(s)).map(skill => (
              <button 
                key={skill}
                onClick={() => toggleSkill(skill)}
                className="text-xs font-medium bg-secondary/30 border border-dashed border-border px-3 py-1.5 rounded-full text-muted-foreground hover:bg-secondary transition-colors flex items-center gap-1.5"
              >
                <Plus className="size-3" />
                {skill}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="flex flex-col gap-3">
        <div className="px-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">External Links</h2>
        </div>
        <div className="bg-card rounded-3xl p-2 border border-border/50 shadow-sm flex flex-col">
          {(["github", "linkedin", "portfolio"] as const).map((type, i) => {
            const val = profile[type]
            const isEditing = linkInput.type === type
            const Icon = type === "github" ? Code : type === "linkedin" ? Globe : User

            return (
              <div key={type} className={`p-3 flex items-center justify-between ${i !== 2 ? "border-b border-border/50" : ""}`}>
                <div className="flex items-center gap-3 w-full">
                  <div className="size-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="size-4" />
                  </div>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2 pr-2">
                      <input 
                        type="url" 
                        placeholder={`https://${type}.com/...`}
                        value={tempLink}
                        onChange={(e) => setTempLink(e.target.value)}
                        className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                        autoFocus
                      />
                      <Button size="xs" onClick={handleSaveLink}>Save</Button>
                      <Button size="xs" variant="ghost" onClick={() => setLinkInput({ type: null })}>Cancel</Button>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="text-sm font-medium capitalize">{type}</span>
                      {val ? (
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground truncate max-w-[120px]">{val.replace(/^https?:\/\//, '')}</span>
                          <button onClick={() => { setLinkInput({ type }); setTempLink(val); }} className="text-xs text-primary hover:underline">Edit</button>
                        </div>
                      ) : (
                        <button onClick={() => { setLinkInput({ type }); setTempLink(""); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                          <Plus className="size-3" /> Add Link
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Pending Connections */}
      {pendingRequests.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="px-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connection Requests</h2>
          </div>
          <div className="flex flex-col gap-3">
            {pendingRequests.map(req => {
              const student = getStudent(req.fromId)
              if (!student) return null
              
              return (
                <div key={req.id} className="bg-card rounded-3xl p-5 border border-primary/20 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-secondary overflow-hidden shrink-0">
                      <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{student.name}</h3>
                      <p className="text-xs text-muted-foreground">{branchName(student.branchId)} • Sem {student.semester}</p>
                    </div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3 text-sm italic border-l-2 border-primary/50 text-muted-foreground">
                    "{req.message}"
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Button className="flex-1 rounded-full h-8" onClick={() => acceptConnection(req.id)}>
                      <Check className="size-4 mr-1.5" /> Accept
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-full h-8" onClick={() => declineConnection(req.id)}>
                      <X className="size-4 mr-1.5" /> Decline
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
      
      {/* spacer for bottom nav */}
      <div className="h-4" />
    </div>
  )
}
