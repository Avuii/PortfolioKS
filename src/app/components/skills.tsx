import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, ChevronRight, ChevronDown } from 'lucide-react';

interface SkillsProps {
  language: 'en' | 'pl';
}

type UsedInItem = {
  label: { en: string; pl: string };
  href?: string;
};

type SkillsCategory = {
  label: { en: string; pl: string };
  items: string[];
  usedIn: UsedInItem[];
  description: { en: string; pl: string };
  color: string;
};

const projects = {
  eurpln: {
    label: { en: 'EUR/PLN Tracker', pl: 'EUR/PLN Tracker' },
    href: 'https://github.com/Avuii/EUR-PLN-Tracker',
  },
  asteroid: {
    label: { en: 'AsteroidSafe', pl: 'AsteroidSafe' },
    href: 'https://github.com/Avuii/AsteroidSafe',
  },
  documind: {
    label: { en: 'DocuMind-AI', pl: 'DocuMind-AI' },
    href: 'https://github.com/Avuii/DocuMind-AI',
  },
  conway: {
    label: { en: "Conway's Game of Life", pl: 'Conway Game of Life' },
    href: 'https://github.com/Avuii/ConowayGameOfLife',
  },
  social: {
    label: { en: 'Social Networks', pl: 'Social Networks' },
    href: 'https://github.com/Avuii/Social-Networks',
  },
  banknote: {
    label: { en: 'Banknote Authentication', pl: 'Banknote Authentication' },
    href: 'https://github.com/Avuii/Banknote-Authentication',
  },
  iris: {
    label: { en: 'IRIS (PyTorch)', pl: 'IRIS (PyTorch)' },
    href: 'https://github.com/Avuii/IRIS',
  },
  som: {
    label: { en: 'SOM WTA/WTM', pl: 'SOM WTA/WTM' },
    href: 'https://github.com/Avuii/SOM-WTA-WTM-PyTorch',
  },
  fourier: {
    label: { en: 'Fourier Transform', pl: 'Transformata Fouriera' },
    href: 'https://github.com/Avuii/Fourier-Transform-Signal-Processing',
  },
  fuzzy: {
    label: { en: 'Fuzzy Logic', pl: 'Fuzzy Logic' },
    href: 'https://github.com/Avuii/Fuzzy-Logic',
  },
  traffic: {
    label: { en: 'Urban Traffic Simulator', pl: 'Urban Traffic Simulator' },
    href: 'https://github.com/Avuii/Urban-Traffic-Simulator',
  },
  grib: {
    label: { en: 'GRIB1 Decoder', pl: 'GRIB1 Decoder' },
    href: 'https://github.com/Avuii/GRIB1-388-Decoder',
  },
  lz77: {
    label: { en: 'LZ77', pl: 'LZ77' },
    href: 'https://github.com/Avuii/LZ77',
  },
  huffman: {
    label: { en: 'Huffman Compression', pl: 'Kompresja Huffmana' },
    href: 'https://github.com/Avuii/Huffman-text-compression',
  },
  plane: {
    label: { en: 'Plane & Wind Simulator', pl: 'Plane & Wind Simulator' },
    href: 'https://github.com/Avuii/PlaneAndWindSimulator',
  },
  snow: {
    label: { en: 'SnowGlobe', pl: 'SnowGlobe' },
    href: 'https://github.com/Avuii/SnowGlobe',
  },
  coffecrime: {
    label: { en: 'CoffeCrime', pl: 'CoffeCrime' },
    href: 'https://github.com/Avuii/CoffeCrime',
  },
} as const;

