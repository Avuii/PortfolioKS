import { useMemo } from 'react';
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
  language: 'en' | 'pl';
  activeSection?: string;
  playClickSound: () => void;
}

type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'why'
  | 'contact';

type Section = {
  id: SectionId;
  label: { en: string; pl: string };
  Icon: React.ComponentType<{ className?: string }>;
};

const SECTIONS: Section[] = [
  { id: 'home', Icon: Home },
  { id: 'about', Icon: User },
  { id: 'skills', Icon: Settings },
  { id: 'experience', Icon: GitBranch },
  { id: 'projects', Icon: FolderGit2 },
  { id: 'why', Icon: Sparkles },
  { id: 'contact', Icon: Mail },
];

export function NavigationRail({
  language,
  activeSection,
  playClickSound,
}: NavigationRailProps) {
  const sections = useMemo(() => SECTIONS, []);

  const scrollToSection = (id: SectionId) => {
    playClickSound();
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isActive = (id: string) => (activeSection ?? 'home') === id;

  return (
    <>
      {/* =========================
          DESKTOP: right rail (md+)
          ========================= */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center">
        <div className="relative flex flex-col items-center gap-4">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border-default)] -translate-x-1/2" />

          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className="relative group z-10"
              aria-label={section.label[language] ?? section.id}
            >
              {/* Node circle */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isActive(section.id)
                    ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)] shadow-[0_0_10px_var(--accent-blue)]'
                    : 'border-[var(--border-default)] bg-[var(--bg-primary)] group-hover:border-[var(--accent-blue)]'
                }`}
              />

              {/* Tooltip */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] px-3 py-1 rounded text-xs code-font text-[var(--text-primary)] whitespace-nowrap">
                  {section.label[language] ?? section.id}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* =========================
          MOBILE: bottom bar (<md)
          ========================= */}
      <div className="md:hidden fixed left-0 right-0 bottom-0 z-50">
        {/* backdrop */}
        <div className="mx-3 mb-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)]/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <nav
            className="
              grid grid-cols-7
              px-2 py-2
              pb-[calc(0.5rem+env(safe-area-inset-bottom))]
            "
            aria-label="Navigation"
          >
            {sections.map(({ id, label, Icon }) => {
              const active = isActive(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={`
                    flex flex-col items-center justify-center gap-1
                    rounded-xl py-2
                    transition-colors
                    ${active ? 'bg-[var(--hover-overlay)]' : 'hover:bg-[var(--hover-overlay)]'}
                  `}
                  aria-label={label[language] ?? id}
                >
                  <Icon
                    className={`
                      w-5 h-5
                      ${active ? 'text-[var(--accent-blue)]' : 'text-[var(--text-secondary)]'}
                    `}
                  />
                  <span
                    className={`
                      text-[10px] leading-none code-font
                      ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}
                    `}
                  >
                    {label[language] ?? id}
                  </span>

                  {/* active dot */}
                  <div
                    className={`
                      mt-1 w-1.5 h-1.5 rounded-full
                      ${active ? 'bg-[var(--accent-blue)]' : 'bg-transparent'}
                    `}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
