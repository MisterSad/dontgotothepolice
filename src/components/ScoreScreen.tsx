"use client";

import ShareButton from "./ShareButton";
import { useLanguage } from "@/i18n/LanguageContext";

interface ScoreScreenProps {
    score: number;
    timeElapsed: number; // in seconds
}

export default function ScoreScreen({ score, timeElapsed }: ScoreScreenProps) {
    const { t } = useLanguage();

    const getGrade = () => {
        if (score >= 450) return t.scoreScreen.grades.legend;
        if (score >= 350) return t.scoreScreen.grades.expert;
        if (score >= 250) return t.scoreScreen.grades.confirmed;
        return t.scoreScreen.grades.junior;
    };

    const grade = getGrade();

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes}m ${secs}s`;
    };

    return (
        <div className="bg-black/80 border border-orange-brand p-8 flex flex-col items-center justify-center text-center gap-6 animate-in fade-in zoom-in duration-700 scanline relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-orange-brand to-black" />

            <h2 className="text-3xl font-mono text-orange-brand font-bold">{t.scoreScreen.title}</h2>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center font-mono my-4">
                <div className="flex flex-col items-center justify-center p-6 border border-gray-800 bg-black">
                    <span className="text-gray-500 mb-2">{t.scoreScreen.labelGrade}</span>
                    <span className={`text-2xl font-bold ${score >= 350 ? "text-green-success" : "text-white"}`}>
                        {grade}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center p-6 border border-gray-800 bg-black">
                    <span className="text-gray-500 mb-2">{t.scoreScreen.labelTime}</span>
                    <span className="text-2xl font-bold text-white">
                        {formatTime(timeElapsed)}
                    </span>
                </div>
            </div>

            <div className="text-left w-full max-w-2xl bg-gray-950 p-6 border border-gray-800">
                <h3 className="font-mono text-orange-brand font-bold mb-4 uppercase">{t.scoreScreen.reflexesTitle}</h3>
                <ul className="space-y-3 font-mono text-sm text-gray-300">
                    {t.scoreScreen.reflexes.map((reflex, i) => (
                        <li key={i}>
                            <span className="text-green-terminal">{i + 1}.</span> {reflex}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6 text-foreground-light max-w-2xl space-y-4">
                <p>{t.scoreScreen.story1}</p>
                <p>
                    {t.scoreScreen.story2.split("\n").map((line, i) => (
                        <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                </p>
                <p className="font-bold font-mono text-orange-brand text-xl glow-effect-orange">
                    {t.scoreScreen.story3}
                </p>
            </div>

            <ShareButton score={grade} time={formatTime(timeElapsed)} />

            <a
                href="https://dontgotothepolice.orangecyberdefense.com/fr"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-gray-500 hover:text-white font-mono transition-colors text-sm underline"
            >
                {t.scoreScreen.docLink}
            </a>
        </div>
    );
}
