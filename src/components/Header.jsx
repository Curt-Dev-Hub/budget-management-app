import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LoginContext } from '../contexts/LoginContext';
import { useContext } from 'react';
import './Header.css';


const Header = () => {
    const {logout, loginStatus} = useContext(LoginContext)
    
    return (
        <>
            <Navbar id='top-nav-style' expand="lg" className="bg-body-tertiary" style={{ backgroundColor: "rgba(39, 133, 227, 0.54)" }}>
                <Container>
                    <Navbar.Brand id='brand-nav' href="/">
                        <img 
                            src="/pound.png" 
                            alt="Site logo Great British Pound Currency" 
                            width="30"
                            height="30"
                            className='d-inline-block align-top'
                            />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {loginStatus && <Nav.Link href="dashboard">Dashboard</Nav.Link>} 
                            {!loginStatus && <Nav.Link href="login">Login/Register</Nav.Link>}
                            <Nav.Link href="privacy-policy">Privacy Policy</Nav.Link>
                            {loginStatus && <Nav.Link href="/edit-budget">Manage Your Budgets</Nav.Link>}
                            <NavDropdown title="More" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/learn-more-about-personal-budgeting">Learn More</NavDropdown.Item>
                            <NavDropdown.Item target='_blank' href="https://devcurt.me/calculator.html">Online Calculator</NavDropdown.Item>
                            {loginStatus && <NavDropdown.Divider />}
                            {loginStatus && <NavDropdown.Item onClick={ logout } >Logout</NavDropdown.Item>} 
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;