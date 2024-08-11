import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  async function Registerbutt() {
    if (!/^[a-zA-Z]+$/.test(name.trim())) {
      toast.error("Please enter a valid name (only alphabets).");
      return;
    }
    if (!username.trim()) {
      toast.error("username is missing.");
      return;
    }
    if (pass.trim().length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:name, username:username, pass:pass }),
      });
      const responseData = await response.text();
      if (response.ok) {
        // Registration successful, redirect to login page
        if (responseData.includes('registered successfully')) { navigate('/'); } // User registered successfully
        else if (responseData.includes('duplicate key error'))     { toast.error('User with this username already exists.'); } 
      } else {
        // Registration failed, handle error response
        toast.error(responseData.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Registration failed due to an unexpected error.');
    }
  }

  return (
    <div id="RegisterPage" data-bs-theme="dark" className="md">
      <fieldset id="register">
        <ToastContainer theme='dark'/>
        <h1>Register</h1>
        <br />
        <div id="register_fields">
          <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
          <Form.Control
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FloatingLabel>
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
        <InputGroup className="mb-3">
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
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
        </div>
        <div>
          <button id="reg" onClick={Registerbutt}>
            Register
          </button>
          <p>
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </div>
      </fieldset>
    </div>
  );
}

export default Register;