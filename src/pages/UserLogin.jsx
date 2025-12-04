import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import bgImage from "../assets/Document.png";
import axios from "axios";
import  {jwtDecode}  from "jwt-decode";
import { toast } from "react-hot-toast";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); 

  const navigator = useNavigate();

  const validateLogin = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;

    await toast
      .promise(
        axios.post("http://localhost:8080/api/v1/tourists/login", {
          email,
          password,
        }),
        {
          loading: "Logging in...",
          success: async (response) => {
            const token = response.data.token;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);

            localStorage.setItem("userId", decoded.userId);
            localStorage.setItem("firstName", decoded.firstName);
            localStorage.setItem("lastName", decoded.lastName);
            localStorage.setItem("role", decoded.role);

            navigator("/dashboard");
            return "Login successful! 👋";
          },
          error: "Invalid email or password",
        }
      )
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-64px)] flex justify-center items-center bg-contain bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white shadow-lg rounded-2xl w-[380px] px-8 py-10 m-4">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Welcome Back 👋
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          {/* Email */}
          <InputField
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          {/* Password */}
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
        </div>

        {/* API error */}
        {errors.api && (
          <p className="text-red-500 text-center text-sm mb-3">{errors.api}</p>
        )}

        <button
          className="w-full bg-[#113D47] text-white py-3 rounded-md text-lg font-medium
            border-2 border-[#113D47]
            transition-all duration-300
            hover:bg-white hover:text-[#113D47] hover:scale-105"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don’t have an account?{" "}
          <Link to="/register" className="text-gray-900 font-medium underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
