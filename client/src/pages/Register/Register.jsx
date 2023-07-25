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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //---- Form validation logic for name, email, password, and confirmPassword

  //validateForm function => performs form validation based on the entered data in formData,
  // the validation errors are added to the newErrors object.

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 7) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;   //Checks if the newErrors object is empty (no validation errors) If so, the function returns true, and the form is valid.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await register(formData);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
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
        onBlur={validateForm} // Trigger validation onBlur
        onChange={handleInputChange}
      />
      {errors.name && <div className="errorMsg">{errors.name}</div>}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        value={formData.email}
        onBlur={validateForm} // Trigger validation onBlur
        onChange={handleInputChange}
      />
      {errors.email && <div className="errorMsg">{errors.email}</div>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onBlur={validateForm} // Trigger validation onBlur
        onChange={handleInputChange}
      />
      {errors.password && <div className="errorMsg">{errors.password}</div>}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onBlur={validateForm} // Trigger validation onBlur
        onChange={handleInputChange}
      />
      {errors.confirmPassword && (
        <div className="errorMsg">{errors.confirmPassword}</div>
      )}

      <input type="submit" />
      <Link to="/login">Have an account?</Link>
    </form>
  );
};

export default Register;
