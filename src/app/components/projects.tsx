import { useState } from 'react';
import { motion } from 'motion/react';
import {
  FolderGit2,
  Star,
  GitFork,
  ExternalLink,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ProjectsProps {
  language: 'en' | 'pl';
}

const pinnedProjects = [
  {
    name: 'NearEarth',
    url: 'https://github.com/Avuii/NearEarth',
    demoUrl: 'https://avuii.github.io/NearEarth/',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'Full-stack asteroid monitoring dashboard with NASA NeoWs integration, close approach data, watchlists, alerts, charts and a simplified interactive 3D Solar System.',
      pl: 'Full-stackowy dashboard obiektów bliskich Ziemi z NASA NeoWs, danymi przelotów asteroid, listą obserwowanych, alertami, wykresami i interaktywną wizualizacją 3D Układu Słonecznego.'
    },
    tags: ['ASP.NET Core', 'React', 'TypeScript', 'NASA NeoWs API', 'Three.js', 'Recharts'],
    language: 'TypeScript',
    stars: 3,
    forks: 0
  },
  {
    name: 'TrackMyCV',
    url: 'https://github.com/Avuii/TrackMyCV',
    demoUrl: 'https://avuii.github.io/TrackMyCV/',
    visibility: { en: 'In development', pl: 'W trakcie rozwoju' },
    description: {
      en: 'Job application tracker for organizing vacancies, recruitment stages, interviews, calendar events and application analytics in one dashboard.',
      pl: 'Aplikacja do śledzenia rekrutacji: oferty pracy, etapy aplikacji, rozmowy, kalendarz oraz statystyki i analityka w jednym panelu.'
    },
    tags: ['React', 'TypeScript', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Recharts'],
    language: 'TypeScript',
    stars: 0,
    forks: 0
  },
  {
    name: 'StockPriceBot',
    url: 'https://github.com/Avuii/StockPriceBot',
    demoUrl: 'https://avuii.github.io/StockPriceBot/demo/',
    visibility: { en: 'In development', pl: 'W trakcie rozwoju' },
    description: {
      en: 'Full-stack product price and availability tracker combining a browser extension, dashboard, scheduled checks, price history and automated notifications.',
      pl: 'Full-stackowy monitoring cen i dostępności produktów z rozszerzeniem przeglądarki, dashboardem, harmonogramem sprawdzania, historią cen i alertami.'
    },
    tags: ['ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Quartz.NET', 'SignalR'],
    language: 'TypeScript',
    stars: 0,
    forks: 0
  },
  {
    name: 'ParkingFlow',
    url: 'https://github.com/Avuii/ParkingFlow',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'Real-time smart parking simulation dashboard built with ASP.NET Core, SignalR and React.',
      pl: 'Dashboard symulacji inteligentnego parkingu w czasie rzeczywistym zbudowany w ASP.NET Core, SignalR i React.'
    },
    tags: ['ASP.NET Core', 'SignalR', 'React', 'C#', 'Simulation', 'Real-time'],
    language: 'C#',
    stars: null,
    forks: null
  },
  {
    name: 'React Scientific Calculator',
    url: 'https://github.com/Avuii/react-scientific-calculator',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'Scientific web calculator built with React and Vite, featuring mathematical operations, graphing, unit conversion, calculation history and keyboard input.',
      pl: 'Kalkulator naukowy w React i Vite z funkcjami matematycznymi, wykresami, konwersją jednostek, historią obliczeń i obsługą klawiatury.'
    },
    tags: ['React', 'JavaScript', 'Vite', 'Graphing', 'UI'],
    language: 'JavaScript',
    stars: null,
    forks: null
  },
  {
    name: 'MediaRent',
    url: 'https://github.com/Avuii/MediaRent',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'C++ project exploring application logic and data management around media rentals.',
      pl: 'Projekt w C++ rozwijający logikę aplikacji i zarządzanie danymi w kontekście wypożyczalni mediów.'
    },
    tags: ['C++', 'OOP', 'Data Management'],
    language: 'C++',
    stars: null,
    forks: null
  },
  {
    name: 'FractalAnimation',
    url: 'https://github.com/Avuii/FractalAnimation',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'C++ project focused on generating and animating fractal visualizations.',
      pl: 'Projekt w C++ poświęcony generowaniu i animowaniu wizualizacji fraktali.'
    },
    tags: ['C++', 'Algorithms', 'Fractals', 'Animation'],
    language: 'C++',
    stars: null,
    forks: null
  }
] as const;

