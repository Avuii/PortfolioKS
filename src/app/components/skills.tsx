import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import {
  BrainCircuit,
  Code2,
  Database,
  Layers3,
  MonitorSmartphone,
  Palette,
  Settings,
  type LucideIcon
} from 'lucide-react';

interface SkillsProps {
  language: 'en' | 'pl';
}

type UsedInItem = {
  label: { en: string; pl: string };
  href?: string;
};

type ModuleKey =
  | 'backend'
  | 'frontend'
  | 'ml'
  | 'databases'
  | 'algorithms'
  | 'creative';

type SkillModule = {
  key: ModuleKey;
  label: { en: string; pl: string };
  shortLabel: { en: string; pl: string };
  score: number;
  icon: LucideIcon;
  colorClass: string;
  glowClass: string;
  accentClass: string;
  items: string[];
  usedIn: UsedInItem[];
  description: { en: string; pl: string };
};

const projects = {
  eurpln: {
    label: { en: 'EUR/PLN Tracker', pl: 'EUR/PLN Tracker' },
    href: 'https://github.com/Avuii/EUR-PLN-Tracker'
  },
  asteroid: {
    label: { en: 'AsteroidSafe', pl: 'AsteroidSafe' },
    href: 'https://github.com/Avuii/AsteroidSafe'
  },
  documind: {
    label: { en: 'DocuMind-AI', pl: 'DocuMind-AI' },
    href: 'https://github.com/Avuii/DocuMind-AI'
  },
  conway: {
    label: { en: "Conway's Game of Life", pl: 'Conway Game of Life' },
    href: 'https://github.com/Avuii/ConwayGameOfLife'
  },
  social: {
    label: { en: 'Social Networks', pl: 'Social Networks' },
    href: 'https://github.com/Avuii/Social-Networks'
  },
  banknote: {
    label: { en: 'Banknote Authentication', pl: 'Banknote Authentication' },
    href: 'https://github.com/Avuii/Banknote-Authentication'
  },
  iris: {
    label: { en: 'IRIS (PyTorch)', pl: 'IRIS (PyTorch)' },
    href: 'https://github.com/Avuii/IRIS'
  },
  som: {
    label: { en: 'SOM WTA/WTM', pl: 'SOM WTA/WTM' },
    href: 'https://github.com/Avuii/SOM-WTA-WTM-PyTorch'
  },
  fourier: {
    label: { en: 'Fourier Transform', pl: 'Transformata Fouriera' },
    href: 'https://github.com/Avuii/Fourier-Transform-Signal-Processing'
  },
  fuzzy: {
    label: { en: 'Fuzzy Logic', pl: 'Logika rozmyta' },
    href: 'https://github.com/Avuii/Fuzzy-Logic'
  },
  traffic: {
    label: { en: 'Urban Traffic Simulator', pl: 'Urban Traffic Simulator' },
    href: 'https://github.com/Avuii/Urban-Traffic-Simulator'
  },
  grib: {
    label: { en: 'GRIB1 Decoder', pl: 'Dekoder GRIB1' },
    href: 'https://github.com/Avuii/GRIB1-388-Decoder'
  },
  lz77: {
    label: { en: 'LZ77', pl: 'LZ77' },
    href: 'https://github.com/Avuii/LZ77'
  },
  huffman: {
    label: { en: 'Huffman Compression', pl: 'Kompresja Huffmana' },
    href: 'https://github.com/Avuii/Huffman-text-compression'
  },
  plane: {
    label: { en: 'Plane & Wind Simulator', pl: 'Plane & Wind Simulator' },
    href: 'https://github.com/Avuii/PlaneAndWindSimulator'
  },
  snow: {
    label: { en: 'SnowGlobe', pl: 'SnowGlobe' },
    href: 'https://github.com/Avuii/SnowGlobe'
  },
  coffecrime: {
    label: { en: 'CoffeCrime', pl: 'CoffeCrime' },
    href: 'https://github.com/Avuii/CoffeCrime'
  },
  xor: {
    label: { en: 'XOR Classification', pl: 'Klasyfikacja XOR' },
    href: 'https://github.com/Avuii/XOR-Classification-with-MLP'
  },
  ac: {
    label: { en: 'AC Letter Recognition', pl: 'Rozpoznawanie liter A/C' },
    href: 'https://github.com/Avuii/AC-letter-recognition'
  },
  demon: {
    label: { en: 'DemonCreutz Ising2D', pl: 'DemonCreutz Ising2D' },
    href: 'https://github.com/Avuii/DemonCreutz-Ising2D'
  },
  algorithmsRepo: {
    label: { en: 'Algorithms', pl: 'Algorytmy' },
    href: 'https://github.com/Avuii/Algorithms'
  },
  portfolioKs: {
    label: { en: 'PortfolioKS', pl: 'PortfolioKS' },
    href: 'https://github.com/Avuii/PortfolioKS'
  },
  portfolioOld2: {
    label: { en: 'KatarzynaStanczyk', pl: 'KatarzynaStanczyk' },
    href: 'https://github.com/Avuii/KatarzynaStanczyk'
  },
  portfolioOld1: {
    label: { en: 'portfolio', pl: 'portfolio' },
    href: 'https://github.com/Avuii/portfolio'
  }
} as const;

