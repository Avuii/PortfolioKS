import {
  Home,
  User,
  Settings,
  GitBranch,
  FolderGit2,
  Sparkles,
  Mail,
} from 'lucide-react';

interface NavigationRailProps {
  activeSection: string;
  language: 'en' | 'pl';
  playClickSound: () => void;
}

const sections = [
  { id: 'home', icon: Home },
  { id: 'about', icon: User },
  { id: 'skills', icon: Settings },
  { id: 'experience', icon: GitBranch },
  { id: 'projects', icon: FolderGit2 },
  { id: 'why', icon: Sparkles },
  { id: 'contact', icon: Mail },
] as const;

export function NavigationRail({
  activeSection,
  language,
  playClickSound,
}: NavigationRailProps) {
  const labels = {
    en: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      why: 'Why Me',
      contact: 'Contact',
    },
    pl: {
      home: 'Start',
      about: 'O mnie',
      skills: 'Umiejętności',
      experience: 'Doświadczenie',
      projects: 'Projekty',
      why: 'Dlaczego ja',
      contact: 'Kontakt',
    },
  }[language];

  const scrollToSection = (id: string) => {
    playClickSound();
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ================= MOBILE (bottom bar) ================= */}
      <div className="sm:hidden fixed left-0 right-0 bottom-0 z-50">
        <div className="bg-[var(--bg-elevated)]/90 backdrop-blur-md border-t border-[var(--border-default)]">
          <div className="flex items-center justify-between px-3 py-2">
            {sections.map(({ id, icon: Icon }) => {
              const isActive = activeSection === id;

              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`relative flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-md transition-colors
                    ${
                      isActive
                        ? 'text-[var(--accent-blue)]'
                        : 'text-[var(--text-secondary)]'
                    }
                  `}
                  aria-label={labels[id]}
                >
                  {/* Active dot */}
                  <span
                    className={`absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all
                      ${
                        isActive
                          ? 'bg-[var(--accent-blue)] shadow-[0_0_8px_var(--accent-blue)] opacity-100'
                          : 'opacity-0'
                      }
                    `}
                  />

                  <Icon className="w-5 h-5" />

                  <span className="text-[10px] code-font leading-none">
                    {labels[id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* iOS safe area support */}
        <div className="h-[env(safe-area-inset-bottom)] bg-[var(--bg-elevated)]/90" />
      </div>

      {/* Spacer so content not covered on mobile */}
      <div className="sm:hidden h-20" />

      {/* ================= DESKTOP (right rail) ================= */}
      <div className="hidden sm:flex fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4">
        <div className="relative flex flex-col items-center gap-4">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border-default)] -translate-x-1/2" />

          {sections.map(({ id }) => {
            const isActive = activeSection === id;

            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="relative group z-10"
                aria-label={labels[id]}
              >
                {/* Node */}
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300
                    ${
                      isActive
                        ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)] shadow-[0_0_10px_var(--accent-blue)]'
                        : 'border-[var(--border-default)] bg-[var(--bg-primary)] group-hover:border-[var(--accent-blue)]'
                    }
                  `}
                />

                {/* Tooltip (desktop only) */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] px-3 py-1 rounded text-xs code-font text-[var(--text-primary)] whitespace-nowrap">
                    {labels[id]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
