/* eslint-disable react/prop-types */
import ProgressBar from "./../Other/RadialBar";
import DetailsCard from "./../Other/DetailsCard";
import AddWindow from "../Other/AddWindow";
import { useContext, useState, useMemo } from "react";
import { formattedDate, formattedMonthYear } from "../../Utils";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import DataContext from "../../contexts/dataContext/DataContext";
import { PiMoneyWavyFill, PiPlusBold, PiPottedPlantFill } from "react-icons/pi";
import { GiMoneyStack, GiMedicalPack } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import { FaCar, FaLaughBeam } from "react-icons/fa";
import { IoGiftSharp, IoHome } from "react-icons/io5";
import {
  MdCategory,
  MdChildCare,
  MdFaceRetouchingNatural,
  MdPayments,
  MdPets,
  MdPhoneAndroid,
  MdRestaurant,
  MdSportsBasketball,
  MdWork,
} from "react-icons/md";
import { FaMoneyBills, FaMoneyCheckDollar } from "react-icons/fa6";

export const Budget = ({ screenSize }) => {
  //data context
  const { addData } = useContext(DataContext);

  //state for dialog and stats
  const [open, setOpen] = useState(false);
  const DialogOpen = () => {
    setOpen(!open);
  };

  const [budgetStats, setBudgetStats] = useState({
    budgetAmount: 0,
    budgetExpenses: 0,
    dateStart: new Date(),
    dateEnd: "",
  });

  const budgetDuration = useMemo(() => {
    const { dateEnd } = budgetStats;
    const startDay = new Date();
    const endDay = new Date(dateEnd);

    if (!isNaN(endDay)) {
      const timeDiff = Math.abs(endDay - startDay);
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }
    return null;
  }, [budgetStats]);

  //setStats log data in mainData component
  const setStats = () => {
    setOpen(false);
  };

  const duration = budgetDuration;
  const remaining = budgetStats.budgetAmount - budgetStats.budgetExpenses;
  const dailyBudget = remaining / (duration || 1);
  //when inputing an expense => budgetStats.budgetExpenses(prev => prev + item.amount) (amount is negative)

  const [opnAdd, setOpnAdd] = useState(false); //state for open/close add screen
  const opnAddScreenLarge = screenSize === "isLarge" && opnAdd; //condition for add window for Desktop
  const opnAddScreenSmall = screenSize !== "isLarge" && opnAdd; //condition for add window for phone and tablet

  const { fullDate, monthYear } = formattedDate();
  const dateSubmitted = fullDate; //default date

  const [newBudget, setNewBudget] = useState({
    title: "",
    category: "",
    icon: "",
    details: "",
    amount: "",
    dateAdded: dateSubmitted,
  }); // sec data state

  const submitbtn = (e, newBudget) => {
    e.preventDefault();
    if (newBudget.dateAdded === dateSubmitted) {
      addData(newBudget, monthYear);
    } else {
      addData(newBudget, formattedMonthYear(newBudget.dateAdded));
    }
    setNewBudget({
      title: "",
      category: "",
      icon: "",
      details: "",
      amount: "",
      dateAdded: dateSubmitted,
    });
    setOpnAdd(false);
  }; //submit form

  return (
    <div
      className={
        screenSize === "isLarge"
          ? "grid grid-cols-2 gap-12 mt-2 text-gray-800"
          : "relative text-gray-800 min-h-[75vh]"
      }
    >
      {/* add section for phone and tablet */}
      {opnAddScreenSmall && (
        <AddWindow
          newItem={newBudget}
          setNewItem={setNewBudget}
          submitbtn={submitbtn}
          open={() => setOpnAdd(!opnAdd)}
          items={fieldsExpense}
          icons={categoryIconsExpense}
        />
      )}
      <div>
        <div className={mainSec}>
          <div className={budgetMeter}>
            <div className="meter">
              <ProgressBar remaining={remaining} />
            </div>
            <div className="details">
              <h4>Your Budget for this month:</h4>
              <div className={spendingDetails}>
                <p>Started at:</p>
                <p>
                  {budgetStats.budgetAmount} <b>IQD</b>
                </p>
              </div>
              <div className={spendingDetails}>
                <p>Days remaining:</p>
                <p>
                  {(duration >= 0 && duration) || 0} <b>days</b>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-6">
            {duration > 0 ? (
              <p>
                Keep a rate of{" "}
                <b className="text-green-500">{Math.floor(dailyBudget)} /day</b>{" "}
                to maintain
                <br /> your budget goal!
              </p>
            ) : (
              <p className="text-darkapricot">Please reset your Budget</p>
            )}
            {/* edit budget btn */}
            <button
              className="cursor-pointer bg-greentea border border-gray-200 w-fit p-2 shadow-lg shadow-green-50 rounded-xl"
              onClick={DialogOpen}
            >
              <BiEdit className="text-sm md:text-base" />
            </button>
            <Dialog
              open={open}
              size="sm"
              handler={DialogOpen}
              className="py-4 px-2 md:py-8 md:px-4"
            >
              <DialogBody className="grid grid-cols-2 justify-between items-center text-xs md:text-sm">
                <label htmlFor="setBudget">Enter Amount:</label>
                <input
                  type="number"
                  id="setBudget"
                  name="setBudget"
                  value={budgetStats.budgetAmount || ""}
                  aria-label="setBudget"
                  onChange={(e) =>
                    setBudgetStats({
                      ...budgetStats,
                      budgetAmount: e.target.value,
                    })
                  }
                  className="border border-gray-300 bg-gray-50 rounded-md p-1 md:p-1.5 sm:w-64"
                  required
                />

                <label htmlFor="setStartDay">From:</label>
                <input
                  type="text"
                  id="setStartDay"
                  name="setStartDay"
                  aria-label="StartDay"
                  value="Today"
                  className="border border-gray-300 bg-gray-50 rounded-md p-1 md:p-1.5 sm:w-64"
                  readOnly
                />

                <label htmlFor="setEndtDay">To:</label>
                <input
                  type="date"
                  id="setEndtDay"
                  name="setEndtDay"
                  aria-label="EndtDay"
                  value={budgetStats.dateEnd}
                  onChange={(e) =>
                    setBudgetStats({
                      ...budgetStats,
                      dateEnd: e.target.value,
                    })
                  }
                  className="border border-gray-300 bg-gray-50 rounded-md p-1 md:p-1.5 sm:w-64"
                />
              </DialogBody>

              <DialogFooter className="grid justify-center mt-2 md:mt-4 ">
                <div className="mx-auto">
                  <button
                    className="bg-blue-gray-900 text-xs sm:text-sm w-20 h-6 sm:w-28 sm:h-8 rounded-full text-white font-semibold"
                    onClick={DialogOpen}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={setStats}
                    className="bg-pale text-xs sm:text-base w-20 h-6 sm:w-28 sm:h-8 mx-2 rounded-full text-darkapricot font-semibold"
                  >
                    Confirm
                  </button>
                </div>
                <p className="text-red-500 text-xs sm:text-sm mt-2">
                  **Please note that changing the &apos;End Date&apos; will
                  reset your Budget stats.
                </p>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
      </div>

      {/* add and details section */}
      <div
        className={`relative h-max ${
          screenSize === "isLarge" ? "min-h-[70vh]" : ""
        }`}
      >
        <div className={`flex items-center ${opnAdd ? "hidden" : ""}`}>
          <hr className="flex-grow border-t border-greentea ml-2" />
          <SpeedDial placement="right">
            <SpeedDialHandler>
              <IconButton
                size="lg"
                className="rounded-full bg-darkapricot text-black"
              >
                <PiPlusBold className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              <SpeedDialAction
                className="bg-red-100"
                onClick={() => setOpnAdd(!opnAdd)}
              >
                <GiMoneyStack className="h-5 w-5" />
                <Typography {...labelProps}>Expenses</Typography>
              </SpeedDialAction>
            </SpeedDialContent>
          </SpeedDial>
        </div>

        {/* add section for desktop */}
        {opnAddScreenLarge && (
          <AddWindow
            newItem={newBudget}
            setNewItem={setNewBudget}
            submitbtn={submitbtn}
            open={() => setOpnAdd(!opnAdd)}
            items={fieldsExpense}
            icons={categoryIconsExpense}
          />
        )}
        <DetailsCard windowView="budget" keys={monthYear} />
      </div>
    </div>
  );
};

