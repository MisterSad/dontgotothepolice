"use client";

import { useState, useMemo } from "react";
import PedagogicalBox from "./PedagogicalBox";
import { useLanguage } from "@/i18n/LanguageContext";

interface Level5Props {
    onComplete: (score: number) => void;
    timeIsUp?: boolean;
}

const SHIFT = 7;

// Caesar cipher (A-Z only)
const caesarEncrypt = (text: string, shift: number) =>
    text
        .split("")
        .map((char) => {
            if (/[A-Z]/.test(char)) {
                return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
            }
            return char;
        })
        .join("");

export default function Level5Decrypt({ onComplete }: Level5Props) {
    const { t } = useLanguage();

    const TARGET_PHRASE = t.level5.targetPhrase;
    const ENCRYPTED_PHRASE = useMemo(() => caesarEncrypt(TARGET_PHRASE, SHIFT), [TARGET_PHRASE]);

    const [currentShift, setCurrentShift] = useState(0);
    const [success, setSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const decryptedText = caesarEncrypt(ENCRYPTED_PHRASE, -currentShift + 26);

    const handleTest = () => {
        if (currentShift === SHIFT) {
            setSuccess(true);
        } else {
            setAttempts((a) => a + 1);
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-700">
            <div>
                <h2 className="text-2xl font-mono text-orange-brand font-bold uppercase mb-2">
                    {t.level5.title}
                </h2>
                <p className="text-foreground-light whitespace-pre-line">
                    {t.level5.description}
                </p>
            </div>

            <div className="bg-black/50 border border-gray-800 p-6 flex flex-col gap-6 relative overflow-hidden">
                {success && (
                    <div className="absolute inset-0 bg-green-success/10 border-2 border-green-success pointer-events-none" />
                )}

                <div>
                    <h3 className="font-mono text-gray-500 mb-2">{t.level5.labelEncrypted}</h3>
                    <div className="bg-black p-4 font-mono text-red-danger text-xl tracking-widest break-all">
                        {ENCRYPTED_PHRASE}
                    </div>
                </div>

                <div>
                    <h3 className="font-mono text-gray-500 mb-2">{t.level5.labelDecrypting}</h3>
                    <div className={`p-4 font-mono text-xl tracking-widest font-bold break-all transition-colors ${success ? "text-green-success" : "text-white"}`}>
                        {decryptedText}
                    </div>
                </div>

                {!success && (
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-orange-brand flex justify-between">
                                <span>{t.level5.labelShift}</span>
                                <span className="font-bold text-xl">{currentShift}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="25"
                                value={currentShift}
                                onChange={(e) => setCurrentShift(parseInt(e.target.value))}
                                className="w-full accent-orange-brand"
                            />
                        </div>

                        <button
                            onClick={handleTest}
                            className="mt-4 px-6 py-3 bg-gray-900 border border-orange-brand text-orange-brand hover:bg-orange-brand hover:text-black font-mono font-bold uppercase transition-all"
                        >
                            {t.level5.btnTest}
                        </button>

                        {attempts > 3 && (
                            <p className="text-gray-500 font-mono text-sm animate-pulse">
                                {t.level5.hint}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {success && (
                <PedagogicalBox
                    title={t.pedagogical.reflexes[5].title}
                    content={t.pedagogical.reflexes[5].content}
                    onNext={() => onComplete(Math.max(100 - attempts * 10, 10))}
                />
            )}
        </div>
    );
}
