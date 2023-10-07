import { useState, useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { validateFields } from "../../utils/validation";

const initialFormState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialFormState);

  const {
    handleLogin,
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

  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({
      ...errors,
      [name]: validateFields(name, touched, formData, "login"),
    }); //update with errors found
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //On successful login, programmatically navigates to the dashboard.
      //Any server errors from the authService will be caught in the catch block.

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
        newErrors[fieldName] = validateFields(
          fieldName,
          touched,
          formData,
          "login"
        );
      });
      setErrors(newErrors);

      // Check if there are any errors before submitting
      const isFormValid = Object.values(newErrors).every(
        (error) => error === ""
      ); //  all empty strings(no errors)

      if (isFormValid) {
        await handleLogin(formData.email, formData.password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isSubmitting) return <LoadingSpinner />;

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
        onBlur={handleInputBlur}
      />
      {errors.email && <div className="errorMsg">{errors.email}</div>}
      <label htmlFor="password">Password</label>

      <input
        type="password"
        name="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      {errors.password && (
        <div className="errorMsg">{errors.password}</div>
      )}
      <input type="submit" />
      <Link to="/register">Need an account?</Link>
      <div className="errorMsg"> {errorMsg && errorMsg}</div>
    </form>
  );
};

export default Login;
