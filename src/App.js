import { Route, Routes } from "react-router-dom";
import React from "react";

import Basket from "./pages/Basket";
import Products from "./pages/Products";
import ResponsiveAppBar from "./layouts/Header";
import HomePage from "./pages/HomePage";
import Login from "./sign/Login";
import Register from "./sign/Register";
import AdminPanel from "./pages/AdminPanel";
import { privatePages, publicPages } from "./roots";
import {Auth} from "./roots/Auth";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
      {publicPages.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={<Auth {...route} isAuthProtected={false} />}
        />
      ))}
      {privatePages.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={<Auth {...route} isAuthProtected={true} />}
        />
      ))}
    </Routes>

      {/* <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/basket" element={<Basket />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/adminPanel" element={<AdminPanel />}></Route>
        </Routes> */}
    </>
  );
}

export default App;
