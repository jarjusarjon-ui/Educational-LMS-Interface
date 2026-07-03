import React, { useState } from "react";
import { 
  Award, 
  Briefcase, 
  LifeBuoy, 
  Download, 
  ExternalLink, 
  QrCode, 
  FileText, 
  UploadCloud, 
  Check, 
  HelpCircle, 
  Flame, 
  Bookmark, 
  Sparkles,
  ShieldAlert,
  Send
} from "lucide-react";
import { Certificate, JobOpportunity, StudentProfile } from "../types";

interface StudentServicesProps {
  certificates: Certificate[];
  jobs: JobOpportunity[];
  profile: StudentProfile;
}

export default function StudentServices({ certificates, jobs, profile }: StudentServicesProps) {
  const [activeTab, setActiveTab] = useState<"certs" | "careers" | "support">("certs");
  
  // Certificate state
  const [zoomCertId, setZoomCertId] = useState<string | null>(null);

  // Career state
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitJob, setIsSubmitJob] = useState(false);

  // Support state
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Academic Advising");
  const [supportTickets, setSupportTickets] = useState<any[]>([]);

  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSupportTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketBody.trim()) return;

    const newTicket = {
      id: `t_${Date.now()}`,
      category: ticketCategory,
      subject: ticketSubject,
      date: "Just now",
      status: "pending"
    };

    setSupportTickets(prev => [newTicket, ...prev]);
    setTicketSubject("");
    setTicketBody("");
    triggerToast("IT support ticket logged successfully! Faculty will reply in 24 hours.");
  };

  const handleResumeUploadMock = () => {
    setResumeName("Alieu_Jallow_CV_Software_Engineer.pdf");
    triggerToast("CV uploaded successfully! Automatically attached to application.");
  };

  const handleApplyJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeName) {
      triggerToast("Please upload your CV before submitting.");
      return;
    }
    setIsSubmitJob(true);
    setTimeout(() => {
      setIsSubmitJob(false);
      setApplyingJobId(null);
      setResumeName(null);
      setCoverLetter("");
      triggerToast("Application submitted successfully to employer!");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {toast && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce z-50">
          <Check className="w-5 h-5 text-[#FFD700]" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* TABS SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 font-sans">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 font-display">Student Services Portal</h2>
          <p className="text-xs text-slate-400 font-display">Manage your credentials, explore career opportunities, or contact technical advisers</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
          <button
            onClick={() => setActiveTab("certs")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "certs" ? "bg-white text-[#003366] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Certificates & Badges
          </button>
          <button
            onClick={() => setActiveTab("careers")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "careers" ? "bg-white text-[#003366] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Careers & Internships
          </button>
          <button
            onClick={() => setActiveTab("support")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "support" ? "bg-white text-[#003366] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Advising & IT Support
          </button>
        </div>
      </div>

      {/* PORTALS LISTINGS */}

      {/* 1. CERTIFICATES & HONOR BADGES */}
      {activeTab === "certs" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-amber-500/5 text-amber-500 rounded-xl">
                      <Award className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">Ref ID: {cert.id}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-display leading-tight">{cert.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">Authorized by: <strong className="text-slate-600">{cert.issuedBy}</strong></p>
                    <p className="text-[10px] text-slate-400 font-semibold font-mono">Issued on: {cert.issueDate}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => setZoomCertId(cert.id)}
                    className="flex-1 py-2 bg-slate-50 hover:bg-[#003366] hover:text-white border border-slate-100 text-[#003366] text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <QrCode className="w-3.5 h-3.5" /> View Certificate
                  </button>
                  <button 
                    onClick={() => {
                      triggerToast("Downloading Certificate PDF file...");
                    }}
                    className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 border border-slate-200"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Badges Achievements Block */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Student Honors & Badges
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.achievements.map((ach, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center space-y-2 flex flex-col justify-between hover:scale-105 transition-all">
                  <Flame className="w-7 h-7 text-[#FFD700] fill-[#FFD700] mx-auto animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-700 leading-snug font-display line-clamp-2">{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. CAREER SERVICES & JOBS DIRECTORY */}
      {activeTab === "careers" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-md font-mono">
                        {job.type.toUpperCase()}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 font-display">{job.title}</h4>
                      <p className="text-xs font-semibold text-[#003366]">{job.company}</p>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {job.salary}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">{job.description}</p>
                  
                  <div className="space-y-1 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Key Qualifications</span>
                    <ul className="text-[10px] text-slate-500 space-y-1">
                      {job.requirements.slice(0, 2).map((r, i) => (
                        <li key={i} className="flex items-center gap-1.5 font-semibold">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-50 text-[10px] text-slate-400 font-semibold flex-wrap gap-2">
                  <span>Deadline: <strong className="text-slate-600">{job.deadline}</strong></span>
                  <button 
                    onClick={() => setApplyingJobId(job.id)}
                    className="px-3.5 py-1.5 bg-[#003366] hover:bg-[#002244] text-white text-[10px] font-bold rounded-lg transition-all cursor-pointer shadow-sm"
                  >
                    Apply Now
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ADVISING & IT SUPPORT TICKET PANEL */}
      {activeTab === "support" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left pane: Contact form (7 spans) */}
          <form onSubmit={handleSupportTicketSubmit} className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">
              Submit Help Ticket / Advising Request
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Inquiry Classification</label>
                  <select 
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white"
                  >
                    <option>Academic Advising</option>
                    <option>IT & Database Support</option>
                    <option>Tuition & Bursary issues</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase block">Subject</label>
                <input 
                  type="text"
                  placeholder="e.g. Need course outline for Monolithic architectures"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase block">Elaboration</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your inquiry or issue in detail. Our counselors or sitc technicians will get back to you..."
                  required
                  value={ticketBody}
                  onChange={(e) => setTicketBody(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="px-5 py-2.5 bg-[#003366] hover:bg-[#002244] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Send className="w-4.5 h-4.5 text-[#FFD700]" /> Submit Help Ticket
            </button>
          </form>

          {/* Right pane: Ticket logs & directory contacts (5 spans) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">
              Ticket Logs
            </h3>

            {supportTickets.length > 0 ? (
              <div className="space-y-3">
                {supportTickets.map((t) => (
                  <div key={t.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[8px] bg-[#003366]/5 px-2 py-0.5 rounded text-[#003366] font-bold uppercase">{t.category}</span>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{t.subject}</h4>
                      <p className="text-[9px] text-slate-400 font-mono">Submitted: {t.date}</p>
                    </div>

                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[8px] font-extrabold rounded uppercase tracking-wider">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic py-6 text-center">No active advising tickets raised.</p>
            )}
          </div>

        </div>
      )}

      {/* FULLY ZOOMABLE DETAILED CERTIFICATE POPUP DIALOG */}
      {zoomCertId && (() => {
        const activeCert = certificates.find(c => c.id === zoomCertId);
        if (!activeCert) return null;
        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-scaleUp">
              
              {/* Modal header */}
              <div className="bg-[#003366] text-white p-4 flex justify-between items-center shrink-0">
                <span className="text-xs font-bold font-display">Credential Viewer</span>
                <button 
                  onClick={() => setZoomCertId(null)}
                  className="text-white/60 hover:text-white font-extrabold text-lg p-1"
                >
                  &times;
                </button>
              </div>

              {/* Certificate Template Layout */}
              <div className="p-8 bg-[#FAF6F0] border-8 border-double border-amber-600 text-center space-y-6 relative flex flex-col justify-between min-h-[350px]">
                
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase text-[#003366] font-display tracking-widest">University of The Gambia</h3>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-semibold">School of Information Technology & Communications</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 italic font-medium block">This is to certify that</span>
                  <h2 className="text-lg font-extrabold text-slate-800 font-display border-b border-slate-200 pb-1 inline-block px-6 font-semibold uppercase">{profile.name}</h2>
                  <p className="text-[10px] text-slate-500 max-w-sm mx-auto leading-relaxed italic">
                    has successfully satisfied all course modules, final projects, assessments, and academic specifications for the specialization course:
                  </p>
                  <p className="text-xs font-bold text-[#003366] font-display uppercase tracking-tight py-2 px-4 bg-[#003366]/5 rounded-xl border border-[#003366]/10 inline-block">{activeCert.title}</p>
                </div>

                {/* Footer signatures & QR verification */}
                <div className="grid grid-cols-2 gap-4 items-center pt-4 border-t border-slate-200">
                  <div className="text-left space-y-1">
                    <span className="text-[8px] text-slate-400 font-mono block">DATE ISSUED: {activeCert.issueDate}</span>
                    <span className="text-[9px] font-bold block">Prof. Fatou Touray</span>
                    <span className="text-[7px] text-slate-500 font-semibold block uppercase">SITC Dean Board</span>
                  </div>

                  <div className="flex justify-end items-center gap-2">
                    <div className="w-16 h-16 bg-white p-1 border rounded-lg shadow-sm">
                      <img src={activeCert.qrCodeUrl} alt="Verify QR" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[7px] text-slate-400 text-left font-mono font-bold leading-normal block">Scan QR Code<br/>to verify<br/>authenticity</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* JOB APPLICATION SUBMIT MODAL */}
      {applyingJobId && (() => {
        const job = jobs.find(j => j.id === applyingJobId);
        if (!job) return null;
        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form 
              onSubmit={handleApplyJobSubmit}
              className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-100 animate-scaleUp"
            >
              <div className="bg-[#003366] text-white p-5 flex justify-between items-center">
                <div>
                  <span className="text-[8px] tracking-widest font-bold uppercase text-amber-400">Employer Submission Portal</span>
                  <h4 className="text-xs font-bold font-display line-clamp-1">Apply to {job.company}</h4>
                </div>
                <button 
                  type="button"
                  onClick={() => setApplyingJobId(null)}
                  className="text-white/60 hover:text-white font-bold text-lg p-1"
                >
                  &times;
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 block uppercase">Role</span>
                  <p className="text-xs font-bold text-slate-800">{job.title}</p>
                </div>

                {/* CV Upload section */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 block uppercase">Attach Resume / CV</label>
                  {resumeName ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate font-mono font-bold text-emerald-800">{resumeName}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setResumeName(null)}
                        className="text-slate-400 hover:text-slate-600 text-xs font-extrabold"
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={handleResumeUploadMock}
                      className="p-5 border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl text-center cursor-pointer space-y-1.5"
                    >
                      <UploadCloud className="w-6 h-6 text-slate-400 mx-auto" />
                      <span className="text-[10px] font-bold text-slate-600 block">Click to attach UTG Student CV</span>
                    </div>
                  )}
                </div>

                {/* Cover statement */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 block uppercase">Cover Statement (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe your relevant skills and honors briefly..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t flex gap-2">
                <button 
                  type="button"
                  onClick={() => setApplyingJobId(null)}
                  className="flex-1 py-2 border border-slate-200 text-xs font-bold rounded-lg text-slate-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitJob}
                  className="flex-1 py-2 bg-[#003366] hover:bg-[#002244] text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  {isSubmitJob ? "Submitting..." : "Send Application"}
                </button>
              </div>
            </form>
          </div>
        );
      })()}

    </div>
  );
}
