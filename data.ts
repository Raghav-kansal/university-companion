import type {
  AcademicEvent,
  Branch,
  Campus,
  ChatGateway,
  ClassSession,
  Material,
  MessMenuDay,
  Project,
  Student,
  Subject,
} from "./types"

export const CAMPUSES: Campus[] = [
  {
    id: "main",
    name: "Main Campus",
    location: "Sector 62",
    blurb: "The flagship campus — core engineering, labs and central library.",
  },
  {
    id: "sec128",
    name: "Sector 128 Campus",
    location: "Sector 128",
    blurb: "The riverside campus — design, management and research blocks.",
  },
]

export const BRANCHES: Branch[] = [
  { id: "cse", name: "Computer Science & Engineering", short: "CSE", semesters: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: "it", name: "Information Technology", short: "IT", semesters: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: "ece", name: "Electronics & Communication", short: "ECE", semesters: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: "me", name: "Mechanical Engineering", short: "ME", semesters: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: "civil", name: "Civil Engineering", short: "CIVIL", semesters: [1, 2, 3, 4, 5, 6, 7, 8] },
]

export const SUBJECTS: Subject[] = [
  // CSE Sem 3
  { id: "cse3-ds", code: "CS301", name: "Data Structures", credits: 4, branchId: "cse", semester: 3 },
  { id: "cse3-dbms", code: "CS302", name: "Database Management Systems", credits: 4, branchId: "cse", semester: 3 },
  { id: "cse3-coa", code: "CS303", name: "Computer Organisation & Architecture", credits: 3, branchId: "cse", semester: 3 },
  { id: "cse3-math", code: "MA301", name: "Discrete Mathematics", credits: 4, branchId: "cse", semester: 3 },
  { id: "cse3-dld", code: "EC301", name: "Digital Logic Design", credits: 3, branchId: "cse", semester: 3 },
  // CSE Sem 4
  { id: "cse4-algo", code: "CS401", name: "Design & Analysis of Algorithms", credits: 4, branchId: "cse", semester: 4 },
  { id: "cse4-os", code: "CS402", name: "Operating Systems", credits: 4, branchId: "cse", semester: 4 },
  { id: "cse4-toc", code: "CS403", name: "Theory of Computation", credits: 3, branchId: "cse", semester: 4 },
  { id: "cse4-oops", code: "CS404", name: "Object Oriented Programming", credits: 4, branchId: "cse", semester: 4 },
  { id: "cse5-cn", code: "CS501", name: "Computer Networks", credits: 4, branchId: "cse", semester: 5 },
  { id: "cse5-se", code: "CS502", name: "Software Engineering", credits: 3, branchId: "cse", semester: 5 },
  { id: "cse5-ai", code: "CS503", name: "Artificial Intelligence", credits: 4, branchId: "cse", semester: 5 },
  // CSE Sem 6
  { id: "cse6-cd", code: "CS601", name: "Compiler Design", credits: 4, branchId: "cse", semester: 6 },
  { id: "cse6-ml", code: "CS602", name: "Machine Learning", credits: 4, branchId: "cse", semester: 6 },
  { id: "cse6-web", code: "CS603", name: "Advanced Web Development", credits: 3, branchId: "cse", semester: 6 },
  // IT Sem 3
  { id: "it3-web", code: "IT301", name: "Web Technologies", credits: 4, branchId: "it", semester: 3 },
  { id: "it3-ds", code: "IT302", name: "Data Structures", credits: 4, branchId: "it", semester: 3 },
  { id: "it3-dbms", code: "IT303", name: "Database Systems", credits: 4, branchId: "it", semester: 3 },
  // ECE Sem 3
  { id: "ece3-sig", code: "EC301", name: "Signals & Systems", credits: 4, branchId: "ece", semester: 3 },
  { id: "ece3-net", code: "EC302", name: "Network Theory", credits: 4, branchId: "ece", semester: 3 },
  { id: "ece3-edc", code: "EC303", name: "Electronic Devices & Circuits", credits: 3, branchId: "ece", semester: 3 },
  // ME Sem 3
  { id: "me3-thermo", code: "ME301", name: "Thermodynamics", credits: 4, branchId: "me", semester: 3 },
  { id: "me3-som", code: "ME302", name: "Strength of Materials", credits: 4, branchId: "me", semester: 3 },
  // CIVIL Sem 3
  { id: "civil3-surv", code: "CE301", name: "Surveying", credits: 4, branchId: "civil", semester: 3 },
  { id: "civil3-fm", code: "CE302", name: "Fluid Mechanics", credits: 4, branchId: "civil", semester: 3 },
]

