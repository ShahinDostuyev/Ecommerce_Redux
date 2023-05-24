import { useContext } from "react";

import { SignContext } from "../contexts/SignContext";
import Login from "../sign/Login";
import Products from "../pages/Products";


export const Auth = ({ element, isAuthProtected, path }) => {
  const { loggedIn } = useContext(SignContext);
  return isAuthProtected ? (
    loggedIn ? (
        element
    ) : (
      <Login/>
    )
  ) : loggedIn ? (
    path !== "/login"&&path!=="/register"? (
        element
    ) : (
      <Products/>
    )
  ) : (
    element
  );
};