import {
    Award,
    BookOpen,
    CheckCircle,
    Flame,
    Play,
    Target,
    Trophy,
    XCircle
} from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("JavaScript");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(7);
    const [solvedToday, setSolvedToday] = useState(false);
    const [userStats, setUserStats] = useState({
        totalSolved: 42,
        currentStreak: 7,
        longestStreak: 15,
        rank: "Advanced",
    });

    // Programming languages available
    const languages = ["JavaScript", "Python", "Java", "C++", "Go", "Rust"];

    // MCQ Questions data organized by language
    const questionBank = {
        JavaScript: [
            {
                id: 1,
                question: "What will be the output of the following JavaScript code?",
                code: `console.log(typeof null);`,
                options: ["null", "undefined", "object", "boolean"],
                correctAnswer: 2,
                explanation: "In JavaScript, typeof null returns 'object'. This is a well-known quirk in the language.",
                difficulty: "Easy",
                topic: "Data Types"
            },
            {
                id: 2,
                question: "What is the result of the following expression?",
                code: `console.log(0.1 + 0.2 === 0.3);`,
                options: ["true", "false", "undefined", "NaN"],
                correctAnswer: 1,
                explanation: "Due to floating-point precision issues, 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3.",
                difficulty: "Medium",
                topic: "Number Precision"
            },
            {
                id: 3,
                question: "Which method is used to add elements to the end of an array?",
                code: `let arr = [1, 2, 3];\n// Which method adds 4 to the end?`,
                options: ["arr.push(4)", "arr.unshift(4)", "arr.pop(4)", "arr.shift(4)"],
                correctAnswer: 0,
                explanation: "push() adds elements to the end of an array, while unshift() adds to the beginning.",
                difficulty: "Easy",
                topic: "Arrays"
            }
        ],
        Python: [
            {
                id: 1,
                question: "What will be the output of this Python code?",
                code: `print(type([]) is list)`,
                options: ["True", "False", "None", "Error"],
                correctAnswer: 0,
                explanation: "The 'is' operator checks for identity. An empty list literal creates a list object, so type([]) is list returns True.",
                difficulty: "Easy",
                topic: "Data Types"
            },
            {
                id: 2,
                question: "What is the result of the following list comprehension?",
                code: `result = [x**2 for x in range(5) if x % 2 == 0]\nprint(result)`,
                options: ["[0, 4, 16]", "[1, 9]", "[0, 1, 4, 9, 16]", "[2, 8]"],
                correctAnswer: 0,
                explanation: "The comprehension squares even numbers from 0-4: 0²=0, 2²=4, 4²=16.",
                difficulty: "Medium",
                topic: "List Comprehensions"
            },
            {
                id: 3,
                question: "Which keyword is used to define a function in Python?",
                code: `# Complete the syntax:\n___ my_function():\n    pass`,
                options: ["function", "def", "func", "define"],
                correctAnswer: 1,
                explanation: "Python uses the 'def' keyword to define functions.",
                difficulty: "Easy",
                topic: "Functions"
            }
        ],
        Java: [
            {
                id: 1,
                question: "What will be the output of this Java code?",
                code: `String str1 = "Hello";\nString str2 = "Hello";\nSystem.out.println(str1 == str2);`,
                options: ["true", "false", "Compilation Error", "Runtime Error"],
                correctAnswer: 0,
                explanation: "String literals are stored in the string pool, so both str1 and str2 reference the same object.",
                difficulty: "Medium",
                topic: "String Pool"
            },
            {
                id: 2,
                question: "Which access modifier makes a member accessible only within the same class?",
                code: `class Example {\n    ___ int value;\n}`,
                options: ["public", "protected", "private", "default"],
                correctAnswer: 2,
                explanation: "The 'private' access modifier restricts access to within the same class only.",
                difficulty: "Easy",
                topic: "Access Modifiers"
            },
            {
                id: 3,
                question: "What is the correct way to create an ArrayList in Java?",
                code: `// Which declaration is correct?`,
                options: [
                    "ArrayList<String> list = new ArrayList<String>();",
                    "ArrayList list = new ArrayList();",
                    "List<String> list = new ArrayList<>();",
                    "All of the above"
                ],
                correctAnswer: 3,
                explanation: "All three are valid ways to create an ArrayList, with the third being the most modern approach using diamond operator.",
                difficulty: "Easy",
                topic: "Collections"
            }
        ],
        "C++": [
            {
                id: 1,
                question: "What will be the output of this C++ code?",
                code: `int x = 5;\nint* ptr = &x;\nstd::cout << *ptr << std::endl;`,
                options: ["5", "Address of x", "0", "Compilation Error"],
                correctAnswer: 0,
                explanation: "*ptr dereferences the pointer to get the value stored at the address, which is 5.",
                difficulty: "Easy",
                topic: "Pointers"
            },
            {
                id: 2,
                question: "Which header file is required for input/output operations?",
                code: `#include <____>\nint main() {\n    std::cout << "Hello";\n    return 0;\n}`,
                options: ["stdio.h", "iostream", "conio.h", "stdlib.h"],
                correctAnswer: 1,
                explanation: "iostream header is required for std::cout and std::cin operations in C++.",
                difficulty: "Easy",
                topic: "Headers"
            },
            {
                id: 3,
                question: "What is the difference between ++i and i++?",
                code: `int i = 5;\nint a = ++i;  // a = ?\nint b = i++;  // b = ?`,
                options: ["a=6, b=6", "a=5, b=6", "a=6, b=5", "a=5, b=5"],
                correctAnswer: 0,
                explanation: "++i increments first then returns (pre-increment), i++ returns first then increments (post-increment). After ++i, both a and the new i are 6.",
                difficulty: "Medium",
                topic: "Operators"
            }
        ],
        Go: [
            {
                id: 1,
                question: "How do you declare a variable in Go?",
                code: `// Which is the correct way to declare a string variable?`,
                options: ["var name string", "string name", "name := string", "declare name string"],
                correctAnswer: 0,
                explanation: "Go uses 'var' keyword followed by variable name and type for explicit declaration.",
                difficulty: "Easy",
                topic: "Variables"
            },
            {
                id: 2,
                question: "What will be the output of this Go code?",
                code: `package main\nimport "fmt"\nfunc main() {\n    x := []int{1, 2, 3}\n    fmt.Println(len(x))\n}`,
                options: ["1", "2", "3", "Error"],
                correctAnswer: 2,
                explanation: "len() function returns the length of the slice, which contains 3 elements.",
                difficulty: "Easy",
                topic: "Slices"
            },
            {
                id: 3,
                question: "Which keyword is used to define a function in Go?",
                code: `___ add(a, b int) int {\n    return a + b\n}`,
                options: ["function", "func", "def", "fn"],
                correctAnswer: 1,
                explanation: "Go uses the 'func' keyword to define functions.",
                difficulty: "Easy",
                topic: "Functions"
            }
        ],
        Rust: [
            {
                id: 1,
                question: "What is the correct way to declare a mutable variable in Rust?",
                code: `// Which declaration allows changing the variable?`,
                options: ["let x = 5;", "let mut x = 5;", "mut let x = 5;", "var x = 5;"],
                correctAnswer: 1,
                explanation: "Rust variables are immutable by default. Use 'let mut' to make them mutable.",
                difficulty: "Easy",
                topic: "Variables"
            },
            {
                id: 2,
                question: "What will happen with this Rust code?",
                code: `let s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);`,
                options: ["Prints 'hello'", "Compilation Error", "Runtime Error", "Prints nothing"],
                correctAnswer: 1,
                explanation: "This causes a compilation error because s1's ownership is moved to s2, making s1 invalid.",
                difficulty: "Medium",
                topic: "Ownership"
            },
            {
                id: 3,
                question: "How do you define a function that returns a value in Rust?",
                code: `fn square(x: i32) -> ______ {\n    x * x\n}`,
                options: ["int", "i32", "integer", "number"],
                correctAnswer: 1,
                explanation: "Rust uses specific integer types like i32 for 32-bit signed integers.",
                difficulty: "Easy",
                topic: "Functions"
            }
        ]
    };

    useEffect(() => {
        loadQuestion();
    }, [currentLanguage, questionIndex]);

    const loadQuestion = () => {
        const questions = questionBank[currentLanguage];
        if (questions && questions[questionIndex]) {
            setCurrentQuestion(questions[questionIndex]);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const handleAnswerSelect = (optionIndex) => {
        if (showResult) return;
        setSelectedAnswer(optionIndex);
    };

    const submitAnswer = () => {
        if (selectedAnswer === null) return;
        
        setShowResult(true);
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        
        if (isCorrect) {
            setScore(score + 1);
            if (!solvedToday) {
                setSolvedToday(true);
                setUserStats(prev => ({
                    ...prev,
                    totalSolved: prev.totalSolved + 1,
                    currentStreak: prev.currentStreak + 1,
                }));
            }
        }
    };

    const nextQuestion = () => {
        const questions = questionBank[currentLanguage];
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            // Reset to first question or show completion
            setQuestionIndex(0);
        }
    };

    const changeLanguage = (language) => {
        setCurrentLanguage(language);
        setQuestionIndex(0);
        setScore(0);
    };

    const getDifficultyColor = (difficulty) => {
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

    const getLanguageColor = (language) => {
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

    if (!currentQuestion) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
            {/* Header */}
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

            {/* Language Selector */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex flex-wrap gap-3 mb-8">
                    {languages.map((language) => (
                        <button
                            key={language}
                            onClick={() => changeLanguage(language)}
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Question Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <span className={`w-3 h-3 rounded-full ${getLanguageColor(currentLanguage)}`}></span>
                                    <h2 className="text-xl font-bold">{currentLanguage} Quiz</h2>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                                        {currentQuestion.difficulty}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Question {questionIndex + 1} of {questionBank[currentLanguage].length}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
                                {currentQuestion.code && (
                                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600/30 font-mono text-sm mb-6">
                                        <pre className="text-green-400 whitespace-pre-wrap">{currentQuestion.code}</pre>
                                    </div>
                                )}
                            </div>

                            {/* Options */}
                            <div className="space-y-3 mb-6">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(index)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                                            selectedAnswer === index
                                                ? showResult
                                                    ? index === currentQuestion.correctAnswer
                                                        ? "bg-green-900/30 border-green-500/50 text-green-300"
                                                        : "bg-red-900/30 border-red-500/50 text-red-300"
                                                    : "bg-purple-900/30 border-purple-500/50 text-purple-300"
                                                : showResult && index === currentQuestion.correctAnswer
                                                ? "bg-green-900/20 border-green-500/30 text-green-400"
                                                : "bg-gray-700/30 border-gray-600/30 hover:bg-gray-600/30 text-gray-300"
                                        }`}
                                        disabled={showResult}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="w-6 h-6 rounded-full bg-gray-600/50 flex items-center justify-center text-sm font-bold">
                                                {String.fromCharCode(65 + index)}
                                            </span>
                                            <code className="flex-1">{option}</code>
                                            {showResult && index === currentQuestion.correctAnswer && (
                                                <CheckCircle className="w-5 h-5 text-green-400" />
                                            )}
                                            {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                                                <XCircle className="w-5 h-5 text-red-400" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                {!showResult ? (
                                    <button
                                        onClick={submitAnswer}
                                        disabled={selectedAnswer === null}
                                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25"
                                    >
                                        <Target className="w-5 h-5" />
                                        <span>Submit Answer</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextQuestion}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/25"
                                    >
                                        <Play className="w-5 h-5" />
                                        <span>Next Question</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Explanation */}
                        {showResult && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <Award className="w-5 h-5 mr-2 text-yellow-400" />
                                    Explanation
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {currentQuestion.explanation}
                                </p>
                                <div className="mt-4 inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm">
                                    Topic: {currentQuestion.topic}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-6">
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
                                        {questionIndex + 1}/{questionBank[currentLanguage].length}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Achievement */}
                        {solvedToday && (
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
                        )}

                        {/* Language Progress */}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;