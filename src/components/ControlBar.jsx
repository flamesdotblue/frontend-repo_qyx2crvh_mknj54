import React from 'react';
import { StepForward, SkipForward, Pause, Play, Coffee } from 'lucide-react';

export default function ControlBar({
  onNext,
  onSkip,
  onPauseToggle,
  onBreak,
  paused = false,
  className = '',
}) {
  return (
    <div className={`w-full bg-white/80 backdrop-blur rounded-2xl p-4 shadow border border-slate-200 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        <button
          onClick={onPauseToggle}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-colors border ${
            paused
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
          }`}
          aria-label={paused ? 'Resume' : 'Pause'}
        >
          {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          {paused ? 'Resume' : 'Pause'}
        </button>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-sky-600 text-white hover:bg-sky-700 focus:ring-4 focus:ring-sky-200 transition-colors"
          aria-label="Next"
        >
          <StepForward className="h-5 w-5" />
          Next
        </button>

        <button
          onClick={onSkip}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-slate-900 text-white hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-colors"
          aria-label="Skip"
        >
          <SkipForward className="h-5 w-5" />
          Skip
        </button>

        <button
          onClick={onBreak}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
          aria-label="Take a break"
        >
          <Coffee className="h-5 w-5" />
          Take Break
        </button>
      </div>
    </div>
  );
}
