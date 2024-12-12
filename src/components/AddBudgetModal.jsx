import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react"; //* We want to track the form values name and max 
import { useBudgets } from "../contexts/BudgetsContext";
import axios from "axios";




export default function AddBudgetModal({ show, handleClose }) {
    const nameRef = useRef("")
    const maxRef = useRef(0)
    const { addBudget } = useBudgets()

    function validateMaxInput(input) {
        const sanitizedInput = input.trim();
        return sanitizedInput.length >= 8 && 
            /^(\d{1,10})?(\.\d{2})?$/.test(sanitizedInput);
    }

    function validateNameInput(input) {
        const sanitizedInput = input.trim();
        return sanitizedInput.length >=
    }

    const [error, setError] = useState('')
    

   
          
  

  //!  -------------------------------------------------------------------------------------------------------------------------------------

    function handleSubmit(e) {  
        e.preventDefault()
        
        addBudget({
             name: nameRef.current.value,
             max: parseFloat(maxRef.current.value)
        })
        handleClose()

        //! Currently working on this http request ------------------------------------------------------------------------------------

        if(!validateMaxInput(maxRef.current.value)) {
            setError("Invalid Budget Max format, ensure this is a number")
            return
        }
        if() {

        }
          axios
              .post("https://localhost/budget-api/update_budget.php", {
                  name: nameRef.current.value,
                  max: parseFloat(maxRef.value.current)
              }, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
              .then((response) => {
                  if(response.data.status === "success") {
                      setLoginStatus(true);
                    
                  } else {
                      setError(response.data.message || 'registration failed');
                      alert(`Registration failed due to: ${response.data.message}`)
                  }
              })
              .catch((error) => {
                  console.error('Budget not added due to: ', error);
                  setError('An unexpected error occurred. Please try again.')
              })
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
