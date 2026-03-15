"use client";

import { useEffect, useState } from "react";

interface TerminalTextProps {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
    showCursor?: boolean;
}

export default function TerminalText({
    text,
    speed = 30,
    className = "",
    onComplete,
    showCursor = true,
}: TerminalTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Reset when text changes
        setDisplayedText("");
        setCurrentIndex(0);
    }, [text]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else if (onComplete && currentIndex === text.length) {
            // Small timeout before calling onComplete to ensure last render happens
            const timeout = setTimeout(onComplete, 100);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed, onComplete]);

    return (
        <span className={`font-mono text-green-terminal ${className}`}>
            {displayedText}
            {showCursor && currentIndex < text.length && (
                <span className="inline-block w-2 bg-green-terminal animate-blink">&nbsp;</span>
            )}
            {showCursor && currentIndex === text.length && (
                <span className="inline-block w-2 bg-green-terminal animate-blink">&nbsp;</span>
            )}
        </span>
    );
}
