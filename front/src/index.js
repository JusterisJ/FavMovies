import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMovies from "./components/movies/AllMovies";
import Register from "./components/registerLogin/Register";
import { UserProvider } from "./components/context/UserContext";
import Login from "./components/registerLogin/Login";
import FavMovies from "./components/favMovies/FavMovies";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Admin from "./components/admin/Admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Private Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<App />}>
              <Route element={<ProtectedRoutes roleRequired="admin" />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route path="/allMovies" element={<AllMovies />} />
              <Route path="/favMovies" element={<FavMovies />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<App />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