const skillsData = {
  CoreLanguages: {
    label: { en: 'Languages', pl: 'Języki programowania' },
    items: ['C#', 'Python', 'C++', 'TypeScript', 'JavaScript', 'SQL', 'GDScript', 'Java'],
    usedIn: [projects.eurpln, projects.conway, projects.traffic, projects.lz77, projects.grib, projects.coffecrime],
    description: {
      en: 'Main languages used across my .NET, web, data/ML, and algorithmic projects.',
      pl: 'Główne języki wykorzystywane w projektach .NET, web, data/ML oraz algorytmicznych.',
    },
    color: 'var(--accent-red)',
  },

  Backend: {
    label: { en: 'Backend', pl: 'Backend' },
    items: ['.NET', 'ASP.NET Core', 'Entity Framework Core', 'REST API', 'Swagger / OpenAPI', 'FastAPI', 'ONNX Runtime (.NET)'],
    usedIn: [projects.conway, projects.asteroid, projects.documind, projects.eurpln],
    description: {
      en: 'APIs and backend services for full-stack apps, including ONNX inference in .NET and Python services when needed.',
      pl: 'API i usługi backendowe do aplikacji full-stack — w tym inferencja ONNX w .NET oraz serwisy w Pythonie, gdy to ma sens.',
    },
    color: 'var(--accent-cyan)',
  },

  Frontend: {
    label: { en: 'Frontend', pl: 'Frontend' },
    items: ['React', 'Angular', 'Blazor', 'Vite', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3'],
    usedIn: [projects.eurpln, projects.asteroid, projects.documind, projects.conway, projects.snow],
    description: {
      en: 'Modern UI stack for responsive apps and interactive dashboards.',
      pl: 'Nowoczesny stack UI do responsywnych aplikacji i interaktywnych dashboardów.',
    },
    color: 'var(--accent-pink)',
  },

  Databases: {
    label: { en: 'Databases', pl: 'Bazy danych' },
    items: ['Microsoft SQL Server', 'PostgreSQL'],
    usedIn: [projects.conway, projects.documind],
    description: {
      en: 'Relational databases used for persistence, queries, and data workflows.',
      pl: 'Relacyjne bazy danych do persystencji, zapytań i pracy z danymi w aplikacjach.',
    },
    color: 'var(--accent-green)',
  },

  DataML: {
    label: { en: 'Data / ML', pl: 'Data / ML' },
    items: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'PyTorch', 'statsmodels', 'NetworkX'],
    usedIn: [projects.eurpln, projects.banknote, projects.iris, projects.som, projects.fourier, projects.social],
    description: {
      en: 'Tooling for analysis, modeling, forecasting, graphs, and ML experiments.',
      pl: 'Narzędzia do analizy, modelowania, prognozowania, grafów oraz eksperymentów ML.',
    },
    color: 'var(--accent-orange)',
  },

  Tools: {
    label: { en: 'Tools', pl: 'Narzędzia' },
    items: ['Git', 'GitHub Actions', 'Bitbucket', 'Jira', 'Docker', 'Docker Compose', 'LaTeX'],
    usedIn: [projects.documind, projects.eurpln, projects.conway],
    description: {
      en: 'Workflow, collaboration, CI, and containerized development.',
      pl: 'Workflow, współpraca, CI oraz development w kontenerach.',
    },
    color: 'var(--accent-blue)',
  },

  IDEs: {
    label: { en: 'IDEs', pl: 'IDE' },
    items: ['Visual Studio', 'VS Code', 'Rider', 'PyCharm', 'CLion'],
    usedIn: [
      { label: { en: '.NET projects', pl: 'projekty .NET' } },
      { label: { en: 'Web projects', pl: 'projekty web' } },
      { label: { en: 'C++ projects', pl: 'projekty C++' } },
    ],
    description: {
      en: 'Daily dev environments for .NET, web, Python, and C++ projects.',
      pl: 'Środowiska pracy do projektów .NET, web, Python i C++.',
    },
    color: 'var(--accent-purple)',
  },

  Creative: {
    label: { en: 'Creative / 3D', pl: 'Kreatywne / 3D' },
    items: ['Figma', 'Canva', 'Three.js', 'AutoCAD', '3ds Max', 'Aseprite', 'Godot'],
    usedIn: [projects.snow, projects.coffecrime],
    description: {
      en: 'UI/UX design, 3D, and visual prototyping tools used alongside development.',
      pl: 'Narzędzia do UI/UX, 3D i prototypowania wizualnego wykorzystywane obok kodu.',
    },
    color: 'var(--accent-purple)',
  },
} satisfies Record<string, SkillsCategory>;

type CategoryKey = keyof typeof skillsData;

