import { BookOpen, Flame } from "lucide-react";

const Header = ({ streak, userStats, score }) => {
    return (
        <div className="border-b border-gray-700/50 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="w-8 h-8 text-purple-400" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                CodingX
                            </h1>
                        </div>
                        <div className="flex items-center space-x-1 text-orange-400">
                            <Flame className="w-5 h-5" />
                            <span className="font-bold">{streak}</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">
                                {userStats.totalSolved}
                            </div>
                            <div className="text-xs text-gray-400">Solved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                                {score}
                            </div>
                            <div className="text-xs text-gray-400">Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-semibold text-yellow-400">
                                {userStats.rank}
                            </div>
                            <div className="text-xs text-gray-400">Rank</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default  Header;