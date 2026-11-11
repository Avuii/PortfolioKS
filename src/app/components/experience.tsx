import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, CheckCircle2, ChevronDown, ExternalLink, FileCode, GitBranch } from 'lucide-react';

interface ExperienceProps {
  language: 'en' | 'pl';
}

type Bilingual = { en: string; pl: string };

type ExperienceItem = {
  id: string;
  branch: string;
  company: string;
  title: Bilingual;
  description: Bilingual;
  period: Bilingual;
  tags: string[];
  highlights: { en: string[]; pl: string[] };
  contributions?: {
    name: string;
    technologies: string;
    description: Bilingual;
  }[];
  projectLink?: { label: string; url: string };
  plannedEnd?: string;
};

const experiences: ExperienceItem[] = [
  {
    id: 'a1b2ca3',
    branch: 'community → nextgen',
    company: 'Commerzbank · NextGen',
    title: {
      en: 'NextGen Ambassador',
      pl: 'Ambasadorka programu NextGen'
    },
    description: {
      en: 'Representing the Commerzbank Digital Technology Center in student initiatives and connecting the IT industry with the academic community. Taking part in training sessions, technology events and career fairs, while supporting employer branding and promoting opportunities in software engineering.',
      pl: 'Reprezentowanie Commerzbank Digital Technology Center w inicjatywach studenckich i budowanie relacji między branżą IT a środowiskiem akademickim. Udział w szkoleniach, wydarzeniach technologicznych i targach pracy oraz wspieranie działań employer brandingowych.'
    },
    tags: [
      'NextGen', 'Employer Branding', 'IT Events', 'Career Fairs',
      'Trainings', 'Student Community'
    ],
    period: {
      en: 'Mar 2026 — Nov 27, 2026',
      pl: '03.2026 — 27.11.2026'
    },
    plannedEnd: '2026-11-27',
    highlights: {
      en: ['Academic–industry collaboration', 'IT events & career fairs', 'Student initiatives'],
      pl: ['Współpraca uczelni z branżą IT', 'Wydarzenia IT i targi pracy', 'Inicjatywy studenckie']
    }
  },
  {
    id: 'a1b2ca2',
    branch: 'work → full-stack',
    company: 'De Heus',
    title: {
      en: '.NET Developer Intern',
      pl: 'Stażystka .NET Developer'
    },
    description: {
      en: 'Contributed to commercial business applications and internal tools. Worked across the full stack using C#/.NET, ASP.NET Core, Entity Framework Core, Angular, Blazor, WPF and SQL Server. Implemented features, maintained and improved existing modules, and supported integrations with Comarch ERP XL.',
      pl: 'Rozwijałam komercyjne aplikacje biznesowe i narzędzia wewnętrzne. Pracowałam full-stack z użyciem C#/.NET, ASP.NET Core, Entity Framework Core, Angular, Blazor, WPF i SQL Server. Implementowałam funkcjonalności, ulepszałam istniejące moduły i wspierałam integracje z Comarch ERP XL.'
    },
    tags: [
      'C#', '.NET', 'ASP.NET Core', 'EF Core', 'Angular',
      'Blazor', 'WPF', 'SQL Server', 'Comarch ERP XL', 'Jira'
    ],
    period: {
      en: 'Oct 2025 — Jul 2, 2026',
      pl: '10.2025 — 02.07.2026'
    },
    highlights: {
      en: ['Commercial applications', 'Full-stack development', 'ERP & SQL integrations'],
      pl: ['Aplikacje komercyjne', 'Rozwój full-stack', 'Integracje ERP i SQL']
    },
    contributions: [
      {
        name: 'XL Session Manager',
        technologies: 'C# · WPF · Comarch ERP XL',
        description: {
          en: 'Desktop tool for managing sessions in the Comarch ERP XL environment.',
          pl: 'Aplikacja desktopowa do zarządzania sesjami w środowisku Comarch ERP XL.'
        }
      },
      {
        name: 'Config Attributes Panel',
        technologies: 'Angular · TypeScript',
        description: {
          en: 'Interface for configuring and managing business attributes.',
          pl: 'Interfejs do konfiguracji i zarządzania atrybutami biznesowymi.'
        }
      },
      {
        name: 'Commission',
        technologies: 'Angular · .NET',
        description: {
          en: 'Maintenance and improvements to an existing full-stack business application.',
          pl: 'Utrzymanie i rozwój istniejącej aplikacji biznesowej full-stack.'
        }
      },
      {
        name: 'SASS',
        technologies: 'Blazor · MudBlazor',
        description: {
          en: 'Development and improvement of an internal business application.',
          pl: 'Rozwój i usprawnianie wewnętrznej aplikacji biznesowej.'
        }
      },
      {
        name: 'KNT Attributes',
        technologies: 'C# · Comarch ERP XL',
        description: {
          en: 'Features supporting contractor attributes and ERP integration.',
          pl: 'Funkcjonalności obsługujące atrybuty kontrahentów i integrację z ERP.'
        }
      }
    ]
  },
  {
    id: 'b1p2026',
    branch: 'feature → edutech-startup',
    company: 'Erasmus+ BIP · ISPGAYA',
    title: {
      en: 'EduTech Startup Project Participant',
      pl: 'Uczestniczka projektu EduTech Startup'
    },
    description: {
      en: 'Participated in an Erasmus+ Blended Intensive Programme from 18 to 22 May 2026 and co-created CareQuest — an EduTech Startup MVP focused on safe learning, creativity and connection during recovery.',
      pl: 'Wzięłam udział w Erasmus+ Blended Intensive Programme w dniach 18–22 maja 2026 i współtworzyłam CareQuest — MVP projektu EduTech Startup wspierającego bezpieczną naukę, kreatywność i kontakt podczas rekonwalescencji.'
    },
    tags: ['React', 'Vite', 'TypeScript', 'EduTech', 'Startup MVP', 'Teamwork', 'UX'],
    period: {
      en: 'May 18–22, 2026',
      pl: '18–22.05.2026'
    },
    highlights: {
      en: ['International teamwork', 'EduTech MVP', 'UX & prototyping'],
      pl: ['Praca w międzynarodowym zespole', 'MVP EduTech', 'UX i prototypowanie']
    },
    projectLink: { label: 'CareQuest — live demo', url: 'https://avuii.github.io/CareQuest/' }
  },
  {
    id: 'a1b2ca1',
    branch: 'HEAD → engineering-degree',
    company: 'University of Łódź',
    title: {
      en: 'Computer Science — Programming & Algorithms',
      pl: 'Informatyka — Programowanie i Algorytmy'
    },
    description: {
      en: 'Computer Science engineering student specializing in Programming and Algorithms. Building academic and personal projects in algorithms, data structures, simulation and machine learning. My engineering thesis focuses on KSeF Manager, a full-stack application for electronic invoicing, API integration and secure access to data.',
      pl: 'Studentka informatyki inżynierskiej, specjalność Programowanie i Algorytmy. Realizuję projekty z algorytmiki, struktur danych, symulacji i machine learningu. W ramach pracy inżynierskiej rozwijam KSeF Manager — aplikację full-stack do obsługi e-faktur, integracji API i bezpiecznego dostępu do danych.'
    },
    tags: [
      'C++', 'Python', 'Algorithms', 'Data Structures',
      'Machine Learning', 'Full-Stack', 'KSeF Manager'
    ],
    period: { en: 'Oct 2023 — Present', pl: '10.2023 — Obecnie' },
    highlights: {
      en: ['Engineering degree', 'Programming & Algorithms', 'KSeF Manager thesis'],
      pl: ['Studia inżynierskie', 'Programowanie i Algorytmy', 'Praca inż.: KSeF Manager']
    }
  }
];

