import { createContext, useEffect, useState } from "react";

export const SignContext = createContext(null);

export const SignContextProvider = ({ children }) => {
  let initialSignData = JSON.parse(localStorage.getItem("Users"));

  const [users, setusers] = useState(initialSignData ?? []);
  const [loggedIn, setloggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")));
  console.log(users);

  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);
  const isInUsers = (enteredEmail) => {
    return users.some((user) => user.email === enteredEmail);
  };
  const isValidForLogin = (loginEmail, loginPassword) => {
    return users.some(
      (user) => user.email === loginEmail && user.password === loginPassword
    );
  };

  const values = {
    setusers,
    loggedIn,
    setloggedIn,
    isInUsers,
    isValidForLogin,
  };

  return <SignContext.Provider value={values}>{children}</SignContext.Provider>;
};
