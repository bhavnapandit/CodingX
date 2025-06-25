export const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case "Easy":
            return "text-green-400 bg-green-400/10";
        case "Medium":
            return "text-yellow-400 bg-yellow-400/10";
        case "Hard":
            return "text-red-400 bg-red-400/10";
        default:
            return "text-gray-400 bg-gray-400/10";
    }
};

export const getLanguageColor = (language) => {
    const colors = {
        JavaScript: "bg-yellow-500",
        Python: "bg-blue-500",
        Java: "bg-red-500",
        "C++": "bg-purple-500",
        Go: "bg-cyan-500",
        Rust: "bg-orange-500"
    };
    return colors[language] || "bg-gray-500";
};