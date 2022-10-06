import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../../services/APIService";
import UserService from "../../services/UserService";
import routes from "../../routes";

const RegisterPage: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatpassword, setRepeatPassword] = useState<string>("");
  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const onSignUp = useCallback(() => {
    if (password.length < 6) {
      setErrorMessage("Password needs to be at least 6 characters.");
      return;
    } else if (password !== repeatpassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    APIService.register({ login, password }).then((resp) => {
      if (resp.status === "Success") {
        UserService.putToStorage(resp);
        navigate(routes.HOME);

        return;
      } else {
        setErrorMessage(resp.status);
        UserService.deleteFromStorage();
        setLogin("");
        setPassword("");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    });
  }, [login, password, repeatpassword, navigate]);

  return (
    <div>
      <h3>LoginPage</h3>

      <div>
        Username <br />
        <input
          type="text"
          value={login}
          placeholder="Username"
          onChange={(event) => setLogin(event.target.value)}
        />
        <br />
        <br />
        Password <br />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        Repeat Password <br />
        <input
          type="text"
          value={repeatpassword}
          placeholder="Repeat Password"
          onChange={(event) => setRepeatPassword(event.target.value)}
        />
        <br />
        <br />
        <div className="buttonDiv" onClick={onSignUp}>
          Sign Up
        </div>
        <br />
        <br />
        <span>{ErrorMessage}</span>
      </div>
    </div>
  );
};

export default RegisterPage;