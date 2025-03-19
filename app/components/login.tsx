"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Initialize router

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value !== "test@123") {
      setPasswordError("Incorrect password");
    } else {
      setPasswordError("");
    }
  };

  const isFormValid = email === "test@prosessed.com" && password === "test@123";

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoggedIn(true);
      router.push("/chatscreen"); // Redirect to chatscreen page
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/Background.svg')" }}>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold text-green-700">Pro<span className="text-blue-600">Sessed</span></h1>
        </div>
        {isLoggedIn ? (
          <div className="text-center text-green-600 font-bold">Logged in successfully!</div>
        ) : (
          <form onSubmit={handleLogin}>
            <h2 className="text-lg font-semibold text-black text-center mb-4">Login to Proceed</h2>
            
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email address</label>
              <input 
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                placeholder="Enter your email"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            
            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input 
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  passwordError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                placeholder="Enter your password"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <div className="mb-4 text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-300 cursor-not-allowed"
              }`}
            >
              Log in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}





