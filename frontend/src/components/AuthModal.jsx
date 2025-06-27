import React, { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, BookOpen } from "lucide-react";
import axios from "axios";
import { getBackendUrl } from "../utils/helpers";
import { Alert, Snackbar } from "@mui/material";

const AuthModal = ({ setIsModalOpen, setHasLoggedIn, SetCurrentUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Fixed handleInputChange function
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Helper function to show alerts
  const showAlert = (severity, message) => {
    setAlert({
      open: true,
      message: message,
      severity: severity,
    });
  };

  const signUp = async (userPayload) => {
    try {
      const url = getBackendUrl();
      const res = await axios.post(`${url}user/signup`, userPayload);
      setHasLoggedIn(true);
      return res.data;
    } catch (error) {
      // Show error alert
      showAlert(
        "error",
        error.response?.data?.message || "Signup failed. Please try again."
      );
      throw error; // Re-throw to be handled in handleSignup
    }
  };

  const login = async (userPayload) => {
    try {
      const url = getBackendUrl();
      const res = await axios.post(`${url}user/login`, userPayload);
      setHasLoggedIn(true);
      return res.data;
    } catch (error) {
      // Show error alert
      showAlert(
        "error",
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      throw error; // Re-throw to be handled in handleLogin
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password doesn't match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userPayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "student",
        score: 0,
        question_solved: 0,
        streak: 0,
      };

      const response = await signUp(userPayload);

      const msg = response.message;
      const userStr = msg
        .substring(msg.indexOf("{"), msg.lastIndexOf("}") + 1)
        .replace(/ObjectId\(['"](.+?)['"]\)/g, '"$1"') // remove ObjectId()
        .replace(/'/g, '"');
      const user = JSON.parse(userStr);
      SetCurrentUser(user);

      // Show success alert
      showAlert("success", "Signup Successfully");

      // Close modal after a short delay to show the alert
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    } catch (error) {
      // Error alert is already shown in signUp function
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userPayload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await login(userPayload);
      const msg = response.message;
      const userStr = msg
        .substring(msg.indexOf("{"), msg.lastIndexOf("}") + 1)
        .replace(/ObjectId\(['"](.+?)['"]\)/g, '"$1"') // remove ObjectId()
        .replace(/'/g, '"');

      const user = JSON.parse(userStr);
      SetCurrentUser(user);

      // Show success alert
      showAlert("success", "Login Successfully");

      // Close modal after a short delay to show the alert
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    } catch (error) {
      // Error alert is already shown in login function
        showAlert("error", `Unexpected error ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          disabled={loading}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodingX
            </h2>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {isLogin ? "Welcome Back!" : "Join CodingX"}
          </h3>
          <p className="text-gray-400 text-sm">
            {isLogin
              ? "Sign in to continue your coding journey"
              : "Start your coding adventure today"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                required
                disabled={loading}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold rounded-lg transition-all duration-200 hover:from-purple-500 hover:to-pink-500 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isLogin ? "Signing In..." : "Creating Account..."}
              </span>
            ) : (
              <span>{isLogin ? "Sign In" : "Create Account"}</span>
            )}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleAuthMode}
              className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
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
  );
};

export default AuthModal;
