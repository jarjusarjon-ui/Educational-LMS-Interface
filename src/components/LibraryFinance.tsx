import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Download, 
  Copy, 
  Bookmark, 
  CreditCard, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Printer, 
  Check, 
  Sparkles,
  HelpCircle,
  Clock
} from "lucide-react";
import { LibraryBook, TuitionInvoice } from "../types";

interface LibraryFinanceProps {
  libraryBooks: LibraryBook[];
  invoices: TuitionInvoice[];
  onPayInvoice: (invoiceId: string) => void;
}

export default function LibraryFinance({ libraryBooks, invoices, onPayInvoice }: LibraryFinanceProps) {
  const [activeTab, setActiveTab] = useState<"library" | "finance">("library");
  
  // Library State
  const [searchBook, setSearchBook] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [readingList, setReadingList] = useState<string[]>([]);
  
  // Finance State
  const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("5024 1192 8491 0023");
  const [cardHolder, setCardHolder] = useState("ALIEU JALLOW");
  const [expiry, setExpiry] = useState("09/29");
  const [cvv, setCvv] = useState("***");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [receiptToShow, setReceiptToShow] = useState<TuitionInvoice | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation);
    triggerToast("Citation copied to clipboard! (Harvard standard)");
  };

  const toggleBookmarkBook = (bookId: string) => {
    if (readingList.includes(bookId)) {
      setReadingList(prev => prev.filter(id => id !== bookId));
      triggerToast("Removed book from saved reading list.");
    } else {
      setReadingList(prev => [...prev, bookId]);
      triggerToast("Book saved to your reading list!");
    }
  };

  const handleOnlinePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingInvoiceId) return;

    setIsProcessingPayment(true);
    triggerToast("Connecting secure UTG payment gateway portal...");

    setTimeout(() => {
      onPayInvoice(payingInvoiceId);
      setIsProcessingPayment(false);
      
      const updatedInv = invoices.find(i => i.id === payingInvoiceId);
      if (updatedInv) {
        // Mock updated paid parameters for immediate receipt rendering
        const receiptCopy: TuitionInvoice = {
          ...updatedInv,
          status: "paid",
          datePaid: "Just now",
          receiptNumber: `UTG-REC-${Math.floor(10000 + Math.random() * 90000)}`
        };
        setReceiptToShow(receiptCopy);
      }
      
      setPayingInvoiceId(null);
      triggerToast("Tuition Payment Authorized successfully!");
    }, 2000);
  };

  // Categories of library books
  const categories = ["all", "Software Engineering", "Artificial Intelligence", "Computer Science"];

  const filteredBooks = libraryBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchBook.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchBook.toLowerCase());
    const matchesCat = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {toast && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce z-50">
          <Check className="w-5 h-5 text-[#FFD700]" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* HEADER SECTION NAV */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 font-display">Academic Library & Tuition billing</h2>
          <p className="text-xs text-slate-400 font-display">Borrow supplemental textbooks or manage your university invoices</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
          <button
            onClick={() => setActiveTab("library")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "library" ? "bg-white text-[#003366] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Digital Library
          </button>
          <button
            onClick={() => setActiveTab("finance")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "finance" ? "bg-white text-[#003366] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Finance & Tuition
          </button>
        </div>
      </div>

      {/* TAB CONTAINER CHANNELS */}
      
      {/* 1. DIGITAL LIBRARY GATEWAY */}
      {activeTab === "library" && (
        <div className="space-y-6">
          {/* Library Search Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
                placeholder="Search literature by textbook title, author keyword, or topic context..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 focus:outline-none cursor-pointer"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat === "all" ? "All Subjects" : cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Book Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBooks.map((book) => {
              const isSaved = readingList.includes(book.id);
              return (
                <div key={book.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-all">
                  
                  {/* Book Mock Cover */}
                  <div className="w-24 h-32 bg-slate-100 rounded-lg overflow-hidden shrink-0 shadow-sm border border-slate-200 flex flex-col justify-between p-2 relative">
                    <span className="text-[7px] text-slate-400 block uppercase font-bold tracking-widest">{book.category}</span>
                    <BookOpen className="w-8 h-8 text-[#003366] mx-auto opacity-30 my-auto" />
                    <span className="text-[7px] text-slate-500 font-semibold block text-center line-clamp-2 leading-snug">{book.title}</span>
                  </div>

                  {/* Book details description */}
                  <div className="flex-grow flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[8px] bg-[#003366]/5 px-2 py-0.5 rounded text-[#003366] font-bold uppercase tracking-wider">{book.category}</span>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{book.title}</h4>
                      <p className="text-[10px] text-slate-400">Author: <strong className="text-slate-600">{book.author}</strong> ({book.year})</p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button 
                        onClick={() => {
                          triggerToast(`Downloading ${book.title} (${book.fileSize})...`);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-[#003366] hover:text-white rounded-lg text-[10px] font-bold text-[#003366] flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                      >
                        <Download className="w-3 h-3" /> Get PDF ({book.fileSize})
                      </button>

                      <button 
                        onClick={() => handleCopyCitation(book.citation)}
                        className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500"
                        title="Copy Harvard Citation"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button 
                        onClick={() => toggleBookmarkBook(book.id)}
                        className={`p-1.5 rounded-lg border transition-all ${isSaved ? 'bg-amber-100 border-amber-200 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                        title="Save to Reading List"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. TUITION FEES & ONLINE BILL PAYMENTS */}
      {activeTab === "finance" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel: Active invoice bills roster (7 spans) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">
              Semester Invoice Statements
            </h3>

            <div className="space-y-4">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-4 border border-slate-100 rounded-xl hover:shadow-sm transition-all flex flex-col justify-between md:flex-row md:items-center gap-4 bg-slate-50/50">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[8px] font-bold rounded uppercase ${inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800 animate-pulse'}`}>
                        {inv.status.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Invoice Ref: {inv.id}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 font-display">{inv.title}</h4>
                    <p className="text-[10px] text-slate-400">Due date: {inv.dueDate}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0 border-t border-slate-100 pt-3 md:border-t-0 md:pt-0">
                    <span className="text-sm font-extrabold text-slate-800 font-display font-mono">D{inv.amount.toLocaleString()}</span>
                    
                    {inv.status === "unpaid" ? (
                      <button 
                        onClick={() => setPayingInvoiceId(inv.id)}
                        className="px-3.5 py-1.5 bg-[#003366] hover:bg-[#002244] text-white text-[10px] font-bold rounded-lg transition-all shadow-xs cursor-pointer"
                      >
                        Authorize Online Payment
                      </button>
                    ) : (
                      <button 
                        onClick={() => setReceiptToShow(inv)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3 h-3" /> View Receipt
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: Financial aid info (5 spans) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500" /> Scholarships & Aid
            </h3>

            <div className="p-4 bg-[#003366]/5 border border-[#003366]/10 rounded-xl space-y-1.5">
              <h4 className="text-xs font-bold text-[#003366] font-display">Gambia National Merit Scholarship</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Congratulations, Alieu Jallow! Based on your Level 300 academic performance of 3.74 CGPA, your FST laboratory levies have been automatically covered by the Ministry of Higher Education scholarship scheme.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Total Scholarships Secured</span>
                <strong className="text-slate-800 font-mono text-sm">D3,500 Granted</strong>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </div>
          </div>

        </div>
      )}

      {/* ONLINE PAYMENT CREDIT CARD MODAL FORM */}
      {payingInvoiceId && (() => {
        const invToPay = invoices.find(i => i.id === payingInvoiceId);
        if (!invToPay) return null;
        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form 
              onSubmit={handleOnlinePaymentSubmit}
              className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-100 animate-scaleUp"
            >
              {/* Modal header */}
              <div className="bg-[#003366] text-white p-5 flex justify-between items-center">
                <div>
                  <span className="text-[8px] tracking-widest font-bold uppercase text-amber-400">UTG Payment Gateway</span>
                  <h4 className="text-xs font-bold font-display line-clamp-1">{invToPay.title}</h4>
                </div>
                <button 
                  type="button"
                  onClick={() => setPayingInvoiceId(null)}
                  className="text-white/60 hover:text-white font-bold text-lg p-1"
                >
                  &times;
                </button>
              </div>

              {/* Payment details content */}
              <div className="p-6 space-y-4">
                
                {/* Cost Highlight */}
                <div className="text-center py-4 bg-slate-50 rounded-xl border">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Fee Authorization Value</span>
                  <p className="text-2xl font-extrabold text-[#003366] font-mono mt-0.5">D{invToPay.amount.toLocaleString()}</p>
                </div>

                {/* Simulated credit card form */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 block uppercase">Visa / MasterCard Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs font-mono font-bold focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Expiry Date</label>
                      <input 
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border rounded-xl text-xs font-mono font-bold focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">CVV Security Code</label>
                      <input 
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl text-xs font-mono font-bold focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 block uppercase">Cardholder Name</label>
                    <input 
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs font-bold uppercase focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2 pt-1 text-[10px] text-slate-500">
                  <input type="checkbox" id="auth-consent" required defaultChecked className="mt-0.5 rounded text-[#003366]" />
                  <label htmlFor="auth-consent" className="leading-snug select-none">
                    I authorize University of The Gambia to secure the listed amount from my local debit card for school levies.
                  </label>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="p-4 bg-slate-50 border-t flex gap-2">
                <button 
                  type="button"
                  onClick={() => setPayingInvoiceId(null)}
                  className="flex-1 py-2 border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isProcessingPayment}
                  className="flex-1 py-2 bg-[#003366] hover:bg-[#002244] text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1"
                >
                  {isProcessingPayment ? "Processing..." : `Confirm D${invToPay.amount.toLocaleString()}`}
                </button>
              </div>

            </form>
          </div>
        );
      })()}

      {/* PRINTABLE RECEIPT POPUP DIALOG */}
      {receiptToShow && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-100 animate-scaleUp">
            
            <div className="p-6 space-y-6 text-slate-800 font-mono text-xs">
              
              {/* Receipt Header logo */}
              <div className="text-center space-y-1 pb-4 border-b border-dashed">
                <h3 className="text-sm font-bold uppercase font-display text-[#003366] tracking-wider">University of The Gambia</h3>
                <span className="text-[10px] text-slate-400 block font-semibold">Official Payment receipt</span>
                <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded font-bold text-[#003366] inline-block">{receiptToShow.receiptNumber || "UTG-REC-90184"}</span>
              </div>

              {/* Bill Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Name:</span>
                  <span className="font-bold">ALIEU JALLOW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Student ID:</span>
                  <span className="font-bold">22018294</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Term item:</span>
                  <span className="font-bold text-right pl-4 line-clamp-1">{receiptToShow.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date Paid:</span>
                  <span className="font-bold">{receiptToShow.datePaid || "July 01, 2026"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Gateway:</span>
                  <span className="font-bold">Unified Card (G-Portal)</span>
                </div>
              </div>

              {/* Total amount paid */}
              <div className="py-4 border-t border-b border-dashed flex justify-between items-center text-sm font-bold">
                <span className="text-[#003366] uppercase tracking-wider">Authorized Total:</span>
                <span className="text-lg font-extrabold text-[#003366]">D{receiptToShow.amount.toLocaleString()}</span>
              </div>

              {/* Footer authorization details */}
              <div className="text-center space-y-1 text-[9px] text-slate-400">
                <p>Status: APPROVED | AUTH NO: UTG-SEC-8910</p>
                <p>This is a computer generated document. Signed by SITC Bursar.</p>
              </div>

              {/* Modal buttons */}
              <div className="flex gap-2 pt-4 border-t border-dashed">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-center flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button 
                  onClick={() => setReceiptToShow(null)}
                  className="flex-1 py-2 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-lg text-center cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
