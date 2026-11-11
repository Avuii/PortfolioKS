import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import {
  Bot,
  BrainCircuit,
  Building2,
  Code2,
  Database,
  FlaskConical,
  GitBranch,
  Laptop2,
  Languages,
  Layers3,
  MonitorSmartphone,
  Palette,
  Settings,
  ShieldCheck,
  Terminal,
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
  | 'languages'
  | 'backend'
  | 'security'
  | 'frontend'
  | 'databases'
  | 'ml'
  | 'testing'
  | 'devops'
  | 'enterprise'
  | 'scripting'
  | 'aiTools'
  | 'ides'
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

// Public repositories linked from the skills panel.
// Internal work and the private engineering thesis do not have invented GitHub links.
const projects = {
  nearEarth: { label: { en: 'NearEarth', pl: 'NearEarth' }, href: 'https://github.com/Avuii/NearEarth' },
  trackMyCv: { label: { en: 'TrackMyCV', pl: 'TrackMyCV' }, href: 'https://github.com/Avuii/TrackMyCV' },
  stockPriceBot: { label: { en: 'StockPriceBot', pl: 'StockPriceBot' }, href: 'https://github.com/Avuii/StockPriceBot' },
  parkingFlow: { label: { en: 'ParkingFlow', pl: 'ParkingFlow' }, href: 'https://github.com/Avuii/ParkingFlow' },
  reactCalculator: { label: { en: 'React Scientific Calculator', pl: 'React Scientific Calculator' }, href: 'https://github.com/Avuii/react-scientific-calculator' },
  mediaRent: { label: { en: 'MediaRent', pl: 'MediaRent' }, href: 'https://github.com/Avuii/MediaRent' },
  fractalAnimation: { label: { en: 'FractalAnimation', pl: 'FractalAnimation' }, href: 'https://github.com/Avuii/FractalAnimation' },
  eurpln: { label: { en: 'EUR/PLN Tracker', pl: 'EUR/PLN Tracker' }, href: 'https://github.com/Avuii/EUR-PLN-Tracker' },
  careQuest: { label: { en: 'CareQuest', pl: 'CareQuest' }, href: 'https://github.com/Avuii/CareQuest' },
  documind: { label: { en: 'DocuMind-AI', pl: 'DocuMind-AI' }, href: 'https://github.com/Avuii/DocuMind-AI' },
  conway: { label: { en: "Conway's Game of Life", pl: 'Conway Game of Life' }, href: 'https://github.com/Avuii/ConowayGameOfLife' },
  social: { label: { en: 'Social Networks', pl: 'Social Networks' }, href: 'https://github.com/Avuii/Social-Networks' },
  banknote: { label: { en: 'Banknote Authentication', pl: 'Banknote Authentication' }, href: 'https://github.com/Avuii/Banknote-Authentication' },
  iris: { label: { en: 'IRIS (PyTorch)', pl: 'IRIS (PyTorch)' }, href: 'https://github.com/Avuii/IRIS' },
  som: { label: { en: 'SOM WTA/WTM', pl: 'SOM WTA/WTM' }, href: 'https://github.com/Avuii/SOM-WTA-WTM-PyTorch' },
  fourier: { label: { en: 'Fourier Transform', pl: 'Transformata Fouriera' }, href: 'https://github.com/Avuii/Fourier-Transform-Signal-Processing' },
  fuzzy: { label: { en: 'Fuzzy Logic', pl: 'Logika rozmyta' }, href: 'https://github.com/Avuii/Fuzzy-Logic' },
  traffic: { label: { en: 'Urban Traffic Simulator', pl: 'Urban Traffic Simulator' }, href: 'https://github.com/Avuii/Urban-Traffic-Simulator' },
  grib: { label: { en: 'GRIB1 Decoder', pl: 'Dekoder GRIB1' }, href: 'https://github.com/Avuii/GRIB1-388-Decoder' },
  lz77: { label: { en: 'LZ77', pl: 'LZ77' }, href: 'https://github.com/Avuii/LZ77' },
  huffman: { label: { en: 'Huffman Compression', pl: 'Kompresja Huffmana' }, href: 'https://github.com/Avuii/Huffman-text-compression' },
  plane: { label: { en: 'Plane & Wind Simulator', pl: 'Plane & Wind Simulator' }, href: 'https://github.com/Avuii/PlaneAndWindSimulator' },
  snow: { label: { en: 'SnowGlobe', pl: 'SnowGlobe' }, href: 'https://github.com/Avuii/SnowGlobe' },
  coffecrime: { label: { en: 'CoffeCrime', pl: 'CoffeCrime' }, href: 'https://github.com/Avuii/CoffeCrime' },
  xor: { label: { en: 'XOR Classification', pl: 'Klasyfikacja XOR' }, href: 'https://github.com/Avuii/XOR-Classification-with-MLP' },
  ac: { label: { en: 'AC Letter Recognition', pl: 'Rozpoznawanie liter A/C' }, href: 'https://github.com/Avuii/AC-letter-recognition' },
  demon: { label: { en: 'DemonCreutz Ising2D', pl: 'DemonCreutz Ising2D' }, href: 'https://github.com/Avuii/DemonCreutz-Ising2D' },
  algorithmsRepo: { label: { en: 'Algorithms', pl: 'Algorytmy' }, href: 'https://github.com/Avuii/Algorithms' },
  portfolioKs: { label: { en: 'PortfolioKS', pl: 'PortfolioKS' }, href: 'https://github.com/Avuii/PortfolioKS' },
  portfolioOld2: { label: { en: 'KatarzynaStanczyk', pl: 'KatarzynaStanczyk' }, href: 'https://github.com/Avuii/KatarzynaStanczyk' },
  portfolioOld1: { label: { en: 'portfolio', pl: 'portfolio' }, href: 'https://github.com/Avuii/portfolio' }
} as const;

const deheusWork: UsedInItem = {
  label: { en: 'De Heus · internal business apps', pl: 'De Heus · aplikacje biznesowe' }
};

const ksefThesis: UsedInItem = {
  label: { en: 'KSeF Manager · engineering thesis', pl: 'KSeF Manager · praca inżynierska' }
};

const devWorkflow: UsedInItem = {
  label: { en: 'Daily development workflow', pl: 'Codzienna praca programistyczna' }
};

const universityProjects: UsedInItem = {
  label: { en: 'University & portfolio projects', pl: 'Projekty uczelniane i portfolio' }
};

// The ratings retain the original terminal scan aesthetic and are editable self-assessments.
const modules: SkillModule[] = [
  {
    key: 'languages',
    label: { en: 'Programming Languages', pl: 'Języki programowania' },
    shortLabel: { en: 'Languages', pl: 'Języki' },
    score: 9,
    icon: Languages,
    colorClass: 'text-[var(--accent-indigo)]',
    glowClass: 'shadow-[0_0_24px_rgba(124,134,255,0.18)]',
    accentClass: 'border-[var(--accent-indigo)]/50',
    items: [
      'C#',
      'C++',
      'Python',
      'TypeScript',
      'JavaScript',
      'PHP',
      'Pascal',
    ],
    usedIn: [projects.nearEarth, projects.mediaRent, projects.fractalAnimation, projects.reactCalculator, projects.trackMyCv],
    description: {
      en: 'I work across typed backend and frontend languages as well as C++ algorithmic programs, Python workflows, and university projects.',
      pl: 'Pracuję z językami typowanymi po stronie backendu i frontendu, a także z C++ w projektach algorytmicznych i Pythonem w analizie danych.'
    }
  },
  {
    key: 'backend',
    label: { en: 'Backend & Frameworks', pl: 'Backend i frameworki' },
    shortLabel: { en: 'Backend', pl: 'Backend' },
    score: 10,
    icon: Layers3,
    colorClass: 'text-[var(--accent-cyan)]',
    glowClass: 'shadow-[0_0_24px_rgba(57,197,207,0.18)]',
    accentClass: 'border-[var(--accent-cyan)]/50',
    items: [
      '.NET',
      'ASP.NET Core',
      'Entity Framework Core',
      'LINQ',
      'REST API',
      'Blazor',
      'Node.js',
      'FastAPI',
      'WPF',
      'Qt',
      'ONNX Runtime (.NET)',
    ],
    usedIn: [projects.nearEarth, projects.trackMyCv, projects.parkingFlow, projects.documind, projects.conway, deheusWork],
    description: {
      en: 'I design .NET services, REST APIs, data models, and enterprise application logic. I also build desktop tools and integrate external systems.',
      pl: 'Projektuję usługi .NET, REST API, modele danych i logikę aplikacji biznesowych. Tworzę także narzędzia desktopowe i integruję systemy zewnętrzne.'
    }
  },
  {
    key: 'security',
    label: { en: 'Authentication & API Security', pl: 'Uwierzytelnianie i bezpieczeństwo API' },
    shortLabel: { en: 'API Security', pl: 'Bezpieczeństwo' },
    score: 8,
    icon: ShieldCheck,
    colorClass: 'text-[var(--accent-blue)]',
    glowClass: 'shadow-[0_0_24px_rgba(88,166,255,0.18)]',
    accentClass: 'border-[var(--accent-blue)]/50',
    items: [
      'ASP.NET Identity',
      'Cookie Authentication',
      'Authorization',
      'CSRF / Antiforgery',
      'Session Management',
    ],
    usedIn: [ksefThesis],
    description: {
      en: 'I implement and test authentication, authorization, CSRF protection, and session-based access to protected API endpoints in ASP.NET Core.',
      pl: 'Implementuję i testuję uwierzytelnianie, autoryzację, ochronę CSRF oraz dostęp do chronionych endpointów API z użyciem sesji w ASP.NET Core.'
    }
  },
  {
    key: 'frontend',
    label: { en: 'Frontend', pl: 'Frontend' },
    shortLabel: { en: 'Frontend', pl: 'Frontend' },
    score: 9,
    icon: MonitorSmartphone,
    colorClass: 'text-[var(--accent-pink)]',
    glowClass: 'shadow-[0_0_24px_rgba(255,123,114,0.18)]',
    accentClass: 'border-[var(--accent-pink)]/50',
    items: [
      'React',
      'Angular',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'npm',
      'Vite',
    ],
    usedIn: [projects.nearEarth, projects.trackMyCv, projects.parkingFlow, projects.careQuest, projects.reactCalculator, projects.portfolioKs],
    description: {
      en: 'I build responsive interfaces, interactive dashboards, reusable components, and usable application flows with React and Angular.',
      pl: 'Tworzę responsywne interfejsy, interaktywne dashboardy, komponenty wielokrotnego użytku oraz czytelne przepływy użytkownika w React i Angularze.'
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
      'PostgreSQL',
      'Oracle SQL',
    ],
    usedIn: [projects.trackMyCv, projects.documind, deheusWork, ksefThesis],
    description: {
      en: 'I work with relational databases, data modeling, SQL queries, persistence, and integrations between business systems and application backends.',
      pl: 'Pracuję z relacyjnymi bazami danych, modelowaniem danych, zapytaniami SQL, persystencją oraz integracją aplikacji z systemami biznesowymi.'
    }
  },
  {
    key: 'ml',
    label: { en: 'Data Science & AI/ML', pl: 'Data Science i AI/ML' },
    shortLabel: { en: 'AI / ML', pl: 'AI / ML' },
    score: 8,
    icon: BrainCircuit,
    colorClass: 'text-[var(--accent-orange)]',
    glowClass: 'shadow-[0_0_24px_rgba(249,115,22,0.18)]',
    accentClass: 'border-[var(--accent-orange)]/50',
    items: [
      'NumPy',
      'Pandas',
      'Matplotlib',
      'PyTorch',
      'NetworkX',
      'scikit-learn',
      'statsmodels',
      'PaddleOCR',
      'PaddlePaddle',
      'Tesseract OCR',
      'PyMuPDF',
      'Llama',
      'Ollama',
    ],
    usedIn: [projects.eurpln, projects.documind, projects.banknote, projects.iris, projects.som, projects.social, projects.xor],
    description: {
      en: 'I explore time-series forecasting, machine learning, document processing, OCR, language models, and graph analysis in practical and academic projects.',
      pl: 'Zajmuję się prognozowaniem szeregów czasowych, uczeniem maszynowym, przetwarzaniem dokumentów, OCR, modelami językowymi i analizą grafów.'
    }
  },
  {
    key: 'testing',
    label: { en: 'Testing & API Tools', pl: 'Testowanie i narzędzia API' },
    shortLabel: { en: 'Testing', pl: 'Testowanie' },
    score: 8,
    icon: FlaskConical,
    colorClass: 'text-[var(--accent-green)]',
    glowClass: 'shadow-[0_0_24px_rgba(63,185,80,0.18)]',
    accentClass: 'border-[var(--accent-green)]/50',
    items: [
      'Postman',
      'Swagger / OpenAPI',
      'Unit Testing',
      'Integration Testing',
    ],
    usedIn: [ksefThesis, projects.nearEarth],
    description: {
      en: 'I verify REST endpoints, authentication flows, API contracts, and application behavior with API clients and automated tests.',
      pl: 'Weryfikuję endpointy REST, przebiegi uwierzytelniania, kontrakty API i zachowanie aplikacji przy użyciu klientów API oraz testów automatycznych.'
    }
  },
  {
    key: 'devops',
    label: { en: 'DevOps, Workflows & CI/CD', pl: 'DevOps, workflow i CI/CD' },
    shortLabel: { en: 'DevOps', pl: 'DevOps' },
    score: 8,
    icon: GitBranch,
    colorClass: 'text-[var(--accent-cyan)]',
    glowClass: 'shadow-[0_0_24px_rgba(57,197,207,0.18)]',
    accentClass: 'border-[var(--accent-cyan)]/50',
    items: [
      'Git',
      'GitHub',
      'GitHub Actions',
      'Bitbucket',
      'Forgejo',
      'Docker',
      'Docker Compose',
      'Jira',
    ],
    usedIn: [projects.portfolioKs, ksefThesis, deheusWork, projects.nearEarth],
    description: {
      en: 'I use version control, pull-request workflows, Docker environments, CI/CD automation, and issue tracking to organize development.',
      pl: 'Korzystam z kontroli wersji, przeglądów zmian, środowisk Docker, automatyzacji CI/CD i narzędzi do zarządzania zadaniami.'
    }
  },
  {
    key: 'enterprise',
    label: { en: 'Enterprise Systems & ERP', pl: 'Systemy biznesowe i ERP' },
    shortLabel: { en: 'Enterprise', pl: 'ERP' },
    score: 8,
    icon: Building2,
    colorClass: 'text-[var(--accent-purple)]',
    glowClass: 'shadow-[0_0_24px_rgba(188,140,255,0.18)]',
    accentClass: 'border-[var(--accent-purple)]/50',
    items: [
      'Comarch ERP XL',
      'ERP Extensions',
      'Comarch Hydra',
    ],
    usedIn: [deheusWork],
    description: {
      en: 'During my De Heus internship, I worked on internal business solutions and ERP-related functionality, including extensions and data integration.',
      pl: 'Podczas stażu w De Heus pracowałam nad aplikacjami wewnętrznymi i funkcjonalnościami ERP, w tym rozszerzeniami oraz integracją danych.'
    }
  },
  {
    key: 'scripting',
    label: { en: 'Scripting & Automation', pl: 'Skrypty i automatyzacja' },
    shortLabel: { en: 'Scripting', pl: 'Skrypty' },
    score: 8,
    icon: Terminal,
    colorClass: 'text-[var(--accent-orange)]',
    glowClass: 'shadow-[0_0_24px_rgba(249,115,22,0.18)]',
    accentClass: 'border-[var(--accent-orange)]/50',
    items: [
      'PowerShell',
      'Bash',
      'Batch',
      'Linux',
    ],
    usedIn: [projects.portfolioKs, ksefThesis, universityProjects],
    description: {
      en: 'I use shell scripting and command-line tooling to automate repetitive tasks, work with projects, and manage development environments.',
      pl: 'Wykorzystuję skrypty powłoki i narzędzia wiersza poleceń do automatyzacji powtarzalnych zadań oraz pracy ze środowiskami programistycznymi.'
    }
  },
  {
    key: 'aiTools',
    label: { en: 'AI Development Tools', pl: 'Narzędzia AI w programowaniu' },
    shortLabel: { en: 'AI Tools', pl: 'Narzędzia AI' },
    score: 8,
    icon: Bot,
    colorClass: 'text-[var(--accent-purple)]',
    glowClass: 'shadow-[0_0_24px_rgba(188,140,255,0.18)]',
    accentClass: 'border-[var(--accent-purple)]/50',
    items: [
      'ChatGPT',
      'OpenAI Codex',
      'Claude',
      'Claude Code',
      'Gemini',
      'GitHub Copilot',
      'Cursor',
    ],
    usedIn: [devWorkflow],
    description: {
      en: 'I use AI-assisted development tools to support code exploration, research, prototyping, and review, while verifying generated output.',
      pl: 'Korzystam z narzędzi AI wspierających analizę kodu, research, prototypowanie i przeglądy, weryfikując wygenerowane rozwiązania.'
    }
  },
  {
    key: 'ides',
    label: { en: 'IDEs & Development Tools', pl: 'IDE i narzędzia programistyczne' },
    shortLabel: { en: 'IDEs', pl: 'IDE' },
    score: 9,
    icon: Laptop2,
    colorClass: 'text-[var(--accent-blue)]',
    glowClass: 'shadow-[0_0_24px_rgba(88,166,255,0.18)]',
    accentClass: 'border-[var(--accent-blue)]/50',
    items: [
      'Visual Studio',
      'Visual Studio Code',
      'JetBrains Rider',
      'PyCharm',
      'CLion',
      'LaTeX',
    ],
    usedIn: [universityProjects, deheusWork],
    description: {
      en: 'I work with IDEs for .NET, C++, Python and frontend development, and I use LaTeX for technical and academic documents.',
      pl: 'Pracuję w środowiskach IDE dla .NET, C++, Pythona i frontendu oraz używam LaTeX-a do dokumentacji technicznej i akademickiej.'
    }
  },
  {
    key: 'algorithms',
    label: { en: 'Algorithms & Computer Science', pl: 'Algorytmy i informatyka' },
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
      'CLI Applications',
      'Fractals & Simulation',
    ],
    usedIn: [projects.algorithmsRepo, projects.grib, projects.lz77, projects.huffman, projects.fourier, projects.plane, projects.fractalAnimation, projects.mediaRent, projects.traffic],
    description: {
      en: 'I develop algorithmic projects in C++, from data structures and compression to simulation, signal processing, and binary data formats.',
      pl: 'Tworzę projekty algorytmiczne w C++ — od struktur danych i kompresji po symulacje, przetwarzanie sygnałów i formaty binarne.'
    }
  },
  {
    key: 'creative',
    label: { en: 'Design, 3D & Game Development', pl: 'Design, 3D i tworzenie gier' },
    shortLabel: { en: 'Design / 3D', pl: 'Design / 3D' },
    score: 7,
    icon: Palette,
    colorClass: 'text-[var(--accent-slate)]',
    glowClass: 'shadow-[0_0_24px_rgba(148,163,184,0.18)]',
    accentClass: 'border-[var(--accent-slate)]/50',
    items: [
      'Figma',
      'Canva',
      'UI / UX Design',
      'Three.js',
      'Godot Engine',
      'AutoCAD',
      '3ds Max',
      'Aseprite',
    ],
    usedIn: [projects.nearEarth, projects.careQuest, projects.portfolioKs, projects.snow, projects.coffecrime],
    description: {
      en: 'I combine engineering with visual design, interactive 3D experiences, UI prototyping, and occasional game-oriented creative work.',
      pl: 'Łączę programowanie z projektowaniem interfejsów, interaktywnymi wizualizacjami 3D, prototypowaniem UI i projektami kreatywnymi.'
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
  const moduleListRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.35 });
  // Prevent a completed scan from restarting when the component re-renders.
  const hasCompletedRef = useRef(false);

  const [typedCommand, setTypedCommand] = useState('');
  const [visibleLines, setVisibleLines] = useState(0);
  const [scores, setScores] = useState<number[]>(modules.map(() => 0));
  const [selectedKey, setSelectedKey] = useState<ModuleKey>('languages');
  const [phase, setPhase] = useState<'idle' | 'typing' | 'scanning' | 'done'>('idle');
  const [dots, setDots] = useState('');
  const [scannedCount, setScannedCount] = useState(0);

  const ui = {
    en: {
      sectionTitle: '$ ./skills-scan.exe',
      terminalFile: 'skills-scan',
      command: '> scan --profile avui.dev',
      loading: 'Loading modules',
      completed: 'All modules loaded',
      inspectHint: 'Select a module to inspect its details.',
      finishedCommand: '> scan --status complete',
      selectedLabel: 'Selected module',
      technologies: 'TECHNOLOGIES',
      projects: 'USED IN',
      notes: 'NOTES',
      tapHint: 'tap to inspect',
      clickHint: 'click to inspect'
    },
    pl: {
      sectionTitle: '$ ./skills-scan.exe',
      terminalFile: 'skills-scan',
      command: '> scan --profile avui.dev',
      loading: 'Ładowanie modułów',
      completed: 'Wszystkie moduły załadowane',
      inspectHint: 'Wybierz moduł, aby zobaczyć szczegóły.',
      finishedCommand: '> scan --status complete',
      selectedLabel: 'Wybrany moduł',
      technologies: 'TECHNOLOGIE',
      projects: 'W PROJEKTACH',
      notes: 'OPIS',
      tapHint: 'dotknij, aby zobaczyć',
      clickHint: 'kliknij, aby zobaczyć'
    }
  }[language];

  const selectedModule = useMemo(
    () => modules.find((module) => module.key === selectedKey) ?? modules[0],
    [selectedKey]
  );

  useEffect(() => {
    if (!isInView || hasCompletedRef.current) return;

    // Local cancellation keeps React StrictMode's effect cleanup from
    // cancelling the next scan or leaving the terminal stuck in "Loading".
    let cancelled = false;
    let dotsIntervalId: number | undefined;

    const runScan = async () => {
      const command = ui.command;
      setTypedCommand('');
      setVisibleLines(0);
      setScannedCount(0);
      setScores(modules.map(() => 0));
      setDots('');
      setPhase('typing');

      for (let index = 1; index <= command.length; index += 1) {
        if (cancelled) return;
        setTypedCommand(command.slice(0, index));
        await sleep(randomBetween(35, 60));
      }

      if (cancelled) return;
      await sleep(400);
      if (cancelled) return;
      setPhase('scanning');

      dotsIntervalId = window.setInterval(() => {
        if (cancelled) return;
        setDots((previous) => previous.length >= 3 ? '' : `${previous}.`);
      }, 420);

      for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex += 1) {
        if (cancelled) return;

        const module = modules[moduleIndex];
        setVisibleLines(moduleIndex + 1);

        // Do not automatically switch the right-hand details pane: that
        // caused rapid, distracting transitions across all 14 modules.
        await sleep(180);

        let current = 0;
        while (current < module.score) {
          if (cancelled) return;
          current = Math.min(module.score, current + 1);

          setScores((previous) => {
            const next = [...previous];
            next[moduleIndex] = current;
            return next;
          });

          await sleep(randomBetween(80, 115));
        }

        if (cancelled) return;
        setScannedCount(moduleIndex + 1);
        await sleep(randomBetween(240, 320));
      }

      if (dotsIntervalId !== undefined) {
        window.clearInterval(dotsIntervalId);
        dotsIntervalId = undefined;
      }

      if (cancelled) return;
      setDots('');
      setPhase('done');
      hasCompletedRef.current = true;
    };

    void runScan();

    return () => {
      cancelled = true;
      if (dotsIntervalId !== undefined) {
        window.clearInterval(dotsIntervalId);
      }
    };
  }, [isInView, ui.command]);

  // Keep newly scanned modules in view without increasing the page height.
  useEffect(() => {
    if (phase !== 'scanning' || visibleLines < 7) return;
    const list = moduleListRef.current;
    if (!list) return;
    list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [phase, visibleLines]);

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

        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)]"
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
                <span>{phase === 'done' ? ui.finishedCommand : typedCommand}</span>

                <span
                  className={`ml-0.5 inline-block h-[1em] w-[8px] translate-y-[2px] bg-[var(--accent-green)] ${
                    cursorVisible ? 'animate-pulse' : 'opacity-0'
                  }`}
                />
              </div>

              <div
                aria-live={phase === 'done' ? 'polite' : 'off'}
                className={`mb-5 min-h-[20px] code-font text-[11px] sm:text-sm ${
                  phase === 'done' ? 'text-[var(--accent-green)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                {phase === 'scanning' && (
                  <span>
                    {ui.loading}{dots} ({scannedCount}/{modules.length})
                  </span>
                )}
                {phase === 'done' && (
                  <span>✓ {ui.completed} ({modules.length}/{modules.length})</span>
                )}
              </div>

              <div ref={moduleListRef} className="max-h-[620px] space-y-3 overflow-y-auto overscroll-contain pr-1 sm:max-h-[680px] sm:space-y-2.5">
                <AnimatePresence>
                  {modules.slice(0, visibleLines).map((module, index) => {
                    const currentScore = scores[index];
                    const isSelected = selectedKey === module.key;
                    const Icon = module.icon;

                    return (
                      <motion.button
                        key={module.key}
                        type="button"
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.28 }}
                        whileHover={{ x: 2 }}
                        onClick={() => setSelectedKey(module.key)}
                        className={`w-full rounded-xl border px-3 py-3 text-left transition-all sm:px-4 sm:py-3 ${
                          isSelected
                            ? `bg-[var(--selected-overlay)] ${module.accentClass} ${module.glowClass}`
                            : 'border-transparent hover:border-[var(--border-default)] hover:bg-[var(--hover-overlay)]'
                        }`}
                      >
                        <div className="hidden min-w-0 items-center gap-3 sm:flex">
                          <Icon className={`h-4 w-4 shrink-0 ${module.colorClass}`} />
                          <span className="shrink-0 code-font whitespace-pre text-xs text-[var(--text-primary)] xl:text-sm">
                            {buildBar(currentScore)}
                          </span>
                          <span className="min-w-0 flex-1 code-font text-xs leading-snug text-[var(--text-primary)] xl:text-sm">
                            {module.label[language]}
                          </span>
                          <span className="ml-auto shrink-0 code-font text-xs text-[var(--text-secondary)]">
                            {currentScore}/10
                          </span>
                        </div>

                        <div className="sm:hidden">
                          <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
                            <div className="min-w-0 flex items-center gap-2">
                              <Icon className={`h-4 w-4 shrink-0 ${module.colorClass}`} />
                              <span className="min-w-0 code-font text-xs leading-snug text-[var(--text-primary)]">
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
                {phase === 'done' ? ui.inspectHint : ''}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)]"
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
                        <a
                          key={project.label.en}
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                        >
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
