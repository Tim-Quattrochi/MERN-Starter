import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialFormState);
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
      navigate("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <input type="submit" />
    </form>
  );
};

export default Login;