// Earlier featured work stays on the page in a separate group.
const otherHighlights = [
  {
    name: 'EUR/PLN Tracker',
    url: 'https://github.com/Avuii/EUR-PLN-Tracker',
    demoUrl: 'https://avuii.github.io/EUR-PLN-Tracker/',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'End-to-end forecasting dashboard for EUR/PLN exchange rates: NBP data, time-series datasets, model comparison and forecast visualization.',
      pl: 'Dashboard prognozowania kursu EUR/PLN: dane NBP, szeregi czasowe, porównywanie modeli i wizualizacja prognoz.'
    },
    tags: ['React', 'Python', 'NBP API', 'Forecasting', 'Time Series', 'ML'],
    language: 'TypeScript',
    stars: 4,
    forks: 0
  },
  {
    name: 'CareQuest',
    url: 'https://github.com/Avuii/CareQuest',
    demoUrl: 'https://avuii.github.io/CareQuest/',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'EduTech Startup MVP created during Erasmus+ BIP: a space for learning, creativity and connection during recovery.',
      pl: 'MVP EduTech Startup stworzone w ramach Erasmus+ BIP: przestrzeń wspierająca naukę, kreatywność i kontakt podczas rekonwalescencji.'
    },
    tags: ['React', 'Vite', 'TypeScript', 'EduTech', 'Startup MVP', 'UX'],
    language: 'TypeScript',
    stars: 3,
    forks: 1
  }
] as const;

const repositoryList = [
  { name: 'TrackMyCV', url: 'https://github.com/Avuii/TrackMyCV', language: 'TypeScript', updatedAt: '' },
  { name: 'StockPriceBot', url: 'https://github.com/Avuii/StockPriceBot', language: 'TypeScript', updatedAt: '' },
  { name: 'NearEarth', url: 'https://github.com/Avuii/NearEarth', language: 'TypeScript', updatedAt: '2026-07-01' },
  { name: 'EUR-PLN-Tracker', url: 'https://github.com/Avuii/EUR-PLN-Tracker', language: 'TypeScript', updatedAt: '2026-07-01' },
  { name: 'CareQuest', url: 'https://github.com/Avuii/CareQuest', language: 'TypeScript', updatedAt: '2026-05-22' },
  { name: 'ParkingFlow', url: 'https://github.com/Avuii/ParkingFlow', language: 'C#', updatedAt: '2026-07-01' },
  { name: 'react-scientific-calculator', url: 'https://github.com/Avuii/react-scientific-calculator', language: 'JavaScript', updatedAt: '2026-07-01' },
  { name: 'MediaRent', url: 'https://github.com/Avuii/MediaRent', language: 'C++', updatedAt: '2026-07-01' },
  { name: 'FractalAnimation', url: 'https://github.com/Avuii/FractalAnimation', language: 'C++', updatedAt: '2026-07-01' },
  { name: 'ScientificCalculator', url: 'https://github.com/Avuii/ScientificCalculator', language: 'C++', updatedAt: '2026-07-01' },
  { name: 'applied-cryptography-lab', url: 'https://github.com/Avuii/applied-cryptography-lab', language: 'Python', updatedAt: '2026-07-01' },
  { name: 'DocuMind-AI', url: 'https://github.com/Avuii/DocuMind-AI', language: 'C#', updatedAt: '2026-01-13' },
  { name: 'ConowayGameOfLife', url: 'https://github.com/Avuii/ConowayGameOfLife', language: 'C#', updatedAt: '2025-12-06' },
  { name: 'Social-Networks', url: 'https://github.com/Avuii/Social-Networks', language: 'Python', updatedAt: '2026-02-08' },
  { name: 'Banknote-Authentication', url: 'https://github.com/Avuii/Banknote-Authentication', language: 'Python', updatedAt: '2026-01-19' },
  { name: 'IRIS', url: 'https://github.com/Avuii/IRIS', language: 'Python', updatedAt: '2026-01-04' },
  { name: 'Fourier-Transform-Signal-Processing', url: 'https://github.com/Avuii/Fourier-Transform-Signal-Processing', language: 'Python', updatedAt: '2025-12-22' },
  { name: 'SOM-WTA-WTM-PyTorch', url: 'https://github.com/Avuii/SOM-WTA-WTM-PyTorch', language: 'Python', updatedAt: '2025-12-22' },
  { name: 'XOR-Classification-with-MLP', url: 'https://github.com/Avuii/XOR-Classification-with-MLP', language: 'Python', updatedAt: '2025-12-22' },
  { name: 'AC-letter-recognition', url: 'https://github.com/Avuii/AC-letter-recognition', language: 'C++', updatedAt: '2025-12-22' },
  { name: 'Fuzzy-Logic', url: 'https://github.com/Avuii/Fuzzy-Logic', language: 'Python', updatedAt: '2025-11-27' },
  { name: 'SnowGlobe', url: 'https://github.com/Avuii/SnowGlobe', language: 'HTML', updatedAt: '2025-11-07' },
  { name: 'DemonCreutz-Ising2D', url: 'https://github.com/Avuii/DemonCreutz-Ising2D', language: 'Python', updatedAt: '2025-11-07' },
  { name: 'Urban-Traffic-Simulator', url: 'https://github.com/Avuii/Urban-Traffic-Simulator', language: 'C++', updatedAt: '2025-10-15' },
  { name: 'GRIB1-388-Decoder', url: 'https://github.com/Avuii/GRIB1-388-Decoder', language: 'C++', updatedAt: '2025-10-15' },
  { name: 'CoffeCrime', url: 'https://github.com/Avuii/CoffeCrime', language: 'GDScript', updatedAt: '2025-07-13' },
  { name: 'LZ77', url: 'https://github.com/Avuii/LZ77', language: 'C++', updatedAt: '2025-07-13' },
  { name: 'PlaneAndWindSimulator', url: 'https://github.com/Avuii/PlaneAndWindSimulator', language: 'C++', updatedAt: '2025-06-04' },
  { name: 'Huffman-text-compression', url: 'https://github.com/Avuii/Huffman-text-compression', language: 'C++', updatedAt: '2025-06-04' },
  { name: 'Algorithms', url: 'https://github.com/Avuii/Algorithms', language: 'C++', updatedAt: '2025-06-04' }
] as const;

