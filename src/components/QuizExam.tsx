import React, { useState, useEffect } from "react";
import { 
  Clock, 
  Flag, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  CornerDownRight, 
  GraduationCap 
} from "lucide-react";
import { Quiz, Question } from "../types";

interface QuizExamProps {
  quiz: Quiz;
  onSubmitResults: (quizId: string, scorePercentage: number) => void;
  onClose: () => void;
}

export default function QuizExam({ quiz, onSubmitResults, onClose }: QuizExamProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([...quiz.questions]);
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);

  // Timer countdown hook
  useEffect(() => {
    if (isSubmitted) return;
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (option: string) => {
    const updated = [...questions];
    updated[currentIdx].chosenAnswer = option;
    setQuestions(updated);
  };

  const handleShortAnswerChange = (val: string) => {
    const updated = [...questions];
    updated[currentIdx].chosenAnswer = val;
    setQuestions(updated);
  };

  const toggleFlag = () => {
    const updated = [...questions];
    updated[currentIdx].flagged = !updated[currentIdx].flagged;
    setQuestions(updated);
  };

  const handleAutoSubmit = () => {
    calculateResults();
  };

  const calculateResults = () => {
    setShowSubmitModal(false);
    let correctCount = 0;
    const feedback = questions.map((q) => {
      const isCorrect = (q.chosenAnswer || "").trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      if (isCorrect) correctCount++;
      return {
        id: q.id,
        text: q.text,
        chosen: q.chosenAnswer || "Unanswered",
        correct: q.correctAnswer,
        isCorrect
      };
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    setScore(percent);
    setFeedbackList(feedback);
    setIsSubmitted(true);
    onSubmitResults(quiz.id, percent);
  };

  const answeredCount = questions.filter(q => q.chosenAnswer).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative z-40">
      
      {/* 1. QUIZ BAR HEADER */}
      <div className="bg-[#003366] text-white py-4 px-6 md:px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/10 rounded-lg">
            <GraduationCap className="w-5 h-5 text-[#FFD700]" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">{quiz.courseCode} Assessment</h2>
            <h1 className="text-sm md:text-md font-bold font-display line-clamp-1">{quiz.title}</h1>
          </div>
        </div>

        {!isSubmitted && (
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10 shrink-0">
            <Clock className={`w-4 h-4 ${timeLeft < 120 ? 'text-rose-400 animate-pulse' : 'text-slate-300'}`} />
            <span className={`text-sm font-mono font-bold ${timeLeft < 120 ? 'text-rose-400' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {/* 2. DUAL LAYOUT PANEL */}
      {!isSubmitted ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
          
          {/* Left panel: Active Question Workspace (8 spans) */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Question indicator & flag */}
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <span className="text-xs font-bold text-[#003366] uppercase tracking-wider">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                
                <button 
                  onClick={toggleFlag}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${questions[currentIdx].flagged ? 'bg-amber-100 text-amber-800' : 'hover:bg-slate-50 text-slate-500'}`}
                >
                  <Flag className={`w-4 h-4 ${questions[currentIdx].flagged ? 'fill-amber-600 text-amber-600' : ''}`} />
                  {questions[currentIdx].flagged ? "Flagged for Review" : "Flag for Review"}
                </button>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h3 className="text-sm md:text-md font-bold text-slate-800 leading-relaxed font-display">
                  {questions[currentIdx].text}
                </h3>

                {/* Multiple Choice Answers */}
                {questions[currentIdx].type === "mcq" && questions[currentIdx].options && (
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {questions[currentIdx].options?.map((opt, i) => {
                      const isSelected = questions[currentIdx].chosenAnswer === opt;
                      return (
                        <div 
                          key={i}
                          onClick={() => handleOptionSelect(opt)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'border-[#003366] bg-[#003366]/5 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'}`}
                        >
                          <span className="text-xs font-semibold text-slate-700">{opt}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#003366] bg-[#003366]' : 'border-slate-300'}`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* True/False Answers */}
                {questions[currentIdx].type === "true_false" && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {["True", "False"].map((opt, i) => {
                      const isSelected = questions[currentIdx].chosenAnswer === opt;
                      return (
                        <div 
                          key={i}
                          onClick={() => handleOptionSelect(opt)}
                          className={`p-5 rounded-xl border cursor-pointer text-center transition-all ${isSelected ? 'border-[#003366] bg-[#003366]/5 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'}`}
                        >
                          <span className="text-sm font-bold text-slate-700 block">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Short Answer */}
                {questions[currentIdx].type === "short_answer" && (
                  <div className="pt-2">
                    <input 
                      type="text"
                      placeholder="Type your brief answer here..."
                      value={questions[currentIdx].chosenAnswer || ""}
                      onChange={(e) => handleShortAnswerChange(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#003366] focus:bg-white rounded-xl text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Nav Bar */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-12 flex-wrap gap-3">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>

          {/* Right panel: Sidebar navigation map (4 spans) */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">
              Question Map
            </h3>

            <div className="grid grid-cols-4 gap-2.5">
              {questions.map((q, idx) => {
                const isCurrent = currentIdx === idx;
                const isAnswered = q.chosenAnswer;
                const isFlagged = q.flagged;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-11 rounded-xl font-bold font-mono text-xs border transition-all flex flex-col items-center justify-center relative cursor-pointer ${isCurrent ? 'border-[#003366] bg-[#003366]/5 text-[#003366]' : isAnswered ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#003366]/10 border border-[#003366]"></div> Active Question</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-100 border border-slate-200"></div> Answered Question</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-50 border border-slate-100"></div> Unanswered Question</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Flagged for Review</div>
            </div>

            <button 
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-3 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer mt-4"
            >
              Submit Quiz ({answeredCount}/{questions.length} Answered)
            </button>
          </div>

        </div>
      ) : (
        // 3. SCORE REPORT SCREEN AFTER SUBMISSION
        <div className="flex-grow max-w-3xl w-full mx-auto p-4 md:p-8 space-y-6 animate-scaleUp">
          
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 text-center space-y-5">
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${score >= 70 ? 'bg-emerald-100 text-emerald-500' : 'bg-amber-100 text-amber-500'}`}>
              {score >= 70 ? <CheckCircle2 className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">Score Report Dispatched</span>
              <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800">
                {score >= 70 ? "Excellent Job, Alieu!" : "Keep Practicing!"}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Your performance score card has been compiled inside the gradebook database. Review individual answer breakdowns below.
              </p>
            </div>

            {/* Score Ring Display */}
            <div className="relative inline-flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 min-w-[140px]">
              <span className="text-3xl font-extrabold font-display text-[#003366]">{score}%</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold mt-1">Passing requirement: 70%</span>
            </div>

            <div className="flex gap-3 justify-center max-w-xs mx-auto">
              <button 
                onClick={onClose}
                className="w-full py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Return to Course Room
              </button>
            </div>
          </div>

          {/* Detailed Question Review Matrix */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">
              Question Review
            </h3>

            <div className="space-y-4 divide-y divide-slate-50">
              {feedbackList.map((item, idx) => (
                <div key={item.id} className={`pt-4 ${idx === 0 ? 'pt-0' : ''} space-y-3`}>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-800 leading-relaxed pr-6 font-display">
                      {idx + 1}. {item.text}
                    </h4>
                    {item.isCorrect ? (
                      <span className="p-1 bg-emerald-100 text-emerald-700 rounded-full shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="p-1 bg-rose-100 text-rose-700 rounded-full shrink-0">
                        <XCircle className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 flex items-center gap-2">
                      <CornerDownRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[10px] text-slate-500">Your choice: <strong className="text-slate-800">{item.chosen}</strong></span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#003366]/5 flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-[10px] text-slate-500">Correct: <strong className="text-emerald-700">{item.correct}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* CONFIRMATION SUBMIT DIALOG MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-500 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold font-display text-slate-800">Submit Assessment?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                You have solved <strong className="text-slate-700">{answeredCount} of {questions.length}</strong> questions. Are you ready to submit and finalize your grade?
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2 border border-slate-200 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                No, Keep Editing
              </button>
              <button 
                onClick={calculateResults}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
