import { Card, Container, Button, Image, Col } from 'react-bootstrap';
import { AiFillPoundCircle } from 'react-icons/ai';
import { BsPieChartFill } from 'react-icons/bs';
import { MdSavings } from 'react-icons/md';
import { Row } from 'react-bootstrap';
import './Home.css';

const Home = () => {
    return (
      <Container id="container-home">
        <Row>
          <h1 id="home-h1"><b>PennyWiser - The Simple Budgeting App</b></h1>
        </Row>
        <Row>
          <h2 style={{ textAlign: "center" }} id="home-h2">
            An Easy Way To Manage Your Finances With One Application
          </h2>
        </Row>
        <p id="intro-para">
          <b>PennyWiser</b> is your all-in-one solution for managing your
          finances effectively. Gain clarity on your spending habits, track your
          income and expenses effortlessly, and achieve your financial goals
          with confidence. Join the thousands of users who are already
          benefiting from BudgetMaster and simplify your financial life today.
        </p>
        <Row>
          <Image
            className='mb-4'
            id="main-home-img"
            src="/images-medium/budget-home-img.jpg"
            roundedCircle
          />
        </Row>
        <Row>
          <Col md={4}>
            <div className="feature-card">
              <AiFillPoundCircle size={32}  />
              <h5>Expense Tracking</h5>
              <p>
                Effortlessly track your spending with detailed categories and
                insightful reports.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-card">
              <BsPieChartFill size={32} className="feature-icon" />
              <h5>Budget Planning</h5>
              <p>
                Create and manage budgets for different categories to stay on
                track with your financial goals.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-card">
              <MdSavings size={32} className="feature-icon" />
              <h5>Savings Goals</h5>
              <p>
                Set savings goals, track your progress, and achieve your
                financial dreams.
              </p>
            </div>
          </Col>
        </Row>
        <Card id="intro-card">
          <Card.Header>Effortlessly Track Your Finances</Card.Header>
          <Card.Body id="yellow-gradient1">
            <Card.Title>Keep Track Of Incomings and Outgoings</Card.Title>
            <Card.Text style={{ textAlign: "center" }}>
              {" "}
              {/* style here is to override style from Learn component for now */}
              <b>PennyWiser</b> makes it easy to understand where your money is
              going. Create budgets, track expenses, and visualize your spending
              patterns with intuitive charts and graphs.
            </Card.Text>
            <Button size="lg" href="register" variant="dark">
              Get Started
            </Button>
            <Button
              size="lg"
              href="learn-more-about-personal-budgeting"
              variant="primary"
            >
              Learn More
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
}

export default Home;