export function Skills({ language }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('CoreLanguages');

  const ui = {
    en: {
      sectionTitle: '# Skills.json',
      terminalTitle: '$ git branch --all',
      skillsKey: 'skills',
      countKey: 'count',
      usedIn: 'USED IN:',
      notes: 'NOTES:',
      more: 'more',
    },
    pl: {
      sectionTitle: '# Umiejętności.json',
      terminalTitle: '$ git branch --all',
      skillsKey: 'umiejetnosci',
      countKey: 'liczba',
      usedIn: 'W PROJEKTACH:',
      notes: 'OPIS:',
      more: 'więcej',
    },
  }[language];

  const selected = skillsData[activeCategory];

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-blue)]" />
            <h2 className="text-2xl sm:text-3xl code-font text-[var(--text-primary)]">
              {ui.sectionTitle}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left side - Branch tree */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] p-4 sm:p-6 min-w-0"
          >
            <div className="code-font text-xs sm:text-sm text-[var(--text-secondary)] mb-4">
              {ui.terminalTitle}
            </div>

            <div className="space-y-2">
              {(Object.entries(skillsData) as [CategoryKey, SkillsCategory][]).map(([category, data]) => {
                const isOpen = activeCategory === category;

                return (
                  <div key={category} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`w-full flex items-center gap-2 px-3 sm:px-4 py-3 rounded transition-all min-w-0 ${
                        isOpen
                          ? 'bg-[var(--selected-overlay)] border border-[var(--accent-blue)]'
                          : 'hover:bg-[var(--hover-overlay)] border border-transparent'
                      }`}
                    >
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 shrink-0" style={{ color: data.color }} />
                      ) : (
                        <ChevronRight className="w-4 h-4 shrink-0" style={{ color: data.color }} />
                      )}

                      <span className="code-font text-[var(--text-primary)] truncate min-w-0">
                        {data.label[language]}
                      </span>

                      <div className="flex-1" />
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: data.color }} />
                    </button>

                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="ml-4 sm:ml-6 mt-2 space-y-1 overflow-hidden min-w-0"
                      >
                        {data.items.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-start gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-[var(--text-secondary)] code-font min-w-0"
                          >
                            <div className="w-2 h-2 rounded-full bg-[var(--border-default)] mt-1.5 shrink-0" />
                            <span className="break-words min-w-0">{skill}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right side - Skills.json viewer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden min-w-0"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2 text-xs sm:text-sm code-font text-[var(--text-secondary)] min-w-0">
                <Settings className="w-4 h-4 text-[var(--accent-blue)] shrink-0" />
                <span className="truncate">Skills.json</span>
              </div>
            </div>

            <div className="p-4 sm:p-6 min-w-0">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 min-w-0"
              >
                {/* JSON preview */}
                <div className="code-font text-xs sm:text-sm min-w-0">
                  <div className="overflow-x-auto">
                    <div className="min-w-[320px]">
                      <div className="text-[var(--text-secondary)]">{'{'}</div>
                      <div className="pl-4">
                        <div className="text-[var(--accent-blue)]">
                          "{selected.label[language]}":{' '}
                          <span className="text-[var(--text-secondary)]">{'{'}</span>
                        </div>

                        <div className="pl-4 space-y-1">
                          <div>
                            <span className="text-[var(--accent-purple)]">"{ui.skillsKey}"</span>
                            <span className="text-[var(--text-secondary)]">: [</span>
                          </div>

                          <div className="pl-4 space-y-1">
                            {selected.items.map((skill, index) => (
                              <div key={skill} className="text-[var(--accent-green)]">
                                "{skill}"{index < selected.items.length - 1 ? ',' : ''}
                              </div>
                            ))}
                          </div>

                          <div className="text-[var(--text-secondary)]">],</div>

                          <div>
                            <span className="text-[var(--accent-purple)]">"{ui.countKey}"</span>
                            <span className="text-[var(--text-secondary)]">: </span>
                            <span className="text-[var(--accent-orange)]">{selected.items.length}</span>
                          </div>
                        </div>

                        <div className="text-[var(--text-secondary)]">{'}'}</div>
                      </div>
                      <div className="text-[var(--text-secondary)]">{'}'}</div>
                    </div>
                  </div>
                </div>

                {/* Used in + Notes */}
                <div className="pt-6 border-t border-[var(--border-default)] min-w-0">
                  <div className="text-[10px] sm:text-xs text-[var(--text-secondary)] mb-2 code-font">
                    {ui.usedIn}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selected.usedIn.slice(0, 6).map((p, idx) => {
                      const chip = (
                        <span className="px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-[var(--text-primary)] text-[10px] sm:text-xs rounded code-font">
                          {p.label[language]}
                        </span>
                      );

                      return p.href ? (
                        <a
                          key={`${p.label.en}-${idx}`}
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:opacity-90"
                        >
                          {chip}
                        </a>
                      ) : (
                        <span key={`${p.label.en}-${idx}`}>{chip}</span>
                      );
                    })}

                    {selected.usedIn.length > 6 && (
                      <span className="px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-[var(--text-secondary)] text-[10px] sm:text-xs rounded code-font">
                        +{selected.usedIn.length - 6} {ui.more}
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] sm:text-xs text-[var(--text-secondary)] mb-2 code-font">
                    {ui.notes}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed break-words">
                    {selected.description[language]}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