export function Projects({ language }: ProjectsProps) {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [mobileReposOpen, setMobileReposOpen] = useState(false);

  const ui = {
    en: {
      sectionTitle: '$ ls -la ~/projects',
      repositories: 'Repositories',
      allRepositories: 'All repositories',
      pinnedProjects: 'PINNED PROJECTS',
      viewMoreProjects: 'View More Projects',
      viewRepo: 'Code',
      allRepositories: 'All repositories',
      swipeHint: 'Swipe to explore featured projects',
      moreTags: 'more',
      otherProjects: 'OTHER PROJECTS'
    },
    pl: {
      sectionTitle: '$ ls -la ~/projects',
      repositories: 'Repozytoria',
      allRepositories: 'Wszystkie repozytoria',
      pinnedProjects: 'PRZYPIĘTE PROJEKTY',
      viewMoreProjects: 'Zobacz więcej projektów',
      viewRepo: 'Kod',
      allRepositories: 'Wszystkie repozytoria',
      swipeHint: 'Przesuń, aby zobaczyć wyróżnione projekty',
      moreTags: 'więcej',
      otherProjects: 'POZOSTAŁE PROJEKTY'
    }
  }[language];

  const formatUpdated = (iso: string, lang: 'en' | 'pl') => {
    if (!iso) return lang === 'pl' ? 'Data aktualizacji: GitHub' : 'Updated on GitHub';
    const d = new Date(iso + 'T00:00:00');
    const locale = lang === 'pl' ? 'pl-PL' : 'en-US';

    const formatted = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).format(d);

    return lang === 'pl' ? `Zaktualizowano ${formatted}` : `Updated ${formatted}`;
  };

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      'C#': 'var(--accent-purple)',
      Python: 'var(--accent-blue)',
      TypeScript: 'var(--accent-blue)',
      JavaScript: 'var(--accent-yellow)',
      'C++': 'var(--accent-orange)',
      HTML: 'var(--accent-orange)',
      CSS: 'var(--accent-pink)',
      GDScript: 'var(--accent-green)',
      Java: 'var(--accent-red)'
    };

    return colors[lang] || 'var(--text-secondary)';
  };

  const ProjectCard = ({
    project,
    index,
    mobile = false
  }: {
    project: (typeof pinnedProjects)[number];
    index: number;
    mobile?: boolean;
  }) => (
    <motion.article
      key={project.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`group overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] transition-all hover:border-[var(--accent-blue)] ${
        mobile ? 'w-[85vw] max-w-[320px] shrink-0 snap-center' : ''
      }`}
    >
      <div className="border-b border-[var(--border-default)] px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <BookOpen className="h-4 w-4 shrink-0 text-[var(--accent-blue)]" />

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate code-font text-[var(--accent-blue)] group-hover:underline"
            >
              {project.name}
            </a>
          </div>

          <span className="shrink-0 rounded border border-[var(--border-default)] px-2 py-0.5 text-[10px] code-font text-[var(--text-secondary)] sm:text-xs">
            {project.visibility[language]}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6">
        <p
          className={`mb-4 text-sm leading-relaxed text-[var(--text-secondary)] ${
            mobile ? 'min-h-[60px]' : 'min-h-[72px]'
          }`}
          style={
            mobile
              ? {
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }
              : undefined
          }
        >
          {project.description[language]}
        </p>

        <div className={mobile ? 'mb-4 overflow-x-auto' : 'mb-4'}>
          <div className={`${mobile ? 'flex w-max gap-2' : 'flex flex-wrap gap-2'}`}>
            {project.tags.slice(0, mobile ? 5 : project.tags.length).map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap rounded border border-[var(--accent-blue)] bg-[var(--bg-tertiary)] px-2 py-1 text-[10px] code-font text-[var(--accent-blue)] sm:text-xs"
              >
                {tag}
              </span>
            ))}

            {mobile && project.tags.length > 5 && (
              <span className="whitespace-nowrap rounded border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-2 py-1 text-[10px] code-font text-[var(--text-secondary)]">
                +{project.tags.length - 5} {ui.moreTags}
              </span>
            )}
          </div>
        </div>

        <div
          className={`border-t border-[var(--border-default)] pt-4 ${
            mobile ? 'space-y-3' : 'flex items-center justify-between gap-3'
          }`}
        >
          <div className="flex flex-wrap items-center gap-3 text-[10px] code-font text-[var(--text-secondary)] sm:gap-4 sm:text-xs">
            <div
              className="flex items-center gap-1"
              style={{ color: getLanguageColor(project.language) }}
            >
              <div
                className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
                style={{ backgroundColor: getLanguageColor(project.language) }}
              />
              <span>{project.language}</span>
            </div>

            {project.stars !== null && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>{project.stars}</span>
              </div>
            )}

            {project.forks !== null && (
              <div className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                <span>{project.forks}</span>
              </div>
            )}
          </div>

          <div className={`flex items-center gap-2 ${mobile ? 'w-full' : 'shrink-0'}`}>
            {'demoUrl' in project && project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-1 rounded px-3 py-2 text-[10px] code-font text-[var(--accent-green)] transition-colors hover:bg-[var(--hover-overlay)] sm:text-xs ${
                  mobile ? 'flex-1' : ''
                }`}
              >
                <ExternalLink className="h-3 w-3" />
                Demo
              </a>
            )}

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1 rounded px-3 py-2 text-[10px] code-font text-[var(--accent-blue)] transition-colors hover:bg-[var(--hover-overlay)] sm:text-xs ${
                mobile ? 'flex-1' : ''
              }`}
            >
              <ExternalLink className="h-3 w-3" />
              {ui.viewRepo}
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="mb-4 flex items-center gap-3">
            <FolderGit2 className="h-5 w-5 text-[var(--accent-blue)] sm:h-6 sm:w-6" />
            <h2 className="break-all text-2xl code-font text-[var(--text-primary)] sm:text-3xl">
              {ui.sectionTitle}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm code-font text-[var(--text-secondary)]">
                  {ui.pinnedProjects}
                </h3>

                <p className="mt-1 text-xs code-font text-[var(--text-muted)] lg:hidden">
                  {ui.swipeHint}
                </p>
              </div>

              <a
                href="https://github.com/Avuii?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm code-font text-[var(--accent-blue)] transition-colors hover:bg-[var(--hover-overlay)]"
              >
                {ui.viewMoreProjects}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* MOBILE PINNED PROJECTS */}
            <div className="overflow-x-auto px-0 pb-3 snap-x snap-mandatory lg:hidden">
              <div className="flex gap-4 pr-4">
                {pinnedProjects.map((project, index) => (
                  <ProjectCard key={project.name} project={project} index={index} mobile />
                ))}
              </div>
            </div>

            {/* DESKTOP PINNED PROJECTS */}
            <div className="hidden gap-6 lg:grid xl:grid-cols-2">
              {pinnedProjects.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 lg:col-span-1"
          >
            {/* MOBILE ACCORDION */}
            <div className="overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] lg:hidden">
              <button
                type="button"
                onClick={() => setMobileReposOpen((prev) => !prev)}
                className="flex w-full items-center justify-between px-4 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-sm code-font text-[var(--text-secondary)]">
                    {ui.allRepositories}
                  </h3>

                  <span className="rounded bg-[var(--bg-tertiary)] px-2 py-1 text-xs code-font text-[var(--text-secondary)]">
                    {repositoryList.length}
                  </span>
                </div>

                {mobileReposOpen ? (
                  <ChevronUp className="h-4 w-4 text-[var(--text-secondary)]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[var(--text-secondary)]" />
                )}
              </button>

              {mobileReposOpen && (
                <div className="space-y-2 border-t border-[var(--border-default)] px-3 pb-3">
                  {repositoryList.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSelectedRepo(repo.name)}
                      className={`block rounded-lg border px-3 py-3 transition-colors ${
                        selectedRepo === repo.name
                          ? 'border-[var(--accent-blue)] bg-[var(--selected-overlay)]'
                          : 'border-transparent hover:bg-[var(--hover-overlay)]'
                      }`}
                    >
                      <div className="mb-1 flex min-w-0 items-center gap-2">
                        <BookOpen className="h-3 w-3 shrink-0 text-[var(--text-secondary)]" />
                        <span className="truncate text-sm code-font text-[var(--accent-blue)]">
                          {repo.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px]">
                        <div
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="code-font text-[var(--text-secondary)]">
                          {repo.language}
                        </span>
                      </div>

                      <div className="mt-1 text-[10px] code-font text-[var(--text-muted)]">
                        {formatUpdated(repo.updatedAt, language)}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* DESKTOP SIDEBAR */}
            <div className="sticky top-24 hidden max-h-[700px] overflow-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4 lg:block">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm code-font text-[var(--text-secondary)]">
                  {ui.repositories}
                </h3>

                <span className="rounded bg-[var(--bg-tertiary)] px-2 py-1 text-xs code-font text-[var(--text-secondary)]">
                  {repositoryList.length}
                </span>
              </div>

              <div className="space-y-2">
                {repositoryList.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedRepo(repo.name)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedRepo === repo.name
                        ? 'bg-[var(--selected-overlay)] border border-[var(--accent-blue)]'
                        : 'hover:bg-[var(--hover-overlay)] border border-transparent'
                      }`}
                  >
                    <div className="mb-1 flex min-w-0 items-center gap-2">
                      <BookOpen className="h-3 w-3 shrink-0 text-[var(--text-secondary)]" />
                      <span className="truncate text-sm code-font text-[var(--accent-blue)]">
                        {repo.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />

                      <span className="code-font text-[var(--text-secondary)]">
                        {repo.language}
                      </span>

                      <span className="text-[var(--text-muted)]">·</span>

                      <span className="truncate code-font text-[var(--text-muted)]">
                        {formatUpdated(repo.updatedAt, language)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm text-[var(--text-secondary)] code-font">{ui.otherProjects}</h3>

              <button
                type="button"
                onClick={() => window.open('https://github.com/Avuii?tab=repositories', '_blank')}
                className="flex items-center gap-2 px-4 py-2 border border-[var(--border-default)] text-[var(--accent-blue)] rounded hover:bg-[var(--hover-overlay)] transition-colors code-font text-sm"
              >
                {ui.viewMoreProjects}
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {otherHighlights.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden hover:border-[var(--accent-blue)] transition-all group"
                >
                  <div className="px-6 py-4 border-b border-[var(--border-default)]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[var(--accent-blue)]" />
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="code-font text-[var(--accent-blue)] group-hover:underline"
                        >
                          {project.name}
                        </a>
                      </div>

                      <span className="px-2 py-0.5 border border-[var(--border-default)] rounded text-xs code-font text-[var(--text-secondary)]">
                        {project.visibility[language]}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 py-4">
                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed min-h-[72px]">
                      {project.description[language]}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--accent-blue)] text-[var(--accent-blue)] text-xs rounded code-font"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-default)]">
                      <div className="flex items-center gap-4 text-xs code-font text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1" style={{ color: getLanguageColor(project.language) }}>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(project.language) }} />
                          <span>{project.language}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>{project.stars}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          <span>{project.forks}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {'demoUrl' in project && project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 text-xs text-[var(--accent-green)] hover:bg-[var(--hover-overlay)] rounded transition-colors code-font"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Demo
                          </a>
                        )}

                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 text-xs text-[var(--accent-blue)] hover:bg-[var(--hover-overlay)] rounded transition-colors code-font"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
