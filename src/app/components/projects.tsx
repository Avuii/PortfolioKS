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
    name: 'DocuMind-AI',
    url: 'https://github.com/Avuii/DocuMind-AI',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'Document intelligence MVP for invoice and receipt extraction with .NET, FastAPI, OCR, ML, and PostgreSQL.',
      pl: 'MVP document intelligence do ekstrakcji danych z faktur i paragonów z wykorzystaniem .NET, FastAPI, OCR, ML i PostgreSQL.'
    },
    tags: ['.NET', 'FastAPI', 'OCR', 'ML', 'PostgreSQL', 'React'],
    language: 'C#',
    stars: 8,
    forks: 2
  },
  {
    name: 'AsteroidSafe',
    url: 'https://github.com/Avuii/AsteroidSafe',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'ML-powered .NET data platform for classifying potentially hazardous asteroids using NASA datasets.',
      pl: 'Platforma danych oparta na .NET i ML do klasyfikacji potencjalnie niebezpiecznych asteroid na podstawie danych NASA.'
    },
    tags: ['C#', '.NET', 'Python', 'ONNX', 'ML', 'NASA API'],
    language: 'C#',
    stars: 12,
    forks: 3
  },
  {
    name: "Conway's Game of Life",
    url: 'https://github.com/Avuii/ConowayGameOfLife',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: "Interactive full-stack implementation of Conway's Game of Life with Blazor WebAssembly, ASP.NET Core API, and SQL persistence.",
      pl: 'Interaktywna full-stackowa implementacja Gry w Życie Conwaya z użyciem Blazor WebAssembly, ASP.NET Core API i trwałości danych w SQL.'
    },
    tags: ['Blazor', 'ASP.NET Core', 'SQL', 'WebAssembly'],
    language: 'C#',
    stars: 6,
    forks: 1
  },
  {
    name: 'EUR/PLN Tracker',
    url: 'https://github.com/Avuii/EUR-PLN-Tracker',
    visibility: { en: 'Public', pl: 'Publiczne' },
    description: {
      en: 'Interactive forecasting dashboard combining a .NET backend, frontend UI, and Python-based time-series models.',
      pl: 'Interaktywny dashboard prognostyczny łączący backend .NET, frontend UI oraz modele szeregów czasowych oparte na Pythonie.'
    },
    tags: ['.NET', 'React', 'Python', 'Time Series', 'Forecasting'],
    language: 'TypeScript',
    stars: 10,
    forks: 2
  }
] as const;

