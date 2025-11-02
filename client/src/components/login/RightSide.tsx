import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import { AtSign } from "lucide-react";
import fetchLoginApi from "../../api/fetchLoginApi";

const RightSide = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetchLoginApi(email, password);
    if (res === true) {
      navigate("/");
    } else {
      alert("Invalid credentials");
    }

  };
  return (
    <div className="h-full w-[50%] flex justify-center items-center">
      <div
        className="w-[400px] min-h-[550px] text-center shadow-2xl rounded-xl
        bg-white p-8 py-10 border border-gray-100"
      >
        <Header />
        <form className="space-y-6">
          {/* Email Input */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <AtSign className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div
            onClick={handleLogin}
            className="w-full cursor-pointer bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
          >
            Sign In
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to={"/sign-up"}
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RightSide;
