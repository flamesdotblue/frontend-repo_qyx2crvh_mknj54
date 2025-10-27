import React from 'react';

export default function LetterDisplay({ word = '', index = 0 }) {
  const safeIndex = Math.min(index, Math.max(0, word.length - 1));
  const currentLetter = word ? word.charAt(safeIndex) : '';

  return (
    <div className="w-full bg-gradient-to-b from-white to-slate-50 rounded-2xl p-5 shadow border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-800 font-semibold">Say this</h3>
        <p className="text-xs text-slate-500">Letters appear one by one</p>
      </div>
      <div className="grid gap-4">
        <div className="relative grid place-items-center rounded-xl border border-slate-200 bg-white h-40 md:h-48 lg:h-56">
          <span className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wider text-slate-900 select-none">
            {currentLetter || ' '}
          </span>
        </div>
        {word && (
          <div className="text-center text-lg md:text-xl tracking-widest">
            {word.split('').map((ch, i) => (
              <span
                key={i}
                className={
                  i === safeIndex
                    ? 'mx-1 md:mx-1.5 font-bold text-rose-600'
                    : 'mx-1 md:mx-1.5 text-slate-500'
                }
              >
                {ch}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
