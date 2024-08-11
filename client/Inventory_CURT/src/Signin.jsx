import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Signin.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin(props) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    props.setPage("Login");
  }, []);

  function Submit() {
    if (username === "" || password === "") {
      toast.error("Please enter both username and password.");
    } else {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            toast.error("Incorrect password. Please try again.");
          } else if (response.status === 404) {
            toast.error("User not found. Please check your username or register.");
          } else {
            toast.error("An unexpected error occurred. Please try again later.");
          }
        }).then((data) => {
          props.setPage("Inventory");
            navigate("/Inventory");
            props.setUser(data);
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          toast.error("Network error. Please check your internet connection and try again.");
        });
    }
  }

  return (
    <div id="SigninPage" data-bs-theme="dark" className="md">
      <fieldset id="login" className="md">
        <ToastContainer theme='dark'/>
        <h1>Sign in</h1>
        <br />
        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
          <Form.Control
            type="username"
            placeholder="name@example.com"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FloatingLabel>
        <br />
        <InputGroup className="mb-3">
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FloatingLabel>
          <InputGroup.Text>
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              data-bs-theme="dark"
              style={{ color: "white" }}
            >
              {showPassword ? (
                <VisibilityIcon></VisibilityIcon>
              ) : (
                <VisibilityOffIcon></VisibilityOffIcon>
              )}
            </IconButton>
          </InputGroup.Text>
        </InputGroup>
        <br />
        <button type="submit" id="Signin" onClick={Submit}>
          Sign in
        </button>
        <br />
        <br />
        <Link to="/Register">Create account</Link>
      </fieldset>
    </div>
  );
}

export default Signin;