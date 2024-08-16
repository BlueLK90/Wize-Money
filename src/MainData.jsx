import { IoIosHome } from "react-icons/io";
import { MdPets, MdSportsBasketball } from "react-icons/md";
import { FaCar } from "react-icons/fa";

export const budgetData = [
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
