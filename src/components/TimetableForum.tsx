import React, { useState } from "react";
import { 
  Calendar, 
  MessageSquare, 
  Plus, 
  Clock, 
  MapPin, 
  Video, 
  ExternalLink, 
  Heart, 
  Pin, 
  Send, 
  Filter, 
  User, 
  CheckSquare,
  ChevronRight
} from "lucide-react";
import { TimetableEvent, ForumPost } from "../types";

interface TimetableForumProps {
  timetable: TimetableEvent[];
  forumPosts: ForumPost[];
  onAddForumPost: (post: ForumPost) => void;
  onAddForumReply: (postId: string, replyContent: string) => void;
}

export default function TimetableForum({ 
  timetable, 
  forumPosts, 
  onAddForumPost,
  onAddForumReply 
}: TimetableForumProps) {
  const [activeTab, setActiveTab] = useState<"schedule" | "forum">("schedule");
  
  // Forum variables
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCourse, setNewPostCourse] = useState("cos_401");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [forumFilter, setForumFilter] = useState("all");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: `fp_new_${Date.now()}`,
      courseId: newPostCourse,
      courseCode: newPostCourse === "cos_401" ? "SEN 401" : "CSC 411",
      author: "Alieu Jallow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
      role: "student",
      title: newPostTitle,
      content: newPostContent,
      date: "Just now",
      likes: 0,
      replies: []
    };

    onAddForumPost(newPost);
    setNewPostTitle("");
    setNewPostContent("");
    setShowCreatePost(false);
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedPostId) return;

    onAddForumReply(selectedPostId, replyText);
    setReplyText("");
  };

  // Group timetable events by Day
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const getEventsForDay = (day: string) => {
    return timetable.filter(e => e.day === day).sort((a,b) => a.startTime.localeCompare(b.startTime));
  };

  const filteredForum = forumFilter === "all" 
    ? forumPosts 
    : forumPosts.filter(p => p.courseCode === forumFilter);

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {/* SECTION NAV TABS */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex-wrap gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 font-display">Academic Roster & Forums</h2>
          <p className="text-xs text-slate-400">Review class timetables or interact in departmental forums</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "schedule" ? "bg-white text-[#003366] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Weekly Schedule
          </button>
          <button
            onClick={() => { setActiveTab("forum"); setSelectedPostId(null); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "forum" ? "bg-white text-[#003366] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Discussions Portal
          </button>
        </div>
      </div>

      {/* 1. WEEKLY SCHEDULE TABLE/CARDS GRID */}
      {activeTab === "schedule" && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {daysOfWeek.map((day) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div key={day} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4">
                <div className="border-b border-slate-50 pb-2">
                  <h3 className="text-xs font-extrabold text-slate-800 font-display uppercase tracking-wider">{day}</h3>
                  <span className="text-[9px] text-slate-400 font-mono">{dayEvents.length} Sessions scheduled</span>
                </div>

                <div className="space-y-3">
                  {dayEvents.length > 0 ? (
                    dayEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 hover:border-slate-300 transition-all">
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="px-2 py-0.5 bg-indigo-50 text-[#003366] rounded font-mono uppercase">{event.type}</span>
                          <span className="text-[#FFD700] bg-[#003366] px-1.5 py-0.5 rounded font-mono">{event.courseCode}</span>
                        </div>
                        
                        <p className="text-xs font-bold text-slate-800 leading-tight">{event.title}</p>
                        
                        <div className="space-y-1 text-[9px] text-slate-500 font-semibold">
                          <p className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {event.startTime} - {event.endTime}</p>
                          <p className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {event.room}</p>
                        </div>

                        {event.link && (
                          <a 
                            href={event.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[9px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5 pt-1 border-t border-slate-100"
                          >
                            <Video className="w-3 h-3 text-emerald-500" /> Join Live Classroom
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-slate-300 italic py-6 text-center">No Lectures scheduled</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. DISCUSSION FORUM PORTAL */}
      {activeTab === "forum" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel: Threads feed list (4 spans) */}
          <div className="lg:col-span-5 space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-50 pb-3 flex-wrap gap-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Forums Feed</h3>
              
              <div className="flex gap-2 items-center">
                {/* Board filter selector */}
                <select 
                  value={forumFilter}
                  onChange={(e) => setForumFilter(e.target.value)}
                  className="px-2 py-1 border border-slate-200 bg-slate-50 focus:bg-white rounded-lg text-[10px] font-bold text-slate-600 focus:outline-none"
                >
                  <option value="all">All Boards</option>
                  <option value="SEN 401">SEN 401</option>
                  <option value="CSC 411">CSC 411</option>
                </select>

                <button 
                  onClick={() => setShowCreatePost(true)}
                  className="p-1.5 bg-[#003366] hover:bg-[#002244] text-white rounded-lg"
                  title="Create New Post"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List items */}
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {filteredForum.map((post) => {
                const isSelected = selectedPostId === post.id;
                return (
                  <div 
                    key={post.id} 
                    onClick={() => { setSelectedPostId(post.id); setShowCreatePost(false); }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 hover:border-slate-300 ${isSelected ? 'border-[#003366] bg-[#003366]/5 shadow-sm' : 'border-slate-100 bg-slate-50/40'}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 bg-[#003366] text-white text-[9px] font-bold rounded-full font-mono">
                        {post.courseCode}
                      </span>
                      {post.pinned && (
                        <span className="text-amber-500 font-bold flex items-center gap-0.5 text-[8px] uppercase">
                          <Pin className="w-2.5 h-2.5 fill-amber-500" /> Pinned
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-800 font-display line-clamp-1">{post.title}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-normal font-medium">{post.content}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[9px] text-slate-400 font-semibold">
                      <div className="flex items-center gap-1">
                        <img src={post.avatar} alt="Author" className="w-4 h-4 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <span>{post.author}</span>
                      </div>
                      <span className="flex items-center gap-0.5"><MessageSquare className="w-3.5 h-3.5" /> {post.replies.length} Replies</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel: Active thread details or create post dialog (7 spans) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[400px] flex flex-col justify-between">
            
            {showCreatePost ? (
              // CREATE NEW FORUM TOPIC FORM
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="border-b border-slate-50 pb-3 flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Publish New Thread</h3>
                  <button 
                    type="button" 
                    onClick={() => setShowCreatePost(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Board Course Code</label>
                      <select 
                        value={newPostCourse}
                        onChange={(e) => setNewPostCourse(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white text-xs rounded-xl focus:outline-none"
                      >
                        <option value="cos_401">SEN 401</option>
                        <option value="cos_411">CSC 411</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase block">Thread Title</label>
                    <input 
                      type="text"
                      placeholder="Title of your query or discussion topic..."
                      required
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white text-xs rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase block">Content / Explanation</label>
                    <textarea 
                      rows={6}
                      placeholder="Write your details in full. Include code snippets or diagram logs if necessary..."
                      required
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white text-xs rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-[#003366] hover:bg-[#002244] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Publish Thread
                </button>
              </form>
            ) : selectedPostId ? (() => {
              const post = forumPosts.find(p => p.id === selectedPostId);
              if (!post) return null;
              return (
                <div className="space-y-5 flex flex-col justify-between h-full">
                  
                  {/* Thread Header details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={post.avatar} alt="Author" className="w-9 h-9 rounded-full object-cover border border-slate-200" referrerPolicy="no-referrer" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-800 font-display">{post.author}</span>
                          <span className={`px-2 py-0.5 text-[8px] font-bold rounded-full ${post.role === 'lecturer' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                            {post.role.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono block">Published {post.date}</span>
                      </div>
                    </div>

                    <h3 className="text-sm md:text-md font-bold text-slate-800 leading-snug font-display">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed leading-6 bg-slate-50/50 p-4 rounded-xl border border-slate-100 font-medium">
                      {post.content}
                    </p>

                    {/* Likes & replies tags */}
                    <div className="flex gap-4 items-center text-[10px] text-slate-400 font-semibold">
                      <button 
                        onClick={() => {
                          post.likes = (post.likes || 0) + 1;
                          setSelectedPostId(post.id); // trigger rerender
                        }}
                        className="flex items-center gap-1 hover:text-rose-500 cursor-pointer"
                      >
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> {post.likes} Likes
                      </button>
                    </div>
                  </div>

                  {/* Replies roster */}
                  <div className="space-y-3 border-t border-slate-100 pt-4 flex-grow max-h-52 overflow-y-auto pr-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Replies list ({post.replies.length})</span>
                    
                    {post.replies.length > 0 ? (
                      <div className="space-y-3">
                        {post.replies.map((reply) => (
                          <div key={reply.id} className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 flex gap-3">
                            <img src={reply.avatar} alt="Reply Author" className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5 border" referrerPolicy="no-referrer" />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-800 font-display">{reply.author}</span>
                                <span className={`px-1.5 py-0.2 text-[7px] font-bold rounded-full ${reply.role === 'lecturer' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                                  {reply.role.toUpperCase()}
                                </span>
                                <span className="text-[8px] text-slate-400 font-mono font-medium">{reply.date}</span>
                              </div>
                              <p className="text-xs text-slate-600 leading-normal font-medium">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic py-4 text-center">No replies posted. Be the first to reply!</p>
                    )}
                  </div>

                  {/* Post new reply send input */}
                  <form onSubmit={handlePostReply} className="flex gap-2 border-t border-slate-100 pt-3 mt-3">
                    <input 
                      type="text"
                      placeholder="Write your explanation or query reply..."
                      required
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-grow px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white text-xs rounded-xl focus:outline-none"
                    />
                    <button type="submit" className="p-2.5 bg-[#003366] hover:bg-[#002244] text-white rounded-xl">
                      <Send className="w-4 h-4 text-[#FFD700]" />
                    </button>
                  </form>

                </div>
              );
            })() : (
              // DEFAULT THREAD DETAIL PLACEHOLDER
              <div className="text-center py-20 space-y-3 my-auto">
                <MessageSquare className="w-12 h-12 text-slate-200 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-slate-800 font-display">No Thread Selected</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Select an active discussion card from the left panel feeds, or click the plus button to create a new academic thread.
                </p>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
