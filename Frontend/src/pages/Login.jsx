/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { AccountCircle, LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import userService from "../service/StudentService";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const authContext = useAuth();
  const { login } = authContext;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    const res = await userService.loginUser(user);
    if (res.status) {
      setEmail("");
      setPassword("");
      login(res?.data?.token);
      setOpen(true);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setMessage(res?.message);
      setOpen(true);
      setSuccess(false);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {success
            ? "Successfully Logged In!!"
            : message === ""
            ? "Unable to Log In! Please Try Again!!"
            : message}
        </Alert>
      </Snackbar>
      <h1 align="center">Login</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: <AccountCircle />,
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: <LockOutlined />,
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
