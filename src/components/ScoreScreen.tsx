"use client";

import ShareButton from "./ShareButton";

interface ScoreScreenProps {
    score: number;
    timeElapsed: number; // in seconds
}

export default function ScoreScreen({ score, timeElapsed }: ScoreScreenProps) {
    const getGrade = () => {
        if (score >= 450) return "LÉGENDE DU SOC";
        if (score >= 350) return "EXPERT CYBER";
        if (score >= 250) return "ANALYSTE CONFIRMÉ";
        return "ANALYSTE JUNIOR";
    };

    const grade = getGrade();

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes}m ${secs}s`;
    };

    return (
        <div className="bg-black/80 border border-orange-brand p-8 flex flex-col items-center justify-center text-center gap-6 animate-in fade-in zoom-in duration-1000 scanline relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-orange-brand to-black" />

            <h2 className="text-3xl font-mono text-orange-brand font-bold">INTRUSION CONTENUE</h2>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center font-mono my-4">
                <div className="flex flex-col items-center justify-center p-6 border border-gray-800 bg-black">
                    <span className="text-gray-500 mb-2">GRADE ACQUIS</span>
                    <span className={`text-2xl font-bold ${score >= 350 ? "text-green-success" : "text-white"}`}>
                        {grade}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center p-6 border border-gray-800 bg-black">
                    <span className="text-gray-500 mb-2">TEMPS DE RÉPONSE</span>
                    <span className="text-2xl font-bold text-white">
                        {formatTime(timeElapsed)}
                    </span>
                </div>
            </div>

            <div className="text-left w-full max-w-2xl bg-gray-950 p-6 border border-gray-800">
                <h3 className="font-mono text-orange-brand font-bold mb-4 uppercase">Vos 5 réflexes de survie :</h3>
                <ul className="space-y-3 font-mono text-sm text-gray-300">
                    <li><span className="text-green-terminal">1.</span> URL : Vérifiez chaque caractère.</li>
                    <li><span className="text-green-terminal">2.</span> Surveillance : Détectez les signaux faibles dans les logs.</li>
                    <li><span className="text-green-terminal">3.</span> Gestion de crise : Ne payez pas, isolez, alertez.</li>
                    <li><span className="text-green-terminal">4.</span> Hygiène : MFA et mises à jour sont non-négociables.</li>
                    <li><span className="text-green-terminal">5.</span> Sauvegardes : Votre seul salut face au ransomware.</li>
                </ul>
            </div>

            <div className="mt-6 text-foreground-light max-w-2xl space-y-4">
                <p>
                    Dans la nuit du 7 au 8 décembre 2023, cette histoire s'est réellement produite.
                    Coaxis, une PME du Lot-et-Garonne, a été frappée par LockBit.
                </p>
                <p>
                    350 000 entreprises paralysées. 5 millions de dollars de rançon exigés.<br />
                    Ils n'ont pas payé. Ils ont tout reconstruit en un mois.
                </p>
                <p className="font-bold font-mono text-orange-brand text-xl glow-effect-orange">
                    La meilleure défense, c'est vous.
                </p>
            </div>

            <ShareButton score={grade} time={formatTime(timeElapsed)} />

            <a
                href="https://dontgotothepolice.orangecyberdefense.com/fr"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-gray-500 hover:text-white font-mono transition-colors text-sm underline"
            >
                🎬 Découvrez le documentaire complet
            </a>
        </div>
    );
}