export const Wallet = ({ screenSize }) => {
  //data context
  const { addData, totalIncome, totalExpenses, totalBalance } =
    useContext(DataContext);

  const [opnAdd, setOpnAdd] = useState(false); //state for open/close add screen
  const [iconsArr, setIconsArr] = useState(""); //setting the icon array to pass to AddWindow
  const opnAddScreenLarge = screenSize === "isLarge" && opnAdd; //condition for add window for Desktop
  const opnAddScreenSmall = screenSize !== "isLarge" && opnAdd; //condition for add window for phone and tablet

  const { fullDate, monthYear } = formattedDate();
  const dateSubmitted = fullDate; //default date

  const [newBudget, setNewBudget] = useState({
    title: "",
    category: "",
    icon: "",
    details: "",
    amount: "",
    dateAdded: dateSubmitted,
  }); // sec data state

  const submitbtn = (e, newBudget) => {
    e.preventDefault();
    if (newBudget.dateAdded === dateSubmitted) {
      addData(newBudget, monthYear);
    } else {
      addData(newBudget, formattedMonthYear(newBudget.dateAdded));
    }
    setNewBudget({
      title: "",
      category: "",
      icon: "",
      details: "",
      amount: "",
      dateAdded: dateSubmitted,
    });
    setOpnAdd(false);
  }; //submit form

  return (
    <div
      className={
        screenSize === "isLarge"
          ? "grid grid-cols-2 gap-12 mt-2 text-gray-800"
          : "relative text-gray-800 min-h-[75vh]"
      }
    >
      {/* add section for phone and tablet */}
      {opnAddScreenSmall && (
        <AddWindow
          newItem={newBudget}
          setNewItem={setNewBudget}
          submitbtn={submitbtn}
          open={() => setOpnAdd(!opnAdd)}
          items={iconsArr === "Expense" ? fieldsExpense : fieldsIncome}
          icons={
            iconsArr === "Expense" ? categoryIconsExpense : categoryIconsIncome
          }
        />
      )}
      <div>
        <div className={mainSec}>
          <div className={budgetMeter}>
            <div className="meter">
              <ProgressBar remaining={totalBalance} />
            </div>
            <div className="details">
              <div className={spendingDetails}>
                <p>Total Income:</p>
                <p>
                  {totalIncome || 0}
                  <b>IQD</b>
                </p>
              </div>
              <div className={spendingDetails}>
                <p>Total Expenses:</p>
                <p>
                  {totalExpenses || 0}
                  <b>IQD</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* add and detail section */}
      <div
        className={`relative h-max ${
          screenSize === "isLarge" ? "min-h-[70vh]" : ""
        }`}
      >
        <div className={`flex items-center ${opnAdd ? "hidden" : ""}`}>
          <hr className="flex-grow border-t border-greentea ml-2" />
          <SpeedDial placement="right">
            <SpeedDialHandler>
              <IconButton
                size="lg"
                className="rounded-full bg-darkapricot text-black"
              >
                <PiPlusBold className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              <SpeedDialAction
                className="bg-greentea"
                onClick={() => {
                  setOpnAdd(!opnAdd);
                  let value = "Income";
                  setIconsArr(value);
                }}
              >
                <GiMoneyStack className="h-5 w-5" />
                <Typography {...labelProps}>Income</Typography>
              </SpeedDialAction>
              <SpeedDialAction
                className="bg-red-100"
                onClick={() => {
                  setOpnAdd(!opnAdd);
                  let value = "Expense";
                  setIconsArr(value);
                }}
              >
                <GiMoneyStack className="h-5 w-5" />
                <Typography {...labelProps}>Expenses</Typography>
              </SpeedDialAction>
            </SpeedDialContent>
          </SpeedDial>
        </div>
        {/* add section for desktop */}
        {opnAddScreenLarge && (
          <AddWindow
            newItem={newBudget}
            setNewItem={setNewBudget}
            submitbtn={submitbtn}
            open={() => setOpnAdd(!opnAdd)}
            items={iconsArr === "Expense" ? fieldsExpense : fieldsIncome}
            icons={
              iconsArr === "Expense"
                ? categoryIconsExpense
                : categoryIconsIncome
            }
          />
        )}
        <DetailsCard windowView="wallet" />
      </div>
    </div>
  );
};

