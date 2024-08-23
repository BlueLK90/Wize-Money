/* eslint-disable react/prop-types */
import DropDownWallet, { DropDownBudget } from "./DropDown";
import { useContext } from "react";
import DataContext from "../../contexts/dataContext/DataContext";

const walletData = [
  { date: "June, 2024", amount: 1000 },
  { date: "May, 2024", amount: 1000 },
  { date: "April, 2024", amount: 1000 },
  { date: "March, 2024", amount: 1000 },
];
const detailsCard =
  "text-xs sm:text-sm grid bg-gray-50 border border-gray-300 rounded-lg py-2 px-2 my-2";

const DetailsCard = ({ windowView }) => {
  const { data } = useContext(DataContext);
  return (
    <div>
      <div className="pt-2">
        {windowView === "budget"
          ? data.map((el, i) => (
              <div className={detailsCard} key={i}>
                <DropDownBudget el={el} />
              </div>
            ))
          : walletData.map((el, i) => (
              <div className={detailsCard} key={i}>
                <DropDownWallet el={el} i={i} data={data} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default DetailsCard;
