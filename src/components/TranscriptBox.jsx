import React from 'react';
import { Mic } from 'lucide-react';

export default function TranscriptBox({ transcript, speaking = true, compact = false, className = '' }) {
  return (
    <div
      className={`bg-white/80 backdrop-blur rounded-2xl shadow border border-slate-200 ${
        compact ? 'p-3' : 'p-4 md:p-5'
      } ${className}`}
    >
      <div className={`flex items-center gap-2 ${compact ? 'mb-2' : 'mb-3'}`}>
        <div
          className={`h-8 w-8 md:h-9 md:w-9 rounded-xl grid place-items-center ${
            speaking ? 'bg-rose-500/10 text-rose-600' : 'bg-slate-100 text-slate-500'
          }`}
        >
          <Mic className={`h-4 w-4 md:h-5 md:w-5 ${speaking ? 'animate-pulse' : ''}`} />
        </div>
        <h3 className={`text-slate-800 font-semibold ${compact ? 'text-sm' : ''}`}>Transcript</h3>
      </div>
      <div
        className={`rounded-xl border border-slate-200 bg-white text-slate-700 leading-relaxed ${
          compact
            ? 'px-3 py-2 text-sm min-h-[48px] max-w-[36ch]'
            : 'px-4 py-3 min-h-[84px] md:min-h-[96px] max-h-40 overflow-y-auto'
        }`}
      >
        {transcript || 'Waiting for the prompt...'}
      </div>
    </div>
  );
}
