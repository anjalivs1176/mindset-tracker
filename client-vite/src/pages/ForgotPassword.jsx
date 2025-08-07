import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
        { email }
      );
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Try again."
      );
      setMessage("");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter your registered email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 text-sm text-center">
            {message} Redirecting to login...
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
