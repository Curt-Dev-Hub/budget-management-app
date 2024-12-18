import "./Budget_Edit.css";
import { Button, Container, Stack } from "react-bootstrap";
import { useState } from "react";
import Budget from "./Budget";
import AddBudgetModal from "./AddBudgetModal";
import { useBudgets } from "../contexts/BudgetsContext";
import AddExpenseModal from "./AddExpenseModal";

const Budget_Edit = () => {
    const { budgets } = useBudgets()
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

    // function to open expenses for a specific budget
    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId) // possibly will change to name
    }
    

    return (
        <Container className="my-4">
            <AddBudgetModal show={ showAddBudgetModal } handleClose={() => setShowAddBudgetModal(false)} />
            <AddExpenseModal show={ showAddExpenseModal } handleClose={() => setShowAddExpenseModal(false)} />  
            <Stack id="edit-budget-container" direction="horizontal" gap={2} className="mb-4">
                <h2 className="me-auto">Edit your monthly Budgets</h2>
                <Button variant="primary" onClick={() => setShowAddBudgetModal(true) }>Add A Budget</Button> 
                <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "1rem",
                        alignItems: "flex-start",
                    }}
                >  
                    {budgets.map(budget => (
                        <Budget key={budget.id} name={budget.name} amount={200} max={budget.max} onAddExpenseClick={() => openAddExpenseModal(budget.id)} />    
                    ))}
                    {/* <Budget name="Subscriptions" amount={500} max={1000} /> */}
                </div>
             </Stack>
        </Container>
    );
}

export default Budget_Edit


