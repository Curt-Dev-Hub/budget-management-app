import "./Budget_Edit.css";
import { Button, Container, Stack } from "react-bootstrap";
import { useState } from "react";
import Budget from "./Budget";
import AddBudgetModal from "./AddBudgetModal";


const Budget_Edit = () => {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    return (
        <Container className="my-4">
            <AddBudgetModal show={ showAddBudgetModal } handleClose={() => setShowAddBudgetModal(false)} />
            <Stack id="edit-budget-container" direction="horizontal" gap={2} className="mb-4">
                <h2 className="me-auto">Edit your monthly Budgets</h2>
                <Button variant="primary" onClick={() => setShowAddBudgetModal(true) }>Add A Budget</Button> 
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


