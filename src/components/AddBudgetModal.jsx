import { Modal, Form, Button, CloseButton } from "react-bootstrap";
import { useRef } from "react"; //* We want to track the form values name and max 
import { useBudgets } from "../contexts/BudgetsContext";
import { useState } from "react";
import axios from "axios";


export default function AddBudgetModal({ show, handleClose }) {
    const nameRef = useRef("")
    const maxRef = useRef(0)
    const { addBudget } = useBudgets()

    function validateMaxInput(input) {
        const sanitizedInput = input.trim();
        return sanitizedInput.length <= 10 && 
        /^(\d{1,10})?(\.\d{2})?$/.test(sanitizedInput);
    }

    function validateBudgetNameInput(input) {
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
        
        addBudget({
             name: nameRef.current.value,
             max: parseFloat(maxRef.current.value)
        })
        // handleClose()

        //! Currently working on this http request ------------------------------------------------------------------------------------
        // Update.. Now able to send to database
        if(!validateMaxInput(maxRef.current.value)) {
            setError("Invalid Budget Max format, ensure this is a number")
            return
        }
        if(!validateBudgetNameInput(nameRef.current.value)) {
            setError("Invalid Budget Name format")
            return
        }
          axios
              .post("https://localhost/budget-api/update_budget.php", {
                  name: nameRef.current.value,
                  max: parseFloat(maxRef.current.value)
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
    <Modal show={ show } onHide={ handleClose } >
        <Form onSubmit={ handleSubmit }>
            {/* //! working on  */}
            {error && (
            <div className="alert alert-danger" role="alert" style={{ display: "flex", justifyContent: "space-between"}}>
              {error}
              <CloseButton aria-label="Close error message" onClick={() => setError("")}/>
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert" style={{ display: "flex", justifyContent: "space-between"}}>
              {success}
              <CloseButton aria-label="Close success message" onClick={() => setSuccess("")}/>
            </div>
          )}
            <Modal.Header closeButton>
                <Modal.Title>Add New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name"> 
                    <Form.Label>Budget Name</Form.Label>  
                    <Form.Control ref={nameRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="max"> 
                    <Form.Label>Maximum Allowed Spending</Form.Label>  
                    <Form.Control ref={maxRef} type="number" required min={0} step={.01}/>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant='primary' type="submit" title="Add to budget">Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}
