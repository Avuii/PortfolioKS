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
      pl: 'Stażystka .NET Developer'
    },
    description: {
      en: 'Developing and maintaining business applications using C#, ASP.NET Core, Blazor, Entity Framework Core, Angular, DevExpress, WPF, and MSSQL. Implementing new features, refactoring existing modules, working with databases, and collaborating with analysts and end users in an Agile environment.',
      pl: 'Tworzenie i utrzymywanie aplikacji biznesowych z wykorzystaniem C#, ASP.NET Core, Blazor, Entity Framework Core, Angular, DevExpress, WPF i MSSQL. Implementacja nowych funkcjonalności, refaktoryzacja istniejących modułów, praca z bazami danych oraz współpraca z analitykami i użytkownikami końcowymi w środowisku Agile.'
    },
    tags: ['C#', 'ASP.NET Core', 'Blazor', 'Entity Framework Core', 'Angular', 'DevExpress', 'WPF', 'MSSQL', 'Agile'],
    period: {
      en: '2024-05 — Present',
      pl: '2024-05 — Obecnie'
    },
    filesChanged: 11,
    insertions: 100,
    deletions: 10
  },
  {
    id: 'a1b2ca1',
    branch: 'HEAD → developer',
    company: 'University of Łódź',
    title: {
      en: 'Computer Science Student',
      pl: 'Studentka Informatyki'
    },
    description: {
      en: 'Building academic and portfolio projects in algorithms, data structures, simulations, signal processing, and machine learning. Combining theory with hands-on implementation in C++, Python, and modern web technologies.',
      pl: 'Tworzenie projektów akademickich i portfoliowych z zakresu algorytmów, struktur danych, symulacji, przetwarzania sygnałów i machine learningu. Łączenie teorii z praktyczną implementacją w C++, Python i nowoczesnych technologiach webowych.'
    },
    tags: ['C++', 'Python', 'Algorithms', 'Data Structures', 'Machine Learning', 'Signal Processing', 'Full-Stack'],
    period: {
      en: '2022-06 — Present',
      pl: '2022-06 — Obecnie'
    },
    filesChanged: 4,
    insertions: 128,
    deletions: 15
  }
];

export function Experience({ language }: ExperienceProps) {
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
            <GitBranch className="w-6 h-6 text-[var(--accent-orange)]" />
            <h2 className="text-3xl code-font text-[var(--text-primary)]">
              $ git log --stat --oneline
            </h2>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border-default)] -translate-x-1/2" />

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pt-16"
              >
                {/* Commit node */}
                <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-[var(--accent-blue)] border-4 border-[var(--bg-primary)] shadow-[0_0_20px_var(--accent-blue)]" />
                </div>

                {/* Date badge */}
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--accent-blue)] rounded-full text-xs code-font text-[var(--accent-blue)]">
                    <Calendar className="w-3 h-3" />
                    {exp.period[language]}
                  </div>
                </div>

                {/* Content card */}
                <div className={`relative ${index % 2 === 0 ? 'ml-auto pl-8 lg:pl-0 lg:mr-[calc(50%+2rem)]' : 'mr-auto pr-8 lg:pr-0 lg:ml-[calc(50%+2rem)]'} mt-8`}>
                  <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden hover:border-[var(--accent-blue)] transition-colors">
                    {/* Card header */}
                    <div className="px-6 py-4 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 text-xs code-font text-[var(--accent-blue)]">
                          <span>{exp.id}</span>
                          <span className="text-[var(--text-secondary)]">—</span>
                          <span className="px-2 py-0.5 bg-[var(--accent-blue)] bg-opacity-20 border border-[var(--accent-blue)] !text-white rounded">
                            {exp.branch}
                          </span>
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] code-font">
                          {exp.company}
                        </span>
                      </div>
                      <h3 className="text-xl text-[var(--text-primary)]">
                        {exp.title[language]}
                      </h3>
                    </div>

                    {/* Card body */}
                    <div className="p-6">
                      <p className="text-[var(--text-primary)] leading-relaxed mb-4">
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
                      <div className="flex items-center gap-4 text-xs code-font text-[var(--text-secondary)] pt-4 border-t border-[var(--border-default)]">
                        <div className="flex items-center gap-1">
                          <FileCode className="w-3 h-3" />
                          <span>{exp.filesChanged} files changed</span>
                        </div>
                        <span className="text-[var(--accent-green)]">
                          +{exp.insertions} insertions
                        </span>
                        <span className="text-[var(--accent-red)]">
                          -{exp.deletions} deletions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Initial commit */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pt-8"
            >
              {/* Commit node */}
              <div className="absolute left-1/2 top-12 -translate-x-1/2 z-10">
                <div className="w-4 h-4 rounded-full bg-[var(--accent-green)] border-4 border-[var(--bg-primary)] shadow-[0_0_20px_var(--accent-green)]" />
              </div>

              {/* Initial commit card */}
              <div className="flex justify-center mt-8">
                <div className="px-6 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-full code-font text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-green)]">➜</span>{' '}
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