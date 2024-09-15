/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import DataContext from "./DataContext";
import monitor from "../../assets/monitor.jpg";
import { IoHome } from "react-icons/io5";
import { MdPets, MdSportsBasketball } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";

function DataContextProvider({ children }) {
  const [data, setData] = useState({
    wishList: [
      {
        title: "Lorem ipsum dolor sit amet",
        img: monitor,
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidkeyunt",
        price: "100000",
        dateAdded: "Aug. 3, 2024",
      },
      {
        title: "Lorem ipsum dolor sit amet",
        img: "",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidkeyunt",
        price: "200000",
        dateAdded: "Aug. 2, 2024",
      },
      {
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidkeyunt",
        img: "",
        details: "",
        price: "",
        dateAdded: "Aug. 1, 2024",
      },
    ],
    budgetData: {
      budgetAmount: 200000,
      remaining: 194000,
      dateStart: "2024-08-02",
      dateEnd: "2024-09-15",
    },
    transactionData: {
      "Aug. 2024": [
        {
          type: "budget",
          dateAdded: "2024-08-10",
          amount: -4000,
          title: "Something Aug.",
          details: "some details here",
          category: "home",
          icon: <IoHome />,
        },
        {
          type: "budget",
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
          type: "budget",
          dateAdded: "2024-07-10",
          amount: -1000,
          title: "Something July",
          details: "some details here",
          category: "home",
          icon: <IoHome />,
        },
        {
          type: "budget",
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
          type: "budget",
          dateAdded: "2024-06-10",
          amount: -2000,
          title: "Something June",
          details: "some details here",
          category: "home",
          icon: <IoHome />,
        },
        {
          type: "budget",
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
    },
  });

  //budget data
  const setBudget = (newbudget) => {
    setData((prevData) => ({
      ...prevData,
      budgetData: newbudget,
    }));
  };

  // transactions data
  const addDataTransaction = (newData, monthYear) => {
    setData((prevData) => ({
      ...prevData,
      transactionData: {
        ...prevData.transactionData,
        [monthYear]: [newData, ...(prevData.transactionData[monthYear] || [])],
      },
    }));
  };

  const totalIncome = useMemo(() => {
    return Object.values(data.transactionData || {})
      .flat()
      .filter((item) => item.amount > 0)
      .reduce((total, item) => total + parseFloat(item.amount), 0);
  }, [data]); // Memoize & recalculate when data changes

  const totalExpenses = useMemo(() => {
    return Object.values(data.transactionData || {})
      .flat()
      .filter((item) => item.amount < 0)
      .reduce((total, item) => total + parseFloat(item.amount), 0);
  }, [data]);

  //add wishList data
  const addDataWishList = (newData, editIndex) => {
    if (editIndex !== null) {
      const arr = [...data.wishList];
      arr[editIndex] = newData;
      setData((prevData) => ({
        ...prevData,
        wishList: arr,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        wishList: [newData, ...prevData.wishList],
      }));
    }
  };

  //delete a wish card
  const deleteWishCard = (i) => {
    const arr = [...data.wishList];
    arr.splice(i, 1);
    setData((prevData) => ({
      ...prevData,
      wishList: arr,
    }));
  };

  const DataValues = useMemo(
    () => ({
      data,
      setData,
      addDataTransaction,
      setBudget,
      totalIncome,
      totalExpenses,
      addDataWishList,
      deleteWishCard,
    }),
    [data]
  );

  return (
    <DataContext.Provider value={DataValues}>{children}</DataContext.Provider>
  );
}

export default DataContextProvider;

/*const dataLS = localStorage.getItem("userData");
let initialData;
try {
  initialData = dataLS ? JSON.parse(dataLS) : null;
} catch (error) {
  console.error("Error parsing localStorage data:", error);
  initialData = null;
}
const [data, setData] = useState(initialData ? initialData : []);

useEffect(() => {
  try {
    const dataObj = {
      wishList: data.wishList,
      budgetData: data.budgetData,
      transactionData: data.transactionData,
    };
    localStorage.setItem("userData", JSON.stringify(dataObj));
  } catch (error) {
    console.error("Failed to save data to local storage:", error);
  }
}, [data]);*/
