import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LoginContext } from '../contexts/LoginContext';
import { useContext } from 'react';
import './Header.css';


const Header = () => {
    const {logout} = useContext(LoginContext)
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
                            <Nav.Link href="/lesley">Error-Test</Nav.Link>
                            <Nav.Link href="dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="login">Login</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/edit-budget">Edit Budget Test</NavDropdown.Item>
                            <NavDropdown.Item href="/learn-more-about-personal-budgeting">Learn More</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={ logout } href="#action/3.4">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;