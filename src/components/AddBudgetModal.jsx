import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react"; //* We want to track the form values name and max 
import { useBudgets } from "../contexts/BudgetsContext";




export default function AddBudgetModal({ show, handleClose }) {
    const nameRef = useRef("")
    const maxRef = useRef(0)
    const { addBudget } = useBudgets()

    function handleSubmit(e) {  //! this will likely be amended when implementing the back end
        e.preventDefault()
        
        addBudget(
        {
             name: nameRef.current.value,
             max: parseFloat(maxRef.current.value)
        })
        handleClose()
    }
  return (
    <Modal show={ show } onHide={ handleClose } >
        <Form onSubmit={ handleSubmit }>
            <Modal.Header closeButton>
                <Modal.Title>Add New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name"> { /*//!set for properties to "name"*/ }
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
