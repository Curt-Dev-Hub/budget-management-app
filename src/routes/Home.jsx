import { Card, Container, Button, Image } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './Home.css';

const Home = () => {
    return (
        <Container id='container-home'>
            <Row>
                {/* <Col><h1>Personal Budgeting App</h1></Col> */}
                <h1>Personal Budgeting App</h1>
            </Row>
            <Row>
                <h2 id='home-h2'>An Easy  Way To Manage Your Finances With One Application</h2>
            </Row>
            <p id='intro-para'>Introducing BudgetMaster, the ultimate tool for efficient financial planning. 
                Our platform empowers you to track your spending, visualize your savings, 
                and achieve your financial goals with ease. 
                Join BudgetMaster now and transform the way you manage your money.
            </p>
            <Row>
                <Image id="main-home-img" src="/images-medium/budget-home-img.jpg" roundedCircle />
            </Row>
            <Card id="intro-card">
                <Card.Header>Seeing a visual breakdown of your incomings and outgoings makes creating a budget easier</Card.Header>
                <Card.Body id='yellow-gradient1'>
                    <Card.Title>Keep Track Of Incomings and Outgoings</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button size="lg" href='#' variant="dark">Get Started</Button>
                    <Button size="lg" href='learn-more-about-personal-budgeting' variant="primary">Learn More</Button>
                </Card.Body>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
        </Container>
    )
}

export default Home;


{/* <Card.Img variant="top" thumbnail src="/images-medium/budget-home-img.jpg"/> */}
{/* <Image src="/images-medium/budget-home-img.jpg" thumbnail /> */}