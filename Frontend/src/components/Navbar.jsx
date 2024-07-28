import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const pages = [
  "Student Details",
  "Search Student Details",
  "Add Student Details",
  "Update Student Details",
  "Delete Student Details",
  "Register",
  "Log In",
  "Log Out",
];

function ResponsiveAppBar() {
  const authContext = useAuth();
  const { isLoggedIn, logout } = authContext;
  const logoutUser = () => {
    logout();
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleNavigate = (event) => {
    setAnchorElNav(null);
    const pageToNavigate = event.target.innerText.toLowerCase();
    navigate(`/${pageToNavigate.split(" ").join("")}`);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AssignmentIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Ass-10
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleNavigate}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => {
                if (index > 1) return;
                return (
                  <MenuItem key={index} onClick={handleNavigate}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                );
              })}
              {isLoggedIn ? (
                <div>
                  <MenuItem onClick={handleNavigate}>
                    <Typography textAlign="center">{pages[2]}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleNavigate}>
                    <Typography textAlign="center">{pages[3]}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleNavigate}>
                    <Typography textAlign="center">{pages[4]}</Typography>
                  </MenuItem>
                  <MenuItem onClick={logoutUser}>
                    <Typography textAlign="center">{pages[7]}</Typography>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={handleNavigate}>
                    <Typography textAlign="center">{pages[5]}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleNavigate}>
                    <Typography textAlign="center">{pages[6]}</Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
          <AssignmentIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Assignment-10
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => {
              if (index > 1) return;
              return (
                <Button
                  key={page}
                  onClick={handleNavigate}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              );
            })}
            {isLoggedIn ? (
              <>
                <Button
                  onClick={handleNavigate}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {pages[2]}
                </Button>
                <Button
                  onClick={handleNavigate}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {pages[3]}
                </Button>
                <Button
                  onClick={handleNavigate}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {pages[4]}
                </Button>
                <Button
                  onClick={logoutUser}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {pages[7]}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleNavigate}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {pages[5]}
                </Button>
                <Button
                  onClick={handleNavigate}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {pages[6]}
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar alt="user" src="/avatars/user.png" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
