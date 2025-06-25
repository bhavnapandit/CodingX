import { useEffect, useState } from "react";
import { useQuestionBank } from "./hooks/useQuestionBank";
import { getDifficultyColor, getLanguageColor } from "./utils/helpers";
import Header from "./components/Header";
import LanguageProgress from "./components/LangaugeProgress";
import LanguageSelector from "./components/LanguageSelector";
import QuestionCard from "./components/QuestionCard";
import ExplanationCard from "./components/ExplanationCard";
import StatusCard from "./components/StatusCard";
import AchievementCard from "./components/AchienementCard";

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("python");
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

  const languages = ["python","javascript", "java", "c++", "go", "rust"];
  const questionBank = useQuestionBank();


  useEffect(() => {
    loadQuestion();
  }, [currentLanguage, questionIndex, questionBank]);

  const loadQuestion = () => {
    if (questionBank && questionBank.length > 0) {
      const questions = questionBank[0].questions;
      const firstQuestion = questionBank[0].questions[0];
      console.log(firstQuestion)
      if (questions && questions[questionIndex]) {
        setCurrentQuestion(questions[questionIndex]);
        setSelectedAnswer(null);
        setShowResult(false);
      }
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
        setUserStats((prev) => ({
          ...prev,
          totalSolved: prev.totalSolved + 1,
          currentStreak: prev.currentStreak + 1,
        }));
      }
    }
  };

  const nextQuestion = () => {
    const questions = questionBank[0].questions;
    console.log(questions)
    console.log(questions.length)
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuestionIndex(0);
    }
  };

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    setQuestionIndex(0);
    setScore(0);
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
      <Header streak={streak} userStats={userStats} score={score} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <LanguageSelector
          languages={languages}
          currentLanguage={currentLanguage}
          onLanguageChange={changeLanguage}
          getLanguageColor={getLanguageColor}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <QuestionCard
              currentQuestion={currentQuestion}
              currentLanguage={currentLanguage}
              questionIndex={questionIndex}
              totalQuestions={10}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswerSelect={handleAnswerSelect}
              onSubmitAnswer={submitAnswer}
              onNextQuestion={nextQuestion}
              getDifficultyColor={getDifficultyColor}
              getLanguageColor={getLanguageColor}
            />

            {showResult && (
              <ExplanationCard
                explanation={currentQuestion.explanation}
                topic={currentQuestion.topic}
              />
            )}
          </div>

          <div className="space-y-6">
            <StatusCard
              currentLanguage={currentLanguage}
              score={score}
              questionIndex={questionIndex}
              totalQuestions={10}
            />

            <AchievementCard solvedToday={solvedToday} />

            <LanguageProgress
              languages={languages}
              getLanguageColor={getLanguageColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;