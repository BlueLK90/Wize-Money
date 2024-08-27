import { useContext } from "react";
import DataContext from "./contexts/dataContext/DataContext";

const TesterComponent = () => {
  const { totalIncome, totalExpenses } = useContext(DataContext);

  //const totalIn = totalIncome();
  //const totalExp = totalExpenses();
  return (
    <div>
      {/* <h1>total income {totalIn ? totalIn : 0}</h1>
      <h1>total Expense: {totalExp ? totalExp : 0}</h1> */}
      <h1>total income {totalIncome}</h1>
      <h2>total Expense {totalExpenses}</h2>
    </div>
  );
};

export default TesterComponent;
