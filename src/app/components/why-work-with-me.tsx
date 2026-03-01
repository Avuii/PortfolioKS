import { motion } from 'motion/react';
import {
  FileText,
  CheckCircle2,
  Target,
  Workflow,
  Brain,
  Zap,
  Sparkles
} from 'lucide-react';

interface WhyWorkWithMeProps {
  language: 'en' | 'pl';
}

const features = [
  {
    title: {
      en: 'feat: practical software mindset',
      pl: 'feat: praktyczne podejście do tworzenia oprogramowania'
    },
    description: {
      en: 'I focus on software that is useful, maintainable, and built for real needs.',
      pl: 'Skupiam się na oprogramowaniu, które jest użyteczne, łatwe w utrzymaniu i budowane dla rzeczywistych potrzeb.'
    },
    icon: Target,
    iconColor: 'text-[var(--accent-red)]'
  },
  {
    title: {
      en: 'feat: full-stack perspective',
      pl: 'feat: perspektywa full-stack'
    },
    description: {
      en: "I'm comfortable moving between backend logic, data models, APIs, and frontend interfaces.",
      pl: 'Swobodnie poruszam się między logiką backendu, modelami danych, API i interfejsami frontend.'
    },
    icon: Workflow,
    iconColor: 'text-[var(--accent-cyan)]'
  },
  {
    title: {
      en: 'feat: strong technical foundation',
      pl: 'feat: solidne podstawy techniczne'
    },
    description: {
      en: 'My academic background helps me understand algorithms, data structures, and problem-solving deeply.',
      pl: 'Moje wykształcenie akademickie pomaga mi głęboko rozumieć algorytmy, struktury danych i rozwiązywanie problemów.'
    },
    icon: Brain,
    iconColor: 'text-[var(--accent-pink)]'
  },
  {
    title: {
      en: 'feat: fast learner, hands-on builder',
      pl: 'feat: szybka nauka i praktyczne podejście'
    },
    description: {
      en: 'I like learning by building — from business applications to machine learning experiments and interactive tools.',
      pl: 'Lubię uczyć się przez tworzenie — od aplikacji biznesowych po eksperymenty z machine learningiem i interaktywne narzędzia.'
    },
    icon: Zap,
    iconColor: 'text-[var(--accent-yellow)]'
  }
] as const;

export function WhyWorkWithMe({ language }: WhyWorkWithMeProps) {
  const fileName =
    language === 'en'
      ? 'WHY_WORK_WITH_ME.md'
      : 'DLACZEGO_JA.md';

  return (
    <section className="min-h-screen overflow-x-hidden px-4 py-16 pb-[calc(env(safe-area-inset-bottom)+120px)] sm:px-6 sm:py-20 sm:pb-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="mb-4 flex items-start gap-3">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-yellow)] sm:h-6 sm:w-6" />

            <h2 className="min-w-0 code-font text-[clamp(18px,5.7vw,30px)] leading-tight text-[var(--text-primary)] sm:text-3xl">
              <span className="block">$ cat</span>
              <span className="block break-words [overflow-wrap:anywhere]">
                {fileName}
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Content */}
        <div className="w-full overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] sm:rounded-2xl">
          {/* Header */}
          <div className="border-b border-[var(--border-default)] bg-[var(--bg-tertiary)] px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs code-font text-[var(--text-secondary)] sm:text-sm">
              <FileText className="h-4 w-4 text-[var(--accent-green)]" />
              <span className="truncate">{fileName}</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title.en}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-4 transition-colors hover:border-[var(--accent-blue)] sm:p-5 lg:p-6"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-green)] sm:h-5 sm:w-5" />

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-start gap-2">
                          <Icon className={`mt-0.5 h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${feature.iconColor}`} />
                          <h3 className="break-words text-[15px] leading-snug code-font text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-blue)] sm:text-base lg:text-lg">
                            {feature.title[language]}
                          </h3>
                        </div>

                        <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
                          {feature.description[language]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-6 border-t border-[var(--border-default)] pt-6 sm:mt-8 sm:pt-8"
            >
              <div className="code-font text-sm sm:text-base">
                <div className="mb-4 text-[var(--text-secondary)]">
                  ## {language === 'en' ? 'Currently focused on' : 'Obecnie skupiam się na'}:
                </div>

                <div className="space-y-3 pl-1 text-[var(--text-primary)] sm:pl-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[var(--accent-blue)]">→</span>
                    <span className="text-sm leading-relaxed sm:text-base">
                      {language === 'en'
                        ? 'Growing my .NET and full-stack expertise through real projects'
                        : 'Rozwijanie mojej wiedzy z .NET i full-stack poprzez realne projekty'}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[var(--accent-blue)]">→</span>
                    <span className="text-sm leading-relaxed sm:text-base">
                      {language === 'en'
                        ? 'Exploring AI/ML integration in production systems'
                        : 'Eksplorowanie integracji AI/ML w systemach produkcyjnych'}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[var(--accent-blue)]">→</span>
                    <span className="text-sm leading-relaxed sm:text-base">
                      {language === 'en'
                        ? 'Building maintainable, scalable software that solves real problems'
                        : 'Budowanie łatwego w utrzymaniu, skalowalnego oprogramowania rozwiązującego prawdziwe problemy'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom terminal-style status */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 rounded-xl border border-[rgba(63,185,80,0.35)] bg-[rgba(35,134,54,0.10)] px-4 py-4 sm:mt-8 sm:px-5"
            >
              <div className="mb-2 flex items-center gap-2 text-xs code-font text-[#7ee787] sm:text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>
                  {language === 'en'
                    ? 'status: ready_to_collaborate'
                    : 'status: gotowa_do_współpracy'}
                </span>
              </div>

              <div className="pl-6 text-sm leading-relaxed text-[var(--text-primary)] sm:text-[15px]">
                {language === 'en'
                  ? 'Open to contributing to meaningful products, real-world software, and teams that value thoughtful engineering.'
                  : 'Otwarta na współtworzenie wartościowych produktów, realnego oprogramowania i współpracę z zespołami, które cenią przemyślane podejście do inżynierii.'}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
