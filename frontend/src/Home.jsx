import { useEffect, useState } from "react";
import { useQuestionBank } from "./hooks/useQuestionBank";
import { useScoreManager } from "./hooks/useScoreManager";
import { getDifficultyColor, getLanguageColor } from "./utils/helpers";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import QuestionCard from "./components/QuestionCard";
import ExplanationCard from "./components/ExplanationCard";
import StatusCard from "./components/StatusCard";
import AchievementCard from "./components/AchienementCard";
import TipsCard from "./components/TipsCard";
import Loader from "./components/Loader";
import { Alert, Snackbar } from "@mui/material";

const Home = () => {
  let [loading, setLoading] = useState(true);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("python");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [streak, setStreak] = useState(7);
  const [solvedToday, setSolvedToday] = useState(false);
  const [userStats, setUserStats] = useState({
    totalSolved: 0,
    currentStreak: 0,
    longestStreak: 0,
    score: 0,
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [sessionScore, setSessionScore] = useState(0);

  const languages = ["python", "javascript", "java", "c++", "react", "sql"];
  const questionBank = useQuestionBank();
  const scoreManager = useScoreManager(currentUser, hasLoggedIn);

  // Helper function to show alerts
  const showAlert = (severity, message) => {
    setAlert({
      open: true,
      message: message,
      severity: severity,
    });
  };

  // Sync scoreManager data with userStats
  useEffect(() => {
    setUserStats((prev) => ({
      ...prev,
      score: scoreManager.score,
      totalSolved: scoreManager.totalSolved,
    }));
  }, [scoreManager.score, scoreManager.totalSolved]);

  // Fetch stats when user logs in
  useEffect(() => {
    if (hasLoggedIn && currentUser.email) {
      scoreManager.refreshStats();
    }
  }, [hasLoggedIn, currentUser.email]);

  const shuffleQuestions = (questions) => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      while (j === i) {
        j = Math.floor(Math.random() * (i + 1));
      }
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  };

  useEffect(() => {
    loadQuestion();
  }, [currentLanguage, questionIndex, questionBank]);

  const loadQuestion = () => {
    if (questionBank && questionBank.length > 0) {
      const languageQuestions = questionBank.find(
        (lang) => lang.language === currentLanguage
      )?.questions;

      if (languageQuestions) {
        const shuffledQuestions = shuffleQuestions(languageQuestions);
        if (shuffledQuestions[questionIndex]) {
          setCurrentQuestion(shuffledQuestions[questionIndex]);
          setSelectedAnswer(null);
          setShowResult(false);
        }
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
      setSessionScore((prev) => prev + 1);
      setUserStats((prev) => ({
        ...prev,
        score: prev.score + 1,
      }));

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

  const nextQuestion = async () => {
    const languageQuestions = questionBank.find(
      (lang) => lang.language === currentLanguage
    )?.questions;

    if (!languageQuestions) return;

    if (questionIndex < Math.min(4, languageQuestions.length - 1)) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // End of session - update score if user is logged in
      showAlert("info", "You have fully completed the test, try the next one");
      if (hasLoggedIn && sessionScore > 0) {
        await scoreManager.updateScore(sessionScore);
      }
      setQuestionIndex(0);
      setSessionScore(0);
    }
  };

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    setQuestionIndex(0);
    setSessionScore(0);
  };

  // if (!currentQuestion) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
  //       <Loader setColor={setColor} color={color} loading={loading} />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <Header
        userStats={userStats}
        setUserStats={setUserStats}
        setHasLoggedIn={setHasLoggedIn}
        hasLoggedIn={hasLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        scoreManager={scoreManager}
      />

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
              score={sessionScore}
              questionIndex={questionIndex}
              totalQuestions={5}
            />

            <AchievementCard solvedToday={solvedToday} />

            <TipsCard />
          </div>
          {/* Snackbar for alerts */}
          <Snackbar
            open={alert.open}
            autoHideDuration={3000}
            onClose={() => setAlert({ ...alert, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setAlert({ ...alert, open: false })}
              severity={alert.severity}
              sx={{ width: "100%" }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default Home;
