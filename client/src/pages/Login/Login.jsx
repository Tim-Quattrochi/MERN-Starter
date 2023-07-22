import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";

const initialFormState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label htmlFor="email">Email</label>

      <input
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <label htmlFor="password">Password</label>

      <input
        type="password"
        name="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <input type="submit" />
      <Link to="/register">Need an account?</Link>
      <div className="errorMsg"> {error && error}</div>
    </form>
  );
};

export default Login;
