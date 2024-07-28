/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { AccountCircle, Phone, Email, LockOutlined } from "@mui/icons-material";
import userService from "../service/UserService";
import { useNavigate } from "react-router-dom";
import { useInputValidation, useStrongPassword } from "6pp";
import { emailValidator, mobileValidator } from "../validators/validators";
const Register = () => {
  const navigate = useNavigate();
  const name = useInputValidation("");
  const mobile = useInputValidation("", mobileValidator);
  const email = useInputValidation("", emailValidator);
  const password = useStrongPassword("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name?.error || mobile?.error || email?.error || password?.error) {
      setOpen(true);
      setSuccess(false);
      setError(true);
      setMessage(
        name?.error || mobile?.error || email?.error || password?.error
      );
      return;
    }
    const user = {
      name: name.value,
      mobile: mobile.value,
      email: email.value,
      password: password.value,
    };
    let res = await userService.registerUser(user);
    if (res.status) {
      setOpen(true);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
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
            ? "Successfully Signed In! Log In to continue!"
            : error
            ? message
            : "Unable to Sign In! Please Try Again!!"}
        </Alert>
      </Snackbar>
      <h1 align="center">Register</h1>
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
            label="Name"
            value={name.value}
            onChange={name.changeHandler}
            required
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: <AccountCircle />,
            }}
          />
          <br />
          <TextField
            label="Mobile Number"
            type="tel"
            value={mobile.value}
            onChange={mobile.changeHandler}
            required
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: <Phone />,
            }}
          />
          <TextField
            label="Email"
            type="email"
            value={email.value}
            onChange={email.changeHandler}
            required
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: <Email />,
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password.value}
            onChange={password.changeHandler}
            required
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: <LockOutlined />,
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;
