import { BookOpen, Flame } from "lucide-react";
import { useState } from "react";
import AuthModal from "./AuthModal";

const Header = ({ timeLeft, score }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                <div className="text-2xl font-bold text-orange-400">
                  {timeLeft}
                </div>
                <div className="text-xs text-gray-400">Time Left</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{score}</div>
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
                    <span>Get Started</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal */}
          <AuthModal setIsModalOpen={setIsModalOpen} />
        </div>
      )}
    </>
  );
};

export default Header;
