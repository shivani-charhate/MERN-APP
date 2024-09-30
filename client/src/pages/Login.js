import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.sucess) {
        alert("User Login");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={formSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          padding={3}
          boxShadow={"10px 10px 20px #ccc"}
          borderRadius={3}
        >
          <Typography
            variant="h4"
            textTransform={"uppercase"}
            textAlign={"center"}
            sx={{ padding: 3 }}
          >
            Login
          </Typography>
          <TextField
            label="Email"
            type="email"
            margin="normal"
            name="email"
            value={inputs.email}
            onChange={handleInput}
            required
          />
          <TextField
            label="password"
            type="text"
            margin="normal"
            name="password"
            value={inputs.password}
            onChange={handleInput}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, borderRadius: 2 }}
          >
            Submit
          </Button>
          <Button
            variant="text"
            color="primary"
            sx={{ marginTop: 3, borderRadius: 2 }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Not A User ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};
export default Login;
