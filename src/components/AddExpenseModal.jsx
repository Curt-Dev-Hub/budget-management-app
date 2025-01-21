import { Modal, Form, Button, CloseButton } from "react-bootstrap";
import { useRef, useEffect, useState } from "react"; //* We want to track the form values name and max 
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";


export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef("")
    const amountRef = useRef(0)
    const budgetIdRef = useRef()
    const [error, setError] = useState('') // state for feedback on user input
    const [success, setSuccess] = useState('') // state for feedback on user input
    const { addExpense, budgets } = useBudgets()

    useEffect(() => { //! testing
        let timeoutId;
        if(success) {
          timeoutId = setTimeout(() => {
            handleClose()
            setSuccess("")
            if(descriptionRef.current) descriptionRef.current.value = ""
            if(amountRef.current) amountRef.current.value = 0
            if(budgetIdRef.current) budgetIdRef.current.value = defaultBudgetId
          }, 2000)
        }
        return () => { 
          clearTimeout(timeoutId)
        }
    }, [success, handleClose, defaultBudgetId])
    
    
    function validateAmountInput(input) {
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

    const handleAddExpense = async () => {
      try {
        const response = await addExpense(
          descriptionRef.current.value,
          parseFloat(amountRef.current.value),
          budgetIdRef.current.value
        )
        
        setSuccess(`${response} Expense added successfully`)
        setError("") //! testing

        // setTimeout(() => { //! testing
        //     handleClose()
        //     setSuccess("")
        //     if(descriptionRef.current) descriptionRef.current.value = ""
        //     if(amountRef.current) amountRef.current.value = 0
        //     if(budgetIdRef.current) budgetIdRef.current.value = defaultBudgetId
        // }, 2000)
                  
      } catch (err) {
          setError(err.message || "Failed to add Expense")
          setSuccess("") //! testing
      }
    }
    
  //!  -------------------------------------------------------------------------------------------------------------------------------------

    function handleSubmit(e) {  
        e.preventDefault()
        e.stopPropagation()

        
        if(!validateAmountInput(amountRef.current.value)) {
            setError("Invalid Expense Amount format, ensure this is a number")
            return
        }
        if(!validateExpenseDescription(descriptionRef.current.value)) {
            setError("Invalid Expense Description format")
            return
        }

        handleAddExpense()
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
            
            <Form.Select 
              defaultValue={ defaultBudgetId }
              ref={ budgetIdRef }
              required
            >
                <option id={UNCATEGORISED_BUDGET_ID}>Uncategorised</option>
                {budgets.map((budget) => (
                    <option 
                      key={budget.id} 
                      value={budget.id}>
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
