import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  // navigation
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/post/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data) {
        alert("New user register");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={"50px"}
          padding={3}
          boxShadow={"10px 10px 20px #ccc"}
          borderRadius={3}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            padding={3}
            sx={{ textTransform: "uppercase" }}
          >
            Register
          </Typography>
          <TextField
            label="name"
            type="text"
            margin="normal"
            name="name"
            value={inputs.name}
            onChange={handleInputs}
            required
          />
          <TextField
            label="Email"
            type="email"
            margin="normal"
            name="email"
            value={inputs.email}
            onChange={handleInputs}
            required
          />
          <TextField
            label="Password"
            type="text"
            margin="normal"
            name="password"
            value={inputs.password}
            onChange={handleInputs}
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
              navigate("/login");
            }}
          >
            Already Register ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