export function subjectsFor(branchId: string, semester: number) {
  return SUBJECTS.filter((s) => s.branchId === branchId && s.semester === semester)
}

export const SCHEDULE: ClassSession[] = [
  { id: "s1", subject: "Data Structures", code: "CS301", faculty: "Dr. Mehta", room: "LT-4", day: "mon", start: "09:00", end: "09:50", type: "Lecture", batch: "A1" },
  { id: "s2", subject: "Database Management Systems", code: "CS302", faculty: "Dr. Rao", room: "LT-2", day: "mon", start: "10:00", end: "10:50", type: "Lecture", batch: "A1" },
  { id: "s3", subject: "Discrete Mathematics", code: "MA301", faculty: "Prof. Iyer", room: "LT-1", day: "mon", start: "11:00", end: "11:50", type: "Lecture", batch: "A1" },
  { id: "s4", subject: "DS Lab", code: "CS301L", faculty: "Dr. Mehta", room: "Lab-3", day: "mon", start: "14:00", end: "15:40", type: "Lab", batch: "A1" },
  { id: "s5", subject: "Computer Organisation", code: "CS303", faculty: "Dr. Khan", room: "LT-3", day: "tue", start: "09:00", end: "09:50", type: "Lecture", batch: "A1" },
  { id: "s6", subject: "Digital Logic Design", code: "EC301", faculty: "Dr. Bose", room: "LT-5", day: "tue", start: "10:00", end: "10:50", type: "Lecture", batch: "A1" },
  { id: "s7", subject: "DBMS Tutorial", code: "CS302T", faculty: "Dr. Rao", room: "T-7", day: "tue", start: "11:00", end: "11:50", type: "Tutorial", batch: "T2" },
  { id: "s8", subject: "Data Structures", code: "CS301", faculty: "Dr. Mehta", room: "LT-4", day: "wed", start: "09:00", end: "09:50", type: "Lecture", batch: "A1" },
  { id: "s9", subject: "Discrete Mathematics", code: "MA301", faculty: "Prof. Iyer", room: "LT-1", day: "wed", start: "10:00", end: "10:50", type: "Lecture", batch: "A1" },
  { id: "s10", subject: "DBMS Lab", code: "CS302L", faculty: "Dr. Rao", room: "Lab-1", day: "wed", start: "14:00", end: "15:40", type: "Lab", batch: "A1" },
  { id: "s11", subject: "Computer Organisation", code: "CS303", faculty: "Dr. Khan", room: "LT-3", day: "thu", start: "09:00", end: "09:50", type: "Lecture", batch: "A1" },
  { id: "s12", subject: "Database Management Systems", code: "CS302", faculty: "Dr. Rao", room: "LT-2", day: "thu", start: "10:00", end: "10:50", type: "Lecture", batch: "A1" },
  { id: "s13", subject: "Math Tutorial", code: "MA301T", faculty: "Prof. Iyer", room: "T-3", day: "thu", start: "11:00", end: "11:50", type: "Tutorial", batch: "T2" },
  { id: "s14", subject: "Data Structures", code: "CS301", faculty: "Dr. Mehta", room: "LT-4", day: "fri", start: "09:00", end: "09:50", type: "Lecture", batch: "A1" },
  { id: "s15", subject: "Digital Logic Design", code: "EC301", faculty: "Dr. Bose", room: "LT-5", day: "fri", start: "10:00", end: "10:50", type: "Lecture", batch: "A1" },
  { id: "s16", subject: "Seminar", code: "HS301", faculty: "Dr. Nair", room: "Seminar Hall", day: "fri", start: "12:00", end: "12:50", type: "Lecture", batch: "A1" },
  { id: "s17", subject: "Library / Self Study", code: "SS101", faculty: "N/A", room: "Central Library", day: "fri", start: "14:00", end: "16:00", type: "Tutorial", batch: "A1" },
  { id: "s18", subject: "Project Mentorship", code: "PRJ301", faculty: "Dr. Mehta", room: "Lab-4", day: "sat", start: "10:00", end: "12:00", type: "Lab", batch: "A1" },
  { id: "s19", subject: "Guest Lecture: Industry Trends", code: "GL101", faculty: "Various", room: "Auditorium", day: "sat", start: "13:00", end: "15:00", type: "Lecture", batch: "All" },
]

