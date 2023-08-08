import { useState, useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import "./register.css";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormState);
  const {
    handleRegister,
    authState: { isSubmitting, errorMsg },
  } = useAuthContext();

  const [errors, setErrors] = useState({}); // will store error messages
  const [touched, setTouched] = useState({}); //will track for client interaction

  useEffect(() => {
    // Mark all fields as touched after the component mounts, error messages are displayed only after the user interacts with the respective fields.
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //---- Form validation logic for name, email, password, and confirmPassword

  //validateFields function => performs form validation based on the entered data in formData,

  const validateFields = (fieldName) => {
    if (!formData[fieldName].trim() && touched[fieldName]) {
      // if true, the field has been interacted with
      return `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } is required.`;
    } else if (
      fieldName === "email" &&
      touched.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      return "Please enter a valid email address.";
    } else if (
      fieldName === "password" &&
      touched.password &&
      formData.password.length < 7
    ) {
      return "Password must be at least 7 characters long.";
    } else if (
      fieldName === "confirmPassword" &&
      touched.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateFields(name) }); //update with errors found
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      //all fields were touched
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Validate all fields on form submission
    const newErrors = {};
    Object.keys(formData).forEach((fieldName) => {
      newErrors[fieldName] = validateFields(fieldName);
    });
    setErrors(newErrors);

    // Check if there are any errors before submitting
    const isFormValid = Object.values(newErrors).every(
      (error) => error === ""
    ); //  all empty strings(no errors)
    if (isFormValid) {
      try {
        await handleRegister(formData);
      } catch (error) {
        console.log(error);
        // add server error
        setErrors({ ...errors, serverError: error.message });
      }
    }
  };

  if (isSubmitting) return <LoadingSpinner />;

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
        onBlur={handleInputBlur} // Track field blur event
      />
      {errors.name && <div className="errorMsg">{errors.name}</div>}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={handleInputBlur} // Track field blur event
      />
      {errors.email && <div className="errorMsg">{errors.email}</div>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleInputChange}
        onBlur={handleInputBlur} // Track field blur event
      />
      {errors.password && (
        <div className="errorMsg">{errors.password}</div>
      )}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        onBlur={handleInputBlur} // Track field blur event
      />
      {errors.confirmPassword && (
        <div className="errorMsg">{errors.confirmPassword}</div>
      )}

      <input type="submit" />
      <Link to="/login">Have an account?</Link>
      {errors.serverError && (
        <div className="errorMsg">{errors.serverError}</div>
      )}
      {errorMsg && errorMsg}
    </form>
  );
};

export default Register;
