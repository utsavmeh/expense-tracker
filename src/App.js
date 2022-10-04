import axios from "axios";
import { useState } from "react"
import { Button, Container } from "react-bootstrap";
import { DisplayExpense } from "./components/displayExpense";

export const App = () => {
  const [expenseValue, setExpenseValue] = useState(0);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [noDataError, setNoDataError] = useState(false);
  const [expenseData, setExpenseData] = useState(null);
  const [data, setData] = useState([]);

  const handleAddExpense = () => {
    if(expenseTitle !== '' && expenseValue !== 0){
      axios.post('/addexpense', {
        expenseTitle,
        expenseAmount: expenseValue,
      }).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      })
      setExpenseTitle('');
      setExpenseValue(0);
    }
  }

  const handleGetDetails = () => {
    const tempData = {};
    axios.get('/expense')
    .then((response) => {
      response.data.expenses.forEach((data) => {
        const date = data.createdAt.slice(0, 10);
        if(tempData.hasOwnProperty(date)){
          tempData[date] = [...tempData[date], data];
        }else{
          Object.assign(tempData, {[date]: [data]});
        }
      });
      console.log(tempData);
      
      setExpenseData(tempData);
    })
    .catch((error) =>{
      console.log(error);
    });
  }
  return(
    <Container>
      <h1>
        Your Expense
      </h1>
      <div>
        <label htmlFor="ExpenseValue">Enter Amount: </label>
        <input type="number" name="ExpenseValue" value={expenseValue} onChange={(e) => {
          setExpenseValue(e.target.value)
        }}
        />
      </div>
      <div>
        <label htmlFor="ExpenseTitle">What was the expense for: </label>
        <input type="text" name="ExpenseTitle" value={expenseTitle} onChange={(e) => {
          setExpenseTitle(e.target.value)
        }}
        />
      </div>
      <Button onClick={() => 
        handleAddExpense()} disabled={expenseValue === 0 || expenseTitle === ''}>Add Expense</Button>
      <Button onClick={() => {
        handleGetDetails();
      }}>Get Total Expense Details</Button>
      {
        expenseData !== null &&
        <DisplayExpense expenseData={expenseData} />
      }
    </Container>
  )
}