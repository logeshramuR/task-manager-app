import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://task-manager-app-kjwe.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        `${API}/api/auth/login`,
        {
          email,
          password,
        }
      );

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server Error");
      }

    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 mb-4 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;