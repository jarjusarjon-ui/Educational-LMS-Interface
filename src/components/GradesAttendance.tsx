import React, { useState } from "react";
import { 
  Award, 
  Calendar, 
  Download, 
  Percent, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  ArrowUpRight, 
  TrendingUp, 
  GraduationCap 
} from "lucide-react";
import { GradeEntry, StudentProfile } from "../types";

interface GradesAttendanceProps {
  grades: GradeEntry[];
  profile: StudentProfile;
}

export default function GradesAttendance({ grades, profile }: GradesAttendanceProps) {
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Semesters list
  const semesters = ["all", "1st Semester 2025/2026", "2nd Semester 2024/2025", "1st Semester 2024/2025"];

  const filteredGrades = selectedSemester === "all" 
    ? grades 
    : grades.filter(g => g.semester === selectedSemester);

  // UTG Level 400 July 2026 Attendance Mock Map
  // Present: p, Absent: a, Excused: e, Weekend/Holiday: w
  const julyAttendance = [
    { day: 1, status: "p" }, { day: 2, status: "p" }, { day: 3, status: "p" }, { day: 4, status: "w" }, { day: 5, status: "w" },
    { day: 6, status: "p" }, { day: 7, status: "p" }, { day: 8, status: "p" }, { day: 9, status: "a" }, { day: 10, status: "e" },
    { day: 11, status: "w" }, { day: 12, status: "w" }, { day: 13, status: "p" }, { day: 14, status: "p" }, { day: 15, status: "p" },
    { day: 16, status: "p" }, { day: 17, status: "p" }, { day: 18, status: "w" }, { day: 19, status: "w" }, { day: 20, status: "p" },
    { day: 21, status: "p" }, { day: 22, status: "p" }, { day: 23, status: "p" }, { day: 24, status: "p" }, { day: 25, status: "w" },
    { day: 26, status: "w" }, { day: 27, status: "p" }, { day: 28, status: "p" }, { day: 29, status: "e" }, { day: 30, status: "p" }, { day: 31, status: "p" }
  ];

  // Calculate average score
  const avgScore = filteredGrades.length > 0 
    ? Math.round(filteredGrades.reduce((acc, curr) => acc + curr.score, 0) / filteredGrades.length)
    : 0;

  const handleDownloadTranscript = () => {
    triggerToast("Generating UTG Official Unofficial Transcript PDF...");
    setTimeout(() => {
      triggerToast("Transcript downloaded successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce z-50">
          <Download className="w-5 h-5 text-[#FFD700] animate-bounce" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* GRADEBOOK PROFILE HIGHLIGHT WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Cumulative GPA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Cumulative CGPA</span>
            <span className="text-2xl font-extrabold font-display text-[#003366]">{profile.cgpa}</span>
            <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5"><TrendingUp className="w-3.5 h-3.5" /> Dean's List Honor</p>
          </div>
          <div className="p-3 bg-[#003366]/5 rounded-xl text-[#003366]">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Selected GPA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Current GPA</span>
            <span className="text-2xl font-extrabold font-display text-[#003366]">{profile.gpa}</span>
            <p className="text-[10px] text-slate-400 font-semibold">1st Semester 2025/2026</p>
          </div>
          <div className="p-3 bg-amber-500/5 rounded-xl text-amber-500">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Total credit counts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Total Earned Credits</span>
            <span className="text-2xl font-extrabold font-display text-slate-800">{profile.totalCredits}</span>
            <p className="text-[10px] text-slate-400 font-semibold">Degree Requirement: 130</p>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Global score average */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Mean Grade Percentage</span>
            <span className="text-2xl font-extrabold font-display text-[#003366]">{avgScore}%</span>
            <p className="text-[10px] text-emerald-500 font-semibold">B+ Average standing</p>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
            <Percent className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ACADEMIC TRANSCRIPT & ATTENDANCE LAYOUT SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: UNOFFICIAL TRANSCRIPT TABLE (8 spans) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4">
            <div>
              <h3 className="text-md font-bold text-slate-800 font-display">Academic Transcript</h3>
              <p className="text-xs text-slate-400">Review cumulative marks, credit values, and letter classifications</p>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              {/* Semester filter dropdown */}
              <select 
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 py-1.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl text-xs text-slate-600 focus:outline-none"
              >
                {semesters.map((sem, idx) => (
                  <option key={idx} value={sem}>{sem === "all" ? "All Semesters" : sem}</option>
                ))}
              </select>

              <button 
                id="btn-download-transcript"
                onClick={handleDownloadTranscript}
                className="px-3 py-1.5 bg-[#003366] hover:bg-[#002244] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#FFD700]" /> Unofficial PDF
              </button>
            </div>
          </div>

          {/* Table display */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                  <th className="py-3 px-2">Code</th>
                  <th className="py-3 px-2">Course Title</th>
                  <th className="py-3 px-2 text-center">Credits</th>
                  <th className="py-3 px-2 text-center">Score</th>
                  <th className="py-3 px-2 text-center">Grade</th>
                  <th className="py-3 px-2 text-center">G-Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {filteredGrades.map((grade, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-2 font-mono text-slate-800">{grade.courseCode}</td>
                    <td className="py-3 px-2 text-slate-500">{grade.courseTitle}</td>
                    <td className="py-3 px-2 text-center text-slate-700">{grade.credits}</td>
                    <td className="py-3 px-2 text-center text-slate-700">{grade.score}%</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`px-2 py-0.5 font-bold rounded ${grade.grade.startsWith("A") ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-[#003366]"}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-[#003366] font-bold">{grade.points.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: ATTENDANCE HISTORY (4 spans) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="space-y-1 border-b border-slate-50 pb-2">
            <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-500" /> Attendance Matrix
            </h3>
            <p className="text-[10px] text-slate-400">July 2026 Monthly calendar log</p>
          </div>

          {/* July 2026 Calendar Grid */}
          <div className="space-y-3">
            {/* Days header */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 font-mono">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>

            {/* Dates Grid (July 2026 starts on Wednesday) */}
            {/* Adding 3 empty cells for Sunday, Monday, Tuesday padding */}
            <div className="grid grid-cols-7 gap-1.5 text-center font-mono font-bold text-xs">
              <div className="h-7"></div>
              <div className="h-7"></div>
              
              {julyAttendance.map((dayObj) => {
                const isPresent = dayObj.status === "p";
                const isAbsent = dayObj.status === "a";
                const isExcused = dayObj.status === "e";
                const isWeekend = dayObj.status === "w";
                
                let bgStyle = "bg-slate-50 text-slate-300"; // weekend default
                if (isPresent) bgStyle = "bg-emerald-500 text-white shadow-sm";
                if (isAbsent) bgStyle = "bg-rose-500 text-white shadow-sm";
                if (isExcused) bgStyle = "bg-amber-400 text-slate-900 shadow-sm";

                return (
                  <div 
                    key={dayObj.day} 
                    title={`Day ${dayObj.day}: ${isPresent ? 'Present' : isAbsent ? 'Absent' : isExcused ? 'Excused Absence' : 'Weekend'}`}
                    className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all ${bgStyle}`}
                  >
                    {dayObj.day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Analytics */}
          <div className="space-y-2 border-t border-slate-100 pt-4 text-[10px] text-slate-500">
            <span className="font-bold uppercase tracking-wider block text-slate-400">Class Attendance Legend</span>
            <div className="grid grid-cols-2 gap-2 font-semibold">
              <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Present (21 days)</div>
              <div className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-rose-500" /> Absent (1 day)</div>
              <div className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Excused (2 days)</div>
              <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200"></div> Weekends</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
