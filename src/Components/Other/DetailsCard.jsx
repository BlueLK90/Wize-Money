/* eslint-disable react/prop-types */
import DropDownWallet, { DropDownBudget } from "./DropDown";
import { useContext } from "react";
import DataContext from "../../contexts/dataContext/DataContext";

export const detailsCard =
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
        {windowView === "budget" ? (
          filteredTransactions.length == 0 ? (
            <div className="w-full h-[50vh] py-10 text-sm md:text:base">
              <div className=" bg-gray-50 flex flex-col gap-2 justify-center px-4 py-14 rounded-md text-gray-900 border border-gray-300 shadow-sm">
                <p>
                  <i className="text-green-500 font-extrabold mr-2">**</i> Click
                  the Green button to set up your budget Amount and Duration.
                </p>

                <p>
                  <i className="text-green-500 font-extrabold mr-2">**</i>
                  <strong>After</strong> setting your budget, click the Plus
                  circle above to add a new Expense.
                </p>
                <p>
                  <i className="text-green-500 font-extrabold mr-2">**</i> Only
                  here you can Add and list your budget data.
                </p>
              </div>
            </div>
          ) : (
            filteredTransactions
              .filter((el) => Object.keys(el).length === 7)
              .map((el, i) => (
                <div className={detailsCard} key={i}>
                  <DropDownBudget el={el} />
                </div>
              ))
          )
        ) : Object.keys(data.transactionData) == 0 ? (
          <div className="w-full h-[50vh] py-10 text-sm md:text:base">
            <div className=" bg-gray-50 flex flex-col gap-2 justify-center px-4 py-14 rounded-md text-gray-900 border border-gray-300 shadow-sm">
              <p>
                <i className="text-green-500 font-extrabold mr-2">**</i> Click
                the Plus circle above to add a new Income or Expense.
              </p>

              <p>
                <i className="text-green-500 font-extrabold mr-2">**</i>
                You can track your total Income and expenses are shown in the
                main section.
              </p>
              <p>
                <i className="text-green-500 font-extrabold mr-2">**</i> Here
                you can find all your Logs, including Budget expenses.
              </p>
            </div>
          </div>
        ) : (
          Object.keys(data.transactionData).map((el, i) => (
            <div className={detailsCard} key={i}>
              <DropDownWallet el={el} i={i} data={data} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DetailsCard;
