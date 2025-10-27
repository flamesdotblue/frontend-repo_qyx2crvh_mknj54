import React from 'react';
import Spline from '@splinetool/react-spline';

export default function AvatarScene({ speaking = true }) {
  return (
    <div className="relative w-full h-72 md:h-96 lg:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-sky-50 to-rose-50 shadow-xl">
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
    </div>
  );
}
