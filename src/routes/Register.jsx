import './Register.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function Register() {
    return (
        <div className='login_register_container'>
        <Form className='login_register_form'>
        {/* //TODO: Conditionally Rendered elements needed here in case of incorrect credentials */}
            <Form.Group className="login_register">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your Name or Nickname" minLength={2} maxLength={35} required />
            </Form.Group>
            <br />
            {/* //TODO: Conditionally Rendered elements needed here in case of incorrect credentials */}
            <Form.Group className="login_register" >
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Your username" required />
            </Form.Group>
            <br />
            {/* //TODO: Conditionally Rendered elements needed here in case of incorrect credentials */}
            <Form.Group className='login-register'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Your password (between 10 - 64 Characters)" minLength={10} maxLength={64} required />
            </Form.Group>
            <br />
            <Button as="input" type="submit" value="Register" />{' '}
            <p>Already a member? <a className='form-link' href="login">Login Here</a></p>
        </Form>
        </div>
    );
}

export default Register;