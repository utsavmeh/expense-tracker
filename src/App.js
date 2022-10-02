import { useState } from "react"
import { Button, Container } from "react-bootstrap";

export const App = () => {
  const [expenseValue, setExpenseValue] = useState(0);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [noDataError, setNoDataError] = useState(false);
  const [data, setData] = useState([]);

  const handleAddExpense = () => {
    // axios.post('/addExpense', {
    //   expenseTitle,
    //   expenseValue
    // })
    let previousData = [];
    if(localStorage.getItem('data') === null){
      localStorage.setItem('data', []);
    }else{
      previousData = JSON.parse(localStorage.getItem('data'));
    }
    const updatedData = [...previousData, {
      expenseTitle,
      expenseValue
    }];
    localStorage.setItem('data', JSON.stringify(updatedData));
    setExpenseTitle('');
    setExpenseValue(0);
  }

  const handleGetDetails = () => {
    const details = localStorage.getItem('data');
    if(details === null){
      setNoDataError(true);
    }
    else{
      setNoDataError(false);
      setData(JSON.parse(details));
    }
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
        handleAddExpense()}>Add Expense</Button>
      <Button onClick={() => {
        handleGetDetails();
      }}>Get Total Expense Details</Button>
      {
        data.length !== 0 &&
        data.map((item, index) => {
          return(
            <div key={index}>
              <h4>{item.expenseTitle} : </h4>
              <h6>{item.expenseValue}</h6>
            </div>
          )
        })
      }
    </Container>
  )
}