export function Experience({ language }: ExperienceProps) {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  // 27 November is a scheduled end date until that day has passed.
  const isNextGenEndUpcoming = new Date() < new Date('2026-11-28T00:00:00');
  const ui = language === 'pl'
    ? {
        highlights: 'NAJWAŻNIEJSZE OBSZARY',
        selectedWork: 'Wybrane projekty i wkład',
        showWork: 'Pokaż projekty realizowane podczas stażu',
        hideWork: 'Ukryj projekty',
        plannedEnd: 'Planowane zakończenie: 27.11.2026',
        viewDemo: 'Zobacz demo'
      }
    : {
        highlights: 'KEY AREAS',
        selectedWork: 'Selected projects & contributions',
        showWork: 'Show internship projects',
        hideWork: 'Hide projects',
        plannedEnd: 'Scheduled end: Nov 27, 2026',
        viewDemo: 'View demo'
      };

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

                  {/* Date — long dates can wrap on mobile */}
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
                      <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--accent-blue)] bg-[var(--bg-tertiary)] px-3 py-1 text-[11px] code-font text-[var(--accent-blue)] shadow-[0_0_18px_rgba(88,166,255,0.08)] sm:px-4 sm:py-1.5 sm:text-xs">
                        <Calendar className="h-3 w-3 shrink-0" />
                        <span className="break-words">{exp.period[language]}</span>
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

                        {/* Scheduled date, shown only while NextGen is ongoing */}
                        {exp.plannedEnd && isNextGenEndUpcoming && (
                          <p className="mb-4 code-font text-xs text-[var(--accent-green)]">
                            <Calendar className="mr-2 inline-block h-3.5 w-3.5" />
                            {ui.plannedEnd}
                          </p>
                        )}

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

                        {/* Key areas instead of invented Git insertions/deletions */}
                        <div className="border-t border-[var(--border-default)] pt-4">
                          <div className="mb-3 flex items-center gap-2 text-xs code-font text-[var(--text-secondary)]">
                            <FileCode className="h-3.5 w-3.5 shrink-0" />
                            {ui.highlights}
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {exp.highlights[language].map((highlight) => (
                              <span key={highlight} className="inline-flex items-center gap-1.5 text-xs code-font text-[var(--text-secondary)]">
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--accent-green)]" />
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Internal company projects: descriptions only, no private links/code */}
                        {exp.contributions && (
                          <div className="mt-4 border-t border-[var(--border-default)] pt-4">
                            <button
                              type="button"
                              aria-expanded={expandedExperience === exp.id}
                              aria-controls={`contributions-${exp.id}`}
                              onClick={() => setExpandedExperience((current) => current === exp.id ? null : exp.id)}
                              className="flex w-full items-center justify-between gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-3 py-2.5 text-left text-xs code-font text-[var(--accent-blue)] transition-colors hover:border-[var(--accent-blue)] sm:text-sm"
                            >
                              <span>{expandedExperience === exp.id ? ui.hideWork : ui.showWork} ({exp.contributions.length})</span>
                              <motion.span
                                animate={{ rotate: expandedExperience === exp.id ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </motion.span>
                            </button>
                            <AnimatePresence initial={false}>
                              {expandedExperience === exp.id && (
                                <motion.div
                                  id={`contributions-${exp.id}`}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="space-y-3 pt-4">
                                    <p className="code-font text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                                      {ui.selectedWork}
                                    </p>
                                    {exp.contributions.map((item) => (
                                      <div
                                        key={item.name}
                                        className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-3 sm:p-4"
                                      >
                                        <h4 className="mb-1 font-medium text-[var(--text-primary)]">
                                          {item.name}
                                        </h4>
                                        <p className="mb-2 text-xs code-font text-[var(--accent-purple)]">
                                          {item.technologies}
                                        </p>
                                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                                          {item.description[language]}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {exp.projectLink && (
                          <div className="mt-4 border-t border-[var(--border-default)] pt-4">
                            <a
                              href={exp.projectLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-3 py-2 text-xs code-font text-[var(--accent-blue)] transition-colors hover:border-[var(--accent-blue)] sm:text-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {ui.viewDemo}: {exp.projectLink.label.replace(' — live demo', '')}
                            </a>
                          </div>
                        )}
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
  className="mt-6 pl-10 lg:flex lg:justify-center lg:pl-0"
>
  <div className="relative inline-flex">
    <div className="inline-flex rounded-full border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-5 py-3 text-sm code-font text-[var(--text-secondary)]">
      <span className="mr-2 text-[var(--accent-green)]">➜</span>
      {language === 'en' ? 'Initial Commit' : 'Initial Commit'}
    </div>

    <div className="absolute z-10 h-4 w-4 rounded-full border-4 border-[var(--bg-primary)] bg-[var(--accent-green)] shadow-[0_0_18px_var(--accent-green)] left-[-28px] top-1/2 -translate-y-1/2 lg:left-1/2 lg:top-full lg:mt-2 lg:-translate-x-1/2 lg:translate-y-0" />
  </div>
</motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
