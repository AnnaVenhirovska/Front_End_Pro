import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Button from "./components/Button";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <div>
        <Link to={routes.HOME} id="homeMenu">
          <Button {...{ innertext: "Home" }} />
        </Link>
        <Link to={routes.LOGIN} id="loginMenu">
          <Button {...{ innertext: "Login" }} />
        </Link>
        <Link to={routes.SIGNUP} id="signUpMenu">
          <Button {...{ innertext: "SignUp" }} />
        </Link>
        <hr />
      </div>

      <Routes>
        <Route
          path={routes.HOME}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route path={routes.SIGNUP} element={<RegisterPage />} />

        <Route path="/" element={<Navigate to={routes.HOME} replace />} />
        <Route
          path="*"
          element={
            <>
              404 <Link to={routes.LOGIN}>Go to Login</Link>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;