import './Learn_More.css'
import { Card, Container } from "react-bootstrap"



const Learn_More = () => {
    return (
        <Container id="learn-container" fluid>
            <h1 id='learn-main-header'>10 Advantages of Tracking and Planning Ahead with Personal Financial Budgeting</h1>
            <Card>
                <Card.Body id='learn-card-body'>
                    <Card.Img variant="top" id='learn-more-banner' src="public\images-small\steve-johnson-WVUrbhWtRNM-unsplash.jpg"></Card.Img>
                    <Card.Title className='learn-h5'>1. Increased Financial Control</Card.Title>
                    <Card.Text className='card-text-learn'>Understanding your income and expenses gives you a clearer picture of your financial situation.</Card.Text>
                    <Card.Title className='learn-h5'>2. Reduced Stress</Card.Title>
                    <Card.Text className='card-text-learn'>Knowing where your money is going can alleviate financial anxiety.</Card.Text>
                    <Card.Title className='learn-h5'>3. Achieved Financial Goals</Card.Title>
                    <Card.Text className='card-text-learn'>Budgeting helps you create a roadmap to reach your financial objectives, whether it's saving for a house or retirement.</Card.Text>
                    <Card.Title className='learn-h5'>4. Debt Reduction</Card.Title>
                    <Card.Text className='card-text-learn'>By identifying areas where you can cut back, you can more effectively pay down debt.</Card.Text>
                    <Card.Title className='learn-h5'>5. Emergency Fund Preparation</Card.Title>
                    <Card.Text className='card-text-learn'>Budgeting helps you set aside funds for unexpected expenses, providing a safety net.</Card.Text>
                    <Card.Title className='learn-h5'>6. Improved Investment Decisions</Card.Title>
                    <Card.Text className='card-text-learn'>Understanding your financial situation allows you to make informed investment choices.</Card.Text>
                    <Card.Title className='learn-h5'>7. Enhanced Lifestyle</Card.Title>
                    <Card.Text className='card-text-learn'>Budgeting can help you prioritize spending on experiences and activities that bring you joy.</Card.Text>
                    <Card.Title className='learn-h5'>8. Financial Independence</Card.Title>
                    <Card.Text className='card-text-learn'>Tracking and planning can lead to greater financial freedom and self-sufficiency.</Card.Text>
                    <Card.Title className='learn-h5'>9. Better Financial Habits</Card.Title>
                    <Card.Text className='card-text-learn'>Budgeting encourages responsible spending and saving habits.</Card.Text>
                    <Card.Title className='learn-h5'>10. Informed Decision Making</Card.Title>
                    <Card.Text className='card-text-learn'>Budgeting provides the data needed to make sound financial decisions.</Card.Text>
                </Card.Body>
            </Card>   
        </Container>               
    )
}

export default Learn_More