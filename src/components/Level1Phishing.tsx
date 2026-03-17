"use client";

import { useState } from "react";
import PedagogicalBox from "./PedagogicalBox";
import { useLanguage } from "@/i18n/LanguageContext";

interface Level1Props {
    onComplete: (score: number) => void;
}

export default function Level1Phishing({ onComplete }: Level1Props) {
    const { t } = useLanguage();

    const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showPedagogical, setShowPedagogical] = useState(false);

    // Shuffle emails once on mount using the current language set
    const [shuffledEmails] = useState(() =>
        [...t.level1.emails].map((e, i) => ({ ...e, id: i + 1 })).sort(() => Math.random() - 0.5)
    );

    const handleEmailClick = (email: typeof shuffledEmails[0]) => {
        if (success) return;
        setSelectedEmail(email.id);

        if (email.isPhishing) {
            setSuccess(true);
            setShowError(false);
            setTimeout(() => setShowPedagogical(true), 300);
        } else {
            setShowError(true);
            setAttempts(a => a + 1);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-700">
            <div className="mb-4">
                <h2 className="text-2xl font-mono text-orange-brand font-bold uppercase mb-2">
                    {t.level1.title}
                </h2>
                <p className="text-foreground-light whitespace-pre-line">
                    {t.level1.description}
                </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showError ? "animate-shake" : ""}`}>
                {shuffledEmails.map((email) => (
                    <button
                        key={email.id}
                        onClick={() => handleEmailClick(email)}
                        className={`text-left p-4 border transition-all duration-300 relative group overflow-hidden ${success && email.isPhishing
                            ? "border-green-success bg-green-success/10"
                            : selectedEmail === email.id && showError
                                ? "border-red-danger bg-red-danger/20"
                                : "border-gray-800 bg-black/40 hover:border-orange-brand hover:bg-orange-brand/5"
                            }`}
                    >
                        {success && email.isPhishing && (
                            <div className="absolute inset-0 border-2 border-red-danger scanline pointer-events-none" />
                        )}
                        <div className="mb-2 text-sm text-gray-400">{t.level1.labelFrom} <span className="text-white">{email.sender}</span></div>
                        <div className="mb-3 text-sm font-bold truncate">{t.level1.labelSubject} {email.subject}</div>
                        <div className="text-sm text-gray-300 font-mono whitespace-pre-line relative">
                            {email.body.split("https://").map((part, i) => {
                                if (i === 1) {
                                    const url = part.split("\n")[0];
                                    return (
                                        <span key={i}>
                                            <span
                                                className={`inline-block border-b border-dashed ${success && email.isPhishing ? "text-red-danger bg-red-danger/20" : "text-blue-400"} cursor-help relative group/link`}
                                            >
                                                https://{url}
                                                {email.isPhishing && (
                                                    <span className="absolute -top-8 left-0 bg-black text-red-danger text-xs p-1 border border-red-danger opacity-0 group-hover/link:opacity-100 transition-opacity">
                                                        {t.level1.realLink} {(email as { hoverLink?: string }).hoverLink}
                                                    </span>
                                                )}
                                            </span>
                                            {part.substring(url.length)}
                                        </span>
                                    );
                                }
                                return part;
                            })}
                        </div>
                    </button>
                ))}
            </div>

            {showError && (
                <div className="text-red-danger font-mono font-bold text-center mt-4 text-glow-red animate-pulse">
                    {t.level1.errorMsg}
                </div>
            )}

            {showPedagogical && (
                <PedagogicalBox
                    title={t.pedagogical.reflexes[1].title}
                    content={t.pedagogical.reflexes[1].content}
                    onNext={() => onComplete(Math.max(100 - attempts * 25, 10))}
                />
            )}
        </div>
    );
}
