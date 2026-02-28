import { motion } from 'motion/react';
import { GitBranch, Calendar, FileCode } from 'lucide-react';

interface ExperienceProps {
  language: 'en' | 'pl';
}

const experiences = [
  {
    id: 'a1b2ca2',
    branch: 'HEAD → engineer',
    company: 'De Heus',
    title: {
      en: '.NET Developer Intern',
      pl: 'Stażystka .NET Developer',
    },
    description: {
      en: 'Developing and maintaining business applications using C#, ASP.NET Core, Blazor, Entity Framework Core, Angular, DevExpress, WPF, and MSSQL. Implementing new features, refactoring existing modules, working with databases, and collaborating with analysts and end users in an Agile environment.',
      pl: 'Tworzenie i utrzymywanie aplikacji biznesowych z wykorzystaniem C#, ASP.NET Core, Blazor, Entity Framework Core, Angular, DevExpress, WPF i MSSQL. Implementacja nowych funkcjonalności, refaktoryzacja istniejących modułów, praca z bazami danych oraz współpraca z analitykami i użytkownikami końcowymi w środowisku Agile.',
    },
    tags: [
      'C#',
      'ASP.NET Core',
      'Blazor',
      'Entity Framework Core',
      'Angular',
      'DevExpress',
      'WPF',
      'MSSQL',
      'Agile',
    ],
    period: { en: '2024-05 — Present', pl: '2024-05 — Obecnie' },
    filesChanged: 11,
    insertions: 100,
    deletions: 10,
  },
  {
    id: 'a1b2ca1',
    branch: 'HEAD → developer',
    company: 'University of Łódź',
    title: { en: 'Computer Science Student', pl: 'Studentka Informatyki' },
    description: {
      en: 'Building academic and portfolio projects in algorithms, data structures, simulations, signal processing, and machine learning. Combining theory with hands-on implementation in C++, Python, and modern web technologies.',
      pl: 'Tworzenie projektów akademickich i portfoliowych z zakresu algorytmów, struktur danych, symulacji, przetwarzania sygnałów i machine learningu. Łączenie teorii z praktyczną implementacją w C++, Python i nowoczesnych technologiach webowych.',
    },
    tags: [
      'C++',
      'Python',
      'Algorithms',
      'Data Structures',
      'Machine Learning',
      'Signal Processing',
      'Full-Stack',
    ],
    period: { en: '2022-06 — Present', pl: '2022-06 — Obecnie' },
    filesChanged: 4,
    insertions: 128,
    deletions: 15,
  },
];

export function Experience({ language }: ExperienceProps) {
  return (
    <div className="min-h-[100svh] py-16 sm:py-20 px-4 sm:px-8 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <GitBranch className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-orange)] shrink-0 mt-1 sm:mt-0" />
            <h2 className="code-font text-[var(--text-primary)] leading-tight break-words text-2xl sm:text-3xl">
              $ git log --stat --oneline
            </h2>
          </div>
        </motion.div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Line: mobile = left, lg+ = center */}
          <div className="absolute top-0 bottom-0 w-px bg-[var(--border-default)] left-5 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-16 sm:space-y-24">
            {experiences.map((exp, index) => {
              const isLeftOnDesktop = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="relative"
                >
                  {/* Node: mobile = left, lg+ = center */}
                  <div className="absolute left-5 top-8 -translate-x-1/2 z-10 lg:left-1/2">
                    <div className="w-4 h-4 rounded-full bg-[var(--accent-blue)] border-4 border-[var(--bg-primary)] shadow-[0_0_18px_var(--accent-blue)]" />
                  </div>

                  {/* Date badge: mobile align left, desktop center */}
                  <div className="pt-2">
                    <div className="ml-10 lg:ml-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-0">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--accent-blue)] rounded-full text-xs code-font text-[var(--accent-blue)]">
                        <Calendar className="w-3 h-3 shrink-0" />
                        {exp.period[language]}
                      </div>
                    </div>
                  </div>

                  {/* Card positioning:
                      - mobile: full width with left padding (line+node)
                      - lg+: alternate left/right like before */}
                  <div
                    className={[
                      'mt-4 sm:mt-6',
                      'pl-10', // mobile offset from left line
                      'lg:pl-0',
                      isLeftOnDesktop
                        ? 'lg:mr-[calc(50%+2rem)] lg:pr-8'
                        : 'lg:ml-[calc(50%+2rem)] lg:pl-8',
                    ].join(' ')}
                  >
                    <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden hover:border-[var(--accent-blue)] transition-colors">
                      {/* Card header */}
                      <div className="px-4 sm:px-6 py-4 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 text-xs code-font text-[var(--accent-blue)] min-w-0">
                            <span className="shrink-0">{exp.id}</span>
                            <span className="text-[var(--text-secondary)] shrink-0">—</span>
                            <span className="px-2 py-0.5 bg-[var(--accent-blue)]/20 border border-[var(--accent-blue)] text-white rounded shrink-0">
                              {exp.branch}
                            </span>
                          </div>

                          <span className="text-xs text-[var(--text-secondary)] code-font truncate">
                            {exp.company}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl text-[var(--text-primary)] leading-snug">
                          {exp.title[language]}
                        </h3>
                      </div>

                      {/* Card body */}
                      <div className="p-4 sm:p-6">
                        <p className="text-[var(--text-primary)] leading-relaxed mb-4 text-sm sm:text-base">
                          {exp.description[language]}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--accent-blue)] text-[var(--accent-blue)] text-xs rounded code-font"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Git stats */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs code-font text-[var(--text-secondary)] pt-4 border-t border-[var(--border-default)]">
                          <div className="flex items-center gap-1">
                            <FileCode className="w-3 h-3 shrink-0" />
                            <span>
                              {exp.filesChanged} {language === 'en' ? 'files changed' : 'pliki zmienione'}
                            </span>
                          </div>

                          <span className="text-[var(--accent-green)]">
                            +{exp.insertions} {language === 'en' ? 'insertions' : 'wstawienia'}
                          </span>
                          <span className="text-[var(--accent-red)]">
                            -{exp.deletions} {language === 'en' ? 'deletions' : 'usunięcia'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Initial commit */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-5 top-8 -translate-x-1/2 z-10 lg:left-1/2">
                <div className="w-4 h-4 rounded-full bg-[var(--accent-green)] border-4 border-[var(--bg-primary)] shadow-[0_0_18px_var(--accent-green)]" />
              </div>

              <div className="pl-10 lg:pl-0 lg:flex lg:justify-center mt-6">
                <div className="inline-flex px-5 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-full code-font text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-green)] mr-2">➜</span>
                  {language === 'en' ? 'Initial Commit' : 'Początkowy Commit (Hello World)'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
