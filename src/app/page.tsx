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
    // Increase transition time to show off the scary glitch effect
    setTimeout(() => {
      setGameState(nextState);
      setTimeIsUp(false);

      // Setup global timer on first level
      if (nextState === GameState.LEVEL1) {
        setLevelTime(GLOBAL_TIMER);
        setTimerActive(true);
      } else if (nextState >= GameState.LEVEL2 && nextState <= GameState.LEVEL5) {
        // Keep timer active for subsequent levels
        setTimerActive(true);
      }

      if (nextState === GameState.OUTRO) { setTimerActive(false); }

      // Keep glitching briefly after transition for lingering effect
      setTimeout(() => setGlitching(false), 200);
    }, 1200);
  };

  const handleLevelComplete = (points: number, nextState: GameState) => {
    setScore((s) => s + points);
    setTimerActive(false); // Stop timer while pedagogical box is open
    transitionTo(nextState);
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.BOOT:
        return (
          <div className="flex flex-col items-start justify-center h-full max-w-2xl mx-auto font-mono text-green-terminal space-y-2 opacity-50 text-sm">
            <p>Initializing boot sequence...</p>
            <p>Loading kernel modules (143 modules)... done.</p>
            <p>Mounting root filesystem (read-only)... done.</p>
            <p className="animate-pulse">Starting Security Operations Center interface...</p>
          </div>
        );

      case GameState.INTRO:
        return (
          <div className="flex flex-col h-full max-w-3xl mx-auto pt-20 gap-4">
            <TerminalText text="> ALERTE CRITIQUE - 08/12/2023 - 04:50 CET" className="block text-xl" speed={40} />
            <TerminalText text="> Infrastructure client COAXIS - Fauguerolles, France" className="block text-xl" speed={40} />
            <TerminalText text="> Anomalie détectée sur 24% des serveurs" className="block text-xl" speed={40} />
            <TerminalText text="> Statut : INCONNU" className="block text-xl text-red-danger font-bold" speed={40} />
            <TerminalText text="> ..." className="block text-xl delay-1000" speed={40} />
            <div className="mt-8 animate-in fade-in slide-in-from-bottom flex flex-col gap-4 duration-1000 delay-2000">
              <p className="text-white text-xl font-mono">
                Vous êtes l'analyste de garde cette nuit.<br />
                Vous avez 5 minutes avant que tout bascule.
              </p>
              <button
                onClick={() => transitionTo(GameState.BRIEFING)}
                className="mt-6 px-8 py-4 bg-orange-brand/10 border-2 border-orange-brand text-orange-brand hover:bg-orange-brand hover:text-black font-bold font-mono text-xl uppercase transition-all shadow-[0_0_15px_rgba(255,121,0,0.4)]"
              >
                [ ACCEPTER LA MISSION ]
              </button>
            </div>
          </div>
        );

      case GameState.BRIEFING:
        return (
          <div className="flex flex-col h-full max-w-3xl mx-auto pt-10 gap-8 animate-in fade-in duration-1000">
            <div className="bg-black/50 border border-gray-800 p-8">
              <h2 className="text-3xl font-mono text-orange-brand font-bold uppercase mb-6 flex items-center gap-4">
                <span className="text-4xl">📁</span> DOSSIER INCIDENT #4902
              </h2>
              <div className="space-y-4 text-foreground-light text-lg">
                <p>
                  <strong>Client :</strong> Coaxis (Hébergeur Cloud)
                </p>
                <p>
                  <strong>Contexte :</strong> Ils hébergent les données de milliers de cabinets comptables et entreprises de santé.
                </p>
                <p>
                  <strong>Situation :</strong> Joseph Veigas (CEO) vient d'appeler notre SOC. Une grande partie de son infrastructure interne ne répond plus depuis quelques heures. Les serveurs de sauvegarde semblent également instables.
                </p>
                <p className="border-l-4 border-red-danger pl-4 text-white font-mono">
                  Votre mission : Remonter la piste, identifier l'intrus, contenir l'attaque et assainir le SI. Le temps joue contre nous.
                </p>
              </div>
            </div>

            <button
              onClick={() => transitionTo(GameState.LEVEL1)}
              className="mt-2 w-full py-4 bg-orange-brand text-white hover:bg-white hover:text-orange-brand font-bold font-mono text-xl uppercase transition-all"
            >
              [ ENTRER DANS LE SOC ]
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
  const currentLevelNum = isLevel ? gameState - GameState.BRIEFING : 0; // LEVEL1 = enum 3, briefing = 2 => 1

  return (
    <main className={`min-h-screen bg-black text-white p-4 md:p-8 flex flex-col relative transition-opacity duration-300 ${glitching ? "animate-glitch-heavy" : "opacity-100"}`}>
      {glitching && (
        <div className="absolute inset-0 bg-red-danger/40 z-50 pointer-events-none MixBlendMode-overlay mix-blend-overlay animate-glitch"></div>
      )}

      {/* Header with Timer and Progress */}
      {isLevel && (
        <header className="max-w-4xl w-full mx-auto mb-8 animate-in slide-in-from-top duration-500 z-10 relative bg-black/50 p-4 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-mono text-orange-brand font-bold text-xl hidden md:block">
              // ORANGE CYBERDEFENSE : SOC_TERMINAL
            </h1>
            <h1 className="font-mono text-orange-brand font-bold text-lg md:hidden">
              // SOC_TERMINAL
            </h1>
            <div className="flex items-center gap-4">
              <span className="font-mono text-gray-500 uppercase text-sm">Compte à rebours :</span>
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
