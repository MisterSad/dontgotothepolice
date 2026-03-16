"use client";

import React, { useState } from "react";
import PedagogicalBox from "./PedagogicalBox";
import TerminalText from "./TerminalText";

interface Level3Props {
    onComplete: (score: number) => void;
}

const QUESTIONS = [
    {
        id: 1,
        question: "1. Que faire en premier suite au chiffrement des fichiers ?",
        options: [
            { text: "Payer immédiatement pour récupérer les données vite.", isCorrect: false, feedback: "Jamais ! Payer finance le crime et n'offre aucune garantie de récupération." },
            { text: "Isoler les systèmes compromis du réseau.", isCorrect: true, feedback: "Exact. Il faut débrancher les câbles réseau/couper le Wi-Fi pour stopper la propagation, mais NE PAS éteindre." },
            { text: "Éteindre électriquement tous les serveurs d'un coup.", isCorrect: false, feedback: "Non ! Cela détruit la mémoire vive (RAM) qui contient de précieuses preuves pour l'enquête." },
        ]
    },
    {
        id: 2,
        question: "2. Qui devez-vous alerter en priorité ?",
        options: [
            { text: "La presse pour médiatiser l'affaire et prévenir tout le monde.", isCorrect: false, feedback: "La communication grand public vient plus tard, après avoir sécurisé l'entreprise." },
            { text: "La cellule de crise, votre prestataire cyber, et les autorités (ANSSI/CNIL).", isCorrect: true, feedback: "Oui. Il faut mobiliser les experts (ex: Orange Cyberdefense) et prévenir les autorités légales." },
            { text: "Uniquement la direction générale et personne d'autre.", isCorrect: false, feedback: "C'est insuffisant. Vous avez des obligations légales (CNIL) en cas de fuite de données personnelles." },
        ]
    },
    {
        id: 3,
        question: "3. La direction vous demande de restaurer les sauvegardes. Que faire ?",
        options: [
            { text: "On les reconnecte immédiatement au réseau pour gagner du temps.", isCorrect: false, feedback: "Danger ! L'attaquant est peut-être encore sur le réseau et chiffrera vos sauvegardes instantanément." },
            { text: "On les vérifie dans une 'zone propre' isolée avant de les utiliser.", isCorrect: true, feedback: "Parfait. Il faut s'assurer qu'elles ne sont pas compromises ou vérolées avant toute restauration." },
            { text: "On n'a pas besoin des sauvegardes, un déchiffreur sera vite trouvé.", isCorrect: false, feedback: "Totalement illusoire face à des souches modernes comme LockBit 3.0." },
        ]
    },
    {
        id: 4,
        question: "4. Un client exige des réponses immédiates car ses services sont coupés.",
        options: [
            { text: "Mentir et dire qu'il s'agit d'une simple panne électrique temporaire.", isCorrect: false, feedback: "Le mensonge détruit la confiance à long terme. La vérité finit toujours par se savoir." },
            { text: "Communiquer de façon transparente, factuelle et progressive.", isCorrect: true, feedback: "C'est la clé : Assumer la crise, expliquer ce qui est fait sans s'avancer sur des délais impossibles." },
            { text: "Faire la sourde oreille et ne pas répondre tant que le problème n'est pas réglé.", isCorrect: false, feedback: "Le silence crée la panique et les rumeurs." },
        ]
    }
];

export default function Level3Crisis({ onComplete }: Level3Props) {
    const [currentQ, setCurrentQ] = useState(0);
    const [feedback, setFeedback] = useState<{ text: string, isCorrect: boolean } | null>(null);
    const [score, setScore] = useState(100);
    const [showRansom, setShowRansom] = useState(true);

    const question = QUESTIONS[currentQ];
    const isComplete = currentQ >= QUESTIONS.length;

    // Shuffle options when the question changes
    const shuffledOptions = React.useMemo(() => {
        if (!question) return [];
        return [...question.options].sort(() => Math.random() - 0.5);
    }, [currentQ, question]);

    if (showRansom) {
        return (
            <div className="animate-in fade-in zoom-in duration-300 bg-red-danger/10 border-2 border-red-danger p-8 h-full flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden text-red-danger">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 MixBlendMode-overlay mix-blend-overlay"></div>
                <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase animate-pulse hover:animate-shake">
                    ⚠️ YOUR FILES HAVE BEEN ENCRYPTED
                </h2>
                <div className="font-mono text-xl max-w-2xl bg-black/80 p-6 border border-red-danger shadow-2xl">
                    <TerminalText text="> LOCKBIT 3.0 INFECTION DETECTED" className="block mb-2 text-red-danger" speed={50} />
                    <TerminalText text="> DON'T GO TO THE POLICE." className="block mb-4 text-red-danger" speed={80} />
                    <p className="text-white mt-4 text-left">
                        Payment: $5,000,000 in BTC<br />
                        Deadline: 14 days<br /><br />
                        Si vous ne payez pas, toutes les données de vos clients seront publiées.
                    </p>
                </div>
                <button
                    onClick={() => setShowRansom(false)}
                    className="mt-4 px-8 py-3 bg-red-danger text-white font-bold font-mono hover:bg-white hover:text-red-danger transition-colors z-10"
                >
                    [ LANCER LA RÉPONSE À INCIDENT ]
                </button>
            </div>
        );
    }

    const handleAnswer = (isCorrect: boolean, feedbackText: string) => {
        if (feedback) return; // Prevent double click

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
                            Niveau 3 : Le Compte à Rebours
                        </h2>
                        <p className="text-foreground-light">
                            [ 08/12/2023 - 04:32 CET ]<br />
                            La crise est là. Prenez les bonnes décisions dans l'urgence.
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
                            <div className={`p-4 mt-2 font-mono font-bold animate-in slide-in-from-bottom-2 ${feedback.isCorrect ? "text-green-success" : "text-red-danger"
                                }`}>
                                {feedback.isCorrect ? "✅ " : "❌ "}
                                <TerminalText text={feedback.text} speed={20} showCursor={false} />
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <PedagogicalBox
                    title="RÉFLEXE CYBER #3"
                    content="En cas de cyberattaque - NE JAMAIS payer la rançon. Isoler, alerter (ANSSI, forces de l'ordre, prestataire cyber), vérifier les sauvegardes en zone propre, et communiquer avec transparence."
                    isSuccess={score >= 50}
                    onNext={() => onComplete(score)}
                />
            )}
        </div>
    );
}
