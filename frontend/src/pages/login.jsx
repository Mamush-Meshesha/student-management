import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../store/redux/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


    const { isLoading } = useSelector((state) => state.auth);
    const user = localStorage.getItem("user");
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = { email, password };
      dispatch(authRequest(data));
      navigate("/home", { replace: true });
    };

    useEffect(() => {
      if (user) {
        navigate("/home", { replace: true });
      }
    }, [user, navigate]);


  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-200 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
