import './Footer.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Footer = () => { 
    return (
<Navbar fixed='bottom' id='bottom-nav-style' bg='dark'  > {/* Removed - expand="lg" property has stopped link wrapping issue, but at what cost */}
    <Container>
            <Nav className="me-auto" id='footer-child-container'>
                <Nav.Link className='footer-link-el' href="/">Home</Nav.Link>
                <Nav.Link className='footer-link-el' href="/yefgenie">Error-Test</Nav.Link>
                <Nav.Link className='footer-link-el' href="/login">Login</Nav.Link>
            </Nav>
    </Container>
</Navbar>
    )
}

export default Footer;

// className="bg-body-tertiary"