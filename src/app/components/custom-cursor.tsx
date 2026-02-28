import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;
    if (isCoarse || noHover) {
      setEnabled(false);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          !!target.closest('button,a,[role="button"]')
      );
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`rounded-full border-2 transition-all duration-150 ${
          isPointer
            ? 'w-8 h-8 border-[var(--accent-blue)] bg-[var(--accent-blue)] bg-opacity-20'
            : 'w-4 h-4 border-white'
        }`}
      />
    </div>
  );
}
