import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
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
    </>
  );
}
