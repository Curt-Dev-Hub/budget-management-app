import './Login.css';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { LoginContext } from '../contexts/LoginContext.jsx';

function Login() {
    const userNameRef = useRef("")
    const passwordRef = useRef("")
    const { setLoginStatus, checkSession } = useContext(LoginContext)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        
        try {
            console.log("Attempting login...");
            
            const response = await axios.post(
                "/login.php", 
                {
                    username: userNameRef.current.value,
                    password: passwordRef.current.value
                },
                {
                    timeout: 5000,
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            console.log("Login response:", response.data);

            if(response.data.status === "success") {
                console.log("Login successful, updating state...");
                
                setLoginStatus(true);
                
                // Verify session and get latest user data
                await checkSession();
                
                console.log("Redirecting to dashboard...");
                navigate("/dashboard", { replace: true });
                
            } else {
                setErrorMessage(response.data.message || "Login failed");
            }
            
        } catch (error) {
            console.error("Login error:", error);
            
            if(error.response?.status === 401) {
                setErrorMessage("Invalid credentials: You have entered an incorrect Username or Password");
            } else if (error.code === 'ECONNABORTED') {
                setErrorMessage("Request timeout. Please try again.");
            } else {
                setErrorMessage("Login failed. Please check your connection and try again." + error);
            }
        }
    }

    return (
      <>
        <h1 style={{paddingLeft: "15px"}}>Login</h1>
        <div className="login_register_container">
          <Form className="login_register_form" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <Form.Group className="login_register" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                ref={userNameRef}
                type="text"
                placeholder="Your username"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Your password"
                required
              />
            </Form.Group>
            <Button as="input" type="submit" value="Login" />{" "}
            <p>
              Not yet a member?{" "}
              <a className="form-link" href="register">
                Register Here
              </a>
            </p>
          </Form>
        </div>
      </>
    );
}

export default Login;