import type { LucideIcon } from 'lucide-react';
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
  Icon: LucideIcon;
};

const SECTIONS: Section[] = [
  { id: 'home', label: { en: 'home', pl: 'start' }, Icon: Home },
  { id: 'about', label: { en: 'about', pl: 'o mnie' }, Icon: User },
  { id: 'skills', label: { en: 'skills', pl: 'skills' }, Icon: Settings },
  { id: 'experience', label: { en: 'exp', pl: 'exp' }, Icon: GitBranch },
  { id: 'projects', label: { en: 'projects', pl: 'projekty' }, Icon: FolderGit2 },
  { id: 'why', label: { en: 'why', pl: 'dlaczego' }, Icon: Sparkles },
  { id: 'contact', label: { en: 'contact', pl: 'kontakt' }, Icon: Mail },
];

export function NavigationRail({
  language,
  activeSection,
  playClickSound,
}: NavigationRailProps) {
  const scrollToSection = (id: SectionId) => {
    playClickSound();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isActive = (id: SectionId) => (activeSection ?? 'home') === id;

  return (
    <>
      {/* =========================
          DESKTOP: right rail (md+)
          ========================= */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center">
        <div className="relative flex flex-col items-center gap-4">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border-default)] -translate-x-1/2" />

          {SECTIONS.map((s) => {
            const active = isActive(s.id);
            const text = s.label[language];

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className="relative group z-10"
                aria-label={text}
              >
                {/* Node circle */}
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    active
                      ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)] shadow-[0_0_10px_var(--accent-blue)]'
                      : 'border-[var(--border-default)] bg-[var(--bg-primary)] group-hover:border-[var(--accent-blue)]'
                  }`}
                />

                {/* Tooltip */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] px-3 py-1 rounded text-xs code-font text-[var(--text-primary)] whitespace-nowrap">
                    {text}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================
          MOBILE: bottom bar (<md)
          ========================= */}
      <div className="md:hidden fixed left-0 right-0 bottom-0 z-50">
        <div className="mx-3 mb-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)]/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <nav
            className="grid grid-cols-7 px-1.5 py-1.5 pb-[calc(0.35rem+env(safe-area-inset-bottom))]"
            aria-label="Navigation"
          >
            {SECTIONS.map(({ id, label, Icon }) => {
              const active = isActive(id);
              const text = label[language];

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={`
                    min-w-0
                    flex flex-col items-center justify-center gap-1
                    rounded-xl py-2
                    transition-colors
                    ${active ? 'bg-[var(--hover-overlay)]' : 'hover:bg-[var(--hover-overlay)]'}
                  `}
                  aria-label={text}
                >
                  <Icon
                    className={`
                      w-[18px] h-[18px]
                      ${active ? 'text-[var(--accent-blue)]' : 'text-[var(--text-secondary)]'}
                    `}
                  />
                  
                  <span
                    className={`
                      max-w-full truncate
                      text-[9px] leading-none code-font
                      ${active ? 'text-[var(--text-primary)]' : 'hidden'}
                    `}
                    title={text}
                  >
                    {text}
                  </span>

                  <div
                    className={`
                      mt-0.5 w-1.5 h-1.5 rounded-full
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
