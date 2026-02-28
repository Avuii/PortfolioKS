import { useState, useEffect, useMemo } from 'react';
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

const modules = ['C#', '.NET', 'C++', 'Blazor', 'Angular', 'Python', 'SQL', 'ML', 'AI'];

export function Hero({ language, playClickSound }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [exportTypedText, setExportTypedText] = useState('');
  const [exportDots, setExportDots] = useState('');

  const ui = {
    en: {
      greeting: "Hello, I'm",
      roleText:
        'Computer Science Student · .NET Developer Intern · Full-Stack Development · Algorithms · ML / AI',
      loadedModules: 'LOADED_MODULES:',
      exportFile: 'Export CV.pdf',
      generating: '> generating file',
      ready: 'Ready',
      latestVersion: 'Latest version',
      downloadCv: 'Download CV',
      viewProjects: 'View Projects',
      runProfile: 'Run Profile',
      checkOut: 'Check out',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      codeLines: [
        '// Welcome to my workspace',
        "import { Developer } from './universe';",
        '',
        'const Portfolio = () => {',
        '  return (',
        '    <Developer',
        '      name="Katarzyna Stańczyk"',
        '      role="Full-Stack Developer"',
        '      passion="Building practical software"',
        '    />',
        '  );',
        '};',
      ],
    },
    pl: {
      greeting: 'Cześć, jestem',
      roleText:
        'Studentka Informatyki · Stażystka .NET · Full-Stack Development · Algorytmy · ML / AI',
      loadedModules: 'ZAŁADOWANE MODUŁY:',
      exportFile: 'Eksportuj CV.pdf',
      generating: '> przygotowywanie pliku',
      ready: 'Gotowe',
      latestVersion: 'Najnowsza wersja',
      downloadCv: 'Pobierz CV',
      viewProjects: 'Zobacz Projekty',
      runProfile: 'Uruchom Profil',
      checkOut: 'Sprawdź',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      codeLines: [
        '// Witaj w moim środowisku pracy',
        "import { Developer } from './universe';",
        '',
        'const Portfolio = () => {',
        '  return (',
        '    <Developer',
        '      name="Katarzyna Stańczyk"',
        '      role="Full-Stack Developer"',
        '      passion="Buduję praktyczne oprogramowanie"',
        '    />',
        '  );',
        '};',
      ],
    },
  }[language];

  const codeLines = ui.codeLines;

  useEffect(() => {
    const fullText = codeLines.join('\n');
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

  useEffect(() => {
    const baseText = ui.generating;
    let currentIndex = 0;
    let dotsInterval: ReturnType<typeof setInterval> | undefined;

    setExportTypedText('');
    setExportDots('');

    const typingInterval = setInterval(() => {
      if (currentIndex <= baseText.length) {
        setExportTypedText(baseText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);

        dotsInterval = setInterval(() => {
          setExportDots((prev) => {
            if (prev === '') return '.';
            if (prev === '.') return '..';
            if (prev === '..') return '...';
            return '';
          });
        }, 450);
      }
    }, 45);

    return () => {
      clearInterval(typingInterval);
      if (dotsInterval) clearInterval(dotsInterval);
    };
  }, [language, ui.generating]);

  const handleDownloadCV = () => {
    playClickSound();
    window.location.href =
      'https://www.dropbox.com/scl/fi/xypoysouei31poeplrkl4/CV_KatarzynaStanczyk.pdf?rlkey=utzl4z2ff52wt2s2t1kfexq7q&st=2mnimrvw&dl=1';
  };

  const handleViewProjects = () => {
    playClickSound();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100svh] pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Hero content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-8 sm:pt-12"
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--accent-green)] mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse shadow-[0_0_10px_var(--accent-green)]" />
              <span className="text-xs sm:text-sm code-font text-[var(--accent-green)]">
                SYSTEM.KERNEL :: v2.5.0 ONLINE
              </span>
            </div>

            {/* Main heading */}
            <h1 className="mb-4 leading-none">
              <div className="text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)]">
                {ui.greeting}
              </div>
              <div className="mt-2 text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-blue)] bg-clip-text text-transparent leading-[1.05]">
                Katarzyna Stańczyk
              </div>
            </h1>

            {/* Role line */}
            <div className="text-base sm:text-lg text-[var(--text-secondary)] mb-6 code-font leading-relaxed">
              <span className="text-[var(--accent-blue)]">&lt;Developer /&gt;</span>{' '}
              {ui.roleText}
            </div>

            {/* Loaded modules */}
            <div className="border-t border-[var(--border-default)] pt-6">
              <div className="text-xs text-[var(--text-secondary)] mb-3 code-font">
                {ui.loadedModules}
              </div>
              <div className="flex flex-wrap gap-2">
                {modules.map((module, index) => (
                  <motion.span
                    key={module}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                    className="px-2.5 py-1 bg-[var(--bg-tertiary)] border border-[var(--accent-blue)] text-[var(--accent-blue)] text-xs sm:text-sm rounded code-font"
                  >
                    {module}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Export CV card */}
            <div className="mt-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4 gap-4">
                <div className="min-w-0">
                  <h3 className="code-font text-[var(--text-primary)] mb-1">
                    {ui.exportFile}
                  </h3>
                  <div className="code-font text-sm text-[var(--accent-green)] mb-2 min-h-[20px]">
                    {exportTypedText}
                    <span className="inline-block w-[24px] text-left">{exportDots}</span>
                  </div>
                </div>

                <span className="shrink-0 px-2 py-1 bg-[var(--accent-green)]/20 border border-[var(--accent-green)] text-white text-xs rounded code-font">
                  {ui.ready}
                </span>
              </div>

              <button
                onClick={handleDownloadCV}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[var(--border-default)] text-[var(--text-primary)] rounded hover:bg-[var(--hover-overlay)] transition-all code-font text-sm"
              >
                <Download className="w-4 h-4" />
                {ui.downloadCv}
              </button>

              <div className="mt-2 text-xs text-[var(--text-secondary)] code-font">
                {ui.latestVersion}
              </div>
            </div>

            {/* Easter egg code */}
            <div className="mt-8 code-font text-xs sm:text-sm text-[var(--accent-green)] break-words">
              while(caffeine {'>'} 0) {'{'} ship(); {'}'}
            </div>
          </motion.div>

          {/* Right side - Code editor window */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)] overflow-hidden shadow-2xl">
              {/* Window header */}
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

              {/* Code content */}
              <div className="p-4 sm:p-6 min-h-[240px] sm:min-h-[320px] code-font text-xs sm:text-sm">
                <pre className="text-[var(--text-primary)] overflow-x-auto">
                  {typedText.split('\n').map((line, index) => (
                    <div key={index} className="flex">
                      <span className="text-[var(--text-muted)] mr-3 select-none w-5 text-right">
                        {index + 1}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightSyntax(line),
                        }}
                      />
                    </div>
                  ))}
                  {showCursor && (
                    <span className="inline-block w-2 h-4 sm:h-5 bg-[var(--accent-blue)] animate-pulse" />
                  )}
                </pre>
              </div>

              {/* Action buttons */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleViewProjects}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-[var(--accent-green)] text-white rounded-lg hover:bg-opacity-80 transition-all code-font"
                >
                  <Play className="w-3.5 h-3.5" />
                  {ui.runProfile}
                </button>

                <button
                  onClick={handleViewProjects}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-[var(--accent-blue)] text-white rounded-lg hover:bg-opacity-80 transition-all code-font"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  {ui.viewProjects}
                </button>
              </div>
            </div>

            {/* GitHub card */}
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
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="p-2 hover:bg-[var(--hover-overlay)] rounded transition-colors shrink-0"
                >
                  <ExternalLink className="w-5 h-5 text-[var(--accent-blue)]" />
                </a>
              </div>
            </div>

            {/* LinkedIn card */}
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
                  href="https://linkedin.com/in/katarzyna-stanczyk"
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
    /(\/\/.*$)|\b(import|const|return|from)\b|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(Developer|Portfolio)\b|\b(name|role|passion)\b/g,
    (match, comment, keyword, stringLiteral, componentName, propName) => {
      if (comment) {
        return `<span style="color: var(--syntax-comment)">${comment}</span>`;
      }

      if (keyword) {
        return `<span style="color: var(--syntax-keyword)">${keyword}</span>`;
      }

      if (stringLiteral) {
        return `<span style="color: var(--accent-green)">${stringLiteral}</span>`;
      }

      if (componentName) {
        return `<span style="color: var(--syntax-function)">${componentName}</span>`;
      }

      if (propName) {
        return `<span style="color: var(--accent-blue)">${propName}</span>`;
      }

      return match;
    }
  );
}
