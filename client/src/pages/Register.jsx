import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialFormState);
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <label htmlFor="email">Email</label>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <label htmlFor="password">password</label>

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>

      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />

      <input type="submit" />
    </form>
  );
};

export default Register;
