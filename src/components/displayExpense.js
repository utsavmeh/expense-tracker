import { Card, Container } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";

export const DisplayExpense = ({expenseData}) => {
    return(
        <Container>
            {/* <div style={{width:"200px", height: "50px", backgroundColor:"grey"}}/> */}
            {
                Object.keys(expenseData).map((key, index)  => {
                return(
                    <div key={index}>
                    <h4>
                        Created On: {key}
                    </h4>
                    {
                        expenseData[key].map((item) => {
                        return(
                            <Card style={{ width: '18rem', backgroundColor:"grey" }}>
                                <h3>{item.expenseTitle} : {item.expenseAmount}</h3>
                                <AiFillEdit />
                            </Card>
                        )
                        })
                    }
                    </div>
                )
            })}
        </Container>
    )
}