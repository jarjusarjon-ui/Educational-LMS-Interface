import React, { useState } from "react";
import { 
  GraduationCap, 
  Calendar, 
  Bell, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  Award, 
  DollarSign, 
  Clock, 
  Tv, 
  ArrowRight, 
  Flame, 
  Percent, 
  User, 
  CheckCircle,
  HelpCircle,
  ChevronRight
} from "lucide-react";
import { StudentProfile, Course, Assignment, TimetableEvent } from "../types";

interface DashboardProps {
  profile: StudentProfile;
  courses: Course[];
  assignments: Assignment[];
  timetable: TimetableEvent[];
  onNavigate: (view: string, targetId?: string) => void;
  onPayTuition: () => void;
}

export default function Dashboard({ 
  profile, 
  courses, 
  assignments, 
  timetable, 
  onNavigate,
  onPayTuition
}: DashboardProps) {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<string | null>(null);

  // Filter unresolved assignments
  const activeAssignments = assignments.filter(a => a.status === "pending" || a.status === "submitted");
  
  // Outstanding tuition state from courses/invoices
  const isTuitionUnpaid = true; // Hardcoded for dashboard trigger

  // UTG General Announcements
  const utgAnnouncements = [
    {
      id: "utg_ann_1",
      title: "UTG Convocation Ceremony & Graduation Guidelines",
      content: "The Governing Council of the University of The Gambia wishes to inform all final year students that the annual convocation ceremony is scheduled for October 2026. All Level 400 graduating students are requested to complete their financial clearances before September 1st, 2026.",
      date: "July 02, 2026",
      tag: "Academic Affairs",
      important: true,
    },
    {
      id: "utg_ann_2",
      title: "Notice on Library Online Access Renewal",
      content: "Access to IEEE Xplore, ScienceDirect, and the JSTOR digital search catalogs has been successfully renewed. Students can log in using their official @utg.edu.gm email accounts from any network.",
      date: "June 29, 2026",
      tag: "Library Services",
      important: false,
    },
    {
      id: "utg_ann_3",
      title: "SITC IT Lab B Server Upgrades",
      content: "The SITC Computer Networks lab servers will be down for scheduled maintenance this coming Saturday from 08:00 AM to 02:00 PM. Local Docker repositories and Jupyter notebooks will be temporarily unreachable.",
      date: "June 27, 2026",
      tag: "IT Support",
      important: false,
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {/* 1. TOP WELCOME PROFILE CARD */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#003366] to-[#002244] text-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/5 rounded-full -ml-32 -mb-32 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="relative">
              <img 
                src={profile.photoUrl} 
                alt={profile.name} 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#FFD700] p-1 rounded-full shadow-sm">
                <Flame className="w-4 h-4 text-slate-900 fill-slate-900" />
              </div>
            </div>
            
            <div className="space-y-1">
              <span className="inline-flex px-2.5 py-0.5 bg-[#FFD700] text-[#003366] text-[10px] font-bold rounded-full tracking-widest uppercase">
                {profile.matricNo}
              </span>
              <h1 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white">{profile.name}</h1>
              <p className="text-xs text-slate-300 md:text-sm font-medium">{profile.program}</p>
              <p className="text-[11px] text-slate-400">{profile.department}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-center min-w-[70px]">
              <span className="text-[10px] block text-slate-300 uppercase font-semibold">CGPA</span>
              <span className="text-lg font-bold font-display text-[#FFD700]">{profile.cgpa}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-center min-w-[70px]">
              <span className="text-[10px] block text-slate-300 uppercase font-semibold">Term GPA</span>
              <span className="text-lg font-bold font-display text-white">{profile.gpa}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-center min-w-[70px]">
              <span className="text-[10px] block text-slate-300 uppercase font-semibold">Credits</span>
              <span className="text-lg font-bold font-display text-white">{profile.totalCredits}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-center min-w-[70px]">
              <span className="text-[10px] block text-slate-300 uppercase font-semibold">Attendance</span>
              <span className="text-lg font-bold font-display text-emerald-300">{profile.attendancePercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE / CRITICAL ACTION ALERTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Live lecture panel */}
        <div className="bg-[#003366] text-white p-5 rounded-2xl shadow-md border-l-4 border-[#FFD700] flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD700]">Live Session Active</span>
            </div>
            <p className="text-sm font-bold font-display">SEN 401: Software Architecture</p>
            <p className="text-[11px] text-slate-300">Join Dr. Alieu Sowe in Google Meet</p>
          </div>
          <button 
            onClick={() => onNavigate("courses", "cos_401")}
            className="p-3 bg-white hover:bg-slate-100 text-[#003366] rounded-xl font-semibold transition-all hover:scale-105 shrink-0 shadow-md cursor-pointer"
          >
            <Tv className="w-5 h-5 text-[#003366]" />
          </button>
        </div>

        {/* Outstanding finance */}
        {isTuitionUnpaid && (
          <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl shadow-sm border-l-4 border-rose-500 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">Tuition Status</span>
              <p className="text-sm font-bold text-slate-800 font-display">D28,500 Outstanding Fee</p>
              <p className="text-[11px] text-slate-500">First Semester payment deadline is July 20</p>
            </div>
            <button 
              onClick={onPayTuition}
              className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-semibold transition-all hover:scale-105 shrink-0 shadow-sm cursor-pointer"
            >
              <DollarSign className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Assignments summary */}
        <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl shadow-sm border-l-4 border-amber-500 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Deliverables</span>
            <p className="text-sm font-bold text-slate-800 font-display">2 Pending Assignments</p>
            <p className="text-[11px] text-slate-500">Next deadline: MLP from scratch on July 9</p>
          </div>
          <button 
            onClick={() => onNavigate("assignments")}
            className="p-3 bg-[#003366] text-white hover:bg-[#002244] rounded-xl font-semibold transition-all hover:scale-105 shrink-0 shadow-sm cursor-pointer"
          >
            <FileText className="w-5 h-5 text-[#FFD700]" />
          </button>
        </div>
      </div>

      {/* 3. BENTO GRID: STATS, TIMETABLE & DEADLINES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN - GPA PLOT & RECENT LESSONS (8 spans) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* GPA Progress Plot Component */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-md font-bold text-slate-800 font-display">Academic GPA Progression</h3>
                <p className="text-[11px] text-slate-400">CGPA trajectory over previous semesters</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#003366] rounded-full inline-block"></span> GPA</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#FFD700] rounded-full inline-block"></span> CGPA Target</span>
              </div>
            </div>

            {/* SVG Visualizing the GPA Chart */}
            <div className="relative h-44 w-full bg-slate-50/50 rounded-xl p-3 flex flex-col justify-between">
              <div className="absolute inset-0 flex flex-col justify-between py-5 px-8 pointer-events-none">
                <div className="border-b border-slate-100 w-full h-0"></div>
                <div className="border-b border-slate-100 w-full h-0"></div>
                <div className="border-b border-slate-100 w-full h-0"></div>
              </div>

              {/* Custom SVG Bar Chart */}
              <svg className="w-full h-full min-h-[140px] z-10" viewBox="0 0 500 120" preserveAspectRatio="none">
                {/* Lines */}
                <line x1="30" y1="100" x2="470" y2="100" stroke="#E2E8F0" strokeWidth="1" />
                <path d="M 80 80 L 180 75 L 280 60 L 380 40 L 450 35" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="4,4" />
                
                {/* GPA Plot Bars */}
                {/* 1st Sem 2024 (GPA: 3.3) */}
                <rect x="65" y="45" width="30" height="55" rx="4" fill="#E2E8F0" className="hover:fill-[#003366] transition-colors" />
                {/* 2nd Sem 2024 (GPA: 3.5) */}
                <rect x="165" y="38" width="30" height="62" rx="4" fill="#CBD5E1" className="hover:fill-[#003366] transition-colors" />
                {/* 1st Sem 2025 (GPA: 3.7) */}
                <rect x="265" y="28" width="30" height="72" rx="4" fill="#94A3B8" className="hover:fill-[#003366] transition-colors" />
                {/* 2nd Sem 2025 (GPA: 3.82) */}
                <rect x="365" y="15" width="30" height="85" rx="4" fill="#003366" className="hover:fill-[#002244] transition-colors" />

                {/* Target Dot */}
                <circle cx="380" cy="40" r="4" fill="#FFD700" />
                <circle cx="450" cy="35" r="4" fill="#FFD700" />
              </svg>

              {/* Chart Labels */}
              <div className="flex justify-between text-[10px] text-slate-400 px-6 font-mono font-medium">
                <span>1st Sem 2024 (3.30)</span>
                <span>2nd Sem 2024 (3.50)</span>
                <span>1st Sem 2025 (3.70)</span>
                <span>2nd Sem 2025 (3.82)</span>
              </div>
            </div>
          </div>

          {/* Continue Learning Course Cards */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">Continue Learning</h3>
              <button 
                onClick={() => onNavigate("courses")} 
                className="text-xs text-[#003366] hover:underline flex items-center gap-1 font-semibold"
              >
                View all courses <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.slice(0, 2).map(course => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-md font-mono">
                        {course.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 font-display">
                        Lecturer: {course.lecturer.split(" ").pop()}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-800 font-display line-clamp-1">{course.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">Next: {course.nextLesson}</p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[10px] font-semibold">
                        <span className="text-slate-400">Syllabus Completion</span>
                        <span className="text-slate-700">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#003366] h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onNavigate("courses", course.id)}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border-t border-slate-100 text-[#003366] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    Resume Lesson <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - TIMETABLE & DEADLINES & ANNOUNCEMENTS (4 spans) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Today's Lectures Panel */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#003366]" /> Today's Classes
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                Monday
              </span>
            </div>

            <div className="space-y-3">
              {timetable.slice(0, 2).map(event => (
                <div key={event.id} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors flex items-start gap-3">
                  <div className="w-1.5 h-10 rounded-full bg-[#003366] shrink-0 mt-0.5"></div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800">{event.courseCode}: {event.title}</p>
                    <p className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {event.startTime} - {event.endTime} | Room: {event.room}
                    </p>
                    {event.link && (
                      <a href={event.link} target="_blank" rel="noreferrer" className="text-[9px] font-bold text-[#4FA3FF] hover:underline flex items-center gap-0.5 mt-1">
                        Open Google Meet session
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines Portal */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <Calendar className="w-4 h-4 text-amber-500" /> Upcoming Deadlines
            </h3>

            <div className="space-y-3">
              {assignments.filter(a => a.status === "pending").map(assign => (
                <div key={assign.id} className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-all space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[9px] font-bold rounded">
                      {assign.courseCode}
                    </span>
                    <span className="text-[10px] font-medium text-rose-500 font-mono flex items-center gap-0.5">
                      <Clock className="w-3 h-3" /> Due Soon
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 line-clamp-2">{assign.title}</p>
                  <p className="text-[10px] text-slate-400">Deadline: {assign.deadline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. UTG CAMPUS ANNOUNCEMENT BULLETINS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
          <div>
            <h3 className="text-md font-bold text-slate-800 font-display">University Broadcast Channel</h3>
            <p className="text-[11px] text-slate-400">General publications and administrative guidelines</p>
          </div>
          <span className="p-1.5 bg-slate-50 rounded-lg shrink-0">
            <Bell className="w-4 h-4 text-slate-400" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {utgAnnouncements.map(ann => (
            <div 
              key={ann.id} 
              onClick={() => setSelectedAnnouncement(ann.id)}
              className={`p-4 rounded-xl border border-slate-100 cursor-pointer hover:border-slate-300 transition-all hover:shadow-sm space-y-3 flex flex-col justify-between ${ann.important ? 'bg-amber-50/40 border-l-4 border-l-amber-500' : 'bg-slate-50/50'}`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${ann.important ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                    {ann.tag}
                  </span>
                  <span className="text-[10px] text-slate-400">{ann.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{ann.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{ann.content}</p>
              </div>
              <span className="text-[10px] font-bold text-[#003366] flex items-center gap-0.5 self-end mt-2 hover:underline">
                Read Full Bulletin <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ANNOUNCEMENT BULLETIN MODAL DIALOG */}
      {selectedAnnouncement && (() => {
        const ann = utgAnnouncements.find(a => a.id === selectedAnnouncement);
        if (!ann) return null;
        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-scaleUp">
              <div className="bg-[#003366] text-white p-5 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="px-2 py-0.5 bg-white/10 text-slate-200 text-[10px] font-bold rounded tracking-wider uppercase">
                    {ann.tag}
                  </span>
                  <h4 className="text-sm font-bold font-display">{ann.title}</h4>
                </div>
                <button 
                  onClick={() => setSelectedAnnouncement(null)}
                  className="text-white/80 hover:text-white font-bold text-lg p-1.5 rounded-full hover:bg-white/10"
                >
                  &times;
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-400 font-semibold">Published date: {ann.date}</p>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{ann.content}</p>
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedAnnouncement(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Close Bulletin
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
