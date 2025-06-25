const LanguageSelector = ({ languages, currentLanguage, onLanguageChange, getLanguageColor }) => {
    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {languages.map((language) => (
                <button
                    key={language}
                    onClick={() => onLanguageChange(language)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                        currentLanguage === language
                            ? `${getLanguageColor(language)} text-white shadow-lg`
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                    }`}
                >
                    {language}
                </button>
            ))}
        </div>
    );
};


export default LanguageSelector;