import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Roulette = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [rotation, setRotation] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    const userData = JSON.parse(storedUser);
    if (!userData.hasReviewed) {
      navigate("/review");
      return;
    }
    setUser(userData);
  }, [navigate]);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Random result
    const isWin = Math.random() > 0.5;
    
    // Calculate rotation - at least 5 full spins plus landing position
    // Win lands on green (0deg or 180deg), Lose lands on red (90deg or 270deg)
    const baseSpins = 5 * 360;
    const landingAngle = isWin ? (Math.random() > 0.5 ? 0 : 180) : (Math.random() > 0.5 ? 90 : 270);
    const totalRotation = rotation + baseSpins + landingAngle + (Math.random() * 30 - 15);
    
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(isWin ? "win" : "lose");
    }, 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const resetGame = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      userData.hasReviewed = false;
      localStorage.setItem("user", JSON.stringify(userData));
    }
    navigate("/review");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-lg">🎰</span>
          </div>
          <span className="text-xl font-bold text-amber-400">SpinToWin</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">
            Hey, <span className="text-white">{user?.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 py-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
              ✓
            </div>
            <span className="text-green-400 font-medium">Review</span>
          </div>
          <div className="w-16 h-0.5 bg-amber-500"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-gray-900 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <span className="text-white font-medium">Spin</span>
          </div>
        </div>

        {/* Roulette Wheel */}
        <div className="relative mb-8">
          {/* Pointer */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-amber-400 drop-shadow-lg"></div>
          </div>

          {/* Wheel Container */}
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-amber-400 p-2 shadow-2xl shadow-amber-500/30">
              {/* Inner Wheel */}
              <div
                className="w-full h-full rounded-full overflow-hidden transition-transform duration-[4000ms] ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Wheel Segments */}
                <div className="relative w-full h-full">
                  {/* Win Segment (Top) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-green-500 to-green-600 clip-half-top flex items-start justify-center pt-8">
                    <span className="text-white font-bold text-2xl rotate-0">WIN</span>
                  </div>
                  {/* Lose Segment (Right) */}
                  <div className="absolute inset-0 bg-gradient-to-l from-red-500 to-red-600 clip-quarter-right flex items-center justify-end pr-8">
                    <span className="text-white font-bold text-xl rotate-90">LOSE</span>
                  </div>
                  {/* Win Segment (Bottom) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500 to-green-600 clip-half-bottom flex items-end justify-center pb-8">
                    <span className="text-white font-bold text-2xl rotate-180">WIN</span>
                  </div>
                  {/* Lose Segment (Left) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 clip-quarter-left flex items-center justify-start pl-8">
                    <span className="text-white font-bold text-xl -rotate-90">LOSE</span>
                  </div>
                  {/* Center Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-amber-300 shadow-lg flex items-center justify-center">
                    <span className="text-2xl">🎰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spin Button */}
        {!result && (
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 ${
              isSpinning
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 active:scale-95"
            }`}
          >
            {isSpinning ? "Spinning..." : "SPIN!"}
          </button>
        )}

        {/* Result */}
        {result && (
          <div className="text-center animate-bounce">
            <div
              className={`text-6xl font-bold mb-4 ${
                result === "win" ? "text-green-400" : "text-red-400"
              }`}
            >
              {result === "win" ? "🎉 YOU WIN! 🎉" : "😢 YOU LOSE 😢"}
            </div>
            <p className="text-gray-400 mb-6">
              {result === "win"
                ? "Congratulations! Lady luck is on your side!"
                : "Better luck next time!"}
            </p>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Try Again (Submit New Review)
            </button>
          </div>
        )}
      </main>

      {/* Custom CSS for wheel segments */}
      <style>{`
        .clip-half-top {
          clip-path: polygon(50% 50%, 0 0, 100% 0);
        }
        .clip-half-bottom {
          clip-path: polygon(50% 50%, 100% 100%, 0 100%);
        }
        .clip-quarter-right {
          clip-path: polygon(50% 50%, 100% 0, 100% 100%);
        }
        .clip-quarter-left {
          clip-path: polygon(50% 50%, 0 100%, 0 0);
        }
      `}</style>
    </div>
  );
};

export default Roulette;
