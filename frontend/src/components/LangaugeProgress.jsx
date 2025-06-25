const LanguageProgress = ({ languages, getLanguageColor }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4">Language Progress</h3>
            <div className="space-y-3">
                {languages.map((lang) => (
                    <div key={lang} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${getLanguageColor(lang)}`}></span>
                            <span className="text-sm text-gray-300">{lang}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                            {Math.floor(Math.random() * 100)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageProgress;