import React, { useState } from "react";
import { LogIn, UserPlus, Shield, KeyRound, Key, GraduationCap, CheckCircle2 } from "lucide-react";

interface AuthPagesProps {
  onLoginSuccess: () => void;
}

export default function AuthPages({ onLoginSuccess }: AuthPagesProps) {
  const [mode, setMode] = useState<"welcome" | "login" | "register" | "forgot" | "otp">("welcome");
  const [matricNo, setMatricNo] = useState("22018294");
  const [password, setPassword] = useState("password");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricNo) {
      triggerToast("Please enter your Matriculation Number");
      return;
    }
    if (!password) {
      triggerToast("Please enter your password");
      return;
    }
    // Redirect to OTP for security simulation
    setMode("otp");
    triggerToast("OTP verification code sent to alieu.jallow@utg.edu.gm");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length < 4) {
      triggerToast("Please enter the complete 4-digit code");
      return;
    }
    // Success!
    triggerToast("Authentication verified successfully!");
    setTimeout(() => {
      onLoginSuccess();
    }, 800);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Registration initiated. Under faculty approval process.");
    setTimeout(() => setMode("login"), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl -translate-x-12 -translate-y-12"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl translate-x-12 translate-y-12"></div>

      {toast && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce z-50">
          <div className="w-2 h-2 rounded-full bg-[#FFD700] pulse-glow"></div>
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative z-10 transition-all duration-300">
        
        {/* Academic Header Banner */}
        <div className="bg-[#003366] text-white p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-xl shadow-md">
              <GraduationCap className="w-8 h-8 text-[#003366]" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-[#FFD700] tracking-widest font-display uppercase">University of The Gambia</h2>
              <p className="text-lg font-extrabold tracking-tight font-display">Student LMS Portal</p>
            </div>
          </div>
        </div>

        {/* WELCOME PAGE */}
        {mode === "welcome" && (
          <div className="p-8 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-slate-800 font-display">Welcome, Student</h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Access your virtual classroom, course materials, assignments, academic progress records, and pay school levies from a centralized dashboard.
              </p>
            </div>

            <div className="space-y-3">
              <button
                id="btn-login-gate"
                onClick={() => setMode("login")}
                className="w-full py-3 px-4 bg-[#003366] hover:bg-[#002244] text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#FFD700]" /> Sign In with Matric No.
              </button>

              <button
                id="btn-sso-gate"
                onClick={() => {
                  triggerToast("SSO Server Connection established. Authenticating via UTG G-Suite...");
                  setTimeout(() => onLoginSuccess(), 1200);
                }}
                className="w-full py-3 px-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <img src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=50&auto=format&fit=crop" alt="Google" className="w-4 h-4 object-contain rounded-full" referrerPolicy="no-referrer" />
                Sign In with UTG Student Gmail
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-400 uppercase tracking-widest">New Student?</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <button
              id="btn-register-gate"
              onClick={() => setMode("register")}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> Create Student Account
            </button>

            <div className="text-center">
              <p className="text-xs text-slate-400">
                Official platform of UTG School of Information Technology & Communications (SITC).
              </p>
            </div>
          </div>
        )}

        {/* LOGIN SCREEN */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-800 font-display">Student Log In</h2>
              <p className="text-xs text-slate-500">Provide your official academic login credentials</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">Matriculation Number</label>
                <input
                  id="input-matric"
                  type="text"
                  value={matricNo}
                  onChange={(e) => setMatricNo(e.target.value)}
                  placeholder="e.g. 22018294"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-600 block">Password</label>
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-xs text-[#003366] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  id="input-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" defaultChecked className="rounded text-[#003366] focus:ring-[#003366]" />
              <label htmlFor="remember" className="text-xs text-slate-500 select-none">Remember my session on this browser</label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMode("welcome")}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                id="btn-login-submit"
                type="submit"
                className="flex-1 py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-sm font-medium rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Continue
              </button>
            </div>
          </form>
        )}

        {/* REGISTER SCREEN */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="p-8 space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-800 font-display">Create Account</h2>
              <p className="text-xs text-slate-500 font-display">Enroll inside the official UTG database</p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alieu Jallow"
                  required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">UTG Student Email</label>
                <input
                  type="email"
                  placeholder="e.g. alieu.jallow@utg.edu.gm"
                  required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">Department</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none">
                    <option>SITC (IT & CS)</option>
                    <option>School of Business</option>
                    <option>School of Medicine</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">Level</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none">
                    <option>Level 100</option>
                    <option>Level 200</option>
                    <option>Level 300</option>
                    <option>Level 400</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Password</label>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMode("welcome")}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-sm font-medium rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD */}
        {mode === "forgot" && (
          <div className="p-8 space-y-5">
            <div className="space-y-1 text-center">
              <div className="inline-flex p-3 bg-[#003366]/10 text-[#003366] rounded-full mx-auto mb-2">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 font-display">Reset Password</h2>
              <p className="text-xs text-slate-500">Provide your verified academic student email to request a reset link</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-600 block">Academic Student Email</label>
              <input
                type="email"
                placeholder="alieu.jallow@utg.edu.gm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none"
              />
            </div>

            <button
              onClick={() => {
                triggerToast("Password reset link dispatched!");
                setMode("login");
              }}
              className="w-full py-2.5 bg-[#003366] text-white text-sm font-semibold rounded-xl"
            >
              Send Reset Code
            </button>

            <button
              onClick={() => setMode("login")}
              className="w-full text-center text-xs text-slate-500 hover:underline block"
            >
              Return to Login
            </button>
          </div>
        )}

        {/* OTP / TWO-FACTOR SIMULATION */}
        {mode === "otp" && (
          <form onSubmit={handleOtpSubmit} className="p-8 space-y-6">
            <div className="space-y-1 text-center">
              <div className="inline-flex p-3 bg-yellow-50 text-amber-500 rounded-full mx-auto mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 font-display">2-Factor Authentication</h2>
              <p className="text-xs text-slate-500 px-4">
                We've dispatched a secure verification OTP code to <strong className="text-slate-700">alieu.jallow@utg.edu.gm</strong>. Enter it below:
              </p>
            </div>

            <div className="flex justify-center gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-bold bg-slate-50 border-2 border-slate-200 focus:border-[#003366] text-slate-800 rounded-xl focus:outline-none transition-all"
                />
              ))}
            </div>

            <div className="text-center">
              <span className="text-xs text-slate-400">Didn't receive code? </span>
              <button
                type="button"
                onClick={() => {
                  triggerToast("New OTP Code generated!");
                  setOtp(["", "", "", ""]);
                }}
                className="text-xs font-semibold text-[#003366] hover:underline cursor-pointer"
              >
                Resend Code
              </button>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMode("login")}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn-otp-verify"
                type="submit"
                className="flex-1 py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-sm font-medium rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FFD700]" /> Verify & Login
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
