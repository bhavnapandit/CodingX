import { BookOpen, Flame } from "lucide-react";

const Header = ({ timeLeft, score }) => {
  console.log(score);
  return (
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
            <div className="text-center">
              <button class="px-4 py-2 mt-2 ml-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
