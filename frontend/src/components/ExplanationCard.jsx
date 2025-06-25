import { Award } from "lucide-react";

const ExplanationCard = ({ explanation, topic }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                Explanation
            </h3>
            <p className="text-gray-300 leading-relaxed">
                {explanation}
            </p>
            <div className="mt-4 inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm">
                Topic: {topic}
            </div>
        </div>
    );
};


export default ExplanationCard;