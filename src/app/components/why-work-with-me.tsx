import { motion } from 'motion/react';
import { FileText, CheckCircle2, Target, Workflow, Brain, Zap } from 'lucide-react';

interface WhyWorkWithMeProps {
  language: 'en' | 'pl';
}

const features = [
  {
    title: 'feat: practical software mindset',
    description: {
      en: 'I focus on software that is useful, maintainable, and built for real needs.',
      pl: 'Skupiam się na oprogramowaniu, które jest użyteczne, łatwe w utrzymaniu i budowane dla rzeczywistych potrzeb.'
    },
    icon: Target
  },
  {
    title: 'feat: full-stack perspective',
    description: {
      en: 'I\'m comfortable moving between backend logic, data models, APIs, and frontend interfaces.',
      pl: 'Swobodnie poruszam się między logiką backendu, modelami danych, API i interfejsami frontend.'
    },
    icon: Workflow
  },
  {
    title: 'feat: strong technical foundation',
    description: {
      en: 'My academic background helps me understand algorithms, data structures, and problem-solving deeply.',
      pl: 'Moje wykształcenie akademickie pomaga mi głęboko rozumieć algorytmy, struktury danych i rozwiązywanie problemów.'
    },
    icon: Brain
  },
  {
    title: 'feat: fast learner, hands-on builder',
    description: {
      en: 'I like learning by building — from business applications to machine learning experiments and interactive tools.',
      pl: 'Lubię uczyć się przez tworzenie — od aplikacji biznesowych po eksperymenty z machine learningiem i interaktywne narzędzia.'
    },
    icon: Zap
  }
];

export function WhyWorkWithMe({ language }: WhyWorkWithMeProps) {
  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-[var(--accent-orange)]" />
            <h2 className="text-3xl code-font text-[var(--text-primary)]">
              $ cat WHY_WORK_WITH_ME.md
            </h2>
          </div>
        </motion.div>

        {/* Content */}
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
            <div className="flex items-center gap-2 text-sm code-font text-[var(--text-secondary)]">
              <FileText className="w-4 h-4 text-[var(--accent-green)]" />
              WHY_WORK_WITH_ME.md
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[var(--bg-primary)] rounded-lg border border-[var(--border-default)] p-6 hover:border-[var(--accent-blue)] transition-colors group"
                  >
                    {/* Feature header */}
                    <div className="flex items-start gap-3 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-[var(--accent-green)] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-5 h-5 text-[var(--accent-blue)] flex-shrink-0" />
                          <h3 className="code-font text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
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
              transition={{ delay: 0.4 }}
              className="mt-8 pt-8 border-t border-[var(--border-default)]"
            >
              <div className="code-font text-sm">
                <div className="text-[var(--text-secondary)] mb-3">
                  ## {language === 'en' ? 'Currently focused on' : 'Obecnie skupiam się na'}:
                </div>
                <div className="space-y-2 text-[var(--text-primary)] pl-4">
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--accent-blue)]">→</span>
                    <span>{language === 'en' ? 'Growing my .NET and full-stack expertise through real projects' : 'Rozwijanie mojej wiedzy z .NET i full-stack poprzez realne projekty'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--accent-blue)]">→</span>
                    <span>{language === 'en' ? 'Exploring AI/ML integration in production systems' : 'Eksplorowanie integracji AI/ML w systemach produkcyjnych'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--accent-blue)]">→</span>
                    <span>{language === 'en' ? 'Building maintainable, scalable software that solves real problems' : 'Budowanie łatwego w utrzymaniu, skalowalnego oprogramowania rozwiązującego prawdziwe problemy'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Merge info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 px-4 py-3 bg-[var(--accent-green)] bg-opacity-10 border border-[var(--accent-green)] rounded code-font text-sm"
            >
              <div className="flex items-center gap-2 text-[var(--accent-white)]">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {language === 'en'
                    ? 'Ready to collaborate and contribute to meaningful projects'
                    : 'Gotowa do współpracy i wkładu w znaczące projekty'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
