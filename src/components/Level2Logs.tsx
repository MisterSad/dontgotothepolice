"use client";

import { useState, useEffect, useRef } from "react";
import PedagogicalBox from "./PedagogicalBox";
import TerminalText from "./TerminalText";
import { useLanguage } from "@/i18n/LanguageContext";

interface Level2Props {
    onComplete: (score: number) => void;
    timeIsUp: boolean;
}

// System logs stay in English in both languages — they're technical logs
const LOGS_DATA = [
    { id: 1, text: "[02:00:15] HTTP GET /api/v1/health - 200 OK", suspicious: false },
    { id: 2, text: "[02:00:18] AUTH SUCCESS - User: j.dupont", suspicious: false },
    { id: 3, text: "[02:00:22] CRON JOB `backup_db` started", suspicious: false },
    { id: 4, text: "[02:01:05] HTTP POST /login - 401 Unauthorized", suspicious: false },
    { id: 5, text: "[02:02:12] AUTH SUCCESS (RDP) - IP: 195.123.X.X (Moscow/RU)", suspicious: true },
    { id: 6, text: "[02:02:45] HTTP GET /static/logo.png - 200 OK", suspicious: false },
    { id: 7, text: "[02:03:10] CRON JOB `backup_db` completed successfully", suspicious: false },
    { id: 8, text: "[02:04:30] SCAN DETECTED: Multiple ports accessed on VLAN-BACKUP", suspicious: true },
    { id: 9, text: "[02:05:00] SYSTEM UPDATE: Checking for definitions...", suspicious: false },
    { id: 10, text: "[02:06:12] USER PRIVILEGE ESCALATION: user `service_acc` -> `admin` group", suspicious: true },
    { id: 11, text: "[02:07:05] HTTP GET /dashboard - 200 OK", suspicious: false },
    { id: 12, text: "[02:08:45] LARGE DATA TRANSFER OUT: 45GB -> IP 88.21.X.X (Unknown)", suspicious: true },
    { id: 13, text: "[02:09:00] SYSTEM MEMORY CLEAR: User `j.veigas`", suspicious: false },
    { id: 14, text: "[02:10:15] SERVICE STOPPED: `cylance_protect.exe` (EDR disabled)", suspicious: true },
    { id: 15, text: "[02:11:00] HTTP POST /upload - 200 OK", suspicious: false },
    { id: 16, text: "[02:12:30] AUTH SUCCESS - User: m.bernard", suspicious: false },
    { id: 17, text: "[02:13:00] SYSTEM LOG: Daily report generated", suspicious: false },
];

export default function Level2Logs({ onComplete, timeIsUp }: Level2Props) {
    const { t } = useLanguage();

    const [shuffledLogsData] = useState(() => [...LOGS_DATA].sort(() => Math.random() - 0.5));
    const [logs, setLogs] = useState<typeof LOGS_DATA>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [foundSuspects, setFoundSuspects] = useState<number[]>([]);
    const logsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (timeIsUp) return;

        const interval = setInterval(() => {
            if (currentIndex < shuffledLogsData.length) {
                setLogs((prev) => [...prev, shuffledLogsData[currentIndex]]);
                setCurrentIndex((prev) => prev + 1);
                setTimeout(() => {
                    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 50);
            } else {
                clearInterval(interval);
            }
        }, 800);

        return () => clearInterval(interval);
    }, [currentIndex, timeIsUp]);

    const handleLogClick = (log: typeof LOGS_DATA[0]) => {
        if (log.suspicious && !foundSuspects.includes(log.id)) {
            setFoundSuspects((prev) => [...prev, log.id]);
        }
    };

    const isComplete = foundSuspects.length === 5 || timeIsUp;

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-700 h-full">
            <div className="mb-4">
                <h2 className="text-2xl font-mono text-orange-brand font-bold uppercase mb-2">
                    {t.level2.title}
                </h2>
                <p className="text-foreground-light whitespace-pre-line">
                    {t.level2.description}
                </p>
                <div className="font-mono mt-4 flex items-center gap-4">
                    <span className="text-green-terminal">{t.level2.counter}</span>
                    <span className="text-2xl font-bold bg-black px-3 py-1 border border-green-terminal text-green-terminal shadow-[0_0_10px_rgba(0,255,65,0.4)]">
                        {foundSuspects.length} / 5
                    </span>
                </div>
            </div>

            <div className="flex-1 bg-black/80 border border-gray-800 p-4 font-mono text-sm overflow-y-auto max-h-[40vh] relative scanline">
                <div className="flex flex-col gap-1 z-10 relative">
                    {logs.map((log) => {
                        const isFound = foundSuspects.includes(log.id);
                        return (
                            <div
                                key={log.id}
                                onClick={() => handleLogClick(log)}
                                className={`py-1 px-2 cursor-pointer transition-colors ${isFound
                                    ? "bg-red-danger/20 text-red-danger border-l-2 border-red-danger"
                                    : "text-green-terminal hover:bg-white/10"
                                    }`}
                            >
                                {isFound ? `[!] DETECTED: ${log.text}` : log.text}
                            </div>
                        );
                    })}
                    {currentIndex < shuffledLogsData.length && !timeIsUp && (
                        <div className="text-gray-500 animate-pulse mt-2">_</div>
                    )}
                    <div ref={logsEndRef} />
                </div>
            </div>

            {isComplete && (
                <PedagogicalBox
                    title={timeIsUp ? t.pedagogical.reflexes[2].titleFail : t.pedagogical.reflexes[2].titleOk}
                    content={t.pedagogical.reflexes[2].content}
                    isSuccess={foundSuspects.length >= 3}
                    onNext={() => onComplete(foundSuspects.length * 20)}
                />
            )}
        </div>
    );
}
