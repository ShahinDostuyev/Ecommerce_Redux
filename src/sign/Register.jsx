import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.css";
import { SignContext } from "../contexts/SignContext";

function FormikRegisterForm() {
  const { users, isInUsers, setloggedIn, setusers } = useContext(SignContext);

  const addRegistrationValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name field could not be empty!")
      .max(50, "Name cannot be more than 50 characters!"),
    email: Yup.string().required("Email field could not be empty!"),
    gender: Yup.string().required("Gender field could not be empty!"),
    password: Yup.string().required(
      "You have to set a password for safety reasons!"
    ),
    confirmPassword: Yup.string()
      .required("You have to confirm your password above!")
      .oneOf(
        [Yup.ref("password")],
        "You have to enter the same password as above"
      ),
  });

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (isInUsers(value)) {
      error = "There is an account with this email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "You should have an email with @code.edu.az address";
    }

    return error;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "female",
      password: "",
      confirmPassword: "",
    },
    validationSchema: addRegistrationValidationSchema,
    validate: (values) => {
      const errors = {};
      errors.email = validateEmail(values.email);
      if (errors.email) {
        return errors;
      }
    },
    onSubmit: (values, { resetForm }) => {
      setusers(oldUsers=>[...oldUsers,values]);
      setloggedIn(true);
      resetForm();
    },
  });

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-heading">Create Your Account</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <p className="error-message">{formik.errors?.name}</p>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="form-input"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p className="error-message">{formik.errors?.email}</p>
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <div className="gender-radio">
              <input
                id="gender-male"
                name="gender"
                type="radio"
                onChange={formik.handleChange}
                value={"male"}
              />
              <label htmlFor="gender-male" className="radio-label">
                Male
              </label>
              <input
                id="gender-female"
                name="gender"
                type="radio"
                onChange={formik.handleChange}
                value={"female"}
                checked={formik.values.gender === "female"}
              />
              <label htmlFor="gender-female" className="radio-label">
                Female
              </label>
            </div>
            <p className="error-message">{formik.errors?.gender}</p>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="text"
              className="form-input"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p className="error-message">{formik.errors?.password}</p>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password:
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              className="form-input"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <p className="error-message">{formik.errors?.confirmPassword}</p>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="submit-button" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormikRegisterForm;
