import {
  Stack,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import studentService from "../service/StudentService";
import { useState } from "react";

const DeleteStudentDetails = () => {
  const [rollNo, setrollNo] = useState(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleDelete = async () => {
    if (rollNo?.value !== undefined) {
      const res = await studentService.getStudentDetailsByRoll(rollNo);
      if (res.status) {
        const res = await studentService.deleteStudentDetailsByRoll(rollNo);
        if (res.status) {
          setOpen(true);
          setSuccess(true);
        }
      } else {
        setOpen(true);
        setSuccess(false);
      }
    } else {
      setOpen(true);
      setSuccess(false);
    }
  };
  const getrollNo = (e) => {
    const { value } = e.target;
    setrollNo((prevData) => ({
      ...prevData,
      value,
    }));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5rem",
        width: {
          xs: "100%",
          sm: "90%",
          md: "60%",
        },
        marginLeft: {
          xs: "0%",
          sm: "5%",
          md: "20%",
        },
      }}
    >
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
            ? "Successfully Deleted the Student Setails!!"
            : "Student details not Availaible!!"}
        </Alert>
      </Snackbar>
      <Stack spacing={2} marginTop={"2rem"} marginBottom={"2rem"}>
        <h1>Enter the Roll No of Student to Delete Details</h1>
        <TextField
          label="Roll No"
          variant="outlined"
          id="outlined-basic"
          onChange={getrollNo}
        />
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

export default DeleteStudentDetails;
