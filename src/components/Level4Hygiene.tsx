"use client";

import { useState } from "react";
import PedagogicalBox from "./PedagogicalBox";

interface Level4Props {
    onComplete: (score: number) => void;
}

const PRACTICES = [
    { id: 1, text: "Mot de passe 'Coaxis2023!' utilisé par 3 employés", isSecure: false },
    { id: 2, text: "Authentification multi-facteurs (MFA) activée sur le VPN", isSecure: true },
    { id: 3, text: "Mises à jour désactivées 'pour ne pas perturber la prod'", isSecure: false },
    { id: 4, text: "Sauvegardes stockées sur un serveur isolé (air-gapped)", isSecure: true },
    { id: 5, text: "Post-it avec le mot de passe admin collé sur un écran", isSecure: false },
    { id: 6, text: "Politique de mots de passe complexes (12+ caractères)", isSecure: true },
    { id: 7, text: "Un seul compte administrateur partagé entre 5 techniciens", isSecure: false },
    { id: 8, text: "Formation anti-phishing trimestrielle pour tous", isSecure: true },
];

export default function Level4Hygiene({ onComplete }: Level4Props) {
    const [shuffledPractices] = useState(() => [...PRACTICES].sort(() => Math.random() - 0.5));
    const [config, setConfig] = useState<Record<number, boolean | null>>(() =>
        Object.fromEntries(shuffledPractices.map(p => [p.id, null]))
    );
    const [errorsMade, setErrorsMade] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleToggle = (id: number, decision: boolean) => {
        setConfig(prev => ({ ...prev, [id]: decision }));
    };

    const checkValidation = () => {
        let errors = 0;
        shuffledPractices.forEach(p => {
            if (config[p.id] !== p.isSecure) {
                errors++;
            }
        });
        setErrorsMade(errors);
        setShowResult(true);
    };

    const isAllAnswered = Object.values(config).every(val => val !== null);

    if (showResult && errorsMade <= 2) {
        return (
            <PedagogicalBox
                title="RÉFLEXE CYBER #4"
                content="80% des cyberattaques exploitent des failles humaines. MFA, mots de passe uniques, mises à jour, formation anti-phishing : ces gestes simples sont votre première ligne de défense."
                isSuccess={true}
                onNext={() => onComplete(Math.max(100 - errorsMade * 25, 25))}
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-1000 h-full overflow-hidden flex-1 pb-10">
            <div>
                <h2 className="text-2xl font-mono text-orange-brand font-bold uppercase mb-2">
                    Niveau 4 : La Reconstruction
                </h2>
                <p className="text-foreground-light">
                    [ 14/12/2023 - 09:00 CET ]<br />
                    Avant de redémarrer les services clients, vous devez assainir le SI.
                    Classez chaque pratique observée comme "SÉCURISÉE" ou "DANGEREUSE".
                    (Max 2 erreurs tolérées).
                </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {shuffledPractices.map(practice => {
                    const decision = config[practice.id];
                    const isErrorState = showResult && decision !== practice.isSecure;

                    return (
                        <div
                            key={practice.id}
                            className={`p-4 border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${isErrorState ? "border-red-danger bg-red-danger/10 animate-pulse" : "border-gray-800 bg-black/50"
                                }`}
                        >
                            <span className="font-mono text-sm md:text-base flex-1">
                                {practice.text}
                            </span>

                            <div className="flex gap-2 shrinks-0 font-mono font-bold text-xs md:text-sm">
                                <button
                                    onClick={() => handleToggle(practice.id, false)}
                                    className={`px-4 py-2 border transition-all ${decision === false
                                        ? "bg-red-danger text-white border-red-danger"
                                        : "bg-black text-gray-500 border-gray-700 hover:border-red-danger"
                                        }`}
                                >
                                    DANGEREUX
                                </button>
                                <button
                                    onClick={() => handleToggle(practice.id, true)}
                                    className={`px-4 py-2 border transition-all ${decision === true
                                        ? "bg-green-success text-white border-green-success"
                                        : "bg-black text-gray-500 border-gray-700 hover:border-green-success"
                                        }`}
                                >
                                    SÉCURISÉ
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                {showResult && errorsMade > 2 ? (
                    <span className="text-red-danger font-mono font-bold">❌ {errorsMade} erreurs détectées. Corrigez-les.</span>
                ) : (
                    <span className="text-gray-500 font-mono">Assainissement requis avant redémarrage.</span>
                )}

                <button
                    disabled={!isAllAnswered}
                    onClick={checkValidation}
                    className={`px-6 py-3 font-mono font-bold uppercase transition-all ${isAllAnswered
                        ? "bg-orange-brand text-white hover:bg-white hover:text-orange-brand"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    [ VALIDER LA SÉCURITÉ ]
                </button>
            </div>
        </div>
    );
}
