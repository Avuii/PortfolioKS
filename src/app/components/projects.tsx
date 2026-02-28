import { useState } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, Star, GitFork, ExternalLink, BookOpen } from 'lucide-react';

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

  // ✅ poprawione
  { name: 'SnowGlobe', url: 'https://github.com/Avuii/SnowGlobe', language: 'HTML', updatedAt: '2025-11-07' },

  { name: 'DemonCreutz-Ising2D', url: 'https://github.com/Avuii/DemonCreutz-Ising2D', language: 'Python', updatedAt: '2025-11-07' },
  { name: 'Urban-Traffic-Simulator', url: 'https://github.com/Avuii/Urban-Traffic-Simulator', language: 'C++', updatedAt: '2025-10-15' },
  { name: 'GRIB1-388-Decoder', url: 'https://github.com/Avuii/GRIB1-388-Decoder', language: 'C++', updatedAt: '2025-10-15' },

  // ✅ poprawione
  { name: 'CoffeCrime', url: 'https://github.com/Avuii/CoffeCrime', language: 'GDScript', updatedAt: '2025-07-13' },

  { name: 'LZ77', url: 'https://github.com/Avuii/LZ77', language: 'C++', updatedAt: '2025-07-13' },
  { name: 'PlaneAndWindSimulator', url: 'https://github.com/Avuii/PlaneAndWindSimulator', language: 'C++', updatedAt: '2025-06-04' },
  { name: 'Huffman-text-compression', url: 'https://github.com/Avuii/Huffman-text-compression', language: 'C++', updatedAt: '2025-06-04' },
  { name: 'Algorithms', url: 'https://github.com/Avuii/Algorithms', language: 'C++', updatedAt: '2025-06-04' }
] as const;

export function Projects({ language }: ProjectsProps) {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  const ui = {
    en: {
      sectionTitle: '$ ls -la ~/projects',
      repositories: 'Repositories',
      pinnedProjects: 'PINNED PROJECTS',
      viewMoreProjects: 'View More Projects',
      viewRepo: 'View'
    },
    pl: {
      sectionTitle: '$ ls -la ~/projects',
      repositories: 'Repozytoria',
      pinnedProjects: 'PRZYPIĘTE PROJEKTY',
      viewMoreProjects: 'Zobacz więcej projektów',
      viewRepo: 'Zobacz'
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

  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <FolderGit2 className="w-6 h-6 text-[var(--accent-blue)]" />
            <h2 className="text-3xl code-font text-[var(--text-primary)]">{ui.sectionTitle}</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] p-4 sticky top-24 max-h-[700px] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="code-font text-sm text-[var(--text-secondary)]">{ui.repositories}</h3>
                <span className="px-2 py-1 bg-[var(--bg-tertiary)] rounded text-xs code-font text-[var(--text-secondary)]">
                  {repositoryList.length}
                </span>
              </div>

              <div className="space-y-2">
                {repositoryList.map((repo) => (
                  <button
                    key={repo.name}
                    type="button"
                    onClick={() => {
                      setSelectedRepo(repo.name);
                      window.open(repo.url, '_blank');
                    }}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
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
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm text-[var(--text-secondary)] code-font">{ui.pinnedProjects}</h3>

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
              {pinnedProjects.map((project, index) => (
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

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 text-xs text-[var(--accent-blue)] hover:bg-[var(--hover-overlay)] rounded transition-colors code-font"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {ui.viewRepo}
                      </a>
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