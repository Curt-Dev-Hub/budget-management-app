import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import './Dashboard.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useBudgets } from '../contexts/BudgetsContext';
import { useEffect, useState } from 'react';
import { color } from 'chart.js/helpers';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Dashboard = ({name}) => {
  const { budgets, expenses } = useBudgets()
  const [sortBudgets, setSortBudgets] = useState([])

  // calculate totals for pie chart
  const totalBudget = budgets.reduce((accumulator, budget) => accumulator + parseFloat(budget.max), 0)
  const totalExpenses = expenses.reduce((accumulator, expense) => parseFloat(accumulator) + parseFloat(expense.amount), 0)
  const remainingBudget = totalBudget - totalExpenses;

  const chartData = {
    labels: ['Total Expenses', 'Remaining Budget'],
    datasets: [{
      data: [totalExpenses, remainingBudget],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
     ],
      borderWidth: 1,
    }],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#222',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Your Budget Overview',
        color: '#000',
        font: {
          size: 18
        },
        padding: {
          top:10,
          bottom: 30
        }
      }
    }
  }


  const date = new Date();
  const showTime = date.getHours() 
      + ':' + date.getMinutes()
      + ':' + date.getSeconds();


  

  const greeting = date.getHours() < 12 ? 'morning' : date.getHours() <= 17 ? 'afternoon' : 'evening';

  const formatBudgetDate = (mysqlDateTime) => {
    const date = new Date(mysqlDateTime)

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    
    const getDaySuffix = (day) => {
      if (day >= 11 && day <= 13) return 'th'
      switch (day % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
      }               
    }

    const dayOfMonth = date.getDate()
    const suffix = getDaySuffix(dayOfMonth)
    
    return `${days[date.getDay()]} ${dayOfMonth}${suffix} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  // Only access sortBudgets if it has items
  const latestBudget = sortBudgets.length > 0 ? sortBudgets[sortBudgets.length - 1] : null 
  
  useEffect(() => {
    if(budgets.length > 0) {
      const sorted = [...budgets].sort((a, b) => 
       new Date(a.updated_at)  - new Date(b.updated_at) 
      )  
      setSortBudgets(sorted)
    }
    
  }, [budgets])
  
  return (
    <Container id="container-dashboard">
      <h1 className="mt-4">Dashboard</h1>
      <Card id="card-shadow">
        <Card.Body
          id="yellow-gradient2"
        >
          Hi {name}👋,
          <br />
          Good {greeting} to you. <br />
          Please use the button below to start editing your budget data. <br />
          <Button variant="primary" href="/edit-budget">
            View Account Budgets
          </Button>
        </Card.Body>
      </Card>
      <Row>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <div className="user-recent-edits">
            <h3>Your most recently edited Budget</h3>
            {budgets.length === 0 ? (
              <p>No Budgets Available</p>
            ) : (
              <p>  
                {formatBudgetDate(latestBudget?.updated_at)} <br /> Budget
                <b> ({latestBudget?.name})</b>
              </p>
            )}
            {/* <p>Added £332.20</p> */}
            <p>{`Your current total Expenses: ${parseFloat(totalExpenses).toFixed(2)}`} <br />
            {`From a Max Budget value of: ${parseFloat(totalBudget).toFixed(2)}`}
            </p>
            {/* <div className="cta-wrapper">
              <Button variant="danger" href="#" target="">
                Add Expenses
              </Button>
              <Button variant="success">Add/Edit Budgets</Button>
            </div> */}
          </div>
        </Col>
      </Row>
      <Row style={{ display: "flex", justifyContent: "center",  width: "100%", maxWidth: "600px", margin: "42px auto" }}>
        <Col
          style={{ display: "flex", justifyContent: "center" }}
          sm={12}
          md={6}
          lg={6}
        >
          <div>
            <Pie data={chartData} options={options} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}


export default Dashboard;

// style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}