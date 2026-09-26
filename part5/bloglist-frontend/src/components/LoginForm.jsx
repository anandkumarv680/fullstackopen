import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";

import loginService from "../services/login";

const LoginForm = ({
  setUser,
  showNotification,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      localStorage.setItem(
        "loggedBloglistUser",
        JSON.stringify(user)
      );

      setUser(user);

      setUsername("");
      setPassword("");

      showNotification("login successful");
    } catch {
      showNotification(
        "wrong username or password"
      );
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        marginTop: 3,
        maxWidth: 400,
      }}
    >
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <Stack spacing={2}>
          <TextField
            label="username:"
            value={username}
            onChange={({ target }) =>
              setUsername(target.value)
            }
          />

          <TextField
            label="password:"
            type="password"
            value={password}
            onChange={({ target }) =>
              setPassword(target.value)
            }
          />

          <Button
            type="submit"
            variant="contained"
          >
            login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LoginForm;