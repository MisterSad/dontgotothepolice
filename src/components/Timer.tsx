"use client";

import { useEffect, useState } from "react";

interface TimerProps {
    initialSeconds: number;
    isActive: boolean;
    onTimeUp?: () => void;
    dangerThreshold?: number;
    className?: string;
}

export default function Timer({
    initialSeconds,
    isActive,
    onTimeUp,
    dangerThreshold = 30,
    className = "",
}: TimerProps) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        if (onTimeUp) onTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (!isActive && secondsLeft !== 0) {
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, secondsLeft, onTimeUp]);

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const isDanger = secondsLeft <= dangerThreshold;

    return (
        <div
            className={`font-mono text-xl ${isDanger ? "text-red-danger text-glow-red animate-pulse-slow font-bold" : "text-green-terminal"
                } ${className}`}
        >
            {formatTime(secondsLeft)}
        </div>
    );
}
