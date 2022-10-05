import { render } from "@testing-library/react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap"

export const EditExpenseCard = ({
	expensetitle, 
	expenseValue,
  setExpenseTitle,
  setExpenseValue,
	show,
	setShow,
  id
}) => {
	const handleClose = () => {
		setShow(false);
	}
  
  const handleSaveChanges = (id, expenseAmount, expenseTitle) => {
    axios.put('/editexpense', {
      expenseId: id,
      expenseAmount,
      expenseTitle
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    })
    setShow(false);
  }

  
	return(
    <>
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Expense</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<label htmlFor="expenseTitle">Expense Title</label>
				<input value={expensetitle} type="text" name="expenseTitle" onChange={(e) => {
          setExpenseTitle(e.target.value)
        }}/>
				<label htmlFor="expenseValue">Amount</label>
				<input value={expenseValue} type="number" name="expenseValue" onChange={(e) => {
          setExpenseValue(e.target.value)
        }}/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
				<Button variant="primary" onClick={() => handleSaveChanges(id, expenseValue, expensetitle)}>Save changes</Button>
			</Modal.Footer>
		</Modal>
    </>
	)
}