export const MESS_MENU: MessMenuDay[] = [
  { day: "mon", breakfast: ["Aloo Paratha", "Curd", "Tea / Coffee"], lunch: ["Rajma", "Jeera Rice", "Roti", "Salad"], snacks: ["Samosa", "Masala Chai"], dinner: ["Paneer Butter Masala", "Roti", "Rice", "Gulab Jamun"] },
  { day: "tue", breakfast: ["Idli Sambar", "Coconut Chutney", "Filter Coffee"], lunch: ["Chole", "Rice", "Roti", "Boondi Raita"], snacks: ["Veg Sandwich", "Cold Coffee"], dinner: ["Veg Biryani", "Raita", "Papad"] },
  { day: "wed", breakfast: ["Poha", "Sev", "Tea / Coffee"], lunch: ["Kadhi Pakora", "Rice", "Roti", "Salad"], snacks: ["Pav Bhaji"], dinner: ["Dal Makhani", "Roti", "Rice", "Ice Cream"] },
  { day: "thu", breakfast: ["Masala Dosa", "Sambar", "Filter Coffee"], lunch: ["Mix Veg", "Rice", "Roti", "Curd"], snacks: ["Vada Pav", "Chai"], dinner: ["Shahi Paneer", "Roti", "Rice", "Halwa"] },
  { day: "fri", breakfast: ["Bread Omelette / Bhurji", "Tea / Coffee"], lunch: ["Aloo Gobi", "Dal", "Rice", "Roti"], snacks: ["Maggi", "Lemon Tea"], dinner: ["Chicken / Veg Curry", "Roti", "Rice", "Custard"] },
  { day: "sat", breakfast: ["Chole Bhature", "Pickle", "Tea / Coffee"], lunch: ["Veg Pulao", "Dal Tadka", "Salad"], snacks: ["Bhel Puri"], dinner: ["Special Thali", "Sweet"] },
  { day: "sun", breakfast: ["Puri Sabzi", "Halwa", "Tea / Coffee"], lunch: ["Paneer Tikka", "Naan", "Dal", "Rice"], snacks: ["Pizza Slice", "Soft Drink"], dinner: ["Fried Rice", "Manchurian", "Soup"] },
]

const yr = new Date().getFullYear()
export const ACADEMIC_CALENDAR: AcademicEvent[] = [
  { id: "e1", title: "Mid Semester Exams", date: `${yr}-09-15`, kind: "exam" },
  { id: "e2", title: "Tech Fest — Innovision", date: `${yr}-10-10`, kind: "event" },
  { id: "e3", title: "Project Submission Deadline", date: `${yr}-11-05`, kind: "deadline" },
  { id: "e4", title: "End Semester Exams", date: `${yr}-11-25`, kind: "exam" },
  { id: "e5", title: "Winter Break Begins", date: `${yr}-12-20`, kind: "break" },
  { id: "e6", title: "Summer Break Begins", date: `${yr + 1}-05-15`, kind: "break" },
]

export const COUNTDOWN_TARGETS = [
  { id: "endsem", label: "End Semester Exams", date: `${yr}-11-25T09:00:00` },
  { id: "summer", label: "Summer Break", date: `${yr + 1}-05-15T00:00:00` },
]

