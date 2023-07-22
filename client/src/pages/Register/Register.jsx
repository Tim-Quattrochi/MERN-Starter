import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialFormState);
  const { register } = useAuthContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(formData);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Something went wrong.");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        autoComplete="name"
        value={formData.name}
        onChange={handleInputChange}
      />
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
        autoComplete="new-password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      <input type="submit" />
      <Link to="/login">Have an account?</Link>
      <div className="errorMsg">{error && error}</div>
    </form>
  );
};

export default Register;
