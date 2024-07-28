import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import moment from "moment";

const Footer = () => {
  const year = moment().format("YYYY");

  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, backgroundColor: "#333" }}
    >
      <Toolbar>
        <Typography
          variant="body1"
          color="inherit"
          align="center"
          sx={{ width: "100%" }}
        >
          &copy; {year} | Antaryami Sahoo &nbsp;&nbsp;All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
