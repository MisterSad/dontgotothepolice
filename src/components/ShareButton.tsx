"use client";

interface ShareButtonProps {
    score: string;
    time: string;
}

export default function ShareButton({ score, time }: ShareButtonProps) {
    const handleShare = async () => {
        const url = "https://dontgotothepolice.orangecyberdefense.com";

        const text = `🔐 Je viens de terminer l'escape game "Don't Go to the Police" - et j'ai obtenu le grade ${score} en ${time} !

5 niveaux pour vivre une cyberattaque de l'intérieur et comprendre pourquoi la cybersécurité nous concerne TOUS.

Inspiré de l'attaque réelle de LockBit contre Coaxis en décembre 2023, racontée dans le documentaire de @Orange Cyberdefense.

👉 Jouez ici : ${url}

#DontGoToThePolice #OrangeCyberdefense #Orange`;

        const isMobile = typeof navigator !== "undefined" && /android|iphone|ipad|ipod/i.test(navigator.userAgent || "");

        if (isMobile && navigator.share) {
            try {
                await navigator.share({
                    text: text
                });
                return;
            } catch (error) {
                console.log("Partage natif annulé ou échoué:", error);
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }
                // En cas d'autre erreur, on continue vers le fallback
            }
        }

        const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
        window.open(linkedInUrl, "_blank");
    };

    return (
        <button
            onClick={handleShare}
            className="mt-8 w-full py-4 bg-orange-brand hover:bg-orange-brand/80 text-white font-bold text-lg font-mono uppercase transition-colors flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(255,121,0,0.4)]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
            >
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            PARTAGER MON SCORE SUR LINKEDIN
        </button>
    );
}
