interface ProgressBarProps {
    currentLevel: number;
    totalLevels: number;
}

export default function ProgressBar({
    currentLevel,
    totalLevels,
}: ProgressBarProps) {
    return (
        <div className="w-full flex items-center mb-6">
            {Array.from({ length: totalLevels }).map((_, i) => {
                const isActive = i + 1 === currentLevel;
                const isCompleted = i + 1 < currentLevel;

                return (
                    <div key={i} className="flex-1 flex items-center">
                        <div
                            className={`h-2 w-full transition-all duration-300 ${isCompleted
                                    ? "bg-green-terminal glow-effect"
                                    : isActive
                                        ? "bg-orange-brand glow-effect-orange animate-pulse"
                                        : "bg-gray-800"
                                }`}
                        />
                        {i < totalLevels - 1 && <div className="w-1" />}
                    </div>
                );
            })}
        </div>
    );
}
