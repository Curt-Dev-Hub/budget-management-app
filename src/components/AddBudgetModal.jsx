import { Modal, Form, Button, CloseButton } from "react-bootstrap";
import React, { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";
import { useState } from "react";


function AddBudgetModal({ show, handleClose }) {
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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


  const handleAddBudget = async () => {
    try {
      await addBudget({
        name: nameRef.current.value,
        max: parseFloat(maxRef.current.value)
      }) 
        setSuccess("Budget added successfully")
        setTimeout(() => {() => handleClose()}, 3000) 
        setSuccess("")
        nameRef.current.value = ""
        maxRef.current.value = 0  
    } catch (err) {
        setError(err || "Failed to add budget")
    }
  }


  function handleSubmit(e) {  
      e.preventDefault()
      e.stopPropagation()

      if(!validateMaxInput(maxRef.current.value)) {
          setError("Invalid Budget Max format, ensure this is a number")
          return
      }
      if(!validateBudgetNameInput(nameRef.current.value)) {
          setError("Invalid Budget Name format")
          return
      } 
      handleAddBudget()
  }

  return (
    <Modal show={ show } onHide={ handleClose } >
        <Form onSubmit={ handleSubmit }>
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

export default React.memo(AddBudgetModal);