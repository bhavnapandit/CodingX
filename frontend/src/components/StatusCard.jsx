import { Trophy } from "lucide-react";

const StatsCard = ({ currentLanguage, score, questionIndex, totalQuestions }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Current Session
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-gray-400">Language:</span>
                    <span className="font-medium">{currentLanguage}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Score:</span>
                    <span className="font-bold text-green-400">{score}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="font-medium">
                        {questionIndex + 1}/{totalQuestions}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;