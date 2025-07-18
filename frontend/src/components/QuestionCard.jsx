import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Target,
  Play,
  Code,
  Trophy,
  RotateCcw,
  Home,
} from "lucide-react";

const QuestionCard = ({
  currentQuestion,
  currentLanguage,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  showResult,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  getDifficultyColor,
  getLanguageColor,
  setHasLoggedIn,
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${getLanguageColor(
              currentLanguage
            )}`}
          ></span>
          <h2 className="text-lg sm:text-xl font-bold">
            {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}{" "}
            Quiz
          </h2>
          <span
            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(
              currentQuestion.difficulty
            )}`}
          >
            {currentQuestion.difficulty}
          </span>
        </div>
        <div className="text-xs sm:text-sm text-gray-400">
          Question {questionIndex + 1} of {totalQuestions}
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          {currentQuestion.question}
        </h3>
        {currentQuestion.code && (
          <div className="bg-gray-900/50 rounded-lg p-3 sm:p-4 border border-gray-600/30 font-mono text-xs sm:text-sm mb-4 sm:mb-6">
            <pre className="text-green-400 whitespace-pre-wrap">
              {currentQuestion.code}
            </pre>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {currentQuestion.option.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
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
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gray-600/50 flex items-center justify-center text-xs sm:text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <code className="flex-1">{option}</code>
              {showResult && index === currentQuestion.correctAnswer && (
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-400" />
              )}
              {showResult &&
                selectedAnswer === index &&
                index !== currentQuestion.correctAnswer && (
                  <XCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" />
                )}
            </div>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 sm:space-x-4">
        {!showResult ? (
          <button
            onClick={onSubmitAnswer}
            disabled={selectedAnswer === null}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-purple-500/25"
          >
            <Target className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>Submit Answer</span>
          </button>
        ) : (
          <button
            onClick={onNextQuestion}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-green-500/25"
          >
            <Play className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>Next Question</span>
          </button>
        )}
      </div>
    </div>
  );
};
export default QuestionCard;
