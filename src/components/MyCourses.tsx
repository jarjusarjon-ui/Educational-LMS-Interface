import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Filter, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Star,
  Users
} from "lucide-react";
import { Course } from "../types";

interface MyCoursesProps {
  courses: Course[];
  onCourseSelect: (courseId: string) => void;
  onEnrollCourse: (course: Course) => void;
}

export default function MyCourses({ courses, onCourseSelect, onEnrollCourse }: MyCoursesProps) {
  const [activeTab, setActiveTab] = useState<"enrolled" | "catalog">("enrolled");
  const [searchQuery, setSearchQuery] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Elective Departmental Catalog mock
  const catalogElectives: Course[] = [
    {
      id: "cos_499",
      code: "SEN 499",
      title: "Senior Capstone Design Project & Implementation",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
      lecturer: "Prof. Fatou Touray",
      lecturerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
      semester: "Level 400 - 2nd Semester",
      creditHours: 6,
      progress: 0,
      completed: false,
      nextLesson: "Project Formulation and Proposal Defense",
      assignmentStatus: "pending",
      quizStatus: "none",
      rating: 4.9,
      overview: "The ultimate validation of a student's technical and software engineering capability. Students work in groups of three to develop a production-ready, validated system solving a critical local socio-economic problem in Gambia.",
      learningObjectives: ["Draft an exhaustive software requirement specification", "Build and scale complex databases", "Expose API integrations", "Deploy via CI/CD cloud frameworks"],
      modules: [],
      announcements: [],
      faqs: []
    },
    {
      id: "cos_420",
      code: "CSC 420",
      title: "Computer Security & Cryptography",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
      lecturer: "Dr. Ousman Sabally",
      lecturerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      semester: "Level 400 - 1st Semester",
      creditHours: 3,
      progress: 0,
      completed: false,
      nextLesson: "Symmetric Encryption (AES & DES)",
      assignmentStatus: "pending",
      quizStatus: "available",
      rating: 4.5,
      overview: "Introduces security concepts, symmetric/asymmetric algorithms, digital signatures, hashing functions, secure web transport standards (SSL/TLS), and common software vulnerabilites (SQL injection, XSS, Buffer overflows).",
      learningObjectives: ["Differentiate private and public key infrastructures", "Code hashing routines and secure password mechanisms", "Secure HTTP servers and Docker systems"],
      modules: [],
      announcements: [],
      faqs: []
    }
  ];

  // Filter courses based on search & filters
  const filteredEnrolled = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSemester = semesterFilter === "all" || c.semester.includes(semesterFilter);
    return matchesSearch && matchesSemester;
  });

  const filteredCatalog = catalogElectives.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSemester = semesterFilter === "all" || c.semester.includes(semesterFilter);
    // Exclude if already enrolled
    const isEnrolled = courses.some(ec => ec.id === c.id);
    return matchesSearch && matchesSemester && !isEnrolled;
  });

  const handleEnrollClick = (course: Course) => {
    onEnrollCourse(course);
    triggerToast(`Enrolled inside ${course.code} successfully! Course added to dashboard.`);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce z-50">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Course Management Headers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 font-display">SITC Academic Courses</h2>
          <p className="text-xs text-slate-400">Manage your active semester enrollments or browse the SITC elective catalog</p>
        </div>

        {/* Dynamic tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
          <button
            id="tab-enrolled-courses"
            onClick={() => setActiveTab("enrolled")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "enrolled" ? "bg-white text-[#003366] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            My Enrolled ({courses.length})
          </button>
          <button
            id="tab-catalog-courses"
            onClick={() => setActiveTab("catalog")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "catalog" ? "bg-white text-[#003366] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Course Catalog ({filteredCatalog.length})
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            id="course-search-field"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course title or course code (e.g. SEN 401)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#003366] transition-all"
          />
        </div>

        {/* Semester Filter */}
        <div className="md:col-span-4 relative">
          <Filter className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#003366] appearance-none cursor-pointer"
          >
            <option value="all">All Semesters</option>
            <option value="1st Semester">1st Semester</option>
            <option value="2nd Semester">2nd Semester</option>
          </select>
        </div>
      </div>

      {/* Grid List */}
      {activeTab === "enrolled" ? (
        filteredEnrolled.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 max-w-md mx-auto space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-md font-bold text-slate-800 font-display">No courses found</h3>
            <p className="text-xs text-slate-500">No enrolled courses match your current search criteria or semester filters.</p>
            <button onClick={() => { setSearchQuery(""); setSemesterFilter("all"); }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#003366] rounded-xl text-xs font-bold">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEnrolled.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 transition-all flex flex-col justify-between"
              >
                {/* Course Header Banner */}
                <div className="relative h-32 bg-slate-100">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                  
                  {/* Floating Tags */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-0.5 bg-[#003366] text-white text-[9px] font-bold rounded-full tracking-wider font-mono">
                      {course.code}
                    </span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${course.completed ? 'bg-emerald-500 text-white' : 'bg-[#FFD700] text-[#003366]'}`}>
                      {course.completed ? "Completed" : "Active"}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] text-slate-300 block font-mono">{course.semester}</span>
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-800 font-display line-clamp-1">{course.title}</h3>
                    
                    {/* Lecturer Summary */}
                    <div className="flex items-center gap-2 pt-1">
                      <img src={course.lecturerAvatar} alt={course.lecturer} className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <span className="text-xs text-slate-500 font-semibold">{course.lecturer}</span>
                    </div>
                  </div>

                  {/* Syllabus progress bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span className="text-slate-400">Course Progress</span>
                      <span className="text-slate-700">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#003366] h-1.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Extra metadata widgets */}
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-50 pt-3">
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="text-[9px] text-slate-400 block font-semibold uppercase">Credit Hours</span>
                      <span className="text-xs font-bold text-slate-800">{course.creditHours} Credits</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="text-[9px] text-slate-400 block font-semibold uppercase">Assignment</span>
                      <span className={`text-xs font-bold ${course.assignmentStatus === "submitted" || course.assignmentStatus === "graded" ? "text-emerald-600" : "text-rose-500"}`}>
                        {course.assignmentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <button 
                  onClick={() => onCourseSelect(course.id)}
                  className="w-full py-3 bg-slate-50 hover:bg-[#003366] hover:text-white border-t border-slate-100 text-[#003366] text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  Enter Course Room <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        // CATALOG VIEW
        filteredCatalog.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 max-w-md mx-auto space-y-4">
            <Award className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
            <h3 className="text-md font-bold text-slate-800 font-display">Catalog empty</h3>
            <p className="text-xs text-slate-500">No new courses available for registration in this semester.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCatalog.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between"
              >
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 bg-[#FFD700] text-[#003366] text-[10px] font-bold rounded tracking-wider font-mono uppercase">
                        {course.code}
                      </span>
                      <h3 className="text-md font-bold text-slate-800 font-display mt-1">{course.title}</h3>
                      <p className="text-xs text-slate-500">{course.semester} | Credit Hours: <strong className="text-slate-700">{course.creditHours}</strong></p>
                    </div>
                    <span className="flex items-center gap-1 text-xs bg-yellow-50 text-amber-500 px-2 py-0.5 rounded-md font-bold">
                      <Star className="w-3 h-3 fill-amber-500" /> {course.rating}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{course.overview}</p>
                  
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                    <img src={course.lecturerAvatar} alt={course.lecturer} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Course Coordinator</span>
                      <span className="text-xs font-bold text-slate-800">{course.lecturer}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
                  <button 
                    onClick={() => {
                      alert(`Course Syllabus for ${course.code}:\n\nObjectives:\n${course.learningObjectives?.join("\n") || "Under development"}`);
                    }} 
                    className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs text-slate-700 font-semibold cursor-pointer"
                  >
                    View Syllabus
                  </button>
                  <button 
                    onClick={() => handleEnrollClick(course)}
                    className="px-4 py-2 bg-[#003366] hover:bg-[#002244] text-white rounded-xl text-xs font-bold transition-all hover:scale-105 cursor-pointer"
                  >
                    Register Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

    </div>
  );
}
