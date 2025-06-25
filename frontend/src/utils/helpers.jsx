export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "text-green-400 bg-green-400/10";
    case "medium":
      return "text-yellow-400 bg-yellow-400/10";
    case "difficult":
      return "text-red-400 bg-red-400/10";
    case "intermediate":
      return "text-orange-400 bg-orange-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
};

export const getLanguageColor = (language) => {
  const colors = {
    python: "bg-blue-500",
    javascript: "bg-yellow-500",
    java: "bg-red-500",
    "c++": "bg-purple-500",
    react: "bg-cyan-500",
    sql: "bg-orange-500",
  };
  return colors[language] || "bg-gray-500";
};
