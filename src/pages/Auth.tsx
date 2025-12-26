import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/review");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isLogin && !name) {
      setError("Please enter your name");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (isLogin) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          navigate("/review");
          return;
        }
      }
      setIsLoading(false);
      setError("Invalid email or password");
    } else {
      const user = { name, email, password, hasReviewed: false };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/review");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-xl">🎰</span>
          </div>
          <span className="text-2xl font-bold text-amber-400">SpinToWin</span>
        </Link>

        {/* Card */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-700/50 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              disabled={isLoading}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? "bg-amber-500 text-gray-900"
                  : "text-gray-400 hover:text-white"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              disabled={isLoading}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-amber-500 text-gray-900"
                  : "text-gray-400 hover:text-white"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? "Welcome back!" : "Create an account"}
          </h2>
          <p className="text-gray-400 mb-6">
            {isLogin
              ? "Enter your credentials to continue"
              : "Join us and spin the wheel"}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span>{isLogin ? "Logging in..." : "Creating account..."}</span>
                </>
              ) : (
                <span>{isLogin ? "Login" : "Create Account"}</span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          <Link to="/" className="text-amber-400 hover:text-amber-300">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
