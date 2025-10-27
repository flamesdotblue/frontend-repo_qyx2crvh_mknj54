import React, { useEffect, useMemo, useState } from 'react';
import AvatarScene from './components/AvatarScene.jsx';
import TranscriptBox from './components/TranscriptBox.jsx';
import LetterDisplay from './components/LetterDisplay.jsx';
import ControlBar from './components/ControlBar.jsx';

function App() {
  const words = useMemo(() => ['robot', 'blue', 'magic', 'sun', 'cat'], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const currentWord = words[currentIndex] || '';

  useEffect(() => {
    if (!currentWord) return;
    if (paused || onBreak) return;
    const interval = setInterval(() => {
      setLetterIndex((i) => {
        if (i < currentWord.length - 1) return i + 1;
        return i;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [currentWord, paused, onBreak]);

  useEffect(() => {
    setLetterIndex(0);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % words.length);
    setPaused(false);
    setOnBreak(false);
  };

  const handleSkip = () => {
    setCurrentIndex((i) => (i + 1) % words.length);
  };

  const handlePauseToggle = () => setPaused((p) => !p);
  const handleBreak = () => {
    setOnBreak(true);
    setPaused(true);
  };

  const transcript = `Can you say the word "${currentWord}"? Take your time and pronounce each letter.`;

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-sky-50 via-white to-rose-50 overflow-hidden">
      {/* Center: big letter */}
      <div className="absolute inset-0 grid place-items-center px-4">
        <LetterDisplay word={currentWord} index={letterIndex} />
      </div>

      {/* Bottom-left: small avatar + transcript bubble */}
      <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 flex items-end gap-3 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <AvatarScene
            speaking={!paused && !onBreak}
            bubbleText={''}
            className="w-40 h-28 sm:w-56 sm:h-40 md:w-72 md:h-48"
          />
        </div>
        <TranscriptBox
          transcript={transcript}
          speaking={!paused && !onBreak}
          compact
          className="pointer-events-none"
        />
      </div>

      {/* Bottom-right: controls */}
      <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 z-20">
        <ControlBar
          paused={paused}
          onNext={handleNext}
          onSkip={handleSkip}
          onPauseToggle={handlePauseToggle}
          onBreak={handleBreak}
          className="shadow-xl"
        />
      </div>

      {/* Top-left heading for context */}
      <div className="absolute left-4 top-4 md:left-6 md:top-6 z-10">
        <div className="inline-flex items-baseline gap-3 bg-white/60 backdrop-blur px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900">Speak & Shine</h1>
          <span className="hidden md:inline text-xs font-semibold px-2 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200">iPad Mode</span>
        </div>
      </div>

      {/* Break overlay */}
      {onBreak && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Break time</h2>
            <p className="text-slate-600 mb-6">Stretch, sip water, and come back when you're ready.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setOnBreak(false)}
                className="px-4 py-2.5 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setOnBreak(false);
                  setPaused(false);
                }}
                className="px-4 py-2.5 rounded-xl font-semibold bg-sky-600 text-white hover:bg-sky-700"
              >
                Continue & Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
