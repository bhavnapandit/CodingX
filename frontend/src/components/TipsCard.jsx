// TipsCard.jsx
import { Lightbulb, Code, Brain, Zap } from "lucide-react";

const TipsCard = () => {
    const tips = [
        {
            icon: <Code className="w-4 h-4" />,
            title: "Practice Daily",
            description: "Consistency is key to mastering programming concepts"
        },
        {
            icon: <Brain className="w-4 h-4" />,
            title: "Think Logically",
            description: "Break down complex problems into smaller parts"
        },
        {
            icon: <Zap className="w-4 h-4" />,
            title: "Debug Mindfully",
            description: "Understanding errors helps you learn faster"
        }
    ];

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-7 border border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                Coding Tips
            </h3>
            <div className="space-y-4">
                {tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                            {tip.icon}
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-200 text-sm">
                                {tip.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                                {tip.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TipsCard