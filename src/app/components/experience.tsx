import { motion } from 'motion/react';
import { Calendar, FileCode, GitBranch } from 'lucide-react';

interface ExperienceProps {
  language: 'en' | 'pl';
}

const experiences = [
  {
    id: 'a1b2ca3',
    branch: 'HEAD → ambassador',
    company: 'Commerzbank',
    title: {
      en: 'Ambassador',
      pl: 'Ambasadorka'
    },
    description: {
      en: 'Representing Commerzbank in student-oriented initiatives, participating in trainings, IT events, and career fairs, and helping promote technology, software engineering, and computer science among students. Supporting employer branding activities and building connections between the company and the academic community.',
      pl: 'Reprezentowanie Commerzbanku w inicjatywach skierowanych do studentów, udział w szkoleniach, wydarzeniach IT oraz targach pracy, a także wspieranie promocji technologii, inżynierii oprogramowania i informatyki wśród studentów. Wsparcie działań employer brandingowych oraz budowanie relacji między firmą a środowiskiem akademickim.'
    },
    tags: [
      'Ambassador',
      'Employer Branding',
      'IT Events',
      'Career Fairs',
      'Trainings',
      'Student Community',
      'Tech Promotion'
    ],
    period: { en: '2026-03 — Present', pl: '2026-03 — Obecnie' },
    filesChanged: 21,
    insertions: 42,
    deletions: 0
  },
  {
    id: 'a1b2ca2',
    branch: 'HEAD → engineer',
    company: 'De Heus',
    title: {
      en: '.NET Developer Intern',
      pl: 'Stażystka .NET Developer'
    },
    description: {
      en: 'Developing and maintaining business applications using C#, ASP.NET Core, Blazor, Entity Framework Core, Angular, DevExpress, WPF, and MSSQL. Implementing new features, refactoring existing modules, working with databases, and collaborating with analysts and end users in an Agile environment.',
      pl: 'Tworzenie i utrzymywanie aplikacji biznesowych z wykorzystaniem C#, ASP.NET Core, Blazor, Entity Framework Core, Angular, DevExpress, WPF i MSSQL. Implementacja nowych funkcjonalności, refaktoryzacja istniejących modułów, praca z bazami danych oraz współpraca z analitykami i użytkownikami końcowymi w środowisku Agile.'
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
      'Agile'
    ],
    period: { en: '2025-10 — Present', pl: '2025-10 — Obecnie' },
    filesChanged: 11,
    insertions: 100,
    deletions: 10
  },
  {
    id: 'a1b2ca1',
    branch: 'HEAD → developer',
    company: 'University of Łódź',
    title: { en: 'Computer Science Student', pl: 'Studentka Informatyki' },
    description: {
      en: 'Building academic and portfolio projects in algorithms, data structures, simulations, signal processing, and machine learning. Combining theory with hands-on implementation in C++, Python, and modern web technologies.',
      pl: 'Tworzenie projektów akademickich i portfoliowych z zakresu algorytmów, struktur danych, symulacji, przetwarzania sygnałów i machine learningu. Łączenie teorii z praktyczną implementacją w C++, Python i nowoczesnych technologiach webowych.'
    },
    tags: [
      'C++',
      'Python',
      'Algorithms',
      'Data Structures',
      'Machine Learning',
      'Signal Processing',
      'Full-Stack'
    ],
    period: { en: '2023-10 — Present', pl: '2023-10 — Obecnie' },
    filesChanged: 4,
    insertions: 128,
    deletions: 15
  }
];

