import { Container, Card, Button } from 'react-bootstrap'
import './Dashboard.css'
import PropTypes from 'prop-types'
import { useEffect } from 'react';

const Dashboard = ({name}) => {
    const date = new Date();
    const showTime = date.getHours() 
        + ':' + date.getMinutes()
        + ':' + date.getSeconds();

    useEffect(() => {
    }, [name])

    const greeting = date.getHours() < 12 ? 'morning' : date.getHours() <= 17 ? 'afternoon' : 'evening';

    return (
      <Container id="container-dashboard">
        <Card id="card-shadow">
          <Card.Body
            id="yellow-gradient2"
            style={{ textAlign: "left", paddingLeft: "16%" }}
          >
            Hi {name} 👋,
            <br />
            <br /> Good {greeting} to you. <br />
            Please use the button below to start editing your budget data.{" "}
            <br />
            <Button variant="primary" href="/edit-budget">
              Go somewhere
            </Button>
          </Card.Body>
        </Card>
        <div className="component-cta-container">
          <div className="user-recent-edits">
            <h3>Your most recently edited data</h3>
            <p>
              May 2024 <br /> Income
            </p>
            <p>Added £332.20</p>
            <div className="cta-wrapper">
              <Button variant="danger">Edit/View Expenses</Button>
              <Button variant="success">Edit/View Income</Button>
            </div>
          </div>
          <div className="graph-component-wrapper">
            <img
              className="component-img"
              src="images-medium/budget-test-img.jpg"
              alt="This Image Cannot Be displayed"
            />
          </div>
        </div>
      </Container>
    );
}

Dashboard.propTypes = {
    name: PropTypes.string
}


export default Dashboard;