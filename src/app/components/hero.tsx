import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  Github,
  Linkedin,
  Code2,
  Play,
  ExternalLink,
  FolderGit2,
} from 'lucide-react';

interface HeroProps {
  language: 'en' | 'pl';
  playClickSound: () => void;
}

const modules = [
  'C#',
  '.NET',
  'ASP.NET Core',
  'Entity Framework Core',
  'SQL Server',
  'React',
  'TypeScript',
  'Angular',
  'Docker',
];

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export function Hero({ language, playClickSound }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [exportTypedText, setExportTypedText] = useState('');
  const [exportProgress, setExportProgress] = useState(0);
  const [isCvReady, setIsCvReady] = useState(false);

  const ui = {
    en: {
      greeting: "Hello, I'm",
      roleText: '.NET Developer · Backend & Full-Stack · Computer Science',
      introText:
        'Computer Science student specializing in Programming & Algorithms, with hands-on commercial experience building business applications at De Heus.',
      loadedModules: 'CORE_STACK:',
      exportFile: 'Export CV.pdf',
      generating: '> generating CV.pdf',
      readyLine: '> CV.pdf ready to download',
      ready: 'Ready',
      building: 'Building',
      latestVersion: 'External PDF · Dropbox',
      downloadCv: 'Download CV',
      preparingCv: 'Preparing CV',
      viewProjects: 'View Projects',
      runProfile: 'Run Profile',
      checkOut: 'Check out',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      codeLines: [
        '// Backend-first, product-focused',
        "import { Developer } from './universe';",
        '',
        'const Portfolio = () => {',
        '  return (',
        '    <Developer',
        '      name="Katarzyna Stańczyk"',
        '      role=".NET / Full-Stack Developer"',
        '      experience="De Heus"',
        '      stack="C# · ASP.NET Core · SQL · React"',
        '    />',
        '  );',
        '};',
      ],
    },
    pl: {
      greeting: 'Cześć, jestem',
      roleText: 'Programistka .NET · Backend & Full-Stack · Informatyka',
      introText:
        'Studiuję informatykę na Uniwersytecie Łódzkim (specjalizacja Programowanie i Algorytmy). Mam doświadczenie komercyjne zdobyte przy tworzeniu aplikacji biznesowych w De Heus.',
      loadedModules: 'CORE_STACK:',
      exportFile: 'Eksportuj CV.pdf',
      generating: '> generowanie CV.pdf',
      readyLine: '> CV.pdf gotowe do pobrania',
      ready: 'Gotowe',
      building: 'Tworzenie',
      latestVersion: 'Zewnętrzny plik PDF · Dropbox',
      downloadCv: 'Pobierz CV',
      preparingCv: 'Przygotowywanie CV',
      viewProjects: 'Zobacz Projekty',
      runProfile: 'Uruchom Profil',
      checkOut: 'Sprawdź',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      codeLines: [
        '// Backend w centrum, produkt na pierwszym miejscu',
        "import { Developer } from './universe';",
        '',
        'const Portfolio = () => {',
        '  return (',
        '    <Developer',
        '      name="Katarzyna Stańczyk"',
        '      role=".NET / Full-Stack Developer"',
        '      experience="De Heus"',
        '      stack="C# · ASP.NET Core · SQL · React"',
        '    />',
        '  );',
        '};',
      ],
    },
  }[language];

  useEffect(() => {
    const fullText = ui.codeLines.join('\n');
    let currentIndex = 0;

    setTypedText('');

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [language]);

  // Animacja czysto wizualna — właściwe CV jest już zapisane w Dropbox.
  useEffect(() => {
    let cancelled = false;

    const typeLine = async (line: string, delayMs: number) => {
      setExportTypedText('');
      for (let index = 1; index <= line.length; index += 1) {
        if (cancelled) return;
        setExportTypedText(line.slice(0, index));
        await wait(delayMs);
      }
    };

    const runCvAnimation = async () => {
      setIsCvReady(false);
      setExportProgress(0);

      await typeLine(ui.generating, 35);
      if (cancelled) return;

      // Symulowany postęp eksportu pliku PDF.
      for (let progress = 5; progress <= 100; progress += 5) {
        if (cancelled) return;
        setExportProgress(progress);
        await wait(95);
      }

      if (cancelled) return;
      await wait(180);
      await typeLine(ui.readyLine, 26);
      if (cancelled) return;
      setIsCvReady(true);
    };

    void runCvAnimation();

    return () => {
      cancelled = true;
    };
  }, [language, ui.generating, ui.readyLine]);

  const handleDownloadCV = () => {
    if (!isCvReady) return;
    playClickSound();
    window.location.href =
      'https://www.dropbox.com/scl/fi/rqdd6ri8rnd9skg817k7t/CV_Katarzyna_Sta-czyk.pdf?rlkey=t3ijlht0qwzggpnz64owcvpw7&st=3365deps&dl=1';
  };

  const handleViewProjects = () => {
    playClickSound();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRunProfile = () => {
    playClickSound();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100svh] pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-8 sm:pt-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--accent-green)] mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse shadow-[0_0_10px_var(--accent-green)]" />
              <span className="text-xs sm:text-sm code-font text-[var(--accent-green)]">
                SYSTEM.KERNEL :: v2.5.0 ONLINE
              </span>
            </div>

            <h1 className="mb-4 leading-none">
              <div className="text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)]">
                {ui.greeting}
              </div>
              <div className="mt-2 text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-blue)] bg-clip-text text-transparent leading-[1.05]">
                Katarzyna Stańczyk
              </div>
            </h1>

            <div className="text-base sm:text-lg text-[var(--text-secondary)] mb-6 code-font leading-relaxed">
              <span className="text-[var(--accent-blue)]">&lt;Developer /&gt;</span>{' '}
              {ui.roleText}
            </div>

            <p className="mb-5 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {ui.introText}
            </p>

            <div className="mb-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4 gap-4">
                <div className="min-w-0">
                  <h3 className="code-font text-[var(--text-primary)] mb-1">
                    {ui.exportFile}
                  </h3>

                  <div
                    role="status"
                    aria-live="polite"
                    className="code-font text-sm text-[var(--accent-green)] mb-2 min-h-[20px] break-all"
                  >
                    {exportTypedText}
                    {!isCvReady && <span className="ml-1 animate-pulse">▌</span>}
                  </div>
                </div>

                <span
                  className={`shrink-0 px-2 py-1 border text-white text-xs rounded code-font ${
                    isCvReady
                      ? 'bg-[var(--accent-green)]/20 border-[var(--accent-green)]'
                      : 'bg-[var(--accent-blue)]/15 border-[var(--accent-blue)]'
                  }`}
                >
                  {isCvReady ? ui.ready : ui.building}
                </span>
              </div>

              <div
                className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)]"
                role="progressbar"
                aria-label={language === 'pl' ? 'Postęp przygotowywania CV' : 'CV preparation progress'}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={exportProgress}
              >
                <motion.div
                  className="h-full rounded-full bg-[var(--accent-green)]"
                  animate={{ width: `${exportProgress}%` }}
                  transition={{ duration: 0.12, ease: 'linear' }}
                />
              </div>

              <button
                type="button"
                onClick={handleDownloadCV}
                disabled={!isCvReady}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 border rounded transition-all code-font text-sm ${
                  isCvReady
                    ? 'border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--hover-overlay)]'
                    : 'border-[var(--border-default)]/60 text-[var(--text-secondary)] opacity-70 cursor-not-allowed'
                }`}
              >
                <Download className="w-4 h-4" />
                {isCvReady ? ui.downloadCv : ui.preparingCv}
              </button>

              <div className="mt-2 text-xs text-[var(--text-secondary)] code-font">
                {ui.latestVersion}
              </div>
            </div>

            <div className="border-t border-[var(--border-default)] pt-6">
              <div className="text-xs text-[var(--text-secondary)] mb-3 code-font">
                {ui.loadedModules}
              </div>

              <div className="flex flex-wrap gap-2">
                {modules.map((m, index) => (
                  <motion.span
                    key={m}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                    className="px-2.5 py-1 bg-[var(--bg-tertiary)] border border-[var(--accent-blue)] text-[var(--accent-blue)] text-xs sm:text-sm rounded code-font"
                  >
                    {m}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="mt-8 code-font text-xs sm:text-sm text-[var(--accent-green)] break-words">
              while (caffeine {'>'} 0) {'{'} ship(); {'}'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-default)]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm code-font text-[var(--text-secondary)]">
                  <Code2 className="w-4 h-4 text-[var(--accent-blue)]" />
                  portfolio.tsx
                </div>

                <div className="w-12" />
              </div>

              <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3">
                <div
                  className="code-font text-[11px] sm:text-sm leading-[1.4] overflow-hidden"
                  style={{ height: 'calc(1.4em * 13)' }}
                >
                  <pre className="h-full overflow-x-auto overflow-y-hidden pr-2">
                    {typedText.split('\n').map((line, index) => (
                      <div key={index} className="flex min-w-max">
                        <span className="text-[var(--text-muted)] mr-3 select-none w-6 text-right shrink-0">
                          {index + 1}
                        </span>
                        <span
                          className="whitespace-pre"
                          dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
                        />
                      </div>
                    ))}

                    {showCursor && (
                      <span className="inline-block w-2 h-4 bg-[var(--accent-blue)] animate-pulse" />
                    )}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 px-4 pb-4 sm:gap-3 sm:px-6 sm:pb-6">
                <button
                  type="button"
                  onClick={handleRunProfile}
                  className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-[var(--accent-green)] px-2.5 py-2 text-xs text-white transition-all hover:opacity-85 sm:px-3 sm:py-2.5 sm:text-sm code-font"
                >
                  <Play className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{ui.runProfile}</span>
                </button>

                <button
                  type="button"
                  onClick={handleViewProjects}
                  className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-[var(--accent-blue)] px-2.5 py-2 text-xs text-white transition-all hover:opacity-85 sm:px-3 sm:py-2.5 sm:text-sm code-font"
                >
                  <FolderGit2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{ui.viewProjects}</span>
                </button>
              </div>
            </div>

            <div className="mt-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <Github className="w-8 h-8 text-[var(--text-primary)] shrink-0" />
                  <div className="min-w-0">
                    <div className="code-font text-sm text-[var(--text-secondary)]">
                      {ui.checkOut}
                    </div>
                    <div className="code-font text-[var(--text-primary)] truncate">
                      {ui.github}
                    </div>
                  </div>
                </div>

                <a
                  href="https://github.com/Avuii"
                  aria-label="GitHub — Avuii"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="p-2 hover:bg-[var(--hover-overlay)] rounded transition-colors shrink-0"
                >
                  <ExternalLink className="w-5 h-5 text-[var(--accent-blue)]" />
                </a>
              </div>
            </div>

            <div className="mt-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <Linkedin className="w-8 h-8 text-[var(--text-primary)] shrink-0" />
                  <div className="min-w-0">
                    <div className="code-font text-sm text-[var(--text-secondary)]">
                      {ui.checkOut}
                    </div>
                    <div className="code-font text-[var(--text-primary)] truncate">
                      {ui.linkedin}
                    </div>
                  </div>
                </div>

                <a
                  href="https://linkedin.com/in/katarzyna-stanczykk"
                  aria-label="LinkedIn — Katarzyna Stańczyk"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="p-2 hover:bg-[var(--hover-overlay)] rounded transition-colors shrink-0"
                >
                  <ExternalLink className="w-5 h-5 text-[var(--accent-blue)]" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightSyntax(line: string): string {
  const escaped = escapeHtml(line);

  return escaped.replace(
    /(\/\/.*$)|\b(import|const|return|from)\b|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(Developer|Portfolio)\b|\b(name|role|experience|stack)\b/g,
    (match, comment, keyword, stringLiteral, componentName, propName) => {
      if (comment) return `<span style="color: var(--syntax-comment)">${comment}</span>`;
      if (keyword) return `<span style="color: var(--syntax-keyword)">${keyword}</span>`;
      if (stringLiteral) return `<span style="color: var(--accent-green)">${stringLiteral}</span>`;
      if (componentName) return `<span style="color: var(--syntax-function)">${componentName}</span>`;
      if (propName) return `<span style="color: var(--accent-blue)">${propName}</span>`;
      return match;
    }
  );
}
