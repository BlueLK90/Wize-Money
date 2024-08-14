/* eslint-disable react/prop-types */
import { IoIosHome } from "react-icons/io";
import DropDownWallet, { DropDownBudget } from "./DropDown";
import { MdPets, MdSportsBasketball } from "react-icons/md";
import { FaCar } from "react-icons/fa";

const budgetData = [
  {
    date: "June, 10, 2024",
    amount: 1000,
    title: "Something",
    details: "some details here",
    category: "home",
    categoryIcon: <IoIosHome />,
  },
  {
    date: "June, 9, 2024",
    amount: 1000,
    title: "Something",
    details: "some details here",
    category: "car",
    categoryIcon: <FaCar />,
  },
  {
    date: "June, 8, 2024",
    amount: 1000,
    title: "Something",
    details: "some details here",
    category: "pet",
    categoryIcon: <MdPets />,
  },
  {
    date: "June, 7, 2024",
    amount: 1000,
    title: "Something",
    details: "some details here",
    category: "sports",
    categoryIcon: <MdSportsBasketball />,
  },
];
const walletData = [
  { date: "June, 2024", amount: 1000 },
  { date: "May, 2024", amount: 1000 },
  { date: "April, 2024", amount: 1000 },
  { date: "March, 2024", amount: 1000 },
];
const detailsCard =
  "text-xs sm:text-sm grid bg-gray-50 border border-gray-300 rounded-lg py-2 px-2 my-2";

const DetailsCard = ({ windowView }) => {
  return (
    <div>
      <div className="pt-2">
        {windowView === "budget"
          ? budgetData.map((el, i) => (
              <div className={detailsCard} key={i}>
                <DropDownBudget el={el} />
              </div>
            ))
          : walletData.map((el, i) => (
              <div className={detailsCard} key={i}>
                <DropDownWallet el={el} i={i} data={budgetData} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default DetailsCard;
