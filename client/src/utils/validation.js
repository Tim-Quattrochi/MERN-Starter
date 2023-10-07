//---- Form validation logic for name, email, password, and confirmPassword
// or if the formType is "login", validate the email and password fields.

/**
 * @param {string} fieldName  the name of the field to validate.
 * @param {boolean} touched  - Whether the field has been interacted with.
 * @param {object} formData the data from the form.
 * @param {string} formType the type of form being validated (e.g. "login" or "register").
 * @returns {string} - the error message to display.
 */
export const validateFields = (
  fieldName,
  touched,
  formData,
  formType
) => {
  if (!formData[fieldName].trim() && touched[fieldName]) {
    // if true, the field has been interacted with
    return `${
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    } is required.`;
  } else if (
    formType === "register" &&
    fieldName === "email" &&
    touched.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  ) {
    return "Please enter a valid email address.";
  } else if (
    formType === "register" &&
    fieldName === "password" &&
    touched.password &&
    formData.password.length < 7
  ) {
    return "Password must be at least 7 characters long.";
  } else if (
    formType === "register" &&
    fieldName === "confirmPassword" &&
    touched.confirmPassword &&
    formData.password !== formData.confirmPassword
  ) {
    return "Passwords do not match.";
  } else if (
    formType === "login" &&
    fieldName === "email" &&
    touched.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  ) {
    return "Please enter a valid email address.";
  } else if (
    formType === "login" &&
    fieldName === "password" &&
    touched.password &&
    formData.password.length < 7
  ) {
    return "Password must be at least 7 characters long.";
  }
  return "";
};
