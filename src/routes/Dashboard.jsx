import { Container, Card, Button } from 'react-bootstrap'
import './Dashboard.css'



const Dashboard = () => {
    const date = new Date();
    const showTime = date.getHours() 
        + ':' + date.getMinutes()
        + ':' + date.getMinutes();
    console.log(showTime);

    const greeting = date.getHours() < 12 ? 'morning' : date.getHours() <= 18 ? 'afternoon' : 'evening';

    return (
        <Container id='container-dashboard'>
            <Card id='card-shadow'>
                <Card.Body id='yellow-gradient2' style={{textAlign: "left", paddingLeft: "16%"}}>Hi Leonardo 👋,<br /><br /> Good {greeting} to you. <br />
                Please use the button below to start editing your budget data. <br />       
                <Button variant="primary" href="/edit-budget">Go somewhere</Button>           
                </Card.Body>
            </Card>
            <div className='component-cta-container'>
                <div className='user-recent-edits'>
                    <h3>Your most recently edited data</h3>
                    <p>May 2024 <br /> Income</p>
                    <p>Added £332.20</p>
                    <div className='cta-wrapper'>
                <Button variant="danger">Edit/View Expenses</Button>
                <Button variant="success">Edit/View Income</Button>
            </div>
                </div>
                <div className='graph-component-wrapper'>
                    <img className='component-img' src="images-medium/budget-test-img.jpg" alt="This Image Cannot Be displayed" />
                </div>
            </div>    
                
        </Container>    
    )
}


export default Dashboard;