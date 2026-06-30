"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { PROJECTS } from "./data"
import type {
  AttendanceSubject,
  Connection,
  Project,
  UserProfile,
  Material,
  PastSemester,
} from "./types"

export const ME_ID = "u-me"

const KEY = "uni-companion-state-v1"

interface PersistedState {
  campusId: string | null
  branchId: string | null
  semester: number | null
  attendance: AttendanceSubject[]
  profile: UserProfile
  userProjects: Project[]
  connections: Connection[]
  alertDismissed: boolean
  theme: "light" | "dark" | "system"
  userMaterials: Material[]
  pastSemesters: PastSemester[]
}

const DEFAULT_PROFILE: UserProfile = {
  name: "You",
  branchId: "cse",
  semester: 3,
  bio: "Add a short bio so collaborators know what you're about.",
  skills: ["HTML", "CSS", "JavaScript"],
  github: "",
  linkedin: "",
  portfolio: "",
  openToCollaborate: true,
}

const DEFAULT_ATTENDANCE: AttendanceSubject[] = [
  { id: "a1", name: "Data Structures", threshold: 75, present: 28, total: 34 },
  { id: "a2", name: "DBMS", threshold: 75, present: 22, total: 32 },
  { id: "a3", name: "Discrete Math", threshold: 75, present: 19, total: 30 },
  { id: "a4", name: "Computer Organisation", threshold: 75, present: 26, total: 29 },
]

const DEFAULT_STATE: PersistedState = {
  campusId: "main",
  branchId: "cse",
  semester: 3,
  attendance: DEFAULT_ATTENDANCE,
  profile: DEFAULT_PROFILE,
  userProjects: [],
  connections: [
    {
      id: "c-seed-1",
      fromId: "u-priya",
      toId: ME_ID,
      status: "pending",
      message: "Hey! Saw you're into front-end — want to team up for the ML hackathon? I need someone for the UI.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: "c-seed-2",
      fromId: "u-dev",
      toId: ME_ID,
      status: "pending",
      message: "Looking for contributors on the open-source attendance SDK. You in?",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    },
    {
      id: "c-seed-3",
      fromId: ME_ID,
      toId: "u-aarav",
      status: "accepted",
      message: "Would love to help build CampusEats!",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    },
  ],
  alertDismissed: false,
  theme: "system",
  userMaterials: [],
  pastSemesters: [
    { id: "ps-1", sem: 1, sgpa: 8.5, credits: 20 },
    { id: "ps-2", sem: 2, sgpa: 9.0, credits: 22 },
  ],
}

interface StoreContextValue extends PersistedState {
  ready: boolean
  allProjects: Project[]
  setOnboarding: (campusId: string, branchId: string, semester: number) => void
  resetOnboarding: () => void
  // attendance
  addAttendanceSubject: (name: string, threshold: number) => void
  removeAttendanceSubject: (id: string) => void
  logAttendance: (id: string, present: boolean) => void
  undoAttendance: (id: string, present: boolean) => void
  // profile
  updateProfile: (patch: Partial<UserProfile>) => void
  // projects
  addProject: (p: Omit<Project, "id" | "ownerId" | "createdAt" | "filled">) => void
  removeProject: (id: string) => void
  // connections
  sendConnection: (toId: string, message: string) => void
  acceptConnection: (id: string) => void
  declineConnection: (id: string) => void
  // misc
  dismissAlert: () => void
  setTheme: (t: "light" | "dark" | "system") => void
  // materials
  addUserMaterial: (m: Material) => void
  removeUserMaterial: (id: string) => void
  // past semesters
  addPastSemester: (ps: PastSemester) => void
  removePastSemester: (id: string) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(DEFAULT_STATE)
  const [ready, setReady] = useState(false)

  // We disable localStorage for the demo so it always loads the fresh, fully populated demo data
  useEffect(() => {
    setReady(true)
  }, [])

  // No-op save
  useEffect(() => {
    // localStorage.setItem(KEY, JSON.stringify(state))
  }, [state, ready])

  // Apply theme
  useEffect(() => {
    if (!ready) return
    const root = document.documentElement
    const apply = (dark: boolean) => {
      root.classList.toggle("dark", dark)
      root.classList.toggle("light", !dark)
    }
    if (state.theme === "system") {
      root.classList.remove("light", "dark")
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      const handler = () => {
        root.classList.remove("light", "dark")
      }
      mq.addEventListener("change", handler)
      return () => mq.removeEventListener("change", handler)
    }
    apply(state.theme === "dark")
  }, [state.theme, ready])

  const patch = useCallback((p: Partial<PersistedState>) => {
    setState((s) => ({ ...s, ...p }))
  }, [])

