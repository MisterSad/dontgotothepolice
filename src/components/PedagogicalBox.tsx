interface PedagogicalBoxProps {
    title: string;
    content: string;
    onNext: () => void;
    isSuccess?: boolean;
}

export default function PedagogicalBox({
    title,
    content,
    onNext,
    isSuccess = true,
}: PedagogicalBoxProps) {
    return (
        <div
            className={`mt-8 p-6 border-l-4 bg-black/50 backdrop-blur-sm shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${isSuccess
                    ? "border-green-success"
                    : "border-orange-brand"
                }`}
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{isSuccess ? "✅" : "⚠️"}</span>
                <h3
                    className={`font-mono text-xl font-bold uppercase ${isSuccess ? "text-green-success" : "text-orange-brand"
                        }`}
                >
                    {title}
                </h3>
            </div>
            <p className="text-foreground-light text-lg leading-relaxed">
                {content}
            </p>

            <button
                onClick={onNext}
                className={`mt-4 w-full py-3 font-mono font-bold uppercase transition-all duration-300 ${isSuccess
                        ? "bg-green-success/10 text-green-success hover:bg-green-success/20 border border-green-success/50"
                        : "bg-orange-brand/10 text-orange-brand hover:bg-orange-brand/20 border border-orange-brand/50"
                    }`}
            >
                [CONTINUER L'INVESTIGATION]
            </button>
        </div>
    );
}
