import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { Modal, Button, Stack, CloseButton, Alert } from "react-bootstrap"
import { currencyFormatter } from "./utils"
import { v4 as uuid } from 'uuid'
import { useState } from "react"

export default function ViewExpensesModal({show, handleClose, budgetId}) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

   
    const expenses = getBudgetExpenses(budgetId)
   
    const budget = UNCATEGORISED_BUDGET_ID === budgetId 
        ? { name: "Uncategorised", id: UNCATEGORISED_BUDGET_ID }
        : budgets.find(budget => budget.id === budgetId)



    const handleDeleteBudget = async (budget) => {
        try {
            await deleteBudget(budget)
            setSuccess("Budget deleted successfully")
        } catch (err) {
            setError(err.message || "Failed to delete budget")
        }
    }

    const handleDeleteExpense = async (expense) => {
        try {
            await deleteExpense(expense)
            setSuccess("Expense deleted successfully")
            setTimeout(() => setSuccess(""), 2000)
        } catch (err) {
            setError(err.message || "Failed to delete expense")
            
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap={2}>
                        <div>Expenses - {budget?.name}</div>
                        {budget?.id !== UNCATEGORISED_BUDGET_ID && (
                            <Button 
                                variant="outline-danger"
                                onClick={() => handleDeleteBudget(budget)}
                            >    
                                Delete
                            </Button>
                        )}
                    </Stack>    
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && (
                    <Alert 
                        variant="danger" 
                        className="d-flex justify-content-between align-items-center mb-3"
                    >
                        {error}
                        <CloseButton
                            aria-label="Close error message"
                            onClick={() => setError("")}
                        />
                    </Alert>
                )}
                {success && (
                    <Alert 
                        variant="success" 
                        className="d-flex justify-content-between align-items-center mb-3"
                    >
                        {success}
                        <CloseButton
                            aria-label="Close success message"
                            onClick={() => setSuccess("")}
                        />
                    </Alert>
                )}
                <Stack direction="vertical" gap={3}>
                    {expenses.map(expense => (
                        <Stack key={uuid()} direction="horizontal" gap={2}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button 
                                size="sm" 
                                variant="outline-danger" 
                                onClick={() =>  handleDeleteExpense(expense.id)}
                            >
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}