  const setOnboarding = useCallback((campusId: string, branchId: string, semester: number) => {
    setState((s) => ({ ...s, campusId, branchId, semester, profile: { ...s.profile, branchId, semester } }))
  }, [])

  const resetOnboarding = useCallback(() => {
    patch({ campusId: null, branchId: null, semester: null })
  }, [patch])

  const addAttendanceSubject = useCallback((name: string, threshold: number) => {
    setState((s) => ({
      ...s,
      attendance: [...s.attendance, { id: uid("a"), name, threshold, present: 0, total: 0 }],
    }))
  }, [])

  const removeAttendanceSubject = useCallback((id: string) => {
    setState((s) => ({ ...s, attendance: s.attendance.filter((a) => a.id !== id) }))
  }, [])

  const logAttendance = useCallback((id: string, present: boolean) => {
    setState((s) => ({
      ...s,
      attendance: s.attendance.map((a) =>
        a.id === id ? { ...a, total: a.total + 1, present: a.present + (present ? 1 : 0) } : a,
      ),
    }))
  }, [])

  const undoAttendance = useCallback((id: string, present: boolean) => {
    setState((s) => ({
      ...s,
      attendance: s.attendance.map((a) =>
        a.id === id
          ? {
              ...a,
              total: Math.max(0, a.total - 1),
              present: Math.max(0, a.present - (present ? 1 : 0)),
            }
          : a,
      ),
    }))
  }, [])

  const updateProfile = useCallback((p: Partial<UserProfile>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...p } }))
  }, [])

  const addProject = useCallback(
    (p: Omit<Project, "id" | "ownerId" | "createdAt" | "filled">) => {
      setState((s) => ({
        ...s,
        userProjects: [
          {
            ...p,
            id: uid("p"),
            ownerId: ME_ID,
            filled: 1,
            createdAt: new Date().toISOString().slice(0, 10),
          },
          ...s.userProjects,
        ],
      }))
    },
    [],
  )

  const removeProject = useCallback((id: string) => {
    setState((s) => ({ ...s, userProjects: s.userProjects.filter((p) => p.id !== id) }))
  }, [])

  const sendConnection = useCallback((toId: string, message: string) => {
    setState((s) => {
      if (s.connections.some((c) => c.toId === toId && c.fromId === ME_ID)) return s
      return {
        ...s,
        connections: [
          ...s.connections,
          { id: uid("c"), fromId: ME_ID, toId, status: "pending", message, createdAt: new Date().toISOString() },
        ],
      }
    })
  }, [])

  const acceptConnection = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      connections: s.connections.map((c) => (c.id === id ? { ...c, status: "accepted" } : c)),
    }))
  }, [])

  const declineConnection = useCallback((id: string) => {
    setState((s) => ({ ...s, connections: s.connections.filter((c) => c.id !== id) }))
  }, [])

  const addUserMaterial = useCallback((m: Material) => {
    setState((s) => ({ ...s, userMaterials: [m, ...s.userMaterials] }))
  }, [])

  const removeUserMaterial = useCallback((id: string) => {
    setState((s) => ({ ...s, userMaterials: s.userMaterials.filter((m) => m.id !== id) }))
  }, [])

  const addPastSemester = useCallback((ps: PastSemester) => {
    setState((s) => ({ ...s, pastSemesters: [...s.pastSemesters, ps] }))
  }, [])

  const removePastSemester = useCallback((id: string) => {
    setState((s) => ({ ...s, pastSemesters: s.pastSemesters.filter((ps) => ps.id !== id) }))
  }, [])

  const dismissAlert = useCallback(() => patch({ alertDismissed: true }), [patch])
  const setTheme = useCallback((t: "light" | "dark" | "system") => patch({ theme: t }), [patch])

  const allProjects = useMemo(() => [...state.userProjects, ...PROJECTS], [state.userProjects])

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      ready,
      allProjects,
      setOnboarding,
      resetOnboarding,
      addAttendanceSubject,
      removeAttendanceSubject,
      logAttendance,
      undoAttendance,
      updateProfile,
      addProject,
      removeProject,
      sendConnection,
      acceptConnection,
      declineConnection,
      dismissAlert,
      setTheme,
      addUserMaterial,
      removeUserMaterial,
      addPastSemester,
      removePastSemester,
    }),
    [
      state,
      ready,
      allProjects,
      setOnboarding,
      resetOnboarding,
      addAttendanceSubject,
      removeAttendanceSubject,
      logAttendance,
      undoAttendance,
      updateProfile,
      addProject,
      removeProject,
      sendConnection,
      acceptConnection,
      declineConnection,
      dismissAlert,
      setTheme,
      addUserMaterial,
      removeUserMaterial,
      addPastSemester,
      removePastSemester,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
