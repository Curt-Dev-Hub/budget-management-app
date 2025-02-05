import './Footer.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LoginContext } from '../contexts/LoginContext';
import { useContext } from 'react';


const Footer = () => {
    const { loginStatus, logout } = useContext(LoginContext)
    return (
        <Navbar fixed="bottom" id="bottom-nav-style" bg="dark">
        {" "}
        <Container>
            <Nav className="me-auto" id="footer-child-container">
                <Nav.Link className="footer-link-el" href="/">
                    Home
                </Nav.Link>
                {!loginStatus && <Nav.Link className="footer-link-el" href="/login">
                    Login
                </Nav.Link>}
                {loginStatus && <Nav.Link className="footer-link-el" onClick={ logout }>
                    Logout
                </Nav.Link>}
            </Nav>
            <span style={{ color: "antiquewhite" }}>App Designed By Curtis King</span>
        </Container>
        </Navbar>
    );
};

export default Footer;