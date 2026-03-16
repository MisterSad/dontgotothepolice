"use client";

import { useState } from "react";
import PedagogicalBox from "./PedagogicalBox";

interface Level5Props {
    onComplete: (score: number) => void;
    timeIsUp?: boolean;
}

const TARGET_PHRASE = "LA MEILLEURE DEFENSE C'EST VOUS";
const SHIFT = 7;

// Function to encrypt with Caesar cipher (only A-Z letters)
const encrypt = (text: string, shift: number) => {
    return text
        .split("")
        .map((char) => {
            if (/[A-Z]/.test(char)) {
                return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
            }
            return char;
        })
        .join("");
};

const ENCRYPTED_PHRASE = encrypt(TARGET_PHRASE, SHIFT);

export default function Level5Decrypt({ onComplete }: Level5Props) {
    const [currentShift, setCurrentShift] = useState(0);
    const [success, setSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const decryptedText = encrypt(ENCRYPTED_PHRASE, -currentShift + 26);

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
                    Niveau 5 : Le Décryptage Final
                </h2>
                <p className="text-foreground-light">
                    [ 15/12/2023 - 14:00 CET ]<br />
                    Les sauvegardes sont saines. Il ne reste qu'un dernier message laissé
                    par le groupe LockBit 3.0. Utilisez l'outil de force brute pour trouver
                    le décalage et déchiffrer le message.
                </p>
            </div>

            <div className="bg-black/50 border border-gray-800 p-6 flex flex-col gap-6 relative overflow-hidden">
                {success && (
                    <div className="absolute inset-0 bg-green-success/10 border-2 border-green-success pointer-events-none" />
                )}

                <div>
                    <h3 className="font-mono text-gray-500 mb-2">MESSAGE CHIFFRÉ :</h3>
                    <div className="bg-black p-4 font-mono text-red-danger text-xl tracking-widest break-all">
                        {ENCRYPTED_PHRASE}
                    </div>
                </div>

                <div>
                    <h3 className="font-mono text-gray-500 mb-2">TENTATIVE DE DÉCHIFFREMENT :</h3>
                    <div className={`p-4 font-mono text-xl tracking-widest font-bold break-all transition-colors ${success ? "text-green-success" : "text-white"
                        }`}>
                        {decryptedText}
                    </div>
                </div>

                {!success && (
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-orange-brand flex justify-between">
                                <span>DÉCALAGE :</span>
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
                            [ TESTER LA CLÉ ]
                        </button>

                        {attempts > 3 && (
                            <p className="text-gray-500 font-mono text-sm animate-pulse">
                                Indice: La lettre 'L' chiffrée donne 'S'...
                            </p>
                        )}
                    </div>
                )}
            </div>

            {success && (
                <PedagogicalBox
                    title="RÉFLEXE CYBER #5"
                    content="Le chiffrement protège vos données. Mais quand il est retourné contre vous par un ransomware, seules des sauvegardes saines et une préparation en amont permettent de s'en sortir. La meilleure défense, c'est bien vous."
                    onNext={() => onComplete(Math.max(100 - attempts * 10, 10))}
                />
            )}
        </div>
    );
}
