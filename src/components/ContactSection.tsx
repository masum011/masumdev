import {useState, type FormEvent} from 'react';
import {Check, Copy, Download, Mail, Send} from 'lucide-react';
import {motion} from 'motion/react';
import {developerProfile} from '../data/portfolioData';
import {downloadCvPdf} from '../utils/downloadCv';
import {HighlightText} from './HighlightText';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [cvDownloaded, setCvDownloaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    scope: 'Full-Stack Web App',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(developerProfile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleDownloadCv = async () => {
    const ok = await downloadCvPdf(developerProfile.cvPdfPath, developerProfile.cvFileName);
    if (ok) {
      setCvDownloaded(true);
      window.setTimeout(() => setCvDownloaded(false), 2400);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio inquiry: ${formState.scope} from ${formState.name.trim()}`
    );
    const body = encodeURIComponent(
      `Name: ${formState.name.trim()}\nEmail: ${formState.email.trim()}\nEngagement: ${formState.scope}\n\n${formState.message.trim()}`
    );
    window.location.href = `mailto:${developerProfile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 gap-8 rounded-2xl border border-[#EA580C]/35 bg-[#14100E] p-8 sm:p-10 lg:grid-cols-12">
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <p className="text-sm font-medium text-[#FF7A2F]">04. Contact</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Let&apos;s ship your next{' '}
              <HighlightText variant="marker">product</HighlightText>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Available for frontend and full-stack software engineering roles, Next.js/React architecture, and product builds.
            </p>
            <p className="mt-3 text-sm font-medium text-[#FDBA74]">
              I usually respond within 48 hours.
            </p>
          </div>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-xs font-medium text-white/60">Direct Email &amp; Phone</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${developerProfile.email}`}
                  className="inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-[#FF7A2F]"
                >
                  <Mail className="h-4 w-4 text-[#FF7A2F]" aria-hidden="true" />
                  {developerProfile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/15 bg-[#1E1713] px-2.5 text-xs font-medium text-white transition-colors hover:border-[#FF7A2F] hover:text-[#FF7A2F] cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#FF7A2F]" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="mt-1.5 font-mono text-xs text-white/75 tabular-nums">
                {developerProfile.phone}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-white/60">Location &amp; CV</p>
              <p className="mt-1 text-sm text-white/85">
                {developerProfile.location} · {developerProfile.availability}
              </p>
              <button
                type="button"
                onClick={handleDownloadCv}
                className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg border border-[#EA580C]/50 bg-[#1E1510] px-3.5 text-xs font-semibold text-white transition-colors hover:border-[#FF7A2F] hover:text-[#FF7A2F] cursor-pointer"
              >
                {cvDownloaded ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#FF7A2F]" aria-hidden="true" />
                    Downloaded CV (PDF)
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5 text-[#FF7A2F]" aria-hidden="true" />
                    Download Full CV (PDF)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <motion.div
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.25}}
              className="flex h-full flex-col items-start justify-center rounded-xl border border-[#EA580C]/40 bg-[#1B1410] p-8"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#C2410C] text-white">
                <Check className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">Email draft prepared</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Thank you, {formState.name}. Your message regarding{' '}
                <HighlightText variant="accent">{formState.scope}</HighlightText> is addressed to{' '}
                {developerProfile.email}. Please send the draft from your email app.
              </p>
              <p className="mt-3 text-sm font-medium text-[#FDBA74]">
                I usually respond within 48 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormState({name: '', email: '', scope: 'Full-Stack Web App', message: ''});
                }}
                className="mt-6 inline-flex h-10 items-center rounded-lg border border-white/15 px-4 text-xs font-semibold text-white transition-colors hover:border-[#FF7A2F] hover:text-[#FF7A2F] cursor-pointer"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-white/80">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="Alex Morgan"
                    className="mt-1.5 h-11 w-full rounded-lg border border-white/15 bg-[#0E0B09] px-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF7A2F] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-white/80">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="alex@company.com"
                    className="mt-1.5 h-11 w-full rounded-lg border border-white/15 bg-[#0E0B09] px-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF7A2F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-white/80">
                  Project Details
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="Share your timeline, architecture goals, or role details..."
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0E0B09] p-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF7A2F] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#C2410C] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#EA580C] whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Send Inquiry
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
