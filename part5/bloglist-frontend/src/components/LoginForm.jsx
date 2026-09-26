import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      localStorage.setItem("loggedBloglistUser", JSON.stringify(user));

      setUser(user);

      setUsername("");
      setPassword("");

      showNotification("login successful");
    } catch {
      showNotification("wrong username or password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>

      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