const deheusWork: UsedInItem = {
  label: { en: 'De Heus internal apps', pl: 'Aplikacje wewnętrzne De Heus' }
};

const modules: SkillModule[] = [
  {
    key: 'backend',
    label: { en: 'Backend & APIs', pl: 'Backend i API' },
    shortLabel: { en: 'Backend', pl: 'Backend' },
    score: 10,
    icon: Layers3,
    colorClass: 'text-[var(--accent-cyan)]',
    glowClass: 'shadow-[0_0_24px_rgba(57,197,207,0.18)]',
    accentClass: 'border-[var(--accent-cyan)]/50',
    items: [
      'C#',
      '.NET',
      'ASP.NET Core',
      'Entity Framework Core',
      'REST API',
      'Swagger / OpenAPI',
      'FastAPI',
      'ONNX Runtime (.NET)'
    ],
    usedIn: [projects.conway, projects.documind, projects.eurpln, projects.asteroid, deheusWork],
    description: {
      en: 'I build APIs, backend logic, DTO-based data flows, service integrations, and business-oriented application backends in .NET and Python.',
      pl: 'Tworzę API, logikę backendową, przepływy danych oparte o DTO, integracje usług oraz backendy aplikacji biznesowych w .NET i Pythonie.'
    }
  },
  {
    key: 'frontend',
    label: { en: 'Frontend & UI', pl: 'Frontend i UI' },
    shortLabel: { en: 'Frontend', pl: 'Frontend' },
    score: 9,
    icon: MonitorSmartphone,
    colorClass: 'text-[var(--accent-pink)]',
    glowClass: 'shadow-[0_0_24px_rgba(255,123,114,0.18)]',
    accentClass: 'border-[var(--accent-pink)]/50',
    items: [
      'React',
      'TypeScript',
      'Angular',
      'Blazor',
      'Vite',
      'Tailwind CSS',
      'HTML5 / CSS3'
    ],
    usedIn: [
      projects.eurpln,
      projects.asteroid,
      projects.documind,
      projects.conway,
      projects.portfolioKs,
      projects.portfolioOld2,
      projects.portfolioOld1
    ],
    description: {
      en: 'I create responsive interfaces, dashboards, portfolio sections, and polished app views with a focus on clarity, interaction, and visual structure.',
      pl: 'Tworzę responsywne interfejsy, dashboardy, sekcje portfolio oraz dopracowane widoki aplikacji z naciskiem na czytelność, interakcję i dobrą strukturę wizualną.'
    }
  },
  {
    key: 'ml',
    label: { en: 'Data / ML / Analysis', pl: 'Data / ML / Analiza' },
    shortLabel: { en: 'Data / ML', pl: 'Data / ML' },
    score: 8,
    icon: BrainCircuit,
    colorClass: 'text-[var(--accent-orange)]',
    glowClass: 'shadow-[0_0_24px_rgba(249,115,22,0.18)]',
    accentClass: 'border-[var(--accent-orange)]/50',
    items: [
      'Python',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'PyTorch',
      'statsmodels',
      'NetworkX'
    ],
    usedIn: [
      projects.eurpln,
      projects.asteroid,
      projects.banknote,
      projects.iris,
      projects.som,
      projects.social,
      projects.fourier,
      projects.xor,
      projects.ac,
      projects.plane
    ],
    description: {
      en: 'I work on forecasting, classification, neural networks, graph analysis, and experiment-driven data workflows used in both academic and portfolio projects.',
      pl: 'Pracuję nad prognozowaniem, klasyfikacją, sieciami neuronowymi, analizą grafów oraz eksperymentalnymi workflow danych w projektach uczelnianych i portfolio.'
    }
  },
  {
    key: 'databases',
    label: { en: 'Databases', pl: 'Bazy danych' },
    shortLabel: { en: 'Databases', pl: 'Bazy danych' },
    score: 8,
    icon: Database,
    colorClass: 'text-[var(--accent-green)]',
    glowClass: 'shadow-[0_0_24px_rgba(63,185,80,0.18)]',
    accentClass: 'border-[var(--accent-green)]/50',
    items: [
      'SQL',
      'Microsoft SQL Server',
      'PostgreSQL'
    ],
    usedIn: [projects.conway, projects.documind, deheusWork],
    description: {
      en: 'I use relational databases for persistence, querying, entity modeling, and application data flows in both web systems and internal tools.',
      pl: 'Korzystam z relacyjnych baz danych do persystencji, zapytań, modelowania encji oraz przepływu danych zarówno w systemach webowych, jak i narzędziach wewnętrznych.'
    }
  },
  {
    key: 'algorithms',
    label: { en: 'Algorithms', pl: 'Algorytmy' },
    shortLabel: { en: 'Algorithms', pl: 'Algorytmy' },
    score: 8,
    icon: Code2,
    colorClass: 'text-[var(--accent-indigo)]',
    glowClass: 'shadow-[0_0_24px_rgba(124,134,255,0.18)]',
    accentClass: 'border-[var(--accent-indigo)]/50',
    items: [
      'C++',
      'STL',
      'Data Structures',
      'Compression Algorithms',
      'Signal Processing',
      'Parsing / Binary Formats',
      'CLI Applications'
    ],
    usedIn: [
      projects.algorithmsRepo,
      projects.grib,
      projects.lz77,
      projects.huffman,
      projects.fourier,
      projects.plane,
      projects.fuzzy
    ],
    description: {
      en: 'I build algorithmic and systems-oriented projects in C++, including compression, signal processing, simulation, and work with structured binary data.',
      pl: 'Tworzę projekty algorytmiczne i systemowe w C++, obejmujące kompresję, przetwarzanie sygnałów, symulacje oraz pracę ze strukturalnymi danymi binarnymi.'
    }
  },
  {
    key: 'creative',
    label: { en: 'Creative / Design / 3D', pl: 'Creative / Design / 3D' },
    shortLabel: { en: 'Creative', pl: 'Creative' },
    score: 7,
    icon: Palette,
    colorClass: 'text-[var(--accent-purple)]',
    glowClass: 'shadow-[0_0_24px_rgba(188,140,255,0.18)]',
    accentClass: 'border-[var(--accent-purple)]/50',
    items: [
      'Figma',
      'Canva',
      'UI / UX Design',
      'Three.js',
      '3ds Max',
      'AutoCAD',
      'Aseprite',
      'Godot'
    ],
    usedIn: [
      projects.portfolioKs,
      projects.portfolioOld2,
      projects.portfolioOld1,
      projects.snow,
      projects.coffecrime
    ],
    description: {
      en: 'I use creative tools for UI concepts, portfolio visuals, interactive web visuals, prototyping, and selected 3D or game-oriented work.',
      pl: 'Korzystam z narzędzi kreatywnych do konceptów UI, wizualizacji portfolio, interaktywnych form webowych, prototypowania oraz wybranych prac 3D i game-dev.'
    }
  }
];

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function buildBar(value: number, max = 10) {
  const safe = Math.max(0, Math.min(value, max));
  const filled = '█'.repeat(safe);
  const empty = '░'.repeat(max - safe);
  return `[${filled}${empty}]`;
}

