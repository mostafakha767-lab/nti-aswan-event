import React, { useState } from 'react';
import { 
  Globe, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Phone, 
  GraduationCap, 
  IdCard, 
  Settings, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  PartyPopper,
  ShieldCheck,
  Ticket,
  ArrowRight
} from 'lucide-react';

const Facebook = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Linkedin = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function App() {
  // Google Apps Script Web App URL
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbwRdAURH4JNODL0x9KbwrAuau6N4jrf3Koeo_aWqnPw4DOpgseC0ECf-ABKZOmYP0iSgw/exec';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    faculty: '',
    national_id: ''
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال الاسم بالكامل';
    } else if (formData.name.trim().split(' ').length < 3) {
      newErrors.name = 'يرجى إدخال الاسم ثلاثي على الأقل';
    }

    // Phone Validation (Egyptian numbers)
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!formData.phone) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'يرجى إدخال رقم مصري صحيح (11 رقم يبدأ بـ 01)';
    }

    // Faculty Validation
    if (!formData.faculty.trim()) {
      newErrors.faculty = 'يرجى إدخال الكلية أو التخصص';
    }

    // National ID Validation (14 digits)
    const nidRegex = /^[0-9]{14}$/;
    if (!formData.national_id) {
      newErrors.national_id = 'يرجى إدخال الرقم القومي';
    } else if (!nidRegex.test(formData.national_id.trim())) {
      newErrors.national_id = 'الرقم القومي يجب أن يتكون من 14 رقم بالضبط';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!validate()) return;



    setLoading(true);

    try {
      const formToSubmit = new FormData();
      Object.keys(formData).forEach(key => formToSubmit.append(key, formData[key]));

      // Sending POST request to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: formToSubmit
      });

      const result = await response.json();

      if (result.status === 'exists') {
        setStatus({ type: 'exists' });
      } else if (result.status === 'success') {
        setStatus({ type: 'success' });
        setErrors({});
      } else {
        throw new Error(result.message || 'Unknown error');
      }

    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: 'حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة مرة أخرى.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on edit
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  if (status.type === 'exists') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans dir-ltr" dir="ltr">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="z-10 w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-orange-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 mb-6 rotate-3 hover:rotate-6 transition-transform">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-fuchsia-400 mb-4">
              You're Already on the List!
            </h1>
            
            <p className="text-slate-300 mb-8 leading-relaxed">
              We found your registration. There's no need to sign up twice—you're good to go!
            </p>

            <button 
              onClick={() => setStatus({ type: null, message: '' })}
              className="w-full py-3.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-white font-medium transition-all group-hover:border-white/20"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status.type === 'success') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans dir-ltr" dir="ltr">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="z-10 w-full max-w-sm mt-[-5vh] animate-[slideUp_0.5s_ease-out]">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-4">
              <PartyPopper className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">You're In!</h1>
            <p className="text-slate-400">Save this pass for the event day.</p>
          </div>

          {/* Event Ticket */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl mb-8">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex justify-between items-start">
              <div>
                <span className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-1 block">VIP Access</span>
                <h2 className="text-white font-bold text-lg">NTI Orientation</h2>
              </div>
              <Ticket className="w-8 h-8 text-white/50" />
            </div>

            {/* Ticket Body */}
            <div className="p-6 bg-white/5 space-y-5">
              <div>
                <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Attendee</span>
                <div className="text-white font-medium text-lg truncate">{formData.name}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Phone</span>
                  <div className="text-white font-medium">{formData.phone}</div>
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Faculty</span>
                  <div className="text-white font-medium truncate">{formData.faculty}</div>
                </div>
              </div>
            </div>

            {/* Ticket Footer / Barcode */}
            <div className="bg-black/20 p-6 flex justify-center border-t border-dashed border-white/20 relative">
              {/* Cutout circles for ticket effect */}
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-slate-950 rounded-full border-r border-b border-white/20"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-slate-950 rounded-full border-l border-b border-white/20"></div>
              
              {/* Fake Barcode */}
              <div className="h-12 w-full flex items-center justify-between opacity-50 px-2">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className={`bg-white rounded-full ${i % 3 === 0 ? 'w-2 h-full' : i % 2 === 0 ? 'w-1 h-8' : 'w-0.5 h-10'}`}></div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              setStatus({ type: null, message: '' });
              setFormData({ name: '', phone: '', faculty: '', national_id: '' });
            }}
            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-white font-medium transition-colors"
          >
            Register Another Person
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 dir-rtl font-sans antialiased selection:bg-cyan-500 selection:text-white pb-12" dir="rtl">
      {/* Background Decorative Blur Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-8">
        
        {/* Header Branding */}
        {}
        <header className="text-center mb-8">
          <img src="/logo.png" alt="NTI Aswan Logo" className="h-20 md:h-24 mx-auto mb-4 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            NTI Aswan Event Registration
          </h1>
          <p className="mt-2 text-slate-400 text-sm md:text-base">
            سجل بياناتك لحضور فعاليات الكورس / الإيفنت واستلام الشهادة
          </p>
        </header>

        {/* Main Form Card */}
        {}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/70 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Header Bar */}
          <div className="border-b border-slate-700/60 pb-5 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">استمارة التسجيل</h2>
              <p className="text-xs text-slate-400 mt-1">يرجى ملء الحقول التالية بدقة كما هي في الأوراق الرسمية</p>
            </div>
            <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400">
              <User className="w-5 h-5" />
            </div>
          </div>

          {/* Status Message Notification */}
          {status.type === 'error' && status.message && (
            <div className="mb-6 p-4 rounded-2xl border flex items-start gap-3 transition-all bg-rose-950/40 border-rose-500/50 text-rose-300">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-sm font-medium">{status.message}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field: Full Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                الاسم بالكامل <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="مثال: أحمد محمد علي محمود"
                  className={`w-full bg-slate-900/80 border ${errors.name ? 'border-rose-500' : 'border-slate-700'} rounded-xl py-3 px-4 pr-11 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                />
                <User className="w-5 h-5 text-slate-500 absolute right-3.5 top-3" />
              </div>
              {errors.name && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.name}</p>}
            </div>

            {/* Field: Phone Number */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                رقم الهاتف / الواتساب <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01xxxxxxxxx"
                  dir="ltr"
                  className={`w-full bg-slate-900/80 border ${errors.phone ? 'border-rose-500' : 'border-slate-700'} rounded-xl py-3 px-4 pr-11 text-sm text-right text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                />
                <Phone className="w-5 h-5 text-slate-500 absolute right-3.5 top-3" />
              </div>
              {errors.phone && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.phone}</p>}
            </div>

            {/* Field: Faculty / University */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                الكلية / الجامعة / القسم <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  placeholder="مثال: حاسبات ومعلومات - جامعة أسوان"
                  className={`w-full bg-slate-900/80 border ${errors.faculty ? 'border-rose-500' : 'border-slate-700'} rounded-xl py-3 px-4 pr-11 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                />
                <GraduationCap className="w-5 h-5 text-slate-500 absolute right-3.5 top-3" />
              </div>
              {errors.faculty && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.faculty}</p>}
            </div>

            {/* Field: National ID */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                الرقم القومي (14 رقم) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="national_id"
                  value={formData.national_id}
                  onChange={handleChange}
                  placeholder="أدخل الـ 14 رقم كاملة"
                  maxLength={14}
                  dir="ltr"
                  className={`w-full bg-slate-900/80 border ${errors.national_id ? 'border-rose-500' : 'border-slate-700'} rounded-xl py-3 px-4 pr-11 text-sm text-right text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                />
                <IdCard className="w-5 h-5 text-slate-500 absolute right-3.5 top-3" />
              </div>
              {errors.national_id && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.national_id}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جاري إرسال البيانات...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>تأكيد وتسجيل البيانات</span>
                </>
              )}
            </button>
          </form>
        </div>



        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NTI Aswan - المعهد القومي للاتصالات. جميع الحقوق محفوظة.</p>
        </footer>

      </div>
    </div>
  );
}
