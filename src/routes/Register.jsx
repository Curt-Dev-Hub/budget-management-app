import './Register.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState } from 'react';
import { LoginContext } from '../contexts/LoginContext.jsx'

import axios from 'axios';
import { useContext } from 'react';


function Register() {
    const nameRef = useRef("")
    const userNameRef = useRef("")
    const passwordRef = useRef("")

    const [error, setError] = useState('')

    const {setLoginStatus} = useContext(LoginContext);
    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        axios
            .post("http://localhost/budget-api/register.php", {
                name: nameRef.current.value,
                username: userNameRef.current.value,
                password: passwordRef.current.value
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if(response.data.status === "success") {
                    setLoginStatus(true);
                    window.location.href = "/dashboard";
                } else {
                    //could direct to php error page 
                    //could create react error page
                    setError(response.data.message || 'registration failed');
                    alert(`Registration failed due to: ${response.data.message}`)
                }
            })
            .catch((error) => {
                console.error('Registration error:', error);
                setError('An unexpected error occurred. Please try again.')
            })
            
    }
    return (
      <div className="login_register_container">
        <Form className="login_register_form" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {/* //TODO: Conditionally Rendered elements needed here in case of incorrect credentials */}
          <Form.Group className="login_register">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name or Nickname"
              minLength={2}
              maxLength={35}
              ref={nameRef}
              required
            />
          </Form.Group>
          <br />
          {/* //TODO: Conditionally Rendered elements needed here in case of incorrect credentials */}
          <Form.Group className="login_register">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Your username" ref={userNameRef} required />
          </Form.Group>
          <br />
          {/* //TODO: Conditionally Rendered elements needed here in case of incorrect credentials */}
          <Form.Group className="login-register">
            <Form.Label>
              Password{" "}
              <span style={{ fontSize: "12px", fontWeight: "lighter" }}>
                (must be at least 8 characters long and contain at least one
                uppercase letter and number)
              </span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password (between 8 - 24 Characters)"
              minLength={8}
              maxLength={24}
              ref={passwordRef}
              required
            />
          </Form.Group>
          <br />
          <Button as="input" type="submit" value="Register" />{" "}
          <p>
            Already a member?{" "}
            <a className="form-link" href="login">
              Login Here
            </a>
          </p>
        </Form>
      </div>
    );
}

export default Register;