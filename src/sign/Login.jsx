import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import { SignContext } from '../contexts/SignContext';
const Login = () => {
  const { setloggedIn,isValidForLogin } = useContext(SignContext);


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      if(isValidForLogin(values.email,values.password)){
        setloggedIn(true)
        alert('Login successful!');
        setSubmitting(false);
      }
    }, 500);
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form">
        
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" className="input-field" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" className="input-field" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit" className="submit-btn">Sign in</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
