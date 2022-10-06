import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../../services/APIService";
import UserService from "../../services/UserService";
import routes from "../../routes";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const onLogin = useCallback(() => {
    APIService.login({ login, password }).then((resp) => {
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
  }, [login, password, navigate]);

  return (
    <div>
      <h3>LoginPage</h3>
      <div>
        Login <br />
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
        <div className="buttonDiv" onClick={onLogin}>
          Login
        </div>
        <br />
        <br />
        <span>{ErrorMessage}</span>
      </div>
    </div>
  );
};

export default LoginPage;