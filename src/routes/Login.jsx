import './Login.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function Login() {
    return (
        <div className='login_register_container'>
        <Form className='login_register_form'>
            <Form.Group className="login_register" >
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Your username" required />
            </Form.Group>
            <br />
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Your password" required />
            </Form.Group>
            <Button as="input" type="submit" value="Login" />{' '}
            <p>Not yet a member? <a className='form-link' href="register">Register Here</a></p>                                       
        </Form>
        </div>
    );
}

export default Login;