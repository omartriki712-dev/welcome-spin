import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold text-amber-400">SpinToWin</h1>
        <div className="flex gap-4">
          <Link
            to="/auth"
            className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/auth?mode=signup"
            className="px-6 py-2 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <div className="mb-8 animate-bounce">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <span className="text-4xl">🎰</span>
          </div>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Share Your Review,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Spin the Wheel
          </span>
        </h2>
        
        <p className="text-xl text-gray-400 max-w-2xl mb-10">
          Leave a review and get a chance to spin our lucky roulette wheel. 
          Will fortune favor you today?
        </p>
        
        <Link
          to="/auth"
          className="group relative px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 font-bold text-lg rounded-full hover:shadow-lg hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
        >
          Get Started
          <span className="absolute -right-2 -top-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-xs animate-pulse">
            ✓
          </span>
        </Link>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl">
          <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Write a Review</h3>
            <p className="text-gray-400 text-sm">Share your thoughts and experiences with us</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🎡</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Spin the Wheel</h3>
            <p className="text-gray-400 text-sm">Get access to our lucky roulette after your review</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Win Prizes</h3>
            <p className="text-gray-400 text-sm">Test your luck and see if you're a winner</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © 2025 SpinToWin. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
