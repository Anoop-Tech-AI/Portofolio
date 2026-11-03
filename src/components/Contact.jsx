import { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  AlertCircle, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

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

    // Create a real mailto link so the email is actually prepared in the user's mail app
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    // Open user's email client
    window.location.href = mailtoUrl;

    // Clear feedback without falsely pretending background delivery happened
    setStatusNotification({
      type: 'info',
      title: 'Email Client Opened & Draft Prepared',
      description: 'Your default email client has been opened with your validated message. (Note: Direct backend submission requires integrating a service like Formspree or EmailJS).'
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Have an interesting idea? Let's build something.
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl">
            Open for software engineering internships, technical collaborations, and intelligent system discussions.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#11131a]/90 border border-zinc-800/80 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {/* Email Item with copy */}
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      Email Address
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center space-x-1 text-[11px] text-zinc-400 hover:text-cyan-400 transition-colors"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-sm font-medium text-zinc-200 break-all">
                    {personalInfo.email}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono block mt-1">
                    (Placeholder email for portfolio demonstration)
                  </span>
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    Location
                  </span>
                  <span className="text-sm font-medium text-zinc-200">
                    {personalInfo.location}
                  </span>
                  <span className="text-xs text-zinc-400 block mt-0.5">
                    KMIT Campus • Hyderabad
                  </span>
                </div>
              </div>

              {/* Profiles */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                  Developer Profiles
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/70 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2">
                      <GithubIcon className="w-4 h-4 text-zinc-300" />
                      <span className="text-xs font-medium text-zinc-200">GitHub</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-cyan-400" />
                  </a>

                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/70 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2">
                      <LinkedinIcon className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-medium text-zinc-200">LinkedIn</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-sky-400" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form with Validation */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#11131a]/90 border border-zinc-800/80 shadow-xl relative">
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Send a Message
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Validated contact form with automatic email client preparation.
                </p>
              </div>

              {statusNotification && (
                <div className="p-4 mb-6 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs flex items-start space-x-3">
                  <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-cyan-300">{statusNotification.title}</h5>
                    <p className="text-zinc-300 mt-0.5 leading-relaxed">{statusNotification.description}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      placeholder="e.g. Alan Turing"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500/70 focus:border-red-500' : 'border-zinc-800 focus:border-cyan-500/70'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      placeholder="e.g. alan@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500/70 focus:border-red-500' : 'border-zinc-800 focus:border-cyan-500/70'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: null });
                    }}
                    placeholder="Project Inquiry / Internship Opportunity"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                      errors.subject ? 'border-red-500/70 focus:border-red-500' : 'border-zinc-800 focus:border-cyan-500/70'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: null });
                    }}
                    placeholder="Write your message here (min. 10 characters)..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500/70 focus:border-red-500' : 'border-zinc-800 focus:border-cyan-500/70'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message via Email Client</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
