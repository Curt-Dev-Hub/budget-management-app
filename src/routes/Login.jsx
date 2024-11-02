import './Login.css';
import { useContext, useRef } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

import { LoginContext } from '../contexts/LoginContext.jsx'


function Login() {
    const userNameRef = useRef("")
    const passwordRef = useRef("")
    const { setLoginStatus } = useContext(LoginContext)

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post("localhost/api/login.php", {
                username: userNameRef.current.value,
                password: passwordRef.current.value
            })
            .then((response) => {
                console.log(response);
                if(response.data === "success") {
                    setLoginStatus(true);
                    window.location.href = "/dashboard";
                } else {
                    //could direct to php error page 
                    //could create react error page
                    alert(`Login failed due to: ${response.data.message}`)
                }
            })
            .catch((error) => {
                console.error("There was an error logging in!", error)
            }) 
    }

    return (
        <div className='login_register_container'>
        <Form className='login_register_form' onSubmit={handleSubmit}>
            <Form.Group className="login_register" controlId='username'>
                {/* //TODO: Conditionally Rendered elements needed here in case of incorrect credentials */}
                <Form.Label>Username</Form.Label>
                <Form.Control ref={userNameRef} type="text" placeholder="Your username" required />
            </Form.Group>
            <br />
            <Form.Group>
                {/* //TODO: Conditionally Rendered elements needed here in case of incorrect credentials */}
                <Form.Label>Password</Form.Label>
                <Form.Control ref={passwordRef} type="password" placeholder="Your password" required />
            </Form.Group>
            <Button as="input" type="submit" value="Login" />{' '}
            <p>Not yet a member? <a className='form-link' href="register">Register Here</a></p>                                       
        </Form>
        </div>
    );
}

export default Login;