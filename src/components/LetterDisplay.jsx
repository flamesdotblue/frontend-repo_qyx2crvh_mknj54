import React from 'react';

export default function LetterDisplay({ word = '', index = 0 }) {
  const safeIndex = Math.min(index, Math.max(0, word.length - 1));
  const currentLetter = word ? word.charAt(safeIndex) : '';

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="text-center select-none">
        <div className="relative inline-flex items-center justify-center rounded-3xl px-6 py-10 md:px-10 md:py-16 bg-white/60 backdrop-blur border border-slate-200 shadow-sm">
          <span className="text-8xl md:text-9xl lg:text-[10rem] font-extrabold tracking-wider text-slate-900">
            {currentLetter || ' '}
          </span>
        </div>
        {word && (
          <div className="mt-6 text-2xl md:text-3xl lg:text-4xl tracking-widest">
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
