interface NavigationRailProps {
  activeSection: string;
  playClickSound: () => void;
}

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'why', label: 'Why Me' },
  { id: 'contact', label: 'Contact' },
];

export function NavigationRail({ activeSection, playClickSound }: NavigationRailProps) {
  const scrollToSection = (id: string) => {
    playClickSound();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4">
      <div className="relative flex flex-col items-center gap-4">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border-default)] -translate-x-1/2" />

        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="relative group z-10"
            aria-label={section.label}
          >
            {/* Node circle */}
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === section.id
                  ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)] shadow-[0_0_10px_var(--accent-blue)]'
                  : 'border-[var(--border-default)] bg-[var(--bg-primary)] group-hover:border-[var(--accent-blue)]'
              }`}
            />

            {/* Label tooltip */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] px-3 py-1 rounded text-xs code-font text-[var(--text-primary)] whitespace-nowrap">
                {section.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}