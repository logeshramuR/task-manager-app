import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://task-manager-app-kjwe.onrender.com/api/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/login");

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
          Register
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;