export const MATERIALS: Material[] = [
  { id: "m1", title: "DS — Trees & Traversals (Full Slides)", kind: "slides", branchId: "cse", semester: 3, subjectId: "cse3-ds", uploader: "Aarav S.", sizeKb: 4200, uploadedAt: `${yr}-08-12`, views: 1820, downloads: 940 },
  { id: "m2", title: "DS — Handwritten Notes (Linked Lists)", kind: "notes", branchId: "cse", semester: 3, subjectId: "cse3-ds", uploader: "Priya N.", sizeKb: 8800, uploadedAt: `${yr}-08-20`, views: 2410, downloads: 1320 },
  { id: "m3", title: "DBMS — Normalization PYQ (2019-2024)", kind: "pyq", branchId: "cse", semester: 3, subjectId: "cse3-dbms", uploader: "Kabir M.", sizeKb: 1500, uploadedAt: `${yr}-08-25`, views: 3050, downloads: 1980 },
  { id: "m4", title: "DBMS — SQL Lab Assignment 4", kind: "assignment", branchId: "cse", semester: 3, subjectId: "cse3-dbms", uploader: "Ishita R.", sizeKb: 320, uploadedAt: `${yr}-09-01`, views: 740, downloads: 410 },
  { id: "m5", title: "Discrete Math — Graph Theory Slides", kind: "slides", branchId: "cse", semester: 3, subjectId: "cse3-math", uploader: "Prof. Iyer", sizeKb: 5200, uploadedAt: `${yr}-08-15`, views: 980, downloads: 520 },
  { id: "m6", title: "COA — Pipelining Notes", kind: "notes", branchId: "cse", semester: 3, subjectId: "cse3-coa", uploader: "Rohan D.", sizeKb: 6100, uploadedAt: `${yr}-08-28`, views: 1280, downloads: 690 },
  { id: "m7", title: "Algorithms — DP Master Notes", kind: "notes", branchId: "cse", semester: 4, subjectId: "cse4-algo", uploader: "Sara K.", sizeKb: 9400, uploadedAt: `${yr}-08-30`, views: 4100, downloads: 2600 },
  { id: "m8", title: "OS — Process Scheduling PYQ", kind: "pyq", branchId: "cse", semester: 4, subjectId: "cse4-os", uploader: "Dev P.", sizeKb: 1800, uploadedAt: `${yr}-09-02`, views: 2900, downloads: 1700 },
  { id: "m9", title: "Web Tech — React Project Assignment", kind: "assignment", branchId: "it", semester: 3, subjectId: "it3-web", uploader: "Nisha T.", sizeKb: 540, uploadedAt: `${yr}-09-03`, views: 1100, downloads: 600 },
  { id: "m10", title: "Signals — Fourier Transform Slides", kind: "slides", branchId: "ece", semester: 3, subjectId: "ece3-sig", uploader: "Aman V.", sizeKb: 4600, uploadedAt: `${yr}-08-18`, views: 860, downloads: 470 },
  { id: "m11", title: "Thermodynamics — Cycles Handwritten", kind: "notes", branchId: "me", semester: 3, subjectId: "me3-thermo", uploader: "Vikram J.", sizeKb: 7200, uploadedAt: `${yr}-08-22`, views: 640, downloads: 350 },
  { id: "m12", title: "OOPS — Inheritance & Polymorphism Slides", kind: "slides", branchId: "cse", semester: 4, subjectId: "cse4-oops", uploader: "Tanya G.", sizeKb: 3900, uploadedAt: `${yr}-09-04`, views: 1530, downloads: 820 },
  { id: "m13", title: "CN — Subnetting Cheatsheet", kind: "notes", branchId: "cse", semester: 5, subjectId: "cse5-cn", uploader: "Raghav K.", sizeKb: 1200, uploadedAt: `${yr}-09-10`, views: 3200, downloads: 2100 },
  { id: "m14", title: "SE — Agile Methodologies", kind: "slides", branchId: "cse", semester: 5, subjectId: "cse5-se", uploader: "Raghav K.", sizeKb: 4500, uploadedAt: `${yr}-09-11`, views: 1100, downloads: 540 },
  { id: "m15", title: "AI — A* Search Algorithm Walkthrough", kind: "notes", branchId: "cse", semester: 5, subjectId: "cse5-ai", uploader: "Adwitta S.", sizeKb: 2800, uploadedAt: `${yr}-09-12`, views: 4500, downloads: 3100 },
  { id: "m16", title: "Web Tech — Express Routing Lab", kind: "assignment", branchId: "it", semester: 3, subjectId: "it3-web", uploader: "Anant A.", sizeKb: 850, uploadedAt: `${yr}-09-14`, views: 890, downloads: 420 },
  { id: "m17", title: "DBMS — Transactions PYQ (Last 5 Years)", kind: "pyq", branchId: "cse", semester: 3, subjectId: "cse3-dbms", uploader: "Suyash S.", sizeKb: 2100, uploadedAt: `${yr}-09-15`, views: 5100, downloads: 3800 },
  { id: "m18", title: "COA — Memory Hierarchy (L1/L2 Cache)", kind: "slides", branchId: "cse", semester: 3, subjectId: "cse3-coa", uploader: "Rishab T.", sizeKb: 6300, uploadedAt: `${yr}-09-18`, views: 1240, downloads: 710 },
]

