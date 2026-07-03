import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Award, 
  Calendar, 
  MessageSquare, 
  Library, 
  DollarSign, 
  HeartHandshake, 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Search, 
  Globe, 
  HelpCircle,
  FileCheck2,
  Lock,
  Compass,
  ArrowRight
} from "lucide-react";

import { 
  StudentProfile, 
  Course, 
  Assignment, 
  Quiz, 
  OnlineExam, 
  GradeEntry, 
  TimetableEvent, 
  ForumPost, 
  ChatThread, 
  LibraryBook, 
  TuitionInvoice, 
  Certificate, 
  JobOpportunity,
  Message
} from "./types";

import { 
  initialStudentProfile, 
  initialCourses, 
  initialAssignments, 
  initialQuizzes, 
  initialExams, 
  initialGrades, 
  initialTimetable, 
  initialForumPosts, 
  initialChats, 
  initialLibraryBooks, 
  initialInvoices, 
  initialCertificates, 
  initialJobOpportunities 
} from "./mockData";

// Components
import AuthPages from "./components/AuthPages";
import Dashboard from "./components/Dashboard";
import MyCourses from "./components/MyCourses";
import CourseDetail from "./components/CourseDetail";
import QuizExam from "./components/QuizExam";
import GradesAttendance from "./components/GradesAttendance";
import TimetableForum from "./components/TimetableForum";
import Messaging from "./components/Messaging";
import LibraryFinance from "./components/LibraryFinance";
import StudentServices from "./components/StudentServices";

