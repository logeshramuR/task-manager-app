import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://task-manager-app-kjwe.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

        <p
          onClick={() => navigate("/register")}
          className="text-center text-blue-600 mt-4 cursor-pointer"
        >
          Create Account
        </p>

      </div>
    </div>
  );
}

export default Login;