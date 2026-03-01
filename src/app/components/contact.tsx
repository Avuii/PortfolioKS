import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Mail, Play, MessageSquare } from 'lucide-react';

interface ContactProps {
  language: 'en' | 'pl';
  playClickSound: () => void;
}

export function Contact({ language, playClickSound }: ContactProps) {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojnbgao';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed');
      }

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
    <section className="min-h-[100svh] overflow-x-hidden px-4 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 shrink-0 text-[var(--accent-blue)] sm:h-6 sm:w-6" />
            <h2 className="code-font text-[clamp(18px,4.8vw,30px)] font-medium leading-tight text-[var(--text-primary)]">
              {ui.sectionTitle}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Left: contact_info.json */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-tertiary)] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>

              <div className="text-xs code-font text-[var(--text-secondary)] sm:text-sm">
                contact_info.json
              </div>

              <div className="w-12" />
            </div>

            <div className="max-h-[380px] overflow-auto p-4 text-[12px] code-font sm:max-h-[420px] sm:p-6 sm:text-sm">
              <div className="min-w-[520px] space-y-1 text-[var(--text-primary)]">
                <Line n={1}>{'{'}</Line>

                <Line n={2}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"status"</span>:{' '}
                    <span className="text-[var(--accent-green)]">"{contactInfo.status}"</span>,
                  </span>
                </Line>

                <Line n={3}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"email"</span>:{' '}
                    <span className="text-[var(--accent-green)]">"{contactInfo.email}"</span>,
                  </span>
                </Line>

                <Line n={4}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"github"</span>:{' '}
                    <span className="text-[var(--accent-green)]">"{contactInfo.socials.github}"</span>,
                  </span>
                </Line>

                <Line n={5}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"linkedin"</span>:{' '}
                    <span className="text-[var(--accent-green)]">"{contactInfo.socials.linkedin}"</span>,
                  </span>
                </Line>

                <Line n={6}>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"location"</span>:{' '}
                    <span className="text-[var(--accent-green)]">"{contactInfo.location}"</span>
                  </span>
                </Line>

                <Line n={7}>{'}'}</Line>
                <Line n={8}>&nbsp;</Line>

                <Line n={9}>
                  <span className="text-[var(--syntax-comment)]">{ui.linksComment}</span>
                </Line>

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

                <Line n={14}>
                  <span className="text-[var(--syntax-comment)]">{ui.waiting}</span>
                </Line>
              </div>
            </div>
          </motion.div>

          {/* Right: sendMessage.ts */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-tertiary)] px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <MessageSquare className="h-4 w-4 shrink-0 text-[var(--accent-blue)]" />
                <span className="truncate text-xs code-font text-[var(--text-secondary)] sm:text-sm">
                  sendMessage.ts
                </span>
              </div>

            <button
              type="button"
              className="rounded p-1 hover:bg-[var(--hover-overlay)]"
              onClick={playClickSound}
              aria-label="Status: active"
            >
              <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]/40 animate-pulse" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]" />
              </div>
            </button>

            <div className="p-4 text-[12px] code-font sm:p-6 sm:text-sm">
              <div className="mb-4 text-[var(--syntax-comment)]">{ui.codeComment}</div>

              <div className="mb-2 text-[var(--syntax-keyword)]">
                const <span className="text-[var(--syntax-function)]">send</span> ={' '}
                <span className="text-[var(--syntax-keyword)]">async</span> () =&gt; {'{'}
              </div>

              <div className="mb-4 space-y-4 pl-4">
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

                <div className="space-y-2 pl-4">
                  <div className="text-[var(--text-primary)]">
                    {ui.nameLabel}, {ui.emailLabel},
                  </div>

                  <div>
                    <div className="mb-1 text-[var(--text-primary)]">{ui.messageLabel}:</div>
                    <textarea
                      value={formData.message}
                      placeholder={ui.messagePlaceholder}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      className="w-full resize-none rounded border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-3 py-2 text-[var(--accent-green)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:outline-none"
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
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-green)] px-6 py-3 text-white transition-all hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Play className="h-4 w-4" />
                  {isSubmitting ? ui.submitLoading : ui.submitIdle}
                </button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-lg border border-[rgba(63,185,80,0.45)] bg-[rgba(35,134,54,0.12)] px-4 py-3 text-center text-xs code-font text-[#7ee787] sm:text-sm"
                  >
                    ✓ {ui.submitSuccess}
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded border border-red-500 bg-red-500/10 px-4 py-2 text-center text-xs text-red-400 sm:text-sm"
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
          className="mt-16 pb-[calc(env(safe-area-inset-bottom)+96px)] text-center text-sm code-font text-[var(--text-secondary)] sm:pb-12"
        >
          <div className="mb-2">
            <span className="text-[var(--accent-blue)]">&lt;/&gt;</span>{' '}
            Katarzyna Stańczyk | {ui.footerRole}
          </div>

          <div className="space-y-1">
            <div className="text-xs text-[var(--text-muted)]">{ui.builtWith}</div>
            <div className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} Katarzyna Stańczyk
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Helpers */
function Line({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex">
      <span className="mr-4 w-6 shrink-0 select-none text-right text-[var(--text-muted)]">
        {n}
      </span>
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
      <div className="mb-1 text-[var(--syntax-keyword)]">
        const <span className="text-[var(--syntax-variable)]">{label}</span> =
      </div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-3 py-2 text-[var(--accent-green)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:outline-none"
      />
    </div>
  );
}
