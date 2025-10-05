import { Modal, Form, Button, CloseButton } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

function AddBudgetModal({ show, handleClose }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const nameRef = useRef("");
  const maxRef = useRef(0);
  const { addBudget } = useBudgets();

  // Debug mount/unmount
  useEffect(() => {
    console.log("AddBudgetModal mounted, show =", show);
    return () => {
      console.log("AddBudgetModal UNMOUNTED");
    };
  }, []);

  // Debug show changes
  useEffect(() => {
    console.log("AddBudgetModal show changed to:", show);
  }, [show]);

  // clear messages when modal opens/closes
  useEffect(() => {
    if (show) {
      setError('');
      setSuccess('');
    }
  }, [show]);

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
      setError('');
      console.log("1. Starting to add budget");

      await addBudget({
        name: nameRef.current.value,
        max: parseFloat(maxRef.current.value)
      });

      console.log("2. Budget added successfully");
      setSuccess("Budget added successfully");
      console.log("3. Success message set");

      // Clear form and not close modal immediately
      nameRef.current.value = "";
      maxRef.current.value = 0  ;

      setTimeout(() => {
        console.log("4. Auto-closing modal after success");
        handleClose();
      }, 2000);
    } catch (err) {
      console.log("2. Error adding budget:", err.message);
      setError(err.message || "Failed to add budget");
      console.log("3. Error message set - modal stays open");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Add Budget Form submitted");

    if (!validateMaxInput(maxRef.current.value)) {
      setError("Invalid Budget Max format, ensure this is a number");
      return;
    }
    if (!validateBudgetNameInput(nameRef.current.value)) {
      setError("Invalid Budget Name format");
      return;
    }
    handleAddBudget();
  }

   // custom close handler that clears messages
  const handleModalClose = () => {
    setError('');
    setSuccess('');
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert" style={{ display: "flex", justifyContent: "space-between" }}>
            {error}
            <CloseButton aria-label="Close error message" onClick={() => setError("")} />
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert" style={{ display: "flex", justifyContent: "space-between" }}>
            {success}
            <CloseButton aria-label="Close success message" onClick={() => setSuccess("")} />
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
            <Form.Control ref={maxRef} type="number" required min={0} step={.01} />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant='primary' type="submit" title="Add to budget">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default React.memo(AddBudgetModal);