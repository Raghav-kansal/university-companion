export type MealKey = "breakfast" | "lunch" | "snacks" | "dinner"
export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
export type MaterialKind = "slides" | "notes" | "pyq" | "assignment"
export type ChatPlatform = "whatsapp" | "discord" | "telegram"
export type ProjectCategory = "Hackathon" | "Final Year Project" | "Startup Idea" | "Open Source" | "Research"

export interface Campus {
  id: string
  name: string
  location: string
  blurb: string
}

export interface Branch {
  id: string
  name: string
  short: string
  semesters: number[]
}

export interface Subject {
  id: string
  code: string
  name: string
  credits: number
  branchId: string
  semester: number
}

export interface ClassSession {
  id: string
  subject: string
  code: string
  faculty: string
  room: string
  day: DayKey
  start: string // "09:00"
  end: string // "09:50"
  type: "Lecture" | "Tutorial" | "Lab"
  batch: string
}

export interface MessMenuDay {
  day: DayKey
  breakfast: string[]
  lunch: string[]
  snacks: string[]
  dinner: string[]
}

export interface AcademicEvent {
  id: string
  title: string
  date: string // ISO
  kind: "exam" | "break" | "holiday" | "event" | "deadline"
}

export interface Material {
  id: string
  title: string
  kind: MaterialKind
  branchId: string
  semester: number
  subjectId: string
  uploader: string
  sizeKb: number
  uploadedAt: string
  views: number
  downloads: number
}

export interface ChatGateway {
  subjectId: string
  platform: ChatPlatform
  label: string
  url: string
}

export interface Student {
  id: string
  name: string
  avatar: string
  branchId: string
  semester: number
  bio: string
  skills: string[]
  github?: string
  linkedin?: string
  portfolio?: string
  openToCollaborate: boolean
}

export interface Project {
  id: string
  title: string
  pitch: string
  ownerId: string
  category: ProjectCategory
  teamSize: number
  filled: number
  openRoles: string[]
  tags: string[]
  branchHint?: string
  createdAt: string
}

export type ConnectionStatus = "pending" | "accepted"

export interface Connection {
  id: string
  fromId: string
  toId: string
  status: ConnectionStatus
  message: string
  createdAt: string
}

/* ---- User-owned persisted state ---- */

export interface AttendanceSubject {
  id: string
  name: string
  threshold: number // minimum required %
  present: number
  total: number
}

export interface ScheduleFilters {
  course: string
  batch: string
  group: string
}

export interface UserProfile {
  name: string
  branchId: string
  semester: number
  bio: string
  skills: string[]
  github: string
  linkedin: string
  portfolio: string
  openToCollaborate: boolean
  savedSgpa?: number
}

export interface PastSemester {
  id: string
  sem: number
  sgpa: number
  credits: number
}