export function Skills({ language }: SkillsProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.35 });
  const hasStartedRef = useRef(false);
  const cancelledRef = useRef(false);

  const [typedCommand, setTypedCommand] = useState('');
  const [visibleLines, setVisibleLines] = useState(0);
  const [scores, setScores] = useState<number[]>(modules.map(() => 0));
  const [selectedKey, setSelectedKey] = useState<ModuleKey>('backend');
  const [phase, setPhase] = useState<'idle' | 'typing' | 'scanning' | 'done'>('idle');
  const [dots, setDots] = useState('');

  const ui = {
    en: {
      sectionTitle: '$ ./skills-scan.exe',
      terminalFile: 'skills-scan',
      command: '> scan --profile avui.dev',
      loading: 'Loading modules',
      completed: 'Scan complete. Select a module to inspect details.',
      selectedLabel: 'Selected module',
      technologies: 'TECHNOLOGIES',
      projects: 'USED IN',
      notes: 'NOTES',
      stats: 'coverage',
      tapHint: 'tap to inspect',
      clickHint: 'click to inspect'
    },
    pl: {
      sectionTitle: '$ ./skills-scan.exe',
      terminalFile: 'skills-scan',
      command: '> scan --profile avui.dev',
      loading: 'Ładowanie modułów',
      completed: 'Skan zakończony. Wybierz moduł, aby zobaczyć szczegóły.',
      selectedLabel: 'Wybrany moduł',
      technologies: 'TECHNOLOGIE',
      projects: 'W PROJEKTACH',
      notes: 'OPIS',
      stats: 'pokrycie',
      tapHint: 'dotknij, aby zobaczyć',
      clickHint: 'kliknij, aby zobaczyć'
    }
  }[language];

  const selectedModule = useMemo(
    () => modules.find((module) => module.key === selectedKey) ?? modules[0],
    [selectedKey]
  );

  useEffect(() => {
    if (!isInView || hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    cancelledRef.current = false;

    let dotsIntervalId: number | undefined;

    const runScan = async () => {
      const command = ui.command;
      setPhase('typing');

      for (let index = 1; index <= command.length; index += 1) {
        if (cancelledRef.current) return;
        setTypedCommand(command.slice(0, index));
        await sleep(randomBetween(18, 42));
      }

      if (cancelledRef.current) return;
      await sleep(260);
      setPhase('scanning');

      dotsIntervalId = window.setInterval(() => {
        setDots((prev) => {
          if (prev.length >= 3) return '';
          return `${prev}.`;
        });
      }, 280);

      for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex += 1) {
        if (cancelledRef.current) return;

        const module = modules[moduleIndex];
        setVisibleLines((prev) => Math.max(prev, moduleIndex + 1));
        setSelectedKey(module.key);
        await sleep(120);

        let current = 0;
        while (current < module.score) {
          if (cancelledRef.current) return;

          const step = Math.random() > 0.78 ? 2 : 1;
          current = Math.min(module.score, current + step);

          setScores((prev) => {
            const next = [...prev];
            next[moduleIndex] = current;
            return next;
          });

          await sleep(randomBetween(70, 125));
        }

        await sleep(randomBetween(140, 220));
      }

      if (dotsIntervalId) {
        window.clearInterval(dotsIntervalId);
      }

      setDots('...');
      await sleep(180);
      if (cancelledRef.current) return;
      setPhase('done');
    };

    void runScan();

    return () => {
      cancelledRef.current = true;
      if (dotsIntervalId) {
        window.clearInterval(dotsIntervalId);
      }
    };
  }, [isInView, ui.command]);

  const cursorVisible = phase === 'typing';

  return (
    <section ref={containerRef} className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <div className="mb-3 flex items-center gap-3">
            <Settings className="h-5 w-5 text-[var(--accent-slate)] sm:h-6 sm:w-6" />
            <h2 className="code-font text-2xl text-[var(--text-primary)] sm:text-3xl">
              {ui.sectionTitle}
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center gap-2 border-b border-[var(--border-default)] bg-[var(--bg-tertiary)] px-4 py-3 sm:px-5">
              <span className="h-3 w-3 rounded-full bg-[var(--accent-red)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--accent-yellow)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--accent-green)]" />
              <span className="ml-2 code-font text-xs text-[var(--text-secondary)] sm:text-sm">
                {ui.terminalFile}
              </span>
            </div>

            <div className="p-4 sm:p-5 md:p-6">
              <div className="mb-3 min-h-[24px] break-all code-font text-[11px] text-[var(--accent-green)] sm:text-sm md:text-[15px]">
                <span>{typedCommand}</span>
                <span
                  className={`ml-0.5 inline-block h-[1em] w-[8px] translate-y-[2px] bg-[var(--accent-green)] ${
                    cursorVisible ? 'animate-pulse' : 'opacity-0'
                  }`}
                />
              </div>

              <div className="mb-5 min-h-[20px] code-font text-[11px] text-[var(--text-secondary)] sm:text-sm">
                {phase !== 'idle' && (
                  <span>
                    {ui.loading}
                    {phase === 'done' ? '...' : dots}
                  </span>
                )}
              </div>

              <div className="space-y-3 sm:space-y-2.5">
                <AnimatePresence>
                  {modules.slice(0, visibleLines).map((module, index) => {
                    const currentScore = scores[index];
                    const isSelected = selectedKey === module.key;
                    const Icon = module.icon;

                    return (
                      <motion.button
                        key={module.key}
                        type="button"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        whileHover={{ x: 2 }}
                        onClick={() => setSelectedKey(module.key)}
                        className={`w-full rounded-xl border px-3 py-3 text-left transition-all sm:px-4 sm:py-3 ${
                          isSelected
                            ? `bg-[var(--selected-overlay)] ${module.accentClass} ${module.glowClass}`
                            : 'border-transparent hover:border-[var(--border-default)] hover:bg-[var(--hover-overlay)]'
                        }`}
                      >
                        <div className="hidden items-center gap-3 sm:flex">
                          <Icon className={`h-4 w-4 ${module.colorClass}`} />
                          <span className="code-font whitespace-pre text-sm text-[var(--text-primary)]">
                            {buildBar(currentScore)}
                          </span>
                          <span className="code-font text-sm text-[var(--text-primary)]">
                            {module.label[language]}
                          </span>
                          <span className="ml-auto code-font text-xs text-[var(--text-secondary)]">
                            {currentScore}/10
                          </span>
                        </div>

                        <div className="sm:hidden">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${module.colorClass}`} />
                              <span className="code-font text-xs text-[var(--text-primary)]">
                                {module.label[language]}
                              </span>
                            </div>
                            <span className="code-font text-[10px] text-[var(--text-secondary)]">
                              {currentScore}/10
                            </span>
                          </div>
                          <div className="overflow-x-auto">
                            <div className="min-w-max code-font text-xs text-[var(--text-primary)]">
                              {buildBar(currentScore)}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="mt-5 min-h-[22px] code-font text-[11px] text-[var(--accent-cyan)] sm:text-sm">
                {phase === 'done'
                  ? ui.completed
                  : phase === 'scanning'
                    ? `${ui.loading}${dots}`
                    : ''}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)]"
          >
            <div className="border-b border-[var(--border-default)] bg-[var(--bg-tertiary)] px-4 py-3 sm:px-5">
              <div className="code-font text-xs text-[var(--text-secondary)] sm:text-sm">
                {ui.selectedLabel}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedModule.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="p-4 sm:p-5 md:p-6"
              >
                <div className="mb-5 flex items-start gap-3">
                  <div
                    className={`rounded-xl border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-3 ${selectedModule.glowClass}`}
                  >
                    <selectedModule.icon className={`h-5 w-5 ${selectedModule.colorClass}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                      {selectedModule.label[language]}
                    </h3>
                    <div className="mt-1 code-font text-xs text-[var(--text-secondary)] sm:text-sm">
                      {buildBar(selectedModule.score)}{' '}
                      <span className="ml-2">{selectedModule.score}/10</span>
                    </div>
                  </div>
                </div>

                <div className="mb-5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-4">
                  <div className="mb-2 code-font text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:text-xs">
                    {ui.notes}
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-primary)] sm:text-[15px]">
                    {selectedModule.description[language]}
                  </p>
                </div>

                <div className="mb-5">
                  <div className="mb-3 code-font text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:text-xs">
                    {ui.technologies}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedModule.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-3 py-1.5 text-xs text-[var(--text-primary)] sm:text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="code-font text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:text-xs">
                      {ui.projects}
                    </div>
                    <div className="code-font text-[10px] text-[var(--text-secondary)] sm:text-xs">
                      <span className="sm:hidden">{ui.tapHint}</span>
                      <span className="hidden sm:inline">{ui.clickHint}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedModule.usedIn.map((project) => {
                      const chip = (
                        <span className="inline-flex items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-3 py-1.5 text-xs text-[var(--text-primary)] transition-all hover:border-[var(--border-active)] hover:bg-[var(--hover-overlay)] sm:text-sm">
                          {project.label[language]}
                        </span>
                      );

                      return project.href ? (
                        <a key={project.label.en} href={project.href} target="_blank" rel="noreferrer">
                          {chip}
                        </a>
                      ) : (
                        <span key={project.label.en}>{chip}</span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
