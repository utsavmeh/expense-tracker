import axios from "axios";
import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { EditExpenseCard } from "./editExpenseCard";

export const DisplayExpense = ({expenseData}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editExpenseTitle, setEditExpenseTitle] = useState('');
  const [editExpenseAmount, setEditExpenseAmount] = useState();
  const [editExpenseId, setEditExpenseId] = useState('');

  const handleEdit = (title, amount, id) => {
    setShowEditModal(true);
    setEditExpenseAmount(amount);
    setEditExpenseTitle(title);
    setEditExpenseId(id);
  }

  const handleDelete = (id) => {
    axios.delete(`/deleteExpense/${id}`).then((data) => {
      console.log(data);
    }).catch((err)=> {
      console.log(err);
    })
  }
  return(
    <>
      <EditExpenseCard 
        expensetitle={editExpenseTitle} 
        expenseValue={editExpenseAmount} 
        setExpenseTitle={setEditExpenseTitle}
        setExpenseValue={setEditExpenseAmount}
        show={showEditModal} 
        id={editExpenseId}
        setShow={setShowEditModal}
      />
      <Container>
        {
          Object.keys(expenseData).map((key, index)  => {
          return(
            <div key={index}>
              <h4>
                  Created On: {key}
              </h4>
              {
                expenseData[key].map((item, index) => {
                return(
                  <Card key={index} style={{ width: '18rem', backgroundColor:"grey" }}>
                    <h3>{item.expenseTitle} : {item.expenseAmount}</h3>
                    <AiFillEdit onClick={() => handleEdit(item.expenseTitle, item.expenseAmount, item._id)}/>
                    <AiFillDelete onClick={() => handleDelete(item._id)}/>
                  </Card>
                )
                })
              }
            </div>
          )
        })}
      </Container>
    </>
  )
}