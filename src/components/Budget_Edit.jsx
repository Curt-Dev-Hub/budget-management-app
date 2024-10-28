import "./Budget_Edit.css";
import { Button, Container, Stack } from "react-bootstrap";
import { useState } from "react";
import Budget from "./Budget";


function getDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const stringMonth = months[today.getMonth()];
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date} ${stringMonth} ${year}`;
}

const Budget_Edit = () => {
    const [currentDate, setCurrentDate] = useState(getDate());
    return (
        <Container className="my-4">
            <Stack id="edit-budget-container" direction="horizontal" gap={2} className="mb-4">
                <h2 className="me-auto">Edit your monthly Budgets</h2>
                <p>Here is your current budget for <b><u>{currentDate}</u></b></p>
                <Button variant="primary">Add A Budget</Button> 
                <Button variant="outline-primary">Add Expense</Button>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "1rem",
                        alignItems: "flex-start",
                    }}
                >
                    <Budget name="Subscriptions" amount={500} max={1000} />
                </div>
                
        </Stack>
      </Container>
    );
}


export default Budget_Edit



// calender reference - https://www.npmjs.com/package/react-calendar


