import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-3 rounded-lg"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;