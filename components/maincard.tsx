"use client"

interface TodoProps {
    id: number;
    title: string;
    description: string;
    iscomplete: boolean;
    onComplete: (id: number) => void;
    isLoading?: boolean;
}

export default function CardValue({ id, title, description, iscomplete, onComplete, isLoading }: TodoProps) {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 m-4 transition-transform transform hover:scale-105">
            <div className="mb-2 text-xl font-semibold text-white">
                {title}
            </div>
            <p className="text-gray-400 mb-4">
                {description}
            </p>
            <button
                onClick={() => onComplete(id)}
                className={`w-full py-2 rounded-lg font-semibold ${iscomplete ? 'bg-green-500' : 'bg-blue-500'} text-white transition-colors hover:bg-opacity-90`}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : iscomplete ? 'Completed' : 'Mark as Complete'}
            </button>
        </div>
    );
}
