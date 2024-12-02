import { Container, Card, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
 
const Logout = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search) 
  const message = queryParams.get('message' || 'You have logged out successfully');


  return (
    <>
      <Container>
        <Card style={{ boxShadow: "10px 8px 15px" }}>
          <Card.Body id="yellow-gradient3" style={{ textAlign: "center" }}>
            <Card.Title>Thanks for using BudgetMaster! 😊</Card.Title>
            <Card.Text style={{ textAlign: "center" }}>{ message }</Card.Text>
            <Button style={{ textAlign: "center" }} variant="primary" href="/">
              Return To Home
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Logout