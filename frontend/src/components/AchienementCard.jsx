import { CheckCircle } from "lucide-react";

const AchievementCard = ({ solvedToday }) => {
    if (!solvedToday) return null;

    return (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                    <h3 className="font-bold text-green-400">Great Job!</h3>
                    <p className="text-gray-300 text-sm">
                        You're building your coding knowledge!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default  AchievementCard;