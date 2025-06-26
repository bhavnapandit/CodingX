import { useEffect, useState } from "react";
import { useQuestionBank } from "./hooks/useQuestionBank";
import { getDifficultyColor, getLanguageColor } from "./utils/helpers";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import QuestionCard from "./components/QuestionCard";
import ExplanationCard from "./components/ExplanationCard";
import StatusCard from "./components/StatusCard";
import AchievementCard from "./components/AchienementCard";
import TipsCard from "./components/TipsCard";
import Loader from "./components/Loader";

const Home = () => {
  let [loading, setLoading] = useState(true);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("python");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(7);
  const [solvedToday, setSolvedToday] = useState(false);
  const [userStats, setUserStats] = useState({
    totalSolved: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  const languages = ["python", "javascript", "java", "c++", "react", "sql"];
  const questionBank = useQuestionBank();
  const shuffleQuestions = (questions) => {
    console.log(questions);
    for (let i = questions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      while (j === i) {
        j = Math.floor(Math.random() * (i + 1));
      }
      const temp = questions[i];
      questions[i] = questions[j];
      questions[j] = temp;
    }
    return questions;
  };

  useEffect(() => {
    loadQuestion();
  }, [currentLanguage, questionIndex, questionBank,hasLoggedIn]);

  const loadQuestion = () => {
    if (questionBank && questionBank.length > 0) {
      const languageQuestions = questionBank.find(
        (lang) => lang.language === currentLanguage
      )?.questions;
      shuffleQuestions(languageQuestions);
      if (languageQuestions && languageQuestions[questionIndex]) {
        setCurrentQuestion(languageQuestions[questionIndex]);
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
    if (questionIndex < Math.min(4, questions.length - 1)) {
      setQuestionIndex(questionIndex + 1);
    } else {
      console.log(userStats.score);
      
      setQuestionIndex(0);
    }
  };

  const changeLanguage = (language) => {
    console.log(language);
    setCurrentLanguage(language);
    setQuestionIndex(0);
    setScore(0);
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <Loader setColor={setColor} color={color} loading={loading}/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <Header score={score} userStats={userStats} setUserStats={setUserStats} setHasLoggedIn={setHasLoggedIn} hasLoggedIn={hasLoggedIn}/>

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
              totalQuestions={5}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswerSelect={handleAnswerSelect}
              onSubmitAnswer={submitAnswer}
              onNextQuestion={nextQuestion}
              getDifficultyColor={getDifficultyColor}
              getLanguageColor={getLanguageColor}
              hasLoggedIn={hasLoggedIn}
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
              totalQuestions={5}
            />

            <AchievementCard solvedToday={solvedToday} />

            <TipsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
