"use client";

import React, { useState } from "react";
import PedagogicalBox from "./PedagogicalBox";
import TerminalText from "./TerminalText";
import { useLanguage } from "@/i18n/LanguageContext";

interface Level3Props {
    onComplete: (score: number) => void;
}

export default function Level3Crisis({ onComplete }: Level3Props) {
    const { t } = useLanguage();

    const [currentQ, setCurrentQ] = useState(0);
    const [feedback, setFeedback] = useState<{ text: string, isCorrect: boolean } | null>(null);
    const [score, setScore] = useState(100);
    const [showRansom, setShowRansom] = useState(true);

    const questions = t.level3.questions;
    const question = questions[currentQ];
    const isComplete = currentQ >= questions.length;

    const shuffledOptions = React.useMemo(() => {
        if (!question) return [];
        return [...question.options].sort(() => Math.random() - 0.5);
    }, [currentQ]);

    if (showRansom) {
        return (
            <div className="animate-in fade-in zoom-in duration-300 bg-red-danger/10 border-2 border-red-danger p-8 h-full flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden text-red-danger">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 MixBlendMode-overlay mix-blend-overlay"></div>
                <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase animate-pulse hover:animate-shake">
                    {t.level3.ransomTitle}
                </h2>
                <div className="font-mono text-xl max-w-2xl bg-black/80 p-6 border border-red-danger shadow-2xl">
                    <TerminalText text={t.level3.ransomInfection} className="block mb-2 text-red-danger" speed={50} />
                    <TerminalText text={t.level3.ransomWarning} className="block mb-4 text-red-danger" speed={80} />
                    <p className="text-white mt-4 text-left">
                        {t.level3.ransomPayment}<br />
                        {t.level3.ransomDeadline}<br /><br />
                        {t.level3.ransomThreat}
                    </p>
                </div>
                <button
                    onClick={() => setShowRansom(false)}
                    className="mt-4 px-8 py-3 bg-red-danger text-white font-bold font-mono hover:bg-white hover:text-red-danger transition-colors z-10"
                >
                    {t.level3.ransomButton}
                </button>
            </div>
        );
    }

    const handleAnswer = (isCorrect: boolean, feedbackText: string) => {
        if (feedback) return;

        if (!isCorrect) {
            setScore(s => Math.max(0, s - 25));
        }

        setFeedback({ text: feedbackText, isCorrect });

        setTimeout(() => {
            setFeedback(null);
            setCurrentQ(q => q + 1);
        }, 4000);
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-700">
            {!isComplete ? (
                <>
                    <div className="mb-2">
                        <h2 className="text-2xl font-mono text-orange-brand font-bold uppercase mb-2">
                            {t.level3.title}
                        </h2>
                        <p className="text-foreground-light whitespace-pre-line">
                            {t.level3.description}
                        </p>
                    </div>

                    <div className="bg-black/80 p-6 border border-gray-800 flex flex-col gap-6">
                        <h3 className="text-xl font-bold font-mono text-white">
                            {question.question}
                        </h3>

                        <div className="flex flex-col gap-3">
                            {shuffledOptions.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option.isCorrect, option.feedback)}
                                    disabled={feedback !== null}
                                    className={`text-left p-4 border transition-all ${feedback
                                        ? option.isCorrect
                                            ? "border-green-success bg-green-success/20 text-white"
                                            : "border-gray-800 bg-black text-gray-500 opacity-50"
                                        : "border-gray-700 bg-gray-900/50 hover:bg-orange-brand/20 hover:border-orange-brand"
                                        }`}
                                >
                                    <span className="font-mono text-orange-brand mr-2">{String.fromCharCode(65 + idx)}.</span>
                                    {option.text}
                                </button>
                            ))}
                        </div>

                        {feedback && (
                            <div className={`p-4 mt-2 font-mono font-bold animate-in slide-in-from-bottom-2 ${feedback.isCorrect ? "text-green-success" : "text-red-danger"}`}>
                                {feedback.isCorrect ? "✅ " : "❌ "}
                                <TerminalText text={feedback.text} speed={20} showCursor={false} />
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <PedagogicalBox
                    title={t.pedagogical.reflexes[3].title}
                    content={t.pedagogical.reflexes[3].content}
                    isSuccess={score >= 50}
                    onNext={() => onComplete(score)}
                />
            )}
        </div>
    );
}
