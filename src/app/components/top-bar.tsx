import { Volume2, VolumeX } from 'lucide-react';

interface TopBarProps {
  language: 'en' | 'pl';
  setLanguage: (lang: 'en' | 'pl') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playClickSound: () => void;
}

export function TopBar({
  language,
  setLanguage,
  soundEnabled,
  setSoundEnabled,
  playClickSound,
}: TopBarProps) {
  const handleLanguageToggle = (next: 'en' | 'pl') => {
    playClickSound();
    setLanguage(next);
  };

  const handleSoundToggle = () => setSoundEnabled(!soundEnabled);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] backdrop-blur-sm">
      <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>

          <span className="hidden sm:inline text-sm code-font text-[var(--text-secondary)] ml-4 truncate">
            ~/KatarzynaStanczyk_portfolio
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={handleSoundToggle}
            className="p-2 hover:bg-[var(--hover-overlay)] rounded transition-colors"
            aria-label="Toggle sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[var(--text-secondary)]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[var(--text-secondary)]" />
            )}
          </button>

          <div className="flex items-center gap-1 sm:gap-2 text-sm code-font">
            <button
              onClick={() => handleLanguageToggle('en')}
              className={`px-2 sm:px-3 py-1 rounded transition-colors ${
                language === 'en'
                  ? 'bg-[var(--accent-blue)] text-white'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--hover-overlay)]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageToggle('pl')}
              className={`px-2 sm:px-3 py-1 rounded transition-colors ${
                language === 'pl'
                  ? 'bg-[var(--accent-blue)] text-white'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--hover-overlay)]'
              }`}
            >
              PL
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
            <span className="code-font">ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
