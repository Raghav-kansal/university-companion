"use client"

import { useMemo, useRef, useState } from "react"
import { BRANCHES, MATERIALS, SUBJECTS, subjectsFor } from "@/lib/data"
import { useStore } from "@/lib/store"
import {
  ActionButton,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  Pill,
  Segmented,
  Select,
  SectionTitle,
} from "@/components/kit"
import { Trending } from "./trending"
import { ChatGateways } from "./chat-gateways"
import type { Material, MaterialKind } from "@/lib/types"
import {
  Download,
  Eye,
  FileText,
  FileStack,
  ClipboardList,
  Presentation,
  Search,
  Upload,
  Library,
  ChevronRight,
} from "lucide-react"

const KIND_META: Record<MaterialKind, { label: string; icon: typeof FileText; tone: string }> = {
  slides: { label: "Slides", icon: Presentation, tone: "text-[var(--accent-blue)]" },
  notes: { label: "Notes", icon: FileText, tone: "text-[var(--success)]" },
  pyq: { label: "PYQs", icon: FileStack, tone: "text-[var(--ring-move)]" },
  assignment: { label: "Assignments", icon: ClipboardList, tone: "text-[var(--warning)]" },
}

function fmtSize(kb: number) {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
}

export function Shelf() {
  const { branchId: defBranch, semester: defSem, userMaterials, addUserMaterial, profile } = useStore()
  const [branchId, setBranchId] = useState(defBranch ?? "cse")
  const [semester, setSemester] = useState(defSem ?? 3)
  const [subjectId, setSubjectId] = useState<string | null>(null)
  const [kind, setKind] = useState<MaterialKind | "all">("all")
  const [query, setQuery] = useState("")
  const [uploadOpen, setUploadOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadKind, setUploadKind] = useState<MaterialKind>("notes")
  const [uploadBranch, setUploadBranch] = useState(defBranch ?? "cse")
  const [toast, setToast] = useState<string | null>(null)
  const subjectsRef = useRef<HTMLDivElement>(null)

  const branch = BRANCHES.find((b) => b.id === branchId)
  const subjects = useMemo(() => subjectsFor(branchId, semester), [branchId, semester])
  const subject = subjects.find((s) => s.id === subjectId)

  const materials = useMemo(() => {
    const allMats = [...MATERIALS, ...userMaterials]
    let list: Material[] = allMats.filter((m) => m.branchId === branchId && m.semester === semester)
    if (subjectId) list = list.filter((m) => m.subjectId === subjectId)
    if (kind !== "all") list = list.filter((m) => m.kind === kind)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((m) => m.title.toLowerCase().includes(q) || m.uploader.toLowerCase().includes(q))
    }
    return list.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))
  }, [branchId, semester, subjectId, kind, query, userMaterials])

  function handleBranch(v: string) {
    setBranchId(v)
    setSubjectId(null)
  }
  function handleSem(v: number) {
    setSemester(v)
    setSubjectId(null)
  }
  function openSubjectFromTrending(sid: string) {
    const s = SUBJECTS.find((x) => x.id === sid)
    if (!s) return
    setBranchId(s.branchId)
    setSemester(s.semester)
    setSubjectId(s.id)
    subjectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function fakeAction(label: string) {
    setToast(label)
    window.clearTimeout((fakeAction as any)._t)
    ;(fakeAction as any)._t = window.setTimeout(() => setToast(null), 1800)
  }

  function downloadMaterial(m: Material) {
    const a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent("Dummy content for " + m.title);
    a.download = m.title.replace(/\s+/g, "_") + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    fakeAction(`Downloaded "${m.title}"`);
  }


  return (
    <div className="flex flex-col gap-6">
      <SectionTitle
        title="The Shelf"
        subtitle="Crowdsourced slides, notes, PYQs and assignments — organised by branch, semester and subject."
        action={
          <ActionButton size="sm" onClick={() => setUploadOpen(true)} className="shrink-0">
            <Upload className="size-4" /> Upload
          </ActionButton>
        }
      />

      <Trending onOpen={openSubjectFromTrending} />

      {/* Cascading filters */}
      <Card ref={subjectsRef as any}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Branch">
            <Select value={branchId} onChange={(e) => handleBranch(e.target.value)}>
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Semester">
            <Select value={semester} onChange={(e) => handleSem(Number(e.target.value))}>
              {(branch?.semesters ?? []).map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        {/* Subject chips */}
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Subject</p>
          {subjects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No subjects seeded for this combination yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubjectId(null)}
                className={`tactile rounded-full px-3 py-1.5 text-sm font-medium ${
                  subjectId === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                All subjects
              </button>
              {subjects.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSubjectId(s.id)}
                  className={`tactile rounded-full px-3 py-1.5 text-sm font-medium ${
                    subjectId === s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s.code}
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Search + kind filter */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search materials or uploaders..."
            className="pl-11"
          />
        </div>
        <Segmented
          value={kind}
          onChange={setKind}
          options={[
            { value: "all", label: "All" },
            { value: "slides", label: "Slides" },
            { value: "notes", label: "Notes" },
            { value: "pyq", label: "PYQs" },
            { value: "assignment", label: "Tasks" },
          ]}
        />
      </div>

      {/* Materials */}
      {subject ? (
        <p className="px-1 text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{subject.name}</span> · {materials.length} item
          {materials.length === 1 ? "" : "s"}
        </p>
      ) : null}

      {materials.length === 0 ? (
        <EmptyState
          icon={<Library className="size-8" />}
          title="Nothing here yet"
          description="Be the first to upload material for this subject and help your batchmates out."
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {materials.map((m) => {
            const meta = KIND_META[m.kind]
            const Icon = meta.icon
            return (
              <li key={m.id}>
                <Card className="flex items-center gap-3 p-3">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-2xl bg-muted ${meta.tone}`}>
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.title}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                      <span>by {m.uploader}</span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="size-3" /> {m.views.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Download className="size-3" /> {m.downloads.toLocaleString()}
                      </span>
                      <span>{fmtSize(m.sizeKb)}</span>
                    </div>
                  </div>
                  <ActionButton
                    size="sm"
                    variant="secondary"
                    onClick={() => downloadMaterial(m)}
                    aria-label={`Download ${m.title}`}
                  >
                    <Download className="size-4" />
                  </ActionButton>
                </Card>
              </li>
            )
          })}
        </ul>
      )}

      <ChatGateways branchId={branchId} semester={semester} />

      <Modal
        open={uploadOpen}
        onClose={() => { setUploadOpen(false); setSelectedFile(null); setUploadTitle(""); }}
        title="Upload material"
        footer={
          <>
            <ActionButton variant="ghost" className="flex-1" onClick={() => { setUploadOpen(false); setSelectedFile(null); setUploadTitle(""); }}>
              Cancel
            </ActionButton>
            <ActionButton
              className="flex-1"
              onClick={() => {
                if (!selectedFile || !uploadTitle.trim()) {
                  fakeAction("Please provide a title and select a file.")
                  return
                }
                addUserMaterial({
                  id: `m-usr-${Date.now()}`,
                  title: uploadTitle.trim(),
                  kind: uploadKind,
                  branchId: uploadBranch,
                  semester: semester,
                  subjectId: subjectId || subjects[0]?.id || "unknown",
                  uploader: profile.name,
                  sizeKb: Math.round(selectedFile.size / 1024),
                  uploadedAt: new Date().toISOString().slice(0, 10),
                  views: 0,
                  downloads: 0
                })
                setUploadOpen(false)
                setSelectedFile(null)
                setUploadTitle("")
                fakeAction("Thanks! Your material was uploaded successfully.")
              }}
            >
              Submit
            </ActionButton>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Field label="Title">
            <Input value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} placeholder="e.g. DBMS — Indexing Notes" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Branch">
              <Select value={uploadBranch} onChange={e => setUploadBranch(e.target.value)}>
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.short}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Type">
              <Select value={uploadKind} onChange={e => setUploadKind(e.target.value as MaterialKind)}>
                <option value="slides">Slides</option>
                <option value="notes">Notes</option>
                <option value="pyq">PYQ</option>
                <option value="assignment">Assignment</option>
              </Select>
            </Field>
          </div>
          <label className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-border py-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
            <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
            <Upload className="size-7 text-muted-foreground" />
            <p className="text-sm font-medium">{selectedFile ? selectedFile.name : "Drag a file here or tap to browse"}</p>
            <p className="text-xs text-muted-foreground">{selectedFile ? fmtSize(Math.round(selectedFile.size / 1024)) : "PDF, PPT, DOCX up to 25 MB"}</p>
          </label>
          <p className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3 text-xs text-muted-foreground">
            <ChevronRight className="mt-0.5 size-3.5 shrink-0" />
            Uploads are community-moderated. Avoid copyrighted textbooks — share your own notes and slides.
          </p>
        </div>
      </Modal>

      {toast ? (
        <div className="fixed inset-x-0 bottom-28 z-[70] flex justify-center px-4">
          <div className="glass-strong animate-fade-in rounded-full border border-border/70 px-4 py-2 text-sm font-medium shadow-lg">
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  )
}
