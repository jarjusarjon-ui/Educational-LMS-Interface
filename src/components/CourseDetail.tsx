import React, { useState, useRef } from "react";
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Video, 
  Users, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  UploadCloud, 
  Play, 
  Pause, 
  Settings, 
  Volume2, 
  Bookmark, 
  Send,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Course, Lesson, Assignment } from "../types";

interface CourseDetailProps {
  course: Course;
  assignments: Assignment[];
  onBack: () => void;
  onLaunchQuiz: (quizId: string) => void;
  onUploadAssignment: (assignmentId: string, fileName: string) => void;
}

export default function CourseDetail({ 
  course, 
  assignments, 
  onBack, 
  onLaunchQuiz, 
  onUploadAssignment 
}: CourseDetailProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "modules" | "assignments" | "live" | "faqs">("overview");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  // Accordion state for modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ m1: true, m2: true, m3: true });

  // Lesson player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0x");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState<any[]>([]);

  // Drag and drop assignment submit state
  const [dragActive, setDragActive] = useState(false);
  const [submittingAssignmentId, setSubmittingAssignmentId] = useState<string | null>(null);
  
  // Live Lecture Simulation
  const [liveChat, setLiveChat] = useState<string[]>(["Dr. Alieu Sowe: Welcome everyone, let's look at microservices today.", "Ebrima Darboe: Sir, is the CAP Theorem related to network partitions?"]);
  const [liveInput, setLiveInput] = useState("");

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsPlaying(false);
    setIsBookmarked(false);
    setLocalComments(lesson.comments || []);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: `c_add_${Date.now()}`,
      user: "Alieu Jallow (You)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
      text: commentText,
      date: "Just now"
    };
    setLocalComments(prev => [newComment, ...prev]);
    setCommentText("");
  };

  // Drag-and-drop submission
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, assignId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onUploadAssignment(assignId, file.name);
      setSubmittingAssignmentId(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, assignId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onUploadAssignment(assignId, file.name);
      setSubmittingAssignmentId(null);
    }
  };

  // Handle live message sending
  const handleSendLiveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveInput.trim()) return;
    setLiveChat(prev => [...prev, `Alieu Jallow (You): ${liveInput}`]);
    setLiveInput("");
    // Simulate professor reply
    setTimeout(() => {
      setLiveChat(prev => [...prev, "Dr. Alieu Sowe: Precisely Alieu! Excellent observation on partition tolerance."]);
    }, 1500);
  };

  // Specific course assessments
  const courseAssignments = assignments.filter(a => a.courseCode === course.code);

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {/* HEADER BAR: RETURN LINK */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-bold text-xs transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-100"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" /> Back to My Courses
        </button>

        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
          UTG Course Classroom
        </span>
      </div>

      {/* CORE SPLIT GRID VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: ACTIVE INTERACTIVE HUB (8 spans) */}
        <div className="lg:col-span-8 space-y-6">

          {/* ACTIVE LESSON MEDIA PLAYER PANEL (ONLY WHEN LESSON SELECTED) */}
          {selectedLesson ? (
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#FFD700]">Video Lecture</span>
                  <h3 className="text-xs font-bold font-display line-clamp-1">{selectedLesson.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedLesson(null)}
                  className="text-white/60 hover:text-white text-xs font-bold px-2 py-1 hover:bg-white/10 rounded"
                >
                  Close Player
                </button>
              </div>

              {/* Fake Interactive Video Canvas */}
              <div className="relative bg-black h-80 flex items-center justify-center text-white">
                {isPlaying ? (
                  <video 
                    src={selectedLesson.videoUrl} 
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-slate-950">
                    <img src={course.image} alt="Lecture Cover" className="absolute inset-0 w-full h-full object-cover opacity-25" referrerPolicy="no-referrer" />
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="p-5 bg-[#FFD700] hover:scale-110 text-[#003366] rounded-full transition-all shadow-xl hover:shadow-2xl cursor-pointer relative z-10"
                    >
                      <Play className="w-8 h-8 fill-slate-950 stroke-none" />
                    </button>
                    <p className="text-xs font-semibold text-slate-300 relative z-10">Click to stream lecture video ({selectedLesson.duration})</p>
                  </div>
                )}
              </div>

              {/* Player control panel */}
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-mono text-slate-500">100%</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {/* Speed toggle */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Speed</span>
                    <select 
                      value={playbackSpeed} 
                      onChange={(e) => setPlaybackSpeed(e.target.value)}
                      className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-700"
                    >
                      <option value="1.0x">1.0x (Normal)</option>
                      <option value="1.25x">1.25x</option>
                      <option value="1.5x">1.5x</option>
                      <option value="2.0x">2.0x</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md transition-all ${isBookmarked ? 'bg-[#FFD700] text-[#003366]' : 'bg-white border border-slate-200 text-slate-600'}`}
                  >
                    <Bookmark className="w-3 h-3" /> {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </button>
                </div>
              </div>

              {/* Transcript, Notes and Comments */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left panel: Transcript & downloads (7 spans) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Lesson Transcript</h4>
                    <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                      {selectedLesson.transcript || "Syllabus transcription auto-generation compiling..."}
                    </p>
                  </div>

                  {selectedLesson.downloads && selectedLesson.downloads.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Lecture Resources</h4>
                      <div className="space-y-2">
                        {selectedLesson.downloads.map((dl, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#003366]" />
                              <div>
                                <span className="text-xs font-bold text-slate-800 block line-clamp-1">{dl.name}</span>
                                <span className="text-[9px] text-slate-400 font-mono">{dl.size}</span>
                              </div>
                            </div>
                            <button className="p-1.5 bg-slate-50 hover:bg-[#003366] hover:text-white rounded-lg transition-all text-slate-600">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right panel: Active Comments forum (5 spans) */}
                <div className="md:col-span-5 space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Lesson Discussion Q&A</h4>
                  
                  {/* Submit comments */}
                  <form onSubmit={handlePostComment} className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Ask or reply on this lesson..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#003366]"
                    />
                    <button type="submit" className="p-2 bg-[#003366] hover:bg-[#002244] text-white rounded-xl">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Comment stream */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {localComments.map((com) => (
                      <div key={com.id} className="p-2.5 bg-slate-50/50 rounded-xl border border-slate-100 flex gap-2">
                        <img src={com.avatar} alt="User" className="w-5 h-5 rounded-full object-cover mt-0.5" referrerPolicy="no-referrer" />
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-700">{com.user}</span>
                            <span className="text-[8px] text-slate-400">{com.date}</span>
                          </div>
                          <p className="text-[10px] text-slate-600 leading-relaxed">{com.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ) : null}

          {/* MAIN TABS BAR FOR MAIN DETAILS VIEW */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer transition-all ${activeTab === "overview" ? "bg-[#003366] text-white" : "text-slate-500 hover:text-slate-800"}`}
            >
              Course Overview
            </button>
            <button
              onClick={() => setActiveTab("modules")}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer transition-all ${activeTab === "modules" ? "bg-[#003366] text-white" : "text-slate-500 hover:text-slate-800"}`}
            >
              Syllabus & Lessons
            </button>
            <button
              onClick={() => setActiveTab("assignments")}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer transition-all ${activeTab === "assignments" ? "bg-[#003366] text-white animate-pulse" : "text-slate-500 hover:text-slate-800"}`}
            >
              Assignments & Deliverables
            </button>
            {course.liveSession && (
              <button
                onClick={() => setActiveTab("live")}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer transition-all ${activeTab === "live" ? "bg-rose-500 text-white" : "text-slate-500 hover:text-rose-500 font-bold"}`}
              >
                ● Live Lecture Session
              </button>
            )}
            <button
              onClick={() => setActiveTab("faqs")}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer transition-all ${activeTab === "faqs" ? "bg-[#003366] text-white" : "text-slate-500 hover:text-slate-800"}`}
            >
              FAQs
            </button>
          </div>

          {/* TAB CONTENTS CONTAINER */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[300px]">
            
            {/* 1. COURSE OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-md font-bold text-slate-800 font-display">About this Course</h3>
                  <p className="text-xs text-slate-500 leading-relaxed leading-6">{course.overview}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Learning Objectives</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.learningObjectives && course.learningObjectives.map((obj, idx) => (
                      <div key={idx} className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600 leading-relaxed">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. SYLLABUS & LESSONS */}
            {activeTab === "modules" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Weekly Interactive Modules</h3>
                  <span className="text-[10px] text-slate-400 font-semibold font-mono">Click a lesson title to load video player</span>
                </div>

                {course.modules && course.modules.length > 0 ? (
                  <div className="space-y-3">
                    {course.modules.map((mod) => (
                      <div key={mod.id} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                        
                        {/* Accordion header */}
                        <div 
                          onClick={() => toggleModule(mod.id)}
                          className="flex justify-between items-center bg-slate-50 p-4 cursor-pointer hover:bg-slate-100 transition-all select-none"
                        >
                          <span className="text-xs font-bold text-slate-800 font-display">{mod.title}</span>
                          {expandedModules[mod.id] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>

                        {/* Accordion body list */}
                        {expandedModules[mod.id] && (
                          <div className="p-2 bg-white divide-y divide-slate-50">
                            {mod.lessons.map((lesson) => (
                              <div 
                                key={lesson.id}
                                onClick={() => handleLessonClick(lesson)}
                                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all ${selectedLesson?.id === lesson.id ? 'bg-[#003366]/5 text-[#003366]' : 'hover:bg-slate-50'}`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <Video className={`w-4 h-4 ${lesson.completed ? 'text-emerald-500' : 'text-slate-400'}`} />
                                  <span className="text-xs font-semibold">{lesson.title}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-[10px] font-mono text-slate-400">{lesson.duration}</span>
                                  {lesson.completed && (
                                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">
                                      Watched
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-500">No lessons structured yet for this elective.</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. ASSIGNMENT WORKSPACE */}
            {activeTab === "assignments" && (
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Assignments for {course.code}</h3>

                {courseAssignments.length > 0 ? (
                  <div className="space-y-4">
                    {courseAssignments.map((assign) => (
                      <div key={assign.id} className="p-5 border border-slate-100 rounded-2xl shadow-sm space-y-4">
                        
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 font-display">{assign.title}</h4>
                            <p className="text-[10px] text-slate-500 font-mono">Deadline: <strong className="text-rose-500">{assign.deadline}</strong></p>
                          </div>
                          
                          {/* Status badges */}
                          <span className={`px-2.5 py-1 text-[9px] font-bold rounded ${assign.status === 'graded' ? 'bg-emerald-100 text-emerald-800' : assign.status === 'submitted' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'}`}>
                            {assign.status.toUpperCase()}
                          </span>
                        </div>

                        {/* Instructions */}
                        <p className="text-xs text-slate-500 leading-relaxed leading-6 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                          {assign.instructions}
                        </p>

                        {/* Submitted Details/Feedback or Submit Box */}
                        {assign.status === "graded" ? (
                          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-emerald-800">Score Awarded:</span>
                              <span className="text-sm font-extrabold text-emerald-700 font-display">{assign.marks}</span>
                            </div>
                            <p className="text-xs text-slate-600 italic">" {assign.feedback} "</p>
                          </div>
                        ) : assign.status === "submitted" ? (
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500">File uploaded:</span>
                              <strong className="text-slate-800 font-mono">{assign.fileUploaded}</strong>
                            </div>
                            <p className="text-[10px] text-slate-400">Date submitted: {assign.uploadedDate || "July 01, 2026"}</p>
                            
                            {assign.allowResubmission && (
                              <button 
                                onClick={() => setSubmittingAssignmentId(assign.id)}
                                className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-bold hover:bg-slate-50 rounded-lg text-[#003366] cursor-pointer"
                              >
                                Re-submit Assignment
                              </button>
                            )}
                          </div>
                        ) : (
                          // SUBMIT BOX
                          <div>
                            {submittingAssignmentId === assign.id ? (
                              <div 
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={(e) => handleDrop(e, assign.id)}
                                className={`p-6 border-2 border-dashed rounded-xl text-center space-y-3 cursor-pointer ${dragActive ? 'border-[#003366] bg-[#003366]/5' : 'border-slate-200 bg-slate-50'}`}
                              >
                                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                                <div className="space-y-1">
                                  <p className="text-xs font-bold text-slate-700">Drag & Drop assignment file here</p>
                                  <p className="text-[10px] text-slate-400">PDF, ZIP or DOCX format (Max 10MB)</p>
                                </div>
                                <div className="relative">
                                  <input 
                                    type="file" 
                                    id={`file-upload-${assign.id}`}
                                    onChange={(e) => handleFileChange(e, assign.id)}
                                    className="hidden"
                                  />
                                  <label 
                                    htmlFor={`file-upload-${assign.id}`}
                                    className="px-4 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 inline-block cursor-pointer"
                                  >
                                    Browse Files
                                  </label>
                                </div>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setSubmittingAssignmentId(assign.id)}
                                className="px-4 py-2 bg-[#003366] hover:bg-[#002244] text-white rounded-xl text-xs font-bold transition-all hover:scale-105 cursor-pointer"
                              >
                                Start Submission
                              </button>
                            )}
                          </div>
                        )}

                        {/* Rubric display */}
                        {assign.rubric && assign.rubric.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-slate-50">
                            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Evaluation Rubric matrix</span>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {assign.rubric.map((r, i) => (
                                <div key={i} className="p-2.5 bg-slate-50/50 rounded-xl border border-slate-100">
                                  <div className="flex justify-between font-bold text-xs">
                                    <span className="text-slate-700 line-clamp-1">{r.criterion}</span>
                                    <span className="text-[#003366] font-mono shrink-0">{r.maxPoints} pts</span>
                                  </div>
                                  <p className="text-[9px] text-slate-400 leading-normal mt-1">{r.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No assignments configured yet for this course.</p>
                )}
              </div>
            )}

            {/* 4. LIVE LECTURE OVERLAY SIMULATION */}
            {activeTab === "live" && course.liveSession && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3 flex-wrap gap-2">
                  <div>
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[9px] font-bold rounded-full animate-pulse uppercase tracking-wider">
                      ● Active Broadcast stream
                    </span>
                    <h3 className="text-md font-bold text-slate-800 font-display mt-1">{course.liveSession.topic}</h3>
                  </div>
                  <a 
                    href={course.liveSession.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-3 py-1.5 bg-[#003366] hover:bg-[#002244] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-sm"
                  >
                    Launch Google Meet <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Simulated Live Interface */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Left: simulated video display (7 spans) */}
                  <div className="md:col-span-8 bg-slate-950 rounded-2xl relative overflow-hidden h-72 flex flex-col justify-between p-4">
                    
                    {/* Upper overlay tags */}
                    <div className="flex justify-between items-center relative z-10">
                      <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white text-[9px] rounded-md font-semibold">
                        Lecturer: {course.lecturer}
                      </span>
                      <span className="px-2 py-0.5 bg-rose-600 text-white text-[9px] rounded-md font-bold tracking-wider uppercase animate-pulse">
                        REC
                      </span>
                    </div>

                    {/* Centered presenter screen placeholder */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-center select-none pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-slate-900/60 flex items-center justify-center border border-white/20">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-xs font-bold text-slate-200 font-display">SITC Virtual Lecture Hall</p>
                      <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed px-4">
                        Video rendering stream simulated. Click upper-right button to participate in the external Google Meet conference call.
                      </p>
                    </div>

                    {/* Footer overlays */}
                    <div className="flex justify-between items-center relative z-10 mt-auto">
                      <span className="text-[9px] text-slate-400 font-mono">Stream Quality: 1080p | Latency: 42ms</span>
                      <span className="text-[9px] text-slate-400 font-mono">Active Participants: 48 online</span>
                    </div>
                  </div>

                  {/* Right: active live chat (4 spans) */}
                  <div className="md:col-span-4 bg-slate-50 rounded-2xl p-4 flex flex-col justify-between border border-slate-200 h-72">
                    <div className="space-y-1 pb-2 border-b border-slate-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Live Classroom Chat</h4>
                      <p className="text-[9px] text-slate-400">Post immediate technical questions during stream</p>
                    </div>

                    {/* Chat log list */}
                    <div className="flex-grow overflow-y-auto space-y-2 py-3 max-h-44 pr-1">
                      {liveChat.map((msg, idx) => {
                        const [sender, text] = msg.split(": ");
                        const isMe = sender.includes("Alieu Jallow");
                        return (
                          <div key={idx} className="text-[10px] leading-relaxed">
                            <strong className={isMe ? 'text-indigo-600' : 'text-slate-800'}>{sender}: </strong>
                            <span className="text-slate-600 font-medium">{text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Send box */}
                    <form onSubmit={handleSendLiveMessage} className="flex gap-1.5 pt-2 border-t border-slate-200">
                      <input 
                        type="text"
                        placeholder="Write a message..."
                        value={liveInput}
                        onChange={(e) => setLiveInput(e.target.value)}
                        className="flex-grow px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none"
                      />
                      <button type="submit" className="p-1.5 bg-[#003366] text-white rounded-lg">
                        <Send className="w-3 h-3" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* 5. FAQs */}
            {activeTab === "faqs" && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Course FAQs</h3>
                
                {course.faqs && course.faqs.length > 0 ? (
                  <div className="space-y-4">
                    {course.faqs.map((f) => (
                      <div key={f.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                        <div className="flex gap-2 items-center text-slate-800 font-bold text-xs">
                          <HelpCircle className="w-4 h-4 text-[#003366] shrink-0" />
                          <h4>{f.question}</h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed pl-6 font-medium">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No FAQs configured for this course yet.</p>
                )}
              </div>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: RELEVANT COURSE DETAILS, ANNOUNCEMENTS, QUIZZES (4 spans) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* LECTURER PROFILE INFO */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lecturer / Instructor</h3>
            
            <div className="flex items-center gap-3">
              <img src={course.lecturerAvatar} alt={course.lecturer} className="w-12 h-12 rounded-full object-cover border border-slate-200" referrerPolicy="no-referrer" />
              <div>
                <h4 className="text-xs font-bold text-slate-800 font-display">{course.lecturer}</h4>
                <span className="text-[10px] text-slate-400 block font-semibold">School of IT & Communications</span>
                <span className="text-[10px] text-[#003366] hover:underline cursor-pointer block font-bold mt-0.5">View Profile Card</span>
              </div>
            </div>
          </div>

          {/* ASSESSMENT WORKSPACE & QUIZ TRIGGERS */}
          {course.quizStatus === "available" && (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100/30 p-5 rounded-2xl border border-amber-200 shadow-sm space-y-3">
              <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-[9px] font-extrabold rounded uppercase tracking-wider">
                Pending Quiz
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-800 font-display">Quiz 1 is currently active</h4>
                <p className="text-[10px] text-slate-500 mt-1">Syllabus covering design pattern structures.</p>
              </div>

              <button 
                onClick={() => {
                  if (course.code === "SEN 401") onLaunchQuiz("qz_01");
                }}
                className="w-full py-2 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Launch Assessment Panel
              </button>
            </div>
          )}

          {/* COURSE ANNOUNCEMENTS BOARD */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
              Course Bulletins
            </h3>

            {course.announcements && course.announcements.length > 0 ? (
              <div className="space-y-4">
                {course.announcements.map((ann) => (
                  <div key={ann.id} className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                      <span>{ann.date}</span>
                      {ann.important && <span className="text-rose-500">IMPORTANT</span>}
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">{ann.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">{ann.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No course announcements have been posted yet.</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
