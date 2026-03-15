"use client";

import { useState } from "react";
import PedagogicalBox from "./PedagogicalBox";

interface Level1Props {
    onComplete: (score: number) => void;
}

export default function Level1Phishing({ onComplete }: Level1Props) {
    const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const [emails] = useState(() => [
        {
            id: 1,
            sender: "IT Support <support@coaxis.fr>",
            subject: "Mise à jour requise : Serveur VPN",
            body: "Bonjour, \n\nUne nouvelle mise à jour de sécurité est requise pour le serveur VPN. \n\nVeuillez télécharger le patch ici : https://vpn.coaxis.fr/patch",
            isPhishing: false,
        },
        {
            id: 2,
            sender: "Ressources Humaines <rh@coaxis.fr>",
            subject: "Nouveau règlement intérieur 2024",
            body: "Bonjour,\n\nVous trouverez ci-joint le nouveau règlement intérieur applicable au 1er janvier 2024.\n\nCordialement,\nService RH",
            isPhishing: false,
        },
        {
            id: 3,
            sender: "Service Microsoft <alerte@mlcrosoft-security.com>",
            subject: "Alerte de sécurité : Connexion inhabituelle",
            body: "Votre compte Microsoft Office 365 a été bloqué suite à une activité suspecte.\n\nPour réactiver votre accès, veuillez vérifier votre identité dans les 24h :\n\nLien : https://login.mlcrosoft.com/verify",
            isPhishing: true,
            hoverLink: "http://185.25.x.x/payload.exe",
        },
        {
            id: 4,
            sender: "Joseph Veigas <j.veigas@coaxis.fr>",
            subject: "Réunion CODIR de demain",
            body: "Bonjour à tous,\n\nPouvez-vous me préparer les chiffres Q4 pour la réunion de demain ?\n\nMerci,\nJoseph",
            isPhishing: false,
        },
    ].sort(() => Math.random() - 0.5));

    const handleEmailClick = (email: typeof emails[0]) => {
        if (success) return;
        setSelectedEmail(email.id);

        if (email.isPhishing) {
            setSuccess(true);
            setShowError(false);
        } else {
            setShowError(true);
            setAttempts(a => a + 1);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-1000">
            <div className="mb-4">
                <h2 className="text-2xl font-mono text-orange-brand font-bold uppercase mb-2">
                    Niveau 1 : Le Maillon Faible
                </h2>
                <p className="text-foreground-light">
                    [ 07/12/2023 - 22:43 CET ]<br />
                    Un employé du client a cliqué sur un e-mail douteux, ce qui a permis l'intrusion initiale.
                    Identifiez l'e-mail de phishing parmi ces 4 messages reçus ce soir-là.
                </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showError ? "animate-shake" : ""}`}>
                {emails.map((email) => (
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
                        <div className="mb-2 text-sm text-gray-400">De: <span className="text-white">{email.sender}</span></div>
                        <div className="mb-3 text-sm font-bold truncate">Objet: {email.subject}</div>
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
                                                        Lien réel : {email.hoverLink}
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
                    ❌ Ce n'est pas celui-là. Regardez de plus près les adresses et les URLs...
                </div>
            )}

            {success && (
                <PedagogicalBox
                    title="RÉFLEXE CYBER #1"
                    content={`Toujours vérifier l'URL exacte avant de cliquer. Un seul caractère modifié peut mener vers un site pirate. "mlcrosoft" n'est pas "microsoft". Survolez les liens, vérifiez les domaines. L'attaquant est entré dans le réseau.`}
                    onNext={() => onComplete(Math.max(100 - attempts * 25, 10))}
                />
            )}
        </div>
    );
}