//speed dial label props
const labelProps = {
  variant: "small",
  color: "blue-gray",
  className:
    "bg-gray-100 absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
};

//styles
const mainSec =
  "grid gap-y-4 text-center text-xs md:text-sm lg:text-base bg-gray-50 border border-gray-300 rounded-lg shadow-sm py-4 my-2";
const budgetMeter = "flex justify-around items-center";
const spendingDetails = "flex justify-between";

//AddWindow props
const fieldsExpense = ["Category", "Title", "AmountOut", "Date", "Details"];
const fieldsIncome = ["Category", "Title", "AmountIn", "Date", "Details"];
const categoryIconsExpense = [
  { value: "home", icon: <IoHome /> },
  { value: "work", icon: <MdWork /> },
  { value: "pets", icon: <MdPets /> },
  { value: "car", icon: <FaCar /> },
  { value: "phone", icon: <MdPhoneAndroid /> },
  { value: "food", icon: <MdRestaurant /> },
  { value: "health", icon: <GiMedicalPack /> },
  { value: "fun", icon: <FaLaughBeam /> },
  { value: "selfcare", icon: <MdFaceRetouchingNatural /> },
  { value: "sports", icon: <MdSportsBasketball /> },
  { value: "kids", icon: <MdChildCare /> },
  { value: "gifts", icon: <IoGiftSharp /> },
  { value: "plants", icon: <PiPottedPlantFill /> },
  { value: "others", icon: <MdCategory /> },
];
const categoryIconsIncome = [
  { value: "Salary", icon: <FaMoneyCheckDollar /> },
  { value: "Paycheck", icon: <PiMoneyWavyFill /> },
  { value: "Bounus", icon: <FaMoneyBills /> },
  { value: "Others", icon: <MdPayments /> },
];
