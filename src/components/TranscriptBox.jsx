import React from 'react';
import { Mic } from 'lucide-react';

export default function TranscriptBox({ transcript, speaking = true }) {
  return (
    <div className="w-full bg-white/80 backdrop-blur rounded-2xl p-4 md:p-5 shadow border border-slate-200">
      <div className="flex items-center gap-2 mb-3">
        <div className={`h-9 w-9 rounded-xl grid place-items-center ${speaking ? 'bg-rose-500/10 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
          <Mic className={`h-5 w-5 ${speaking ? 'animate-pulse' : ''}`} />
        </div>
        <h3 className="text-slate-800 font-semibold">Transcript</h3>
      </div>
      <div className="min-h-[84px] md:min-h-[96px] max-h-40 overflow-y-auto rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 leading-relaxed">
        {transcript || 'Waiting for the prompt...'}
      </div>
    </div>
  );
}
