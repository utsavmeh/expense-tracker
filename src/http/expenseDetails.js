import axios from "axios";

export const getExpenseDetailsApi = () => {
    const tempData = {};
  
    return axios.get('/expense').then((response) => {
      response.data.expenses.forEach((data) => {
        console.log(data);
        const date = data.createdAt.slice(0, 10);
        if(tempData.hasOwnProperty(date)){
          tempData[date] = [...tempData[date], data];
        }
        else{
          Object.assign(tempData, {[date]: [data]});
        }
      });
      return tempData;
    }).catch((error) => {
      throw Error(error);
    });
  
  }