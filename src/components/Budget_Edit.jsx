import "./Budget_Edit.css";
import { Button, Container, Stack } from "react-bootstrap";
import { useState } from "react";
import Budget from "./Budget";
import AddBudgetModal from "./AddBudgetModal";
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import ViewExpensesModal  from "./ViewExpensesModal";
import AddExpenseModal from "./AddExpenseModal";
import UncategorisedBudgetCard from "./UncategorisedBudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";

const Budget_Edit = () => {
    const { budgets, getBudgetExpenses } = useBudgets()
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showViewExpensesModal, setShowViewExpensesModal] = useState(false); 
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState(); //TODO: for viewing expenses - need to work on this 



    // function to open expenses for a specific budget
    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId)
    }
    
    function openViewExpensesModal(budgetId) {
        setShowViewExpensesModal(true)
        setViewExpensesModalBudgetId(budgetId)
    }

    return (
        <Container className="my-4">
            <AddBudgetModal show={ showAddBudgetModal } handleClose={() => setShowAddBudgetModal(false)} />
            <AddExpenseModal show={ showAddExpenseModal } defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />  
            <ViewExpensesModal 
                show={showViewExpensesModal} 
                budgetId={viewExpensesModalBudgetId} 
                handleClose={() => { 
                    setViewExpensesModalBudgetId()
                    setShowViewExpensesModal(false)   
                }} 
            />
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
                    {budgets.map(budget => {
                        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + parseFloat(expense.amount), 0)
                        return (
                            <Budget 
                                key={budget.id} 
                                name={budget.name} 
                                amount={amount} 
                                max={budget.max} 
                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                onViewExpensesClick={() => openViewExpensesModal(budget.id)} 
                            />
                        )
                    })}
                    <UncategorisedBudgetCard 
                        onAddExpenseClick={openAddExpenseModal}
                        onViewExpensesClick={() => openAddExpenseModal(UNCATEGORISED_BUDGET_ID)}
                    />
                    <TotalBudgetCard />
                </div>
             </Stack>
        </Container>
    );
}

export default Budget_Edit


