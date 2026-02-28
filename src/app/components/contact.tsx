import { useState } from 'react';
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
      invalidEmail: 'Please enter a valid email address.',
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
      invalidEmail: 'Wpisz poprawny adres e-mail.',
      footerRole: 'Software Engineer',
      builtWith: 'Built with <3 using React, TypeScript & Tailwind'
    }
  }[language];

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
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(ui.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    status: 'open_to_work',
    email: 'kstanczyk.contactme@gmail.com',
    socials: {
      github: '@Avuii',
      linkedin: '@Katarzyna Stańczyk',
      discord: '691598855988314152'
    },
    location: 'Łódź, Poland'
  };

  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-[var(--accent-blue)]" />
            <h2 className="text-3xl code-font text-[var(--text-primary)]">
              {ui.sectionTitle}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ">
          {/* Left side - contact_info.json */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden min-h-[320px] h-start"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-sm code-font text-[var(--text-secondary)]">
                contact_info.json
              </div>
              <div className="w-12" />
            </div>

            <div className="p-6 code-font text-sm overflow-auto">
              <pre className="text-[var(--text-primary)]">
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">1</span>
                  <span>{'{'}</span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">2</span>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"status"</span>
                    <span>: </span>
                    <span className="text-[var(--accent-green)]">"{contactInfo.status}"</span>
                    <span>,</span>
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">3</span>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"email"</span>
                    <span>: </span>
                    <span className="text-[var(--accent-green)]">"{contactInfo.email}"</span>
                    <span>,</span>
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">4</span>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"github"</span>
                    <span>: </span>
                    <span className="text-[var(--accent-green)]">"{contactInfo.socials.github}"</span>
                    <span>,</span>
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">5</span>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"linkedin"</span>
                    <span>: </span>
                    <span className="text-[var(--accent-green)]">"{contactInfo.socials.linkedin}"</span>
                    <span>,</span>
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">6</span>
                  <span className="pl-4">
                    <span className="text-[var(--accent-purple)]">"location"</span>
                    <span>: </span>
                    <span className="text-[var(--accent-green)]">"{contactInfo.location}"</span>
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">7</span>
                  <span>{'}'}</span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">8</span>
                  <span></span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">9</span>
                  <span className="text-[var(--syntax-comment)]">{ui.linksComment}</span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">10</span>
                  <span>
                    <span className="text-[var(--text-secondary)]">➜ </span>
                    <span className="text-[var(--accent-blue)]">github</span>
                    <span className="text-[var(--text-secondary)]"> </span>
                    <a
                      href="https://github.com/Avuii"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClickSound}
                      className="text-[var(--accent-blue)] hover:underline"
                    >
                      @Avuii
                    </a>
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">11</span>
                  <span>
                    <span className="text-[var(--text-secondary)]">➜ </span>
                    <span className="text-[var(--accent-blue)]">linkedin</span>
                    <span className="text-[var(--text-secondary)]"> </span>
                    <a
                      href="https://linkedin.com/in/katarzyna-stanczyk"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClickSound}
                      className="text-[var(--accent-blue)] hover:underline"
                    >
                      @Katarzyna Stańczyk
                    </a>
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">12</span>
                  <span>
                    <span className="text-[var(--text-secondary)]">➜ </span>
                    <span className="text-[var(--accent-blue)]">email</span>
                    <span className="text-[var(--text-secondary)]"> </span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      onClick={playClickSound}
                      className="text-[var(--accent-blue)] hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">13</span>
                  <span></span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] mr-4 select-none w-6 text-right">14</span>
                  <span className="text-[var(--syntax-comment)]">{ui.waiting}</span>
                </div>
              </pre>
            </div>
          </motion.div>

          {/* Right side - sendMessage.ts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden h-full"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--accent-blue)]" />
                <span className="text-sm code-font text-[var(--text-secondary)]">sendMessage.ts</span>
              </div>
              <button
                type="button"
                className="p-1 hover:bg-[var(--hover-overlay)] rounded"
                onClick={playClickSound}
              >
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              </button>
            </div>

            <div className="p-6 code-font text-sm">
              <div className="mb-4">
                <div className="text-[var(--syntax-comment)] mb-4">
                  {ui.codeComment}
                </div>

                <div className="text-[var(--syntax-keyword)] mb-2">
                  const <span className="text-[var(--syntax-function)]">send</span> = <span className="text-[var(--syntax-keyword)]">async</span> () =&gt; {'{'}
                </div>

                <div className="pl-4 space-y-4 mb-4">
                  <div>
                    <div className="text-[var(--syntax-keyword)] mb-1">
                      const <span className="text-[var(--syntax-variable)]">{ui.nameLabel}</span> =
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      placeholder={ui.namePlaceholder}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded text-[var(--accent-green)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="text-[var(--syntax-keyword)] mb-1">
                      const <span className="text-[var(--syntax-variable)]">{ui.emailLabel}</span> =
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      placeholder={ui.emailPlaceholder}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded text-[var(--accent-green)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:outline-none"
                    />
                  </div>

                  <div className="text-[var(--syntax-keyword)] mb-1">
                    await api.submit({'{'}
                  </div>

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
                        rows={4}
                        className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded text-[var(--accent-green)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="text-[var(--text-primary)]">{'});'}</div>
                </div>

                <div className="text-[var(--text-primary)]">{'};'}</div>
              </div>

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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-lg border border-[rgba(63,185,80,0.45)] bg-[rgba(35,134,54,0.12)] px-4 py-3 text-center text-sm code-font text-[#7ee787] shadow-[0_0_0_1px_rgba(63,185,80,0.06)]"
                  >
                    ✓ {ui.submitSuccess}
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 px-4 py-2 bg-red-500/10 border border-red-500 rounded text-red-400 text-center text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center code-font text-sm text-[var(--text-secondary)]"
        >
          <div className="mb-2">
            <span className="text-[var(--accent-blue)]">&lt;/&gt;</span>{' '}
            Katarzyna Stańczyk | {ui.footerRole}
          </div>

          <div className="space-y-1">
            <div className="text-xs text-[var(--text-muted)]">
              {ui.builtWith}
            </div>
            <div className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} Katarzyna Stańczyk
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}