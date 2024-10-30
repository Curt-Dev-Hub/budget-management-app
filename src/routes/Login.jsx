import './Login.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from 'react';


function Login() {
    const userNameRef = useRef("")
    const passwordRef = useRef("")

    function handleSubmit(e) {
        e.preventDefault()
        
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