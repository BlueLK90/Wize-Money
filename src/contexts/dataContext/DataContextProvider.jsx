/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import DataContext from "./DataContext";
import { IoHome } from "react-icons/io5";
import { MdPets, MdSportsBasketball } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";

function DataContextProvider({ children }) {
  const [data, setData] = useState({
    "Aug. 2024": [
      {
        dateAdded: "2024-08-10",
        amount: -4000,
        title: "Something Aug.",
        details: "some details here",
        category: "home",
        icon: <IoHome />,
      },
      {
        dateAdded: "2024-08-09",
        amount: -2000,
        title: "Something Aug.",
        details: "some details here",
        category: "car",
        icon: <FaCar />,
      },
      {
        dateAdded: "2024-08-08",
        amount: -3000,
        title: "Something Aug.",
        details: "some details here",
        category: "pet",
        icon: <MdPets />,
      },
      {
        dateAdded: "2024-08-07",
        amount: -1000,
        title: "Something Aug.",
        details: "some details here",
        category: "sports",
        icon: <MdSportsBasketball />,
      },
      {
        dateAdded: "2024-08-06",
        amount: 10000,
        title: "Something Aug.",
        details: "some details here",
        category: "Salary",
        icon: <FaMoneyCheckDollar />,
      },
    ],
    "July 2024": [
      {
        dateAdded: "2024-07-10",
        amount: -1000,
        title: "Something July",
        details: "some details here",
        category: "home",
        icon: <IoHome />,
      },
      {
        dateAdded: "2024-07-09",
        amount: -2000,
        title: "Something July",
        details: "some details here",
        category: "car",
        icon: <FaCar />,
      },
      {
        dateAdded: "2024-07-08",
        amount: -3000,
        title: "Something July",
        details: "some details here",
        category: "pet",
        icon: <MdPets />,
      },
      {
        dateAdded: "2024-07-07",
        amount: -1000,
        title: "Something July",
        details: "some details here",
        category: "sports",
        icon: <MdSportsBasketball />,
      },
      {
        dateAdded: "2024-07-06",
        amount: 10000,
        title: "Something July.",
        details: "some details here",
        category: "Salary",
        icon: <FaMoneyCheckDollar />,
      },
    ],
    "June 2024": [
      {
        dateAdded: "2024-06-10",
        amount: -2000,
        title: "Something June",
        details: "some details here",
        category: "home",
        icon: <IoHome />,
      },
      {
        dateAdded: "2024-06-09",
        amount: -1000,
        title: "Something June",
        details: "some details here",
        category: "car",
        icon: <FaCar />,
      },
      {
        dateAdded: "2024-06-08",
        amount: -3000,
        title: "Something June",
        details: "some details here",
        category: "pet",
        icon: <MdPets />,
      },
      {
        dateAdded: "2024-06-07",
        amount: -2000,
        title: "Something June",
        details: "some details here",
        category: "sports",
        icon: <MdSportsBasketball />,
      },
      {
        dateAdded: "2024-06-06",
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

  const totalIncome = useMemo(() => {
    return Object.values(data)
      .flat()
      .filter((item) => item.amount > 0)
      .reduce((total, item) => total + parseFloat(item.amount), 0);
  }, [data]); // Memoize & recalculate when data changes

  const totalExpenses = useMemo(() => {
    return Object.values(data)
      .flat()
      .filter((item) => item.amount < 0)
      .reduce((total, item) => total + parseFloat(item.amount), 0);
  }, [data]);

  const totalBalance = useMemo(() => {
    return totalIncome + totalExpenses;
  }, [totalIncome, totalExpenses]);

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
