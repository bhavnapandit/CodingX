import { ArrowRight, BookOpen, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import axios from "axios";
import { getBackendUrl } from "../utils/helpers";

const Header = ({ setUserStats, setHasLoggedIn, hasLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [score, setScore] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);

  useEffect(() => {
    if (hasLoggedIn && currentUser.email) {
      const fetchStats = async () => {
        const scoreData = await getScore();
        const totalSolvedData = await getNoOfSolvedQuestion();
        
        setScore(scoreData);
        setTotalSolved(totalSolvedData);
        setUserStats((prev) => ({
          ...prev,
          totalSolved: totalSolvedData,
          score: scoreData,
        }));
      };
      fetchStats();
    }
  }, [hasLoggedIn, currentUser.email]);

  const getScore = async () => {
    try {
      const url = getBackendUrl();
      const res = await axios.get(`${url}user/score/${currentUser.email}`);
      
      if (typeof res.data === 'number') return res.data;
      if (res.data && typeof res.data === 'object') {
        return res.data.score || res.data.total_score || 0;
      }
      return 0;
    } catch (error) {
      console.log("Error fetching score:", error);
      return 0;
    }
  };

  const getNoOfSolvedQuestion = async () => {
    try {
      const url = getBackendUrl();
      const res = await axios.get(`${url}user/questions/${currentUser.email}`);
      
      if (typeof res.data === 'number') return res.data;
      if (res.data && typeof res.data === 'object') {
        return res.data.questions_attempted || res.data.totalSolved || res.data.count || 0;
      }
      return 0;
    } catch (error) {
      console.log("Error fetching solved questions:", error);
      return 0;
    }
  };

  return (
    <>
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
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {totalSolved}
                </div>
                <div className="text-xs text-gray-400">Attempted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {score}
                </div>
                <div className="text-xs text-gray-400">Score</div>
              </div>
              <div className="text-center mt-2 ml-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>
                      {hasLoggedIn ? `${currentUser.name}` : "Get started"}
                    </span>
                    {hasLoggedIn && (
                      <ArrowRight className="w-5 h-5 text-purple-400" />
                    )}
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <AuthModal
            setIsModalOpen={setIsModalOpen}
            SetCurrentUser={setCurrentUser}
            setHasLoggedIn={setHasLoggedIn}
          />
        </div>
      )}
    </>
  );
};

export default Header;