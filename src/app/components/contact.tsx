import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Play, MessageSquare } from 'lucide-react';

interface ContactProps {
  language: 'en' | 'pl';
  playClickSound: () => void;
}

export function Contact({ language, playClickSound }: ContactProps) {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojnbgao';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const ui = {
    en: {
      sectionTitle: '$ ./contact.exe',
      codeComment: '// Run this script to send a message',
      waiting: '// Waiting for connection...',
      linksComment: '// Links:',
      nameLabel: 'name',
      emailLabel: 'email',
      messageLabel: 'message',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Type your message here...',
      submitIdle: 'RUN SCRIPT',
      submitLoading: 'Sending...',
      submitSuccess: 'Message sent successfully!',
      submitError: 'Something went wrong. Try again.',
      validationError: 'Please fill in all fields.',
      footerRole: 'Software Engineer',
      builtWith: 'Built with <3 using React, TypeScript & Tailwind'
    },
    pl: {
      sectionTitle: '$ ./kontakt.exe',
      codeComment: '// Uruchom ten skrypt, aby wysłać wiadomość',
      waiting: '// Oczekiwanie na połączenie...',
      linksComment: '// Linki:',
      nameLabel: 'imię',
      emailLabel: 'email',
      messageLabel: 'wiadomość',
      namePlaceholder: 'Twoje imię',
      emailPlaceholder: 'twoj@email.com',
      messagePlaceholder: 'Wpisz swoją wiadomość tutaj...',
      submitIdle: 'URUCHOM SKRYPT',
      submitLoading: 'Wysyłanie...',
      submitSuccess: 'Wiadomość została wysłana pomyślnie!',
      submitError: 'Coś poszło nie tak. Spróbuj ponownie.',
      validationError: 'Uzupełnij wszystkie pola.',
      footerRole: 'Software Engineer',
      builtWith: 'Built with <3 using React, TypeScript & Tailwind'
    }
  }[language];

  const contactInfo = {
    status: 'open_to_work',
    email: 'kstanczyk.contactme@gmail.com',
    socials: {
      github: '@Avuii',
      linkedin: '@Katarzyna Stańczyk'
    },
    location: 'Łódź, Poland'
  };

  const handleSubmit = async () => {
    playClickSound();
    setError('');
    setSubmitted(false);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError(ui.validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed');

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 2800);
    } catch {
      setError(ui.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[100svh] py-16 sm:py-20 px-4 sm:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-blue)] shrink-0" />
            <h2 className="code-font text-[var(--text-primary)] font-medium leading-tight text-[clamp(18px,4.8vw,30px)]">
              {ui.sectionTitle}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left: contact_info.json */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-xs sm:text-sm code-font text-[var(--text-secondary)]">
                contact_info.json
              </div>
              <div className="w-12" />
            </div>

            <div className="p-4 sm:p-6 code-font text-[12px] sm:text-sm overflow-auto max-h-[380px] sm:max-h-[420px]">
              <div className="text-[var(--text-primary)] space-y-1 min-w-[520px]">
                <Line n={1}>{'{'}</Line>
                <Line n={2}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"status"</span>: <span className="text-[var(--accent-green)]">"{contactInfo.status}"</span>,
                  </span>
                </Line>
                <Line n={3}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"email"</span>: <span className="text-[var(--accent-green)]">"{contactInfo.email}"</span>,
                  </span>
                </Line>
                <Line n={4}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"github"</span>: <span className="text-[var(--accent-green)]">"{contactInfo.socials.github}"</span>,
                  </span>
                </Line>
                <Line n={5}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"linkedin"</span>: <span className="text-[var(--accent-green)]">"{contactInfo.socials.linkedin}"</span>,
                  </span>
                </Line>
                <Line n={6}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"location"</span>: <span className="text-[var(--accent-green)]">"{contactInfo.location}"</span>
                  </span>
                </Line>
                <Line n={7}>{'}'}</Line>
                <Line n={8}>&nbsp;</Line>
                <Line n={9}><span className="text-[var(--syntax-comment)]">{ui.linksComment}</span></Line>

                <Line n={10}>
                  <span className="text-[var(--text-secondary)]">➜ </span>
                  <span className="text-[var(--accent-blue)]">github</span>{' '}
                  <a
                    href="https://github.com/Avuii"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    className="text-[var(--accent-blue)] hover:underline"
                  >
                    {contactInfo.socials.github}
                  </a>
                </Line>

                <Line n={11}>
                  <span className="text-[var(--text-secondary)]">➜ </span>
                  <span className="text-[var(--accent-blue)]">linkedin</span>{' '}
                  <a
                    href="https://linkedin.com/in/katarzyna-stanczyk"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    className="text-[var(--accent-blue)] hover:underline"
                  >
                    {contactInfo.socials.linkedin}
                  </a>
                </Line>

                <Line n={12}>
                  <span className="text-[var(--text-secondary)]">➜ </span>
                  <span className="text-[var(--accent-blue)]">email</span>{' '}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    onClick={playClickSound}
                    className="text-[var(--accent-blue)] hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </Line>

                <Line n={13}>&nbsp;</Line>
                <Line n={14}><span className="text-[var(--syntax-comment)]">{ui.waiting}</span></Line>
              </div>
            </div>
          </motion.div>

          {/* Right: sendMessage.ts */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2 min-w-0">
                <MessageSquare className="w-4 h-4 text-[var(--accent-blue)] shrink-0" />
                <span className="text-xs sm:text-sm code-font text-[var(--text-secondary)] truncate">
                  sendMessage.ts
                </span>
              </div>
              <button
                type="button"
                className="p-1 hover:bg-[var(--hover-overlay)] rounded"
                onClick={playClickSound}
                aria-label="Close"
              >
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              </button>
            </div>

            <div className="p-4 sm:p-6 code-font text-[12px] sm:text-sm">
              <div className="text-[var(--syntax-comment)] mb-4">{ui.codeComment}</div>

              <div className="text-[var(--syntax-keyword)] mb-2">
                const <span className="text-[var(--syntax-function)]">send</span> = <span className="text-[var(--syntax-keyword)]">async</span> () =&gt; {'{'}
              </div>

              <div className="pl-4 space-y-4 mb-4">
                <Field
                  label={ui.nameLabel}
                  value={formData.name}
                  placeholder={ui.namePlaceholder}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                />

                <Field
                  label={ui.emailLabel}
                  value={formData.email}
                  placeholder={ui.emailPlaceholder}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  type="email"
                />

                <div className="text-[var(--syntax-keyword)]">await api.submit({'{'}</div>

                <div className="pl-4 space-y-2">
                  <div className="text-[var(--text-primary)]">
                    {ui.nameLabel}, {ui.emailLabel},
                  </div>

                  <div>
                    <div className="text-[var(--text-primary)] mb-1">{ui.messageLabel}:</div>
                    <textarea
                      value={formData.message}
                      placeholder={ui.messagePlaceholder}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded text-[var(--accent-green)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="text-[var(--text-primary)]">{'});'}</div>
              </div>

              <div className="text-[var(--text-primary)]">{'};'}</div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-green)] text-white rounded-lg hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-4 h-4" />
                  {isSubmitting ? ui.submitLoading : ui.submitIdle}
                </button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-lg border border-[rgba(63,185,80,0.45)] bg-[rgba(35,134,54,0.12)] px-4 py-3 text-center text-xs sm:text-sm code-font text-[#7ee787]"
                  >
                    ✓ {ui.submitSuccess}
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 px-4 py-2 bg-red-500/10 border border-red-500 rounded text-red-400 text-center text-xs sm:text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center code-font text-xs sm:text-sm text-[var(--text-secondary)]"
        >
          <div className="mb-2">
            <span className="text-[var(--accent-blue)]">&lt;/&gt;</span>{' '}
            Katarzyna Stańczyk | {ui.footerRole}
          </div>

          <div className="space-y-1">
            <div className="text-xs text-[var(--text-muted)]">{ui.builtWith}</div>
            <div className="text-xs text-[var(--text-muted)]">© {new Date().getFullYear()} Katarzyna Stańczyk</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Helpers */
function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right shrink-0">{n}</span>
      <span className="whitespace-pre">{children}</span>
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
  type = 'text'
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <div className="text-[var(--syntax-keyword)] mb-1">
        const <span className="text-[var(--syntax-variable)]">{label}</span> =
      </div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded text-[var(--accent-green)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:outline-none"
      />
    </div>
  );
}