export function Experience({ language }: ExperienceProps) {
  return (
    <div className="min-h-[100svh] overflow-x-hidden px-4 py-16 pb-[calc(env(safe-area-inset-bottom)+120px)] sm:px-8 sm:py-20 sm:pb-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex items-start gap-3">
            <GitBranch className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-orange)] sm:h-6 sm:w-6" />

            {/* mobile: two lines, desktop: single line */}
            <h2 className="min-w-0 code-font text-[clamp(18px,5.6vw,30px)] leading-tight text-[var(--text-primary)] sm:text-3xl sm:whitespace-nowrap">
              <span className="block sm:inline">$ git log --stat</span>
              <span className="block sm:ml-2 sm:inline">--oneline</span>
            </h2>
          </div>
        </motion.div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* line */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-[var(--border-default)] lg:left-1/2 lg:-translate-x-1/2" />

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
                  {/* node */}
                  <div className="absolute left-5 top-8 z-10 -translate-x-1/2 lg:left-1/2">
                    <div className="h-4 w-4 rounded-full border-4 border-[var(--bg-primary)] bg-[var(--accent-blue)] shadow-[0_0_18px_var(--accent-blue)]" />
                  </div>

                  {/* date (fixed alignment: mobile offset, desktop centered) */}
                  <div className="pt-2 lg:pt-0">
  <div
    className={[
      'ml-10 max-w-[calc(100%-2.5rem)]',
      'lg:absolute lg:top-0 lg:ml-0 lg:max-w-none',
      isLeftOnDesktop
        ? 'lg:left-[calc(50%+2rem)]'
        : 'lg:right-[calc(50%+2rem)]'
    ].join(' ')}
  >
    <div className="inline-flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--accent-blue)] bg-[var(--bg-tertiary)] px-3 py-1 text-[11px] code-font text-[var(--accent-blue)] shadow-[0_0_18px_rgba(88,166,255,0.08)] sm:px-4 sm:py-1.5 sm:text-xs">
      <Calendar className="h-3 w-3 shrink-0" />
      <span>{exp.period[language]}</span>
    </div>
  </div>
</div>
                  {/* card */}
                  <div
                    className={[
                      'mt-4 sm:mt-6',
                      'pl-10',
                      'lg:pl-0',
                      isLeftOnDesktop
                        ? 'lg:mr-[calc(50%+2rem)] lg:pr-8'
                        : 'lg:ml-[calc(50%+2rem)] lg:pl-8'
                    ].join(' ')}
                  >
                    <article className="min-w-0 w-full overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] transition-colors hover:border-[var(--accent-blue)]">
                      {/* header */}
                      <div className="border-b border-[var(--border-default)] bg-[var(--bg-tertiary)] px-4 py-4 sm:px-6 sm:py-5">
                        <div className="flex flex-col gap-3">
                          {/* top row */}
                          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                            <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs code-font text-[var(--accent-blue)]">
                              <span className="shrink-0">{exp.id}</span>
                              <span className="shrink-0 text-[var(--text-secondary)]">—</span>

                              <span className="inline-flex max-w-full rounded border border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 px-2 py-0.5 text-white">
                                <span className="truncate">{exp.branch}</span>
                              </span>
                            </div>

                            <span className="min-w-0 text-left text-xs code-font text-[var(--text-secondary)] sm:max-w-[180px] sm:text-right">
                              <span className="block truncate">{exp.company}</span>
                            </span>
                          </div>

                          <h3 className="text-lg leading-snug text-[var(--text-primary)] sm:text-xl">
                            {exp.title[language]}
                          </h3>
                        </div>
                      </div>

                      {/* body */}
                      <div className="p-4 sm:p-6">
                        <p className="mb-4 text-sm leading-relaxed text-[var(--text-primary)] sm:text-base">
                          {exp.description[language]}
                        </p>

                        {/* tags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-[var(--accent-blue)] bg-[var(--bg-tertiary)] px-2 py-1 text-xs code-font text-[var(--accent-blue)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* stats */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--border-default)] pt-4 text-xs code-font text-[var(--text-secondary)]">
                          <div className="flex items-center gap-1">
                            <FileCode className="h-3 w-3 shrink-0" />
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
                    </article>
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
              <div className="absolute left-5 top-8 z-10 -translate-x-1/2 lg:left-1/2">
                <div className="h-4 w-4 rounded-full border-4 border-[var(--bg-primary)] bg-[var(--accent-green)] shadow-[0_0_18px_var(--accent-green)]" />
              </div>

              <div className="mt-6 pl-10 lg:flex lg:justify-center lg:pl-0">
                <div className="inline-flex rounded-full border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-5 py-3 text-sm code-font text-[var(--text-secondary)]">
                  <span className="mr-2 text-[var(--accent-green)]">➜</span>
                  {language === 'en' ? 'Initial Commit' : 'Initial Commit'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