export const CHAT_GATEWAYS: ChatGateway[] = [
  { subjectId: "cse3-ds", platform: "whatsapp", label: "DS Doubt Group", url: "https://chat.whatsapp.com/" },
  { subjectId: "cse3-ds", platform: "discord", label: "CSE Sem 3 Server", url: "https://discord.gg/" },
  { subjectId: "cse3-dbms", platform: "telegram", label: "DBMS Resources", url: "https://t.me/" },
  { subjectId: "cse4-algo", platform: "discord", label: "Algo Study Hall", url: "https://discord.gg/" },
  { subjectId: "it3-web", platform: "whatsapp", label: "Web Tech Cohort", url: "https://chat.whatsapp.com/" },
]

export const STUDENTS: Student[] = [
  { id: "u-aarav", name: "Aarav Sharma", avatar: "/avatars/aarav.png", branchId: "cse", semester: 5, bio: "Full-stack dev who loves shipping side projects fast.", skills: ["React", "Node.js", "TypeScript", "Postgres"], github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://example.com", openToCollaborate: true },
  { id: "u-priya", name: "Priya Nair", avatar: "/avatars/priya.png", branchId: "cse", semester: 5, bio: "ML enthusiast. NLP and computer vision projects.", skills: ["Python", "PyTorch", "ML", "Pandas"], github: "https://github.com", linkedin: "https://linkedin.com", openToCollaborate: true },
  { id: "u-kabir", name: "Kabir Mehta", avatar: "/avatars/kabir.png", branchId: "it", semester: 5, bio: "UI/UX designer crossing over into front-end.", skills: ["UI Design", "Figma", "CSS", "HTML"], linkedin: "https://linkedin.com", portfolio: "https://example.com", openToCollaborate: true },
  { id: "u-ishita", name: "Ishita Rao", avatar: "/avatars/ishita.png", branchId: "ece", semester: 7, bio: "Embedded systems + IoT. I make hardware talk.", skills: ["C", "Embedded", "IoT", "Python"], github: "https://github.com", openToCollaborate: false },
  { id: "u-dev", name: "Dev Patel", avatar: "/avatars/dev.png", branchId: "cse", semester: 7, bio: "Backend & DevOps. Kubernetes is my happy place.", skills: ["Go", "Docker", "Kubernetes", "AWS"], github: "https://github.com", linkedin: "https://linkedin.com", openToCollaborate: true },
  { id: "u-sara", name: "Sara Khan", avatar: "/avatars/sara.png", branchId: "it", semester: 5, bio: "Competitive programmer. Algorithms nerd.", skills: ["C++", "DSA", "Python"], github: "https://github.com", openToCollaborate: true },
  { id: "u-vikram", name: "Vikram Joshi", avatar: "/avatars/vikram.png", branchId: "me", semester: 5, bio: "CAD + simulation. Building an EV side project.", skills: ["SolidWorks", "MATLAB", "CAD"], linkedin: "https://linkedin.com", openToCollaborate: true },
  { id: "u-tanya", name: "Tanya Gupta", avatar: "/avatars/tanya.png", branchId: "cse", semester: 3, bio: "Front-end + a little design. Learning React.", skills: ["HTML", "CSS", "JavaScript", "React"], github: "https://github.com", openToCollaborate: true },
  { id: "u-raghav", name: "Raghav Kansal", avatar: "/avatars/raghav.png", branchId: "cse", semester: 5, bio: "Full-Stack Developer passionate about scalable web apps.", skills: ["React", "Node.js", "TypeScript", "Next.js"], github: "https://github.com/raghavkansal", linkedin: "https://linkedin.com", openToCollaborate: true },
  { id: "u-anant", name: "Anant Agarwal", avatar: "/avatars/anant.png", branchId: "it", semester: 5, bio: "Backend systems and API architecture.", skills: ["Go", "Node.js", "Postgres", "Docker"], github: "https://github.com/anant", openToCollaborate: true },
  { id: "u-rishab", name: "Rishab Tyagi", avatar: "/avatars/rishab.png", branchId: "cse", semester: 7, bio: "UI/UX Designer creating pixel-perfect interfaces.", skills: ["Figma", "UI Design", "CSS", "HTML"], linkedin: "https://linkedin.com", portfolio: "https://example.com", openToCollaborate: true },
  { id: "u-adwitta", name: "Adwitta Saxena", avatar: "/avatars/adwitta.png", branchId: "ece", semester: 5, bio: "Machine Learning Engineer. Data is beautiful.", skills: ["Python", "PyTorch", "ML", "MATLAB"], github: "https://github.com", openToCollaborate: true },
  { id: "u-anushka", name: "Anushka Mittal", avatar: "/avatars/anushka.png", branchId: "it", semester: 5, bio: "Frontend Developer focused on accessibility and performance.", skills: ["React", "JavaScript", "CSS", "TypeScript"], github: "https://github.com", openToCollaborate: true },
  { id: "u-suyash", name: "Suyash Singhal", avatar: "/avatars/suyash.png", branchId: "cse", semester: 7, bio: "Cloud & DevOps. Making deployments boring.", skills: ["AWS", "Docker", "Kubernetes", "Linux"], github: "https://github.com", linkedin: "https://linkedin.com", openToCollaborate: false },
]

export const PROJECTS: Project[] = [
  { id: "p1", title: "CampusEats — Mess Pre-ordering App", pitch: "Skip the mess queue: pre-order meals and pay from your phone. Need a backend dev and a designer.", ownerId: "u-aarav", category: "Startup Idea", teamSize: 4, filled: 2, openRoles: ["Backend Dev", "UI Designer"], tags: ["React Native", "Node.js", "Payments"], branchHint: "cse", createdAt: `${yr}-09-01` },
  { id: "p2", title: "Sign-Language Translator (Hackathon)", pitch: "Real-time ASL to text using a webcam for the 36hr national hackathon. Looking for an ML teammate.", ownerId: "u-priya", category: "Hackathon", teamSize: 3, filled: 1, openRoles: ["ML Engineer", "Front-end Dev"], tags: ["Python", "PyTorch", "OpenCV"], branchHint: "cse", createdAt: `${yr}-09-05` },
  { id: "p3", title: "Smart Hostel Energy Monitor", pitch: "IoT dashboard tracking per-room electricity usage to cut wastage. Final year project.", ownerId: "u-ishita", category: "Final Year Project", teamSize: 4, filled: 3, openRoles: ["Web Dev"], tags: ["IoT", "ESP32", "React"], branchHint: "ece", createdAt: `${yr}-08-28` },
  { id: "p4", title: "Open-source Attendance SDK", pitch: "A drop-in attendance tracking library for student apps. Contributors welcome.", ownerId: "u-dev", category: "Open Source", teamSize: 5, filled: 2, openRoles: ["TS Dev", "Docs Writer", "Tester"], tags: ["TypeScript", "Open Source"], branchHint: "cse", createdAt: `${yr}-09-08` },
  { id: "p5", title: "EV Battery Thermal Sim", pitch: "Research project simulating battery pack cooling. Need someone strong in MATLAB.", ownerId: "u-vikram", category: "Research", teamSize: 3, filled: 1, openRoles: ["Simulation", "Data Analyst"], tags: ["MATLAB", "Simulink"], branchHint: "me", createdAt: `${yr}-09-02` },
  { id: "p6", title: "AI Study Assistant", pitch: "Building an LLM wrapper to automatically summarize lecture notes. Need frontend help.", ownerId: "u-raghav", category: "Hackathon", teamSize: 4, filled: 2, openRoles: ["Frontend Dev", "UI Designer"], tags: ["React", "AI", "TypeScript"], branchHint: "cse", createdAt: `${yr}-09-10` },
  { id: "p7", title: "Campus Thrift Store", pitch: "A marketplace for students to buy/sell books and gadgets. Backend is ready in Go.", ownerId: "u-anant", category: "Startup Idea", teamSize: 3, filled: 1, openRoles: ["Frontend Dev"], tags: ["Go", "React", "Postgres"], branchHint: "it", createdAt: `${yr}-09-12` },
]

export const ALL_SKILLS = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "C++", "Go", "Java",
  "HTML", "CSS", "UI Design", "Figma", "ML", "PyTorch", "IoT", "Embedded",
  "Docker", "Kubernetes", "AWS", "Postgres", "DSA", "MATLAB", "CAD", "SolidWorks",
]

export function getStudent(id: string) {
  return STUDENTS.find((s) => s.id === id)
}
export function branchName(id: string) {
  return BRANCHES.find((b) => b.id === id)?.short ?? id
}