export default function App() {
  // Authentication & Navigation
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("utg_authenticated") === "true";
  });
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Styling & Theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("utg_dark_mode") === "true";
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  // Core App States (synchronized to localStorage)
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem("utg_student_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.photoUrl && (parsed.photoUrl.includes("unsplash.com") || parsed.photoUrl.includes("images.unsplash.com"))) {
          parsed.photoUrl = "https://upload.wikimedia.org/wikipedia/en/e/eb/University_of_the_Gambia_Logo.png";
          localStorage.setItem("utg_student_profile", JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        return initialStudentProfile;
      }
    }
    return initialStudentProfile;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem("utg_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem("utg_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem("utg_quizzes");
    return saved ? JSON.parse(saved) : initialQuizzes;
  });

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem("utg_forum_posts");
    return saved ? JSON.parse(saved) : initialForumPosts;
  });

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem("utg_chats");
    return saved ? JSON.parse(saved) : initialChats;
  });

  const [invoices, setInvoices] = useState<TuitionInvoice[]>(() => {
    const saved = localStorage.getItem("utg_invoices");
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  // Modals / Dropdowns
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState<any[]>([
    { id: "n1", text: "Dr. Alieu Sowe scheduled SEN 401 midsemester exam for July 14", date: "Just now", unread: true },
    { id: "n2", text: "New Grade recorded for SEN 431 Mobile App final project: 'A' (95%)", date: "2 hours ago", unread: true },
    { id: "n3", text: "Your tuition bill of D28,500 has been generated.", date: "1 day ago", unread: false }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Synchronizers
  useEffect(() => {
    localStorage.setItem("utg_student_profile", JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem("utg_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("utg_assignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem("utg_quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem("utg_forum_posts", JSON.stringify(forumPosts));
  }, [forumPosts]);

  useEffect(() => {
    localStorage.setItem("utg_chats", JSON.stringify(chatThreads));
  }, [chatThreads]);

  useEffect(() => {
    localStorage.setItem("utg_invoices", JSON.stringify(invoices));
  }, [invoices]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("utg_authenticated", "true");
    setActiveView("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("utg_authenticated");
    setActiveView("welcome");
  };

  const toggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem("utg_dark_mode", String(newVal));
  };

  // State Modifiers passed as callbacks to subcomponents
  const handleEnrollCourse = (newCourse: Course) => {
    setCourses(prev => {
      // Check if already exists
      if (prev.some(c => c.id === newCourse.id)) return prev;
      return [...prev, { ...newCourse, progress: 0, completed: false }];
    });
  };

  const handleUploadAssignment = (assignmentId: string, fileName: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          fileUploaded: fileName,
          uploadedDate: "Just now",
          status: "submitted"
        };
      }
      return a;
    }));

    // Alert completion
    setNotificationsList(prev => [
      { id: `n_add_${Date.now()}`, text: `Assignment file "${fileName}" received successfully!`, date: "Just now", unread: true },
      ...prev
    ]);
  };

  const handleQuizResultSubmit = (quizId: string, scorePercent: number) => {
    // Mark quiz completed
    setQuizzes(prev => prev.map(q => {
      if (q.id === quizId) {
        return {
          ...q,
          status: "completed",
          score: scorePercent
        };
      }
      return q;
    }));

    // Update relevant course details quizStatus
    const targetQuiz = quizzes.find(q => q.id === quizId);
    if (targetQuiz) {
      setCourses(prev => prev.map(c => {
        if (c.code === targetQuiz.courseCode) {
          return { ...c, quizStatus: "completed" };
        }
        return c;
      }));
    }

    // Add grade entry if score is passing
    if (scorePercent >= 70) {
      const letterGrade = scorePercent >= 90 ? "A" : scorePercent >= 80 ? "B+" : "C+";
      const gPoints = scorePercent >= 90 ? 4.0 : scorePercent >= 80 ? 3.3 : 2.3;
      
      const newGrade: GradeEntry = {
        courseCode: targetQuiz?.courseCode || "SEN 401",
        courseTitle: "Software Architecture & Design Patterns",
        credits: 4,
        grade: letterGrade,
        score: scorePercent,
        points: gPoints,
        semester: "1st Semester 2025/2026"
      };

      // Append grade simulation
      initialGrades.unshift(newGrade);
    }
  };

  const handleAddForumPost = (post: ForumPost) => {
    setForumPosts(prev => [post, ...prev]);
  };

  const handleAddForumReply = (postId: string, replyContent: string) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              id: `fr_add_${Date.now()}`,
              author: "Alieu Jallow",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
              role: "student",
              content: replyContent,
              date: "Just now"
            }
          ]
        };
      }
      return p;
    }));
  };

  const handleSendMessage = (threadId: string, text: string, attachment?: { name: string; url: string }) => {
    setChatThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        const newMsg: Message = {
          id: `msg_add_${Date.now()}`,
          sender: "Alieu Jallow",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
          text,
          timestamp: "Just now",
          isMe: true,
          fileName: attachment?.name,
          fileUrl: attachment?.url
        };
        return {
          ...t,
          lastMessage: text || `Uploaded attachment: ${attachment?.name}`,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));
  };

  const handlePayTuition = (invoiceId: string) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: "paid",
          datePaid: "Just now",
          receiptNumber: `UTG-REC-${Math.floor(10000 + Math.random() * 90000)}`
        };
      }
      return inv;
    }));

    // Update student dashboard alerts
    setStudentProfile(prev => ({
      ...prev,
      totalCredits: prev.totalCredits + 4 // simulate registration credits added
    }));
  };

  // Nav helper for dashboard quick actions
  const handleNavFromDashboard = (view: string, targetId?: string) => {
    setActiveView(view);
    if (view === "courses" && targetId) {
      setSelectedCourseId(targetId);
    }
  };

  // Render correct Active view component
  const renderMainContent = () => {
    if (activeQuiz) {
      return (
        <QuizExam 
          quiz={activeQuiz} 
          onSubmitResults={handleQuizResultSubmit} 
          onClose={() => setActiveQuiz(null)} 
        />
      );
    }

    switch (activeView) {
      case "dashboard":
        return (
          <Dashboard 
            profile={studentProfile}
            courses={courses}
            assignments={assignments}
            timetable={initialTimetable}
            onNavigate={handleNavFromDashboard}
            onPayTuition={() => setActiveView("resources")}
          />
        );
      case "courses":
        if (selectedCourseId) {
          const selectedCourse = courses.find(c => c.id === selectedCourseId);
          if (selectedCourse) {
            return (
              <CourseDetail 
                course={selectedCourse}
                assignments={assignments}
                onBack={() => setSelectedCourseId(null)}
                onLaunchQuiz={(qId) => {
                  const targetQuiz = quizzes.find(q => q.id === qId);
                  if (targetQuiz) setActiveQuiz(targetQuiz);
                }}
                onUploadAssignment={handleUploadAssignment}
              />
            );
          }
        }
        return (
          <MyCourses 
            courses={courses}
            onCourseSelect={(id) => setSelectedCourseId(id)}
            onEnrollCourse={handleEnrollCourse}
          />
        );
      case "assignments":
        // Render detailed assignments desk
        return (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold font-display text-slate-800">Academic Assignments Desk</h2>
              <p className="text-xs text-slate-400">Track and submit all active course deliverables</p>
            </div>
            {courses.map(course => {
              const selectedCourse = course;
              return (
                <div key={course.id} className="bg-white p-4 rounded-xl border">
                  <h3 className="text-xs font-bold text-[#003366] uppercase">{course.code} - {course.title}</h3>
                  <button 
                    onClick={() => { setSelectedCourseId(course.id); setActiveView("courses"); }}
                    className="mt-2 text-xs text-[#003366] hover:underline flex items-center gap-1 font-semibold"
                  >
                    Open Course Deliverable Space <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        );
      case "grades":
        return (
          <GradesAttendance 
            grades={initialGrades}
            profile={studentProfile}
          />
        );
      case "timetable":
        return (
          <TimetableForum 
            timetable={initialTimetable}
            forumPosts={forumPosts}
            onAddForumPost={handleAddForumPost}
            onAddForumReply={handleAddForumReply}
          />
        );
      case "messaging":
        return (
          <Messaging 
            chatThreads={chatThreads}
            onSendMessage={handleSendMessage}
          />
        );
      case "resources":
        return (
          <LibraryFinance 
            libraryBooks={initialLibraryBooks}
            invoices={invoices}
            onPayInvoice={handlePayTuition}
          />
        );
      case "services":
        return (
          <StudentServices 
            certificates={initialCertificates}
            jobs={initialJobOpportunities}
            profile={studentProfile}
          />
        );
      default:
        return (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs text-slate-400">
            View under construction. Follow administrative guidelines.
          </div>
        );
    }
  };

  // Render Login page if not authenticated
  if (!isAuthenticated) {
    return <AuthPages onLoginSuccess={handleLogin} />;
  }

  return (
    <div className={`min-h-screen font-sans transition-all duration-300 ${darkMode ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-800'}`}>
      
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce z-50">
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* GLOBAL TOAST & ACCESSIBILITY NOTIFICATION OVERLAYS */}
      {showNotifications && (
        <div className="absolute top-16 right-4 md:right-8 bg-white border border-slate-100 rounded-2xl shadow-xl w-80 p-4 space-y-3 z-50 animate-scaleUp text-slate-800">
          <div className="flex justify-between items-center border-b border-slate-50 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-display">Notifications</span>
            <button onClick={() => {
              setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })));
            }} className="text-[10px] text-[#003366] hover:underline font-semibold">Mark all read</button>
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto">
            {notificationsList.map(n => (
              <div key={n.id} className={`p-2 rounded-xl border text-[10px] leading-relaxed relative ${n.unread ? 'bg-[#003366]/5 border-[#003366]/20' : 'bg-slate-50/50 border-slate-100'}`}>
                {n.unread && <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#003366] pulse-glow"></span>}
                <p className="font-semibold pr-4">{n.text}</p>
                <span className="text-[8px] text-slate-400 block mt-1 font-mono">{n.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex relative">
        
        {/* SIDEBAR NAVIGATION COLUMN */}
        <aside className={`fixed inset-y-0 left-0 bg-[#003366] text-white w-64 p-6 flex flex-col justify-between shadow-2xl z-40 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="space-y-8">
            {/* Header logo */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-0.5 bg-white rounded-lg shadow-md shrink-0 w-8 h-8 flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/en/e/eb/University_of_the_Gambia_Logo.png" 
                    alt="UTG Logo" 
                    className="w-7 h-7 object-contain animate-pulse-slow" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-[9px] font-bold text-[#FFD700] tracking-widest uppercase font-display">University of</h2>
                  <p className="text-sm font-extrabold tracking-tight font-display text-white">The Gambia (UTG)</p>
                </div>
              </div>

              {/* Close burger on mobile */}
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar menu items */}
            <nav className="space-y-1.5">
              <button 
                onClick={() => { setActiveView("dashboard"); setSelectedCourseId(null); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeView === "dashboard" ? 'bg-[#FFD700] text-[#003366]' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" /> Student Dashboard
              </button>

              <button 
                onClick={() => { setActiveView("courses"); setSelectedCourseId(null); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeView === "courses" ? 'bg-[#FFD700] text-[#003366]' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`}
              >
                <BookOpen className="w-4 h-4 shrink-0" /> My Academic Courses
              </button>

              <button 
                onClick={() => { setActiveView("assignments"); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeView === "assignments" ? 'bg-[#FFD700] text-[#003366]' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`}
              >
                <FileText className="w-4 h-4 shrink-0" /> Assignments Desk
              </button>

              <button 
                onClick={() => { setActiveView("grades"); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeView === "grades" ? 'bg-[#FFD700] text-[#003366]' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`}
              >
                <Award className="w-4 h-4 shrink-0" /> Gradebook & Transcript
              </button>

              <button 
                onClick={() => { setActiveView("timetable"); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeView === "timetable" ? 'bg-[#FFD700] text-[#003366]' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`}
              >
                <Calendar className="w-4 h-4 shrink-0" /> Roster & Forums
              </button>

              <button 
                onClick={() => { setActiveView("messaging"); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeView === "messaging" ? 'bg-[#FFD700] text-[#003366]' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`}
              >
                <MessageSquare className="w-4 h-4 shrink-0" /> Chat Communicator
              </button>

              <button 
                onClick={() => { setActiveView("resources"); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeView === "resources" ? 'bg-[#FFD700] text-[#003366]' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`}
              >
                <Library className="w-4 h-4 shrink-0" /> Library & Tuition
              </button>

              <button 
                onClick={() => { setActiveView("services"); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeView === "services" ? 'bg-[#FFD700] text-[#003366]' : 'hover:bg-white/10 text-slate-300 hover:text-white'}`}
              >
                <HeartHandshake className="w-4 h-4 shrink-0" /> Student Services
              </button>
            </nav>
          </div>

          {/* Profile & logout footer */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <div 
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/5 cursor-pointer"
            >
              <img src={studentProfile.photoUrl} alt="Me" className="w-8 h-8 rounded-full object-cover border border-white/20" referrerPolicy="no-referrer" />
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-300 block font-mono">{studentProfile.matricNo}</span>
                <span className="text-xs font-bold block truncate text-white">{studentProfile.name}</span>
              </div>
            </div>

            <button 
              id="btn-sidebar-logout"
              onClick={handleLogout}
              className="w-full py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-[11px] font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <LogOut className="w-4 h-4" /> Sign Out Session
            </button>
          </div>
        </aside>

        {/* MAIN BODY CONTAINER CANVAS */}
        <div className="flex-1 lg:pl-64 min-w-0 min-h-screen flex flex-col justify-between">
          
          {/* HEADER HEADER BAR WITH PROFILE INFO */}
          <header className={`sticky top-0 bg-white shadow-xs px-6 py-3.5 flex items-center justify-between z-30 transition-all ${darkMode ? 'bg-slate-900 border-b border-slate-800 text-white' : 'bg-white text-slate-800'}`}>
            <div className="flex items-center gap-3">
              {/* Menu trigger on mobile */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Global portal query..."
                  className={`pl-9 pr-3 py-1.5 text-[11px] rounded-xl border border-slate-200 outline-none w-56 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 text-slate-800'}`}
                />
              </div>
            </div>

            {/* Quick Actions and tools */}
            <div className="flex items-center gap-3.5">
              
              {/* Notifications */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-xl relative transition-colors cursor-pointer ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#003366] pulse-glow"></span>
              </button>

              {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-[#003366]" />}
              </button>

              {/* Language toggle */}
              <div className="relative flex items-center gap-1 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-xl cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value="en">English (Official)</option>
                  <option value="fr">French</option>
                  <option value="wo">Wolof</option>
                </select>
              </div>

              {/* Profile dropdown trigger */}
              <div 
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <img src={studentProfile.photoUrl} alt="Avatar" className="w-7 h-7 rounded-full object-cover border" referrerPolicy="no-referrer" />
                <span className="hidden md:inline text-xs font-bold">{studentProfile.name.split(" ").shift()}</span>
              </div>

            </div>
          </header>

          {/* MAIN PAGE COMPONENT DISPATCHER */}
          <main className="flex-grow p-6 md:p-8 max-w-7xl w-full mx-auto">
            {renderMainContent()}
          </main>

          {/* ACADEMIC FOOTER */}
          <footer className={`py-6 px-8 border-t text-center text-[10px] text-slate-400 space-y-2 mt-12 shrink-0 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-7xl mx-auto">
              <div className="flex items-center gap-1.5 justify-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/e/eb/University_of_the_Gambia_Logo.png" 
                  alt="UTG Logo" 
                  className="w-4 h-4 object-contain" 
                  referrerPolicy="no-referrer"
                />
                <span className="font-semibold text-slate-500">© 2026 University of The Gambia. All Rights Reserved.</span>
              </div>

              <div className="flex gap-4 justify-center font-bold">
                <a href="#" className="hover:underline">Help Center</a>
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Accessibility Statement</a>
                <a href="#" className="hover:underline">IT Support Hub</a>
              </div>
            </div>
            <p className="text-[9px] text-slate-400">
              Official online learning node for the School of Information Technology and Communications (SITC) - UTG Faraba Banta Campus, Gambia.
            </p>
          </footer>

        </div>

      </div>

      {/* STUDENT DETAILED PROFILE INFO MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 animate-scaleUp">
            
            {/* Modal header */}
            <div className="bg-[#003366] text-white p-5 flex justify-between items-center relative">
              <div className="space-y-0.5">
                <span className="text-[9px] tracking-widest font-bold uppercase text-amber-400 font-mono">UTG Student Registry</span>
                <h3 className="text-sm font-bold font-display">Personal Profile Card</h3>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-white/80 hover:text-white font-extrabold text-lg p-1"
              >
                &times;
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-6">
              
              <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                <img src={studentProfile.photoUrl} alt="Alieu" className="w-14 h-14 rounded-full object-cover border" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-display">{studentProfile.name}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold block">{studentProfile.matricNo}</span>
                  <span className="text-[10px] text-[#003366] font-bold block">{studentProfile.program}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Department Office</span>
                  <span className="text-slate-700">{studentProfile.department.replace("Department of ", "")}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Academic level</span>
                  <span className="text-slate-700">{studentProfile.academicLevel}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Official Email</span>
                  <span className="text-slate-700 font-mono text-[10px]">{studentProfile.email}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Current standing CGPA</span>
                  <span className="text-[#003366] font-bold">{studentProfile.cgpa} / 4.00</span>
                </div>
              </div>

              {/* Emergency details */}
              <div className="p-4 bg-slate-50 border rounded-xl space-y-1.5 text-xs">
                <span className="text-[9px] text-slate-400 block uppercase font-bold">Emergency Contact</span>
                <p className="font-bold">{studentProfile.emergencyContact.name} ({studentProfile.emergencyContact.relationship})</p>
                <p className="font-mono text-slate-500">{studentProfile.emergencyContact.phone}</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    triggerToast("Profile verification card synchronized with registry.");
                    setShowProfileModal(false);
                  }}
                  className="w-full py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Verify academic records
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
