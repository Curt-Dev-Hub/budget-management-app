import './Login.css';
import { useContext, useRef, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

import { LoginContext } from '../contexts/LoginContext.jsx'


function Login() {
    const userNameRef = useRef("")
    const passwordRef = useRef("")
    const { setLoginStatus } = useContext(LoginContext)
    const { checkSession } = useContext(LoginContext)

    const [ errorMessage, setErrorMessage ] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post("http://localhost/budget-api/login.php", {
                username: userNameRef.current.value,
                password: passwordRef.current.value
            }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
          
            .then((response) => {
                if(response.data.status === "success") {
                    setLoginStatus(true);
                    checkSession()
                    window.location.href = "/dashboard";
                } 
                else  {
                    setErrorMessage(`${response.data.message}`)
                }
            })
            .catch((error) => {
                console.log(error.status)
                if(error.status === 401) {
                    setErrorMessage("Invalid credentials: You have entered an incorrect Username or Password")
                } 
            })
    }

    return (
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
    );
}

export default Login;