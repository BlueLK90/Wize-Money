/* eslint-disable react/prop-types */
import DropDownWallet, { DropDownBudget } from "./DropDown";
import { useContext } from "react";
import DataContext from "../../contexts/dataContext/DataContext";

const detailsCard =
  "text-xs sm:text-sm grid bg-gray-50 border border-gray-300 rounded-lg py-2 px-2 my-2";

const DetailsCard = ({ windowView, keys }) => {
  const { data } = useContext(DataContext);

  //after setting a function to calculate the duration
  //data[keys] becomes data.filter(el.dateAdded) to filter the data
  //to only show the data of the specific duration
  return (
    <div>
      <div className="pt-2">
        {windowView === "budget"
          ? data[keys]
              .filter((el) => el.amount < 0)
              .map((el, i) => (
                <div className={detailsCard} key={i}>
                  <DropDownBudget el={el} />
                </div>
              ))
          : Object.keys(data).map((el, i) => (
              <div className={detailsCard} key={i}>
                <DropDownWallet el={el} i={i} data={data} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default DetailsCard;
