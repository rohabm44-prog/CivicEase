import React, { useEffect, useState } from 'react';
import { EyeOff } from 'lucide-react';

interface FocusRulerProps {
  active: boolean;
  onClose: () => void;
  isUrdu?: boolean;
}

export const FocusRuler: React.FC<FocusRulerProps> = ({ active, onClose, isUrdu }) => {
  const [mouseY, setMouseY] = useState<number>(300);
  const [rulerHeight, setRulerHeight] = useState<number>(64);

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMouseY(e.touches[0].clientY);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onClose]);

  if (!active) return null;

  const topMaskHeight = Math.max(0, mouseY - rulerHeight / 2);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-150">
      {/* Top darkened mask */}
      <div
        className="absolute top-0 left-0 right-0 bg-black/65 backdrop-blur-[0.5px] transition-all duration-75"
        style={{ height: `${topMaskHeight}px` }}
      />

      {/* Clear Reading Aperture / Guide */}
      <div
        className="absolute left-0 right-0 border-y-2 border-emerald-500/80 bg-emerald-500/10 pointer-events-none transition-all duration-75 shadow-sm"
        style={{
          top: `${topMaskHeight}px`,
          height: `${rulerHeight}px`,
        }}
      >
        {/* Subtle reading guide line */}
        <div className="w-full h-full flex items-center justify-between px-6 pointer-events-auto">
          <span className="text-[11px] font-mono tracking-wider text-emerald-300 bg-black/80 px-2 py-0.5 rounded shadow">
            {isUrdu ? 'فوکس گائیڈ' : 'READING GUIDE'}
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-slate-100 bg-slate-900/90 hover:bg-slate-800 px-3 py-1 rounded-full border border-slate-700 pointer-events-auto cursor-pointer shadow transition-transform active:scale-95"
            title={isUrdu ? 'فوکس رولر بند کریں' : 'Close Focus Ruler (Esc)'}
          >
            <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isUrdu ? 'بند کریں' : 'Close Ruler'}</span>
          </button>
        </div>
      </div>

      {/* Bottom darkened mask */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-black/65 backdrop-blur-[0.5px] transition-all duration-75"
        style={{
          top: `${topMaskHeight + rulerHeight}px`,
        }}
      />
    </div>
  );
};
