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
import { useNavigate } from "react-router-dom";
const UpdateStudentDetails = () => {
  const [rollNo, setRollNo] = useState(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    if (rollNo?.value !== undefined) {
      const res = await studentService.getStudentDetailsByRoll(rollNo);
      if (res.status) {
        if (res.status) {
          setOpen(true);
          setSuccess(true);
          setTimeout(() => {
            navigate(`/updatestudent/${parseInt(rollNo.value)}`);
          }, 2000);
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
  const getRollNo = (e) => {
    const { value } = e.target;
    setRollNo((prevData) => ({
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
        autoHideDuration={2000}
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
            ? "Navigating to Update Student Page!!"
            : "Student details not Availaible!!"}
        </Alert>
      </Snackbar>
      <Stack spacing={2} marginTop={"2rem"} marginBottom={"2rem"}>
        <h1>Enter the Roll No of Student to Update Details</h1>
        <TextField
          label="Roll No"
          variant="outlined"
          id="outlined-basic"
          onChange={getRollNo}
        />
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </Stack>
    </Paper>
  );
};

export default UpdateStudentDetails;
