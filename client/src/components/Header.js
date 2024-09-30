import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
// global state manage
import { useSelector } from "react-redux";

const Header = () => {
  // define global state
  const isLogin = useSelector((state) => state.isLogin);

  const [value, setvalue] = useState();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {/* condition to check */}
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setvalue(val)}
              >
                <Tab label="blogs" LinkComponent={Link} to="/blogs"></Tab>
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs"></Tab>
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft={"auto"}>
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to={"/register"}
                >
                  Register
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to={"/login"}
                >
                  Login
                </Button>
              </>
            )}
            {isLogin && (
              <Button sx={{ margin: 1, color: "white" }}>Logput</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
