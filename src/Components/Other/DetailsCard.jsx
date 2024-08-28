/* eslint-disable react/prop-types */
import DropDownWallet, { DropDownBudget } from "./DropDown";
import { useContext } from "react";
import DataContext from "../../contexts/dataContext/DataContext";

const detailsCard =
  "text-xs sm:text-sm grid bg-gray-50 border border-gray-300 rounded-lg py-2 px-2 my-2";

const DetailsCard = ({ windowView, startDate, endDate }) => {
  const { data } = useContext(DataContext);

  const budgetDurationFilter = (startDate, endDate) => {
    const transactions = Object.values(data.transactionData)
      .flat()
      .filter((transaction) => {
        const transactionDate = new Date(transaction.dateAdded);
        return (
          transactionDate >= new Date(startDate) &&
          transactionDate <= new Date(endDate)
        );
      });
    return transactions;
  };
  const filteredTransactions = budgetDurationFilter(startDate, endDate) || [];
  return (
    <div>
      <div className="pt-2">
        {windowView === "budget"
          ? filteredTransactions
              .filter((el) => Object.keys(el).length === 7)
              .map((el, i) => (
                <div className={detailsCard} key={i}>
                  <DropDownBudget el={el} />
                </div>
              ))
          : Object.keys(data.transactionData).map((el, i) => (
              <div className={detailsCard} key={i}>
                <DropDownWallet el={el} i={i} data={data} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default DetailsCard;
