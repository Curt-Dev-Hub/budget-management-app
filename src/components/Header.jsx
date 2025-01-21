import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LoginContext } from '../contexts/LoginContext';
import { useContext } from 'react';
import './Header.css';


const Header = () => {
    const {logout, loginStatus} = useContext(LoginContext)
    console.log(loginStatus)
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
                            {loginStatus && <Nav.Link href="dashboard">Dashboard</Nav.Link>} {/* dependant on logged in status*/ }
                            <Nav.Link href="login">Login/Register</Nav.Link>
                            <Nav.Link href="privacy-policy">Privacy Policy</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            {loginStatus && <NavDropdown.Item href="/edit-budget">Edit Budgets</NavDropdown.Item>} {/* dependant on logged in status*/ }
                            <NavDropdown.Item href="/learn-more-about-personal-budgeting">Learn More</NavDropdown.Item>
                            <NavDropdown.Item target='_blank' href="https://devcurt.me/calculator.html">Online Calculator</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {loginStatus && <NavDropdown.Item onClick={ logout } >Logout</NavDropdown.Item>} {/* dependant on logged in status*/ }
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;