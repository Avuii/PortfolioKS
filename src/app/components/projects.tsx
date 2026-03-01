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
      swipeHint: 'Swipe to browse'
    },
    pl: {
      sectionTitle: '$ ls -la ~/projects',
      repositories: 'Repozytoria',
      pinnedProjects: 'PRZYPIĘTE PROJEKTY',
      viewMoreProjects: 'Zobacz więcej projektów',
      viewRepo: 'Zobacz',
      allRepositories: 'WSZYSTKIE REPOZYTORIA',
      swipeHint: 'Przesuń, aby przeglądać'
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
    <motion.div
      key={project.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-default)] overflow-hidden hover:border-[var(--accent-blue)] transition-all group ${
        mobile ? 'min-w-[88%] snap-center' : ''
      }`}
    >
      <div className="px-4 sm:px-6 py-4 border-b border-[var(--border-default)]">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="w-4 h-4 text-[var(--accent-blue)] shrink-0" />
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="code-font text-[var(--accent-blue)] group-hover:underline truncate"
            >
              {project.name}
            </a>
          </div>

          <span className="px-2 py-0.5 border border-[var(--border-default)] rounded text-[10px] sm:text-xs code-font text-[var(--text-secondary)] shrink-0">
            {project.visibility[language]}
          </span>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4">
        <p className={`text-sm text-[var(--text-secondary)] mb-4 leading-relaxed ${mobile ? 'min-h-[96px]' : 'min-h-[72px]'}`}>
          {project.description[language]}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--accent-blue)] text-[var(--accent-blue)] text-[10px] sm:text-xs rounded code-font"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--border-default)]">
          <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs code-font text-[var(--text-secondary)] flex-wrap">
            <div className="flex items-center gap-1" style={{ color: getLanguageColor(project.language) }}>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: getLanguageColor(project.language) }} />
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

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-[10px] sm:text-xs text-[var(--accent-blue)] hover:bg-[var(--hover-overlay)] rounded transition-colors code-font shrink-0"
          >
            <ExternalLink className="w-3 h-3" />
            {ui.viewRepo}
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-blue)]" />
            <h2 className="text-2xl sm:text-3xl code-font text-[var(--text-primary)] break-all">
              {ui.sectionTitle}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* MAIN CONTENT FIRST ON MOBILE */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-sm text-[var(--text-secondary)] code-font">{ui.pinnedProjects}</h3>
                <p className="lg:hidden mt-1 text-xs text-[var(--text-muted)] code-font">{ui.swipeHint}</p>
              </div>

              <a
                href="https://github.com/Avuii?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-[var(--border-default)] text-[var(--accent-blue)] rounded-lg hover:bg-[var(--hover-overlay)] transition-colors code-font text-sm"
              >
                {ui.viewMoreProjects}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* MOBILE: horizontal swipe */}
            <div className="lg:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory pb-2">
              <div className="flex gap-4 w-max">
                {pinnedProjects.map((project, index) => (
                  <ProjectCard key={project.name} project={project} index={index} mobile />
                ))}
              </div>
            </div>

            {/* DESKTOP: grid */}
            <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 gap-6">
              {pinnedProjects.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </div>

          {/* REPOSITORIES */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 lg:col-span-1"
          >
            {/* MOBILE ACCORDION */}
            <div className="lg:hidden bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-default)] overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileReposOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <h3 className="code-font text-sm text-[var(--text-secondary)]">{ui.allRepositories}</h3>
                  <span className="px-2 py-1 bg-[var(--bg-tertiary)] rounded text-xs code-font text-[var(--text-secondary)]">
                    {repositoryList.length}
                  </span>
                </div>

                {mobileReposOpen ? (
                  <ChevronUp className="w-4 h-4 text-[var(--text-secondary)]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
                )}
              </button>

              {mobileReposOpen && (
                <div className="px-3 pb-3 space-y-2 border-t border-[var(--border-default)]">
                  {repositoryList.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSelectedRepo(repo.name)}
                      className={`block w-full text-left px-3 py-3 rounded-lg transition-colors ${
                        selectedRepo === repo.name
                          ? 'bg-[var(--selected-overlay)] border border-[var(--accent-blue)]'
                          : 'hover:bg-[var(--hover-overlay)] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-3 h-3 text-[var(--text-secondary)] shrink-0" />
                        <span className="text-sm code-font text-[var(--accent-blue)] truncate">{repo.name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px]">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                        <span className="text-[var(--text-secondary)] code-font">{repo.language}</span>
                      </div>

                      <div className="mt-1 text-[10px] text-[var(--text-muted)] code-font">
                        {formatUpdated(repo.updatedAt, language)}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* DESKTOP SIDEBAR */}
            <div className="hidden lg:block bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-default)] p-4 sticky top-24 max-h-[700px] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="code-font text-sm text-[var(--text-secondary)]">{ui.repositories}</h3>
                <span className="px-2 py-1 bg-[var(--bg-tertiary)] rounded text-xs code-font text-[var(--text-secondary)]">
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
                    className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedRepo === repo.name
                        ? 'bg-[var(--selected-overlay)] border border-[var(--accent-blue)]'
                        : 'hover:bg-[var(--hover-overlay)] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-3 h-3 text-[var(--text-secondary)]" />
                      <span className="text-sm code-font text-[var(--accent-blue)] truncate">{repo.name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                      <span className="text-[var(--text-secondary)] code-font">{repo.language}</span>
                      <span className="text-[var(--text-muted)]">·</span>
                      <span className="text-[var(--text-muted)] code-font">{formatUpdated(repo.updatedAt, language)}</span>
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
