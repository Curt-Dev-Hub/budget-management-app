import { Modal, Form, Button, CloseButton } from "react-bootstrap";
import { useRef } from "react"; //* We want to track the form values name and max 
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { useState } from "react";
import axios from "axios";


export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef("")
    const amountRef = useRef(0)
    const budgetIdRef = useRef()
    const { addExpense, budgets } = useBudgets()

    function validateMaxInput(input) {
        const sanitizedInput = input.trim();
        return sanitizedInput.length <= 10 && 
        /^(\d{1,10})?(\.\d{2})?$/.test(sanitizedInput);
    }

    function validateExpenseDescription(input) {
        const sanitizedInput = input.trim();
        const safeInputRegex = /^[a-zA-Z0-9\s'-]+$/;

        return sanitizedInput.length >= 2 && 
               sanitizedInput.length <= 50 && 
               safeInputRegex.test(sanitizedInput);
    }

    // state for feedback on user input
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    
  //!  -------------------------------------------------------------------------------------------------------------------------------------

    function handleSubmit(e) {  
        e.preventDefault()
        
        addExpense({
             description: descriptionRef.current.value,
             amount: parseFloat(amountRef.current.value)
        })
        // handleClose()

        //! Currently working on this http request ------------------------------------------------------------------------------------
        
        if(!validateMaxInput(amountRef.current.value)) {
            setError("Invalid Budget Max format, ensure this is a number")
            return
        }
        if(!validateExpenseDescription(descriptionRef.current.value)) {
            setError("Invalid Budget Name format")
            return
        }
          axios
              .post("https://localhost/budget-api/update_expense.php", {
                  description: descriptionRef.current.value,
                  amount: parseFloat(amountRef.current.value)
                  // budgetName??
              }, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
              .then((response) => {
                  if(response.data.status === "success") {
                      setSuccess('Budget has been added successfully')
                      handleClose()
                  } else {
                      setError(response.data.message || 'Budget not added 😑');
                  }
              })
              .catch((error) => {
                  console.error('Budget not added due to: ', error);
                  // have made changes here 13/12/2024
                  if(error.response) {
                    setError(error.response.data.message || 'An error occurred')
                  } 
                  else if(error.request) {
                    setError('No response received from the server')
                  } else {
                    setError('Error setting up the request')
                  }
              })
    }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        {error && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {error}
            <CloseButton
              aria-label="Close error message"
              onClick={() => setError("")}
            />
          </div>
        )}
        {success && (
          <div
            className="alert alert-success"
            role="alert"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {success}
            <CloseButton
              aria-label="Close success message"
              onClick={() => setSuccess("")}
            />
          </div>
        )}
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Expense Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          {/* ------------------------------------------------------------ */}
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Which budget is this for?</Form.Label>
            {/* once we know what budgets the user has they can be mapped in the below Select */}
            <Form.Select 
              defaultValue={ defaultBudgetId }
              ref={ budgetIdRef }
              required
            >
                <option id={UNCATEGORISED_BUDGET_ID}>Uncategorised</option>
                {budgets.map((budget) => (
                    <option key={budget.id} value={budget.id}>
                        {budget.name}
                    </option>
                ))}  
            </Form.Select>

          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" title="Add to budget">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
