"use client";

import { useState, useEffect, useRef } from "react";

interface AudioPlayerProps {
    src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio object once
        audioRef.current = new Audio(src);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3; // Lower volume for background ambiance

        // Attempt auto-play, but browser might block it until user interaction
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => {
                    // Auto-play was prevented. This is expected in modern browsers.
                    setIsPlaying(false);
                });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, [src]);

    const toggleMute = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <button
            onClick={toggleMute}
            className={`fixed top-4 right-4 z-50 p-2 border transition-all ${isPlaying
                    ? "border-green-terminal text-green-terminal bg-black/50 hover:bg-green-terminal/20"
                    : "border-gray-600 text-gray-500 bg-black/80 hover:border-white hover:text-white"
                } rounded font-mono text-xs flex items-center gap-2 backdrop-blur-sm`}
            aria-label="Toggle Background Music"
        >
            {isPlaying ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                    [SON: ON]
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.72 6.28a.75.75 0 00-1.28.53v15.88a.75.75 0 001.28.53l1.81-1.81M6.75 8.25h-2.24c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75l4.72-4.72a.75.75 0 011.28.53v3.75m0 7.5v3.75a.75.75 0 01-1.28.53l-3.23-3.23" />
                    </svg>
                    [SON: OFF]
                </>
            )}
        </button>
    );
}