const repositoryList = [
  { name: 'EUR-PLN-Tracker', url: 'https://github.com/Avuii/EUR-PLN-Tracker', language: 'TypeScript', updatedAt: '2026-02-08' },
  { name: 'Social-Networks', url: 'https://github.com/Avuii/Social-Networks', language: 'Python', updatedAt: '2026-02-08' },
  { name: 'AsteroidSafe', url: 'https://github.com/Avuii/AsteroidSafe', language: 'C#', updatedAt: '2026-01-19' },
  { name: 'Banknote-Authentication', url: 'https://github.com/Avuii/Banknote-Authentication', language: 'Python', updatedAt: '2026-01-19' },
  { name: 'DocuMind-AI', url: 'https://github.com/Avuii/DocuMind-AI', language: 'C#', updatedAt: '2026-01-13' },
  { name: 'IRIS', url: 'https://github.com/Avuii/IRIS', language: 'Python', updatedAt: '2026-01-04' },
  { name: 'Fourier-Transform-Signal-Processing', url: 'https://github.com/Avuii/Fourier-Transform-Signal-Processing', language: 'Python', updatedAt: '2025-12-22' },
  { name: 'SOM-WTA-WTM-PyTorch', url: 'https://github.com/Avuii/SOM-WTA-WTM-PyTorch', language: 'Python', updatedAt: '2025-12-22' },
  { name: 'XOR-Classification-with-MLP', url: 'https://github.com/Avuii/XOR-Classification-with-MLP', language: 'Python', updatedAt: '2025-12-22' },
  { name: 'AC-letter-recognition', url: 'https://github.com/Avuii/AC-letter-recognition', language: 'C++', updatedAt: '2025-12-22' },
  { name: 'ConowayGameOfLife', url: 'https://github.com/Avuii/ConowayGameOfLife', language: 'C#', updatedAt: '2025-12-06' },
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
      pinnedProjects: 'PINNED PROJECTS',
      viewMoreProjects: 'View More Projects',
      viewRepo: 'View',
      allRepositories: 'ALL REPOSITORIES',
      swipeHint: 'Swipe to browse',
      moreTags: 'more'
    },
    pl: {
      sectionTitle: '$ ls -la ~/projects',
      repositories: 'Repozytoria',
      pinnedProjects: 'PRZYPIĘTE PROJEKTY',
      viewMoreProjects: 'Zobacz więcej projektów',
      viewRepo: 'Zobacz',
      allRepositories: 'WSZYSTKIE REPOZYTORIA',
      swipeHint: 'Przesuń, aby przeglądać',
      moreTags: 'więcej'
    }
  }[language];

  const formatUpdated = (iso: string, lang: 'en' | 'pl') => {
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
          <div className="min-w-0 flex items-center gap-2">
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
            <div className="flex items-center gap-1" style={{ color: getLanguageColor(project.language) }}>
              <div
                className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
                style={{ backgroundColor: getLanguageColor(project.language) }}
              />
              <span>{project.language}</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{project.stars}</span>
            </div>

            <div className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              <span>{project.forks}</span>
            </div>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 rounded px-3 py-2 text-[10px] code-font text-[var(--accent-blue)] transition-colors hover:bg-[var(--hover-overlay)] sm:text-xs ${
              mobile ? 'w-full justify-center' : 'shrink-0'
            }`}
          >
            <ExternalLink className="h-3 w-3" />
            {ui.viewRepo}
          </a>
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
                <h3 className="text-sm code-font text-[var(--text-secondary)]">{ui.pinnedProjects}</h3>
                <p className="mt-1 text-xs code-font text-[var(--text-muted)] lg:hidden">{ui.swipeHint}</p>
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

            {/* MOBILE */}
            <div className="lg:hidden overflow-x-auto px-0 pb-3 snap-x snap-mandatory">
              <div className="flex gap-4 pr-4">
                {pinnedProjects.map((project, index) => (
                  <ProjectCard key={project.name} project={project} index={index} mobile />
                ))}
              </div>
            </div>

            {/* DESKTOP */}
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
                  <h3 className="text-sm code-font text-[var(--text-secondary)]">{ui.allRepositories}</h3>
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
                      <div className="mb-1 flex items-center gap-2">
                        <BookOpen className="h-3 w-3 shrink-0 text-[var(--text-secondary)]" />
                        <span className="truncate text-sm code-font text-[var(--accent-blue)]">{repo.name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px]">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="code-font text-[var(--text-secondary)]">{repo.language}</span>
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
                <h3 className="text-sm code-font text-[var(--text-secondary)]">{ui.repositories}</h3>
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
                    className={`block rounded border px-3 py-2 transition-colors ${
                      selectedRepo === repo.name
                        ? 'border-[var(--accent-blue)] bg-[var(--selected-overlay)]'
                        : 'border-transparent hover:bg-[var(--hover-overlay)]'
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <BookOpen className="h-3 w-3 text-[var(--text-secondary)]" />
                      <span className="truncate text-sm code-font text-[var(--accent-blue)]">{repo.name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span className="code-font text-[var(--text-secondary)]">{repo.language}</span>
                      <span className="text-[var(--text-muted)]">·</span>
                      <span className="code-font text-[var(--text-muted)]">
                        {formatUpdated(repo.updatedAt, language)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
