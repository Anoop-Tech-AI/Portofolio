import { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  AlertCircle, 
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { fadeUp, slideLeft, VIEW } from '../hooks/useAnimations';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [statusNotification, setStatusNotification] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errs.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Direct mailto generation with encoded parameters
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    // Open user's email client
    window.location.href = mailtoUrl;

    // Honest status notification without pretending background delivery happened
    setStatusNotification({
      type: 'info',
      title: 'Email Client Opened & Draft Prepared',
      description: 'Your validated message has been loaded into your default email client. (Direct backend forwarding can be activated via Formspree or EmailJS).'
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-14 border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-1">
              06 // INITIATE COLLABORATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Have an interesting idea? Let's build something.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
            Open for software engineering internships, technical collaborations, and intelligent system discussions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details & Socials */}
          <motion.div 
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEW}
            custom={0.1}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] shadow-sm dark:shadow-xl space-y-6">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight font-mono uppercase">
                Contact Coordinates
              </h3>
              
              <div className="space-y-4">
                {/* Email Item with copy */}
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#0e1015] border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                      <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      Email Address
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopyEmail}
                      className="inline-flex items-center space-x-1 text-[11px] font-mono text-zinc-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-zinc-900 dark:text-zinc-200 break-all font-medium">
                    {personalInfo.email}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono block mt-1">
                    (Configurable placeholder email)
                  </span>
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#0e1015] border border-black/[0.06] dark:border-white/[0.06]">
                  <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Location
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                    {personalInfo.location}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono block mt-0.5">
                    KMIT Campus • Hyderabad
                  </span>
                </div>
              </div>

              {/* Profiles */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3 font-semibold">
                  Developer Networks
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    whileHover={{ scale: 1.02, borderColor: 'rgba(217,119,6,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-zinc-50 dark:bg-[#0e1015] border border-black/[0.06] dark:border-white/[0.06] transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <GithubIcon className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                      <span className="text-xs font-mono text-zinc-800 dark:text-zinc-200">GitHub</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02, borderColor: 'rgba(56,189,248,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-zinc-50 dark:bg-[#0e1015] border border-black/[0.06] dark:border-white/[0.06] transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <LinkedinIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span className="text-xs font-mono text-zinc-800 dark:text-zinc-200">LinkedIn</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                  </motion.a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Contact Form with Validation */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEW}
            custom={0.2}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] shadow-sm dark:shadow-xl relative">
              
              <div className="mb-6">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight font-mono uppercase">
                  Transmit Message
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono mt-0.5">
                  Client-side validated message dispatch.
                </p>
              </div>

              {statusNotification && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mb-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs flex items-start space-x-3"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-amber-800 dark:text-amber-300 font-mono">{statusNotification.title}</h5>
                    <p className="text-zinc-700 dark:text-zinc-300 mt-0.5 leading-relaxed">{statusNotification.description}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">
                      Your Name <span className="text-amber-600 dark:text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      placeholder="e.g. Linus Torvalds"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-[#0e1015] border text-xs font-mono text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-black/[0.1] dark:border-white/[0.08] focus:border-amber-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">
                      Your Email <span className="text-amber-600 dark:text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      placeholder="e.g. linus@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-[#0e1015] border text-xs font-mono text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-black/[0.1] dark:border-white/[0.08] focus:border-amber-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">
                    Subject <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: null });
                    }}
                    placeholder="Internship Opportunity / System Architecture Discussion"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-[#0e1015] border text-xs font-mono text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-black/[0.1] dark:border-white/[0.08] focus:border-amber-500'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-mono text-red-500 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">
                    Message <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: null });
                    }}
                    placeholder="Enter message text (min. 10 characters)..."
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-[#0e1015] border text-xs font-mono text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-black/[0.1] dark:border-white/[0.08] focus:border-amber-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit button with microinteractions */}
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message via Email Client</span>
                </motion.button>
              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
