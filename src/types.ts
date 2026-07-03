export interface StudentProfile {
  id: string;
  matricNo: string;
  name: string;
  email: string;
  photoUrl: string;
  program: string;
  department: string;
  academicLevel: string; // e.g., "Level 400"
  semester: string; // e.g., "1st Semester 2025/2026"
  cgpa: number;
  gpa: number;
  totalCredits: number;
  attendancePercentage: number;
  skills: string[];
  achievements: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string; // dummy url
  completed: boolean;
  notes?: string;
  transcript?: string;
  downloads?: { name: string; size: string; url: string }[];
  comments?: { id: string; user: string; avatar: string; text: string; date: string }[];
}

export interface SyllabusModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  image: string;
  lecturer: string;
  lecturerAvatar: string;
  semester: string;
  creditHours: number;
  progress: number;
  completed: boolean;
  nextLesson: string;
  assignmentStatus: "pending" | "submitted" | "graded" | "overdue";
  quizStatus: "available" | "completed" | "none";
  rating: number;
  overview: string;
  learningObjectives: string[];
  modules: SyllabusModule[];
  announcements: CourseAnnouncement[];
  faqs: FAQItem[];
  liveSession?: {
    id: string;
    topic: string;
    date: string;
    time: string;
    link: string;
    active: boolean;
  };
}

export interface Assignment {
  id: string;
  courseId: string;
  courseCode: string;
  title: string;
  instructions: string;
  deadline: string; // e.g., "July 15, 2026 23:59"
  fileUploaded: string | null;
  uploadedDate: string | null;
  status: "pending" | "submitted" | "graded" | "overdue";
  marks: string | null;
  feedback: string | null;
  rubric: { criterion: string; maxPoints: number; description: string }[];
  allowResubmission: boolean;
}

export type QuestionType = "mcq" | "true_false" | "short_answer" | "essay" | "fill_blank";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[]; // for mcq
  correctAnswer: string;
  chosenAnswer?: string;
  flagged?: boolean;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseCode: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
  status: "available" | "completed";
  score?: number;
  attempts?: number;
  dueDate: string;
}

export interface OnlineExam {
  id: string;
  courseCode: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
  status: "upcoming" | "active" | "completed";
  scheduledTime: string;
  rules: string[];
}

export interface GradeEntry {
  courseCode: string;
  courseTitle: string;
  credits: number;
  grade: string;
  score: number;
  points: number;
  semester: string;
}

export interface TimetableEvent {
  id: string;
  courseCode: string;
  title: string;
  type: "lecture" | "lab" | "tutorial" | "exam";
  day: string; // "Monday" - "Friday"
  startTime: string; // "09:00"
  endTime: string; // "11:00"
  room: string;
  link?: string;
}

export interface ForumPost {
  id: string;
  courseId: string;
  courseCode: string;
  author: string;
  avatar: string;
  role: "student" | "lecturer" | "admin";
  title: string;
  content: string;
  date: string;
  likes: number;
  likedByMe?: boolean;
  pinned?: boolean;
  replies: {
    id: string;
    author: string;
    avatar: string;
    role: "student" | "lecturer" | "admin";
    content: string;
    date: string;
  }[];
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  isLecturer?: boolean;
  fileUrl?: string;
  fileName?: string;
}

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  lastMessage: string;
  unreadCount: number;
  role?: string; // e.g., "Senior Lecturer", "Class Representative"
  messages: Message[];
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  coverUrl: string;
  citation: string;
  downloadsCount: number;
  fileSize: string;
}

export interface TuitionInvoice {
  id: string;
  title: string;
  amount: number;
  status: "paid" | "unpaid" | "partial";
  dueDate: string;
  datePaid?: string;
  receiptNumber?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  issueDate: string;
  qrCodeUrl: string;
  courseId: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // "Internship" | "Full-time" | "Part-time"
  salary: string;
  deadline: string;
  description: string;
  requirements: string[];
}
