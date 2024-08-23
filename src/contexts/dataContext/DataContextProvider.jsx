/* eslint-disable react/prop-types */
import { useState } from "react";
import DataContext from "./DataContext";
import { IoHome } from "react-icons/io5";
import { MdPets, MdSportsBasketball } from "react-icons/md";
import { FaCar } from "react-icons/fa";

function DataContextProvider({ children }) {
  const [data, setData] = useState([
    {
      dateAdded: "June, 10, 2024",
      amount: 1000,
      title: "Something",
      details: "some details here",
      category: "home",
      icon: <IoHome />,
    },
    {
      dateAdded: "June, 9, 2024",
      amount: 1000,
      title: "Something",
      details: "some details here",
      category: "car",
      icon: <FaCar />,
    },
    {
      dateAdded: "June, 8, 2024",
      amount: 1000,
      title: "Something",
      details: "some details here",
      category: "pet",
      icon: <MdPets />,
    },
    {
      dateAdded: "June, 7, 2024",
      amount: 1000,
      title: "Something",
      details: "some details here",
      category: "sports",
      icon: <MdSportsBasketball />,
    },
  ]);

  const addData = (newData) => {
    setData((prevData) => [...prevData, newData]);
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
