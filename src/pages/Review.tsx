import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Review = () => {
  const [review, setReview] = useState("");
  const [user, setUser] = useState<{ name: string; hasReviewed: boolean } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    
    // If already reviewed, go to roulette
    if (userData.hasReviewed) {
      navigate("/roulette");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (review.trim().length < 10) {
      return;
    }

    // Mark as reviewed
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      userData.hasReviewed = true;
      localStorage.setItem("user", JSON.stringify(userData));
    }

    navigate("/roulette");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
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
      <main className="flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-gray-900 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <span className="text-white font-medium">Review</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 text-gray-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span className="text-gray-400">Spin</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Share Your Review
              </h1>
              <p className="text-gray-400">
                Tell us about your experience to unlock the roulette wheel
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                placeholder="Write your review here... (minimum 10 characters)"
              />
              
              <div className="flex items-center justify-between mt-4">
                <span className={`text-sm ${review.length >= 10 ? "text-green-400" : "text-gray-500"}`}>
                  {review.length}/10 characters minimum
                </span>
                <button
                  type="submit"
                  disabled={review.trim().length < 10}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    review.trim().length >= 10
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02]"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Submit & Spin →
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Review;
