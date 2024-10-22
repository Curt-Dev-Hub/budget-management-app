import './Footer.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Footer = () => { 
    return (
<Navbar fixed='bottom' id='bottom-nav-style' expand="lg" bg='dark'  >
    <Container>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/yefgenie">Error-Test</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
    </Container>
</Navbar>
    )
}

export default Footer;

// className="bg-body-tertiary"