/* eslint-disable react/prop-types */
import { useState } from "react";
import DataContext from "./DataContext";
import { IoHome } from "react-icons/io5";
import { MdPets, MdSportsBasketball } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";

function DataContextProvider({ children }) {
  const [data, setData] = useState({
    "Aug. 2024": [
      {
        dateAdded: "Aug. 10, 2024",
        amount: -4000,
        title: "Something Aug.",
        details: "some details here",
        category: "home",
        icon: <IoHome />,
      },
      {
        dateAdded: "Aug. 9, 2024",
        amount: -2000,
        title: "Something Aug.",
        details: "some details here",
        category: "car",
        icon: <FaCar />,
      },
      {
        dateAdded: "Aug. 8, 2024",
        amount: -3000,
        title: "Something Aug.",
        details: "some details here",
        category: "pet",
        icon: <MdPets />,
      },
      {
        dateAdded: "Aug. 7, 2024",
        amount: -1000,
        title: "Something Aug.",
        details: "some details here",
        category: "sports",
        icon: <MdSportsBasketball />,
      },
      {
        dateAdded: "Aug. 6, 2024",
        amount: 10000,
        title: "Something Aug.",
        details: "some details here",
        category: "Salary",
        icon: <FaMoneyCheckDollar />,
      },
    ],
    "July 2024": [
      {
        dateAdded: "July 10, 2024",
        amount: -1000,
        title: "Something July",
        details: "some details here",
        category: "home",
        icon: <IoHome />,
      },
      {
        dateAdded: "July 9, 2024",
        amount: -2000,
        title: "Something July",
        details: "some details here",
        category: "car",
        icon: <FaCar />,
      },
      {
        dateAdded: "July 8, 2024",
        amount: -3000,
        title: "Something July",
        details: "some details here",
        category: "pet",
        icon: <MdPets />,
      },
      {
        dateAdded: "July 7, 2024",
        amount: -1000,
        title: "Something July",
        details: "some details here",
        category: "sports",
        icon: <MdSportsBasketball />,
      },
      {
        dateAdded: "July 6, 2024",
        amount: 10000,
        title: "Something July.",
        details: "some details here",
        category: "Salary",
        icon: <FaMoneyCheckDollar />,
      },
    ],
    "June 2024": [
      {
        dateAdded: "June 10, 2024",
        amount: -2000,
        title: "Something June",
        details: "some details here",
        category: "home",
        icon: <IoHome />,
      },
      {
        dateAdded: "June 9, 2024",
        amount: -1000,
        title: "Something June",
        details: "some details here",
        category: "car",
        icon: <FaCar />,
      },
      {
        dateAdded: "June 8, 2024",
        amount: -3000,
        title: "Something June",
        details: "some details here",
        category: "pet",
        icon: <MdPets />,
      },
      {
        dateAdded: "June 7, 2024",
        amount: -2000,
        title: "Something June",
        details: "some details here",
        category: "sports",
        icon: <MdSportsBasketball />,
      },
      {
        dateAdded: "June 6, 2024",
        amount: 10000,
        title: "Something June.",
        details: "some details here",
        category: "Salary",
        icon: <FaMoneyCheckDollar />,
      },
    ],
  });

  const addData = (newData, monthYear) => {
    setData((prevData) => ({
      ...prevData,
      [monthYear]: [newData, ...(prevData[monthYear] || [])],
    }));
  }; // add data

  const totalIncome = () => {
    return data
      .filter((item) => item.amount > 0)
      .reduce((total, item) => total + parseFloat(item.amount), 0);
  }; // calculate total income

  const totalExpenses = () => {
    return data
      .filter((item) => item.amount < 0)
      .reduce((total, item) => total + Math.abs(parseFloat(item.amount)), 0);
  }; // calculate total expense

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  }; // calculate total balance (incomes - expenses)

  const DataValues = {
    data,
    addData,
    totalIncome,
    totalExpenses,
    totalBalance,
  };

  return (
    <DataContext.Provider value={DataValues}>{children}</DataContext.Provider>
  );
}

export default DataContextProvider;
