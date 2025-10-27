import React, { useEffect, useMemo, useState } from 'react';
import AvatarScene from './components/AvatarScene.jsx';
import TranscriptBox from './components/TranscriptBox.jsx';
import LetterDisplay from './components/LetterDisplay.jsx';
import ControlBar from './components/ControlBar.jsx';

function App() {
  // Sample word list for the assessment
  const words = useMemo(() => ['robot', 'blue', 'magic', 'sun', 'cat'], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const currentWord = words[currentIndex] || '';

  // Auto-advance letter index while not paused or on break
  useEffect(() => {
    if (!currentWord) return;
    if (paused || onBreak) return;
    const interval = setInterval(() => {
      setLetterIndex((i) => {
        if (i < currentWord.length - 1) return i + 1;
        return i; // stay at last letter until Next
      });
    }, 900);
    return () => clearInterval(interval);
  }, [currentWord, paused, onBreak]);

  // Reset letters when word changes
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
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-rose-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Speak & Shine
            </h1>
            <p className="text-slate-500">A playful practice space for bright minds</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
              iPad Mode
            </span>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Avatar / Hero */}
          <div className="flex flex-col">
            <AvatarScene speaking={!paused && !onBreak} bubbleText={currentWord ? `Say "${currentWord}"` : ''} />
          </div>

          {/* Right column: transcript, letters, controls */}
          <div className="flex flex-col gap-6 md:gap-6">
            <TranscriptBox transcript={transcript} speaking={!paused && !onBreak} />
            <LetterDisplay word={currentWord} index={letterIndex} />
            <ControlBar
              paused={paused}
              onNext={handleNext}
              onSkip={handleSkip}
              onPauseToggle={handlePauseToggle}
              onBreak={handleBreak}
            />
          </div>
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
