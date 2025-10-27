import React from 'react';
import Spline from '@splinetool/react-spline';

export default function AvatarScene({ speaking = true, bubbleText = '', className = '' }) {
  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-sky-50 to-rose-50 shadow-xl ${className}`}>
      <Spline
        scene="https://prod.spline.design/XuAg4PYWfzmy0iW1/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Subtle radial glow to emphasize voice activity (doesn't block interaction) */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          speaking ? 'opacity-70' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="absolute -inset-16 bg-[radial-gradient(circle_at_center,rgba(255,0,92,0.18),rgba(0,0,0,0))]" />
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_center,rgba(34,133,255,0.15),rgba(0,0,0,0))]" />
      </div>

      {/* Speech bubble in the top-left corner */}
      {bubbleText ? (
        <div className="absolute left-3 top-3 sm:left-4 sm:top-4 max-w-[80%] pointer-events-none">
          <div className="relative inline-block">
            <div className="rounded-2xl bg-white/95 backdrop-blur px-3.5 py-2.5 shadow border border-slate-200">
              <p className="text-sm md:text-base text-slate-800 leading-snug">{bubbleText}</p>
            </div>
            <span className="absolute -bottom-2 left-6 h-0 w-0 border-t-8 border-t-white/95 border-l-8 border-l-transparent" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
