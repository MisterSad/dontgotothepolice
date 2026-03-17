"use client";

import { useState, useEffect } from "react";
import TerminalText from "@/components/TerminalText";
import Timer from "@/components/Timer";
import ProgressBar from "@/components/ProgressBar";
import Level1Phishing from "@/components/Level1Phishing";
import Level2Logs from "@/components/Level2Logs";
import Level3Crisis from "@/components/Level3Crisis";
import Level4Hygiene from "@/components/Level4Hygiene";
import Level5Decrypt from "@/components/Level5Decrypt";
import ScoreScreen from "@/components/ScoreScreen";
import { useLanguage } from "@/i18n/LanguageContext";

enum GameState {
  BOOT,
  INTRO,
  BRIEFING,
  LEVEL1,
  LEVEL2,
  LEVEL3,
  LEVEL4,
  LEVEL5,
  OUTRO,
}

// Global Timer duration (5 minutes)
const GLOBAL_TIMER = 300;

export default function Home() {
  const { lang, setLang, t } = useLanguage();
  const [gameState, setGameState] = useState<GameState>(GameState.BOOT);
  const [glitching, setGlitching] = useState(false);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // Timer State
  const [levelTime, setLevelTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);

  // Global Time Tracker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState >= GameState.LEVEL1 && gameState <= GameState.LEVEL5) {
      interval = setInterval(() => setTotalTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // Boot Effect
  useEffect(() => {
    if (gameState === GameState.BOOT) {
      setTimeout(() => setGameState(GameState.INTRO), 2000);
    }
  }, [gameState]);

  const transitionTo = (nextState: GameState) => {
    setGlitching(true);
    setTimeout(() => {
      setGameState(nextState);
      setTimeIsUp(false);

      if (nextState === GameState.LEVEL1) {
        setLevelTime(GLOBAL_TIMER);
        setTimerActive(true);
      } else if (nextState >= GameState.LEVEL2 && nextState <= GameState.LEVEL5) {
        setTimerActive(true);
      }

      if (nextState === GameState.OUTRO) { setTimerActive(false); }

      setTimeout(() => setGlitching(false), 200);
    }, 1200);
  };

  const handleLevelComplete = (points: number, nextState: GameState) => {
    setScore((s) => s + points);
    setTimerActive(false);
    transitionTo(nextState);
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.BOOT:
        return (
          <div className="flex flex-col items-start justify-center h-full max-w-2xl mx-auto font-mono text-green-terminal space-y-2 opacity-50 text-sm">
            <p>{t.boot.line1}</p>
            <p>{t.boot.line2}</p>
            <p>{t.boot.line3}</p>
            <p className="animate-pulse">{t.boot.line4}</p>
          </div>
        );

      case GameState.INTRO:
        return (
          <div className="flex flex-col h-full max-w-3xl mx-auto pt-20 gap-4">
            <TerminalText text={t.intro.line1} className="block text-xl" speed={40} />
            <TerminalText text={t.intro.line2} className="block text-xl" speed={40} />
            <TerminalText text={t.intro.line3} className="block text-xl" speed={40} />
            <TerminalText text={t.intro.line4} className="block text-xl text-red-danger font-bold" speed={40} />
            <TerminalText text={t.intro.line5} className="block text-xl delay-500" speed={40} />
            <div className="mt-8 animate-in fade-in slide-in-from-bottom flex flex-col gap-4 duration-700 delay-1000">
              <p className="text-white text-xl font-mono">
                {t.intro.body1}<br />
                {t.intro.body2}
              </p>
              <button
                onClick={() => transitionTo(GameState.BRIEFING)}
                className="mt-6 px-8 py-4 bg-orange-brand/10 border-2 border-orange-brand text-orange-brand hover:bg-orange-brand hover:text-black font-bold font-mono text-xl uppercase transition-all shadow-[0_0_15px_rgba(255,121,0,0.4)]"
              >
                {t.intro.cta}
              </button>
            </div>
          </div>
        );

      case GameState.BRIEFING:
        return (
          <div className="flex flex-col h-full max-w-3xl mx-auto pt-10 gap-8 animate-in fade-in duration-700">
            <div className="bg-black/50 border border-gray-800 p-8">
              <h2 className="text-3xl font-mono text-orange-brand font-bold uppercase mb-6 flex items-center gap-4">
                <span className="text-4xl">📁</span> {t.briefing.title}
              </h2>
              <div className="space-y-4 text-foreground-light text-lg">
                <p>
                  <strong>{t.briefing.client}</strong> {t.briefing.clientValue}
                </p>
                <p>
                  <strong>{t.briefing.context}</strong> {t.briefing.contextValue}
                </p>
                <p>
                  <strong>{t.briefing.situation}</strong> {t.briefing.situationValue}
                </p>
                <p className="border-l-4 border-red-danger pl-4 text-white font-mono">
                  {t.briefing.mission}
                </p>
              </div>
            </div>

            <button
              onClick={() => transitionTo(GameState.LEVEL1)}
              className="mt-2 w-full py-4 bg-orange-brand text-white hover:bg-white hover:text-orange-brand font-bold font-mono text-xl uppercase transition-all"
            >
              {t.briefing.cta}
            </button>
          </div>
        );

      case GameState.LEVEL1:
        return <Level1Phishing onComplete={(p) => handleLevelComplete(p, GameState.LEVEL2)} />;

      case GameState.LEVEL2:
        return <Level2Logs onComplete={(p) => handleLevelComplete(p, GameState.LEVEL3)} timeIsUp={timeIsUp} />;

      case GameState.LEVEL3:
        return <Level3Crisis onComplete={(p) => handleLevelComplete(p, GameState.LEVEL4)} />;

      case GameState.LEVEL4:
        return <Level4Hygiene onComplete={(p) => handleLevelComplete(p, GameState.LEVEL5)} />;

      case GameState.LEVEL5:
        return <Level5Decrypt onComplete={(p) => handleLevelComplete(p, GameState.OUTRO)} timeIsUp={timeIsUp} />;

      case GameState.OUTRO:
        return <ScoreScreen score={score} timeElapsed={totalTime} />;
    }
  };

  const isLevel = gameState >= GameState.LEVEL1 && gameState <= GameState.LEVEL5;
  const currentLevelNum = isLevel ? gameState - GameState.BRIEFING : 0;

  const handleLangToggle = () => setLang(lang === "fr" ? "en" : "fr");

  return (
    <main className={`min-h-screen bg-black text-white p-4 md:p-8 flex flex-col relative transition-opacity duration-300 ${glitching ? "animate-glitch-heavy" : "opacity-100"}`}>
      {glitching && (
        <div className="absolute inset-0 bg-red-danger/40 z-50 pointer-events-none MixBlendMode-overlay mix-blend-overlay animate-glitch"></div>
      )}

      {/* Language Toggle Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={handleLangToggle}
          title={t.switchLangLabel}
          className="flex items-center gap-2 px-3 py-1.5 font-mono text-sm font-bold border border-gray-700 bg-black/70 text-gray-300 hover:border-orange-brand hover:text-orange-brand transition-all backdrop-blur-sm"
        >
          <span className="text-lg leading-none">
            {lang === "fr" ? "🇬🇧" : "🇫🇷"}
          </span>
          <span>{t.switchLang}</span>
        </button>
      </div>

      {/* Header with Timer and Progress */}
      {isLevel && (
        <header className="max-w-4xl w-full mx-auto mb-8 animate-in slide-in-from-top duration-300 z-10 relative bg-black/50 p-4 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-mono text-orange-brand font-bold text-xl hidden md:block">
              {t.header.titleFull}
            </h1>
            <h1 className="font-mono text-orange-brand font-bold text-lg md:hidden">
              {t.header.titleShort}
            </h1>
            <div className="flex items-center gap-4">
              <span className="font-mono text-gray-500 uppercase text-sm">{t.header.countdown}</span>
              <Timer
                initialSeconds={levelTime}
                isActive={timerActive}
                onTimeUp={() => setTimeIsUp(true)}
                dangerThreshold={15}
              />
            </div>
          </div>
          <ProgressBar currentLevel={currentLevelNum} totalLevels={5} />
        </header>
      )}

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-4xl mx-auto z-10 relative h-full">
        {renderContent()}
      </div>
    </main>
  );
}
