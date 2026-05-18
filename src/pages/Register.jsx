import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://task-manager-app-kjwe.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message || "Registration Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={handleRegister}
        className="bg-white p-10 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-5xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-4 border rounded-lg mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 border rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 border rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-4 rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;