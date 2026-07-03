import React, { useState } from "react";
import { 
  Send, 
  Search, 
  Paperclip, 
  CheckCheck, 
  FileText, 
  Users, 
  User, 
  Sparkles,
  Check
} from "lucide-react";
import { ChatThread, Message } from "../types";

interface MessagingProps {
  chatThreads: ChatThread[];
  onSendMessage: (threadId: string, messageText: string, attachedFile?: { name: string; url: string }) => void;
}

export default function Messaging({ chatThreads, onSendMessage }: MessagingProps) {
  const [activeThreadId, setActiveThreadId] = useState<string>(chatThreads[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [attachedFile, setAttachedFile] = useState<{ name: string; url: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const activeThread = chatThreads.find(t => t.id === activeThreadId);

  // Filter threads based on search
  const filteredThreads = chatThreads.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedFile) return;

    onSendMessage(activeThreadId, inputText, attachedFile || undefined);
    setInputText("");
    setAttachedFile(null);

    // Simulate Lecturer response after 1.5 seconds for DMs
    if (activeThread && !activeThread.isGroup) {
      setTimeout(() => {
        const replies = [
          "I have received your note, Alieu. I will look at your code repository shortly.",
          "Please verify that you read Chapter 4 of the enterprise design textbook. That holds the core of this pattern.",
          "Perfect, Alieu. Let's touch base during office hours tomorrow.",
          "Ensure your group is fully prepared for the Capstone design walkthrough."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        // Push reply to active thread
        const systemMessage: Message = {
          id: `sys_reply_${Date.now()}`,
          sender: activeThread.name,
          avatar: activeThread.avatar,
          text: randomReply,
          timestamp: "Just now",
          isMe: false,
          isLecturer: true
        };
        activeThread.messages.push(systemMessage);
        activeThread.lastMessage = `${activeThread.name}: ${randomReply}`;
        activeThread.unreadCount = 0; // reset
        
        // Trigger a force re-render
        setActiveThreadId("");
        setTimeout(() => setActiveThreadId(activeThread.id), 1);
      }, 1500);
    }
  };

  const handleAttachFileMock = () => {
    const fileNames = ["Architectural_Diagram_V2.pdf", "MLP_NumPy_Draft.ipynb", "Screenshot_SQL_Plan.png"];
    const randomName = fileNames[Math.floor(Math.random() * fileNames.length)];
    setAttachedFile({
      name: randomName,
      url: "#"
    });
    setToast(`Attached file: ${randomName}`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[550px] font-sans animate-fadeIn">
      
      {/* 1. SIDEBAR ACTIVE CHATS (4 spans) */}
      <div className="md:col-span-4 border-r border-slate-100 flex flex-col justify-between h-full">
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">UTG Communicator</h3>
            <p className="text-[10px] text-slate-400">Direct link to lecturers & study guilds</p>
          </div>

          {/* Search chat */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#003366] focus:bg-white"
            />
          </div>
        </div>

        {/* Thread lists */}
        <div className="flex-grow overflow-y-auto divide-y divide-slate-50 px-2 pb-4">
          {filteredThreads.map((thread) => {
            const isSelected = activeThreadId === thread.id;
            return (
              <div 
                key={thread.id} 
                onClick={() => { thread.unreadCount = 0; setActiveThreadId(thread.id); }}
                className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${isSelected ? 'bg-[#003366]/5' : 'hover:bg-slate-50/50'}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <img src={thread.avatar} alt={thread.name} className="w-9 h-9 rounded-full object-cover border" referrerPolicy="no-referrer" />
                    {thread.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[8px] font-bold flex items-center justify-center">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-800 font-display line-clamp-1">{thread.name}</h4>
                      {thread.isGroup ? (
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      ) : (
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" title="Online"></span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">{thread.lastMessage}</p>
                  </div>
                </div>

                {thread.unreadCount > 0 && (
                  <div className="w-2 h-2 rounded-full bg-[#003366] shrink-0"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. CHAT FEED WORKSPACE (8 spans) */}
      <div className="md:col-span-8 flex flex-col justify-between h-full bg-slate-50/30">
        {activeThread ? (
          <div className="flex flex-col justify-between h-full">
            
            {/* Thread Header details */}
            <div className="bg-white px-5 py-3.5 border-b border-slate-100 flex items-center justify-between shadow-xs shrink-0">
              <div className="flex items-center gap-3">
                <img src={activeThread.avatar} alt={activeThread.name} className="w-8 h-8 rounded-full object-cover border" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-display">{activeThread.name}</h4>
                  <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wide">{activeThread.role || "Study Group"}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">Encrypted Connection</span>
            </div>

            {/* Messages display stream */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 max-h-[380px]">
              {activeThread.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-2.5 max-w-[80%] ${msg.isMe ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <img src={msg.avatar} alt="Sender" className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5 border" referrerPolicy="no-referrer" />
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-500 font-display">{msg.isMe ? 'You' : msg.sender}</span>
                      <span className="text-[8px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>

                    <div className={`p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${msg.isMe ? 'bg-[#003366] text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}>
                      {msg.text}

                      {/* Display attachment */}
                      {msg.fileUrl && (
                        <div className={`mt-2 p-2 rounded-xl flex items-center justify-between gap-3 text-[10px] ${msg.isMe ? 'bg-white/10 text-white' : 'bg-slate-50 border border-slate-100 text-slate-800'}`}>
                          <div className="flex items-center gap-1.5 min-w-0">
                            <FileText className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                            <span className="truncate font-mono">{msg.fileName}</span>
                          </div>
                          <button className="text-[8px] font-bold hover:underline">View File</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input send tools */}
            <div className="bg-white p-4 border-t border-slate-100 shrink-0">
              
              {toast && (
                <div className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-lg mb-2 inline-block font-mono">
                  {toast}
                </div>
              )}

              {attachedFile && (
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl text-[10px] text-slate-600 mb-2 border border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#003366]" />
                    <span className="font-mono">{attachedFile.name}</span>
                  </div>
                  <button 
                    onClick={() => setAttachedFile(null)}
                    className="text-slate-400 hover:text-slate-600 font-extrabold text-xs"
                  >
                    &times;
                  </button>
                </div>
              )}

              <form onSubmit={handleSend} className="flex gap-2 items-center">
                <button 
                  type="button" 
                  onClick={handleAttachFileMock}
                  className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-xl cursor-pointer"
                  title="Mock File Attachment"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input 
                  type="text"
                  placeholder="Type a secure message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 focus:border-[#003366] focus:bg-white text-xs rounded-xl focus:outline-none"
                />

                <button 
                  type="submit"
                  className="p-2 bg-[#003366] hover:bg-[#002244] text-white rounded-xl shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#FFD700]" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="text-center py-32 space-y-3 my-auto">
            <Users className="w-12 h-12 text-slate-200 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800 font-display">No Thread Selected</h4>
            <p className="text-xs text-slate-400">Select a contact channel from the left sidebar to resume active communications.</p>
          </div>
        )}
      </div>

    </div>
  );
}
