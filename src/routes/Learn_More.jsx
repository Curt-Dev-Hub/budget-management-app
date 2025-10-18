import './Learn_More.css'
import { Card, Container } from "react-bootstrap"

const FEATURES = [
    { title: 'Increased Financial Control', text: 'Understanding your income and expenses gives you a clearer picture of your financial situation.' },
    { title: 'Reduced Stress', text: 'Knowing where your money is going can alleviate financial anxiety.' },
    { title: 'Achieved Financial Goals', text: 'Budgeting helps you create a roadmap to reach your financial objectives.' },
    { title: 'Debt Reduction', text: 'Identify areas to cut back to pay down debt more effectively.' },
    { title: 'Emergency Fund Preparation', text: 'Set aside funds for unexpected expenses for peace of mind.' },
    { title: 'Improved Investment Decisions', text: 'Make informed investment choices with better financial visibility.' },
    { title: 'Enhanced Lifestyle', text: 'Prioritise spending on experiences that bring you joy.' },
    { title: 'Financial Independence', text: 'Tracking leads to greater freedom and self-sufficiency.' },
    { title: 'Better Financial Habits', text: 'Encourages responsible spending and consistent saving.' },
    { title: 'Informed Decision Making', text: 'Budgeting provides the data needed to make sound decisions.' },
];

const Learn_More = () => {
  return (
    <Container id='learn-container' fluid>
        <header id='learn-hero'>
            <div className='hero-overlay' />
            <h1 id='learn-main-header'>10 Advantages of Tracking and Planning Ahead with Personal Financial Budgeting</h1>
            <p className="hero-lead">Small habits compound. Use budgeting to make your money work for you.</p>
        </header>

        <Card className="learn-card">
            <Card.Img variant="top" id='learn-more-banner' src="/images-small/steve-johnson-WVUrbhWtRNM-unsplash.jpg" alt="budget banner" />
            <Card.Body id='learn-card-body'>
                <section className="features-grid">
                    {FEATURES.map((f, i) => (
                    <article key={i} className="feature">
                        <div className="feature-badge">{i + 1}</div>
                        <h3 className="feature-title">{f.title}</h3>
                        <p className="feature-text">{f.text}</p>
                    </article>
                    ))}
                </section>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default Learn_More

