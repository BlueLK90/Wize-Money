/* eslint-disable react/prop-types */
import ProgressBar from "./../Other/RadialBar";
import DetailsCard from "./../Other/DetailsCard";
import AddWindow from "../Other/AddWindow";
import { useState } from "react";
import { formattedDate } from "../../Utils";
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
import { PiPlusBold } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";

const mainSec =
  "grid gap-y-4 text-center text-xs md:text-sm lg:text-base bg-gray-50 border border-gray-300 rounded-lg shadow-sm py-4 my-2";
const budgetMeter = "flex justify-around items-center";
const spendingDetails = "flex justify-between";
const SecondarySec =
  "grid grid-cols-10 gap-1 text-center text-xs md:text-sm lg:text-base";
const one =
  "bg-gray-50 shadow-sm py-2 my-2 border border-gray-300 rounded-l-lg rounded-r-sm";
const two = "bg-gray-50 shadow-sm py-2 my-2 border border-gray-300 rounded-sm";
const three =
  "bg-gray-50 shadow-sm py-2 my-2 border border-gray-300 rounded-l-sm rounded-r-lg";

export const Budget = ({ screenSize }) => {
  const [opnAdd, setOpnAdd] = useState(false); //state for open/close add screen
  const opnAddScreenLarge = screenSize === "isLarge" && opnAdd; //condition for add window for Desktop
  const opnAddScreenSmall = screenSize !== "isLarge" && opnAdd; //condition for add window for phone and tablet

  const [open, setOpen] = useState(false); //state for open/close dialog

  //date formatting
  const dateSubmitted = formattedDate(); //default date

  // main data arr
  const [budgets, setBudgets] = useState(budgetData);

  const [newBudget, setNewBudget] = useState({
    title: "",
    img: "",
    details: "",
    price: "",
    dateAdded: dateSubmitted,
  }); // sec data state

  const addBudget = () => {
    setOpnAdd(!opnAdd);
  }; //open/close add screen

  const submitbtn = (e, newBudget) => {
    e.preventDefault();
    setBudgets([...budgets, newBudget]);
    setNewBudget({
      title: "",
      category: "",
      details: "",
      amount: "",
      dateAdded: dateSubmitted,
    });
    setOpnAdd(false);
  }; //submit form
  const fields = ["Title", "Category", "Amount", "Date", "Details"];

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
        <div className="absolute z-10 w-full h-[70vh] border border-gray-200 bg-gray-100 rounded-md p-8 shadow-md">
          Hello
          <button
            onClick={() => setOpnAdd(!opnAdd)}
            className="rounded-full p-1 mx-2 border border-apricot bg-apricot shadow-sm text-center text-brown-800 font-extrabold text-lg cursor-pointer"
          >
            close
          </button>
        </div>
      )}
      <div>
        <div className={mainSec}>
          <div className={budgetMeter}>
            <div className="meter">
              <ProgressBar remaining="0" />
            </div>
            <div className="details">
              <h4>Your Budget for this month:</h4>
              <div className={spendingDetails}>
                <p>Started at:</p>
                <p>
                  0
                  <em>
                    <b>IQD</b>
                  </em>
                </p>
              </div>
              <div className={spendingDetails}>
                <p>days remaining:</p>
                <p>
                  0
                  <em>
                    <b>IQD</b>
                  </em>
                </p>
              </div>
            </div>
          </div>
          <p>
            Keep a rate of 00000 /day to maintain
            <br /> your budget goal!
          </p>
        </div>
        <div className={SecondarySec}>
          <div className={`${one} col-span-4`}>
            <p>maintained Budget</p>
            <p>0 Days</p>
          </div>
          {/* edit budget btn */}
          <div
            className={`${two} col-span-2 md:text-sm lg:text-sm`}
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(!open)}
          >
            Edit <br />
            My Budget
          </div>
          <Dialog
            open={open}
            size="xs"
            handler={() => setOpen(!open)}
            className="py-4 px-2 md:py-8 md:px-4"
          >
            <DialogBody className="flex justify-between items-center text-xs md:text-sm">
              <label htmlFor="setBudget">Enter Amount:</label>
              <input
                type="number"
                name="setBudget"
                className="border border-gray-300 bg-gray-50 rounded-md p-1 md:p-1.5 sm:w-64"
              />
            </DialogBody>
            <DialogFooter className="mt-2 md:mt-4">
              <button
                className="bg-blue-gray-900 text-xs sm:text-sm w-20 h-6 sm:w-28 sm:h-8 rounded-full text-white font-semibold"
                onClick={() => setOpen(!open)}
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="bg-pale text-xs sm:text-base w-20 h-6 sm:w-28 sm:h-8 mx-2 rounded-full text-darkapricot font-semibold"
              >
                Confirm
              </button>
            </DialogFooter>
          </Dialog>
          {/* enf of edit budget btn */}
          <div className={`${three} col-span-4`}>
            <p>Exceeded Budget</p>
            <p>0 Days</p>
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
                className="bg-greentea"
                onClick={() => setOpnAdd(!opnAdd)}
              >
                <GiMoneyStack className="h-5 w-5" />
                <Typography {...labelProps}>Income</Typography>
              </SpeedDialAction>
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
          <div className="absolute z-10 w-full h-[70vh] border border-gray-200 bg-gray-100 rounded-md p-8 shadow-md">
            Hello
            <button
              onClick={() => setOpnAdd(!opnAdd)}
              className="rounded-full p-1 mx-2 border border-apricot bg-apricot shadow-sm text-center text-brown-800 font-extrabold text-lg cursor-pointer"
            >
              close
            </button>
          </div>
        )}
        <DetailsCard windowView="budget" />
      </div>
    </div>
  );
};

export const Wallet = ({ screenSize }) => {
  const [opnAdd, setOpnAdd] = useState(false);

  const opnAddScreenLarge = screenSize === "isLarge" && opnAdd; //condition for add window for Desktop
  const opnAddScreenSmall = screenSize !== "isLarge" && opnAdd; //condition for add window for phone and tablet

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
        <div className="absolute z-10 w-full h-[70vh] border border-gray-200 bg-gray-100 rounded-md p-8 shadow-md">
          Hello
          <button
            onClick={() => setOpnAdd(!opnAdd)}
            className="rounded-full p-1 mx-2 border border-apricot bg-apricot shadow-sm text-center text-brown-800 font-extrabold text-lg cursor-pointer"
          >
            close
          </button>
        </div>
      )}
      <div>
        <div className={mainSec}>
          <div className={budgetMeter}>
            <div className="meter">
              <ProgressBar remaining="0" />
            </div>
            <div className="details">
              <div className={spendingDetails}>
                <p>Expenses This month:</p>
                <p>
                  0
                  <em>
                    <b>IQD</b>
                  </em>
                </p>
              </div>
              <div className={spendingDetails}>
                <p>Total Expenses:</p>
                <p>
                  0
                  <em>
                    <b>IQD</b>
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={SecondarySec}>
          <div className={`${one} col-span-4`}>
            <p>This Month Income:</p>
            <p>0 IQD</p>
          </div>
          <div className={`${two} col-span-3`}>
            <p>Debts:</p>
            <p>0 IQD</p>
          </div>
          <div className={`${three} col-span-3`}>
            <p>Due Payments:</p>
            <p>0 IQD</p>
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
          <div className="absolute z-10 w-full h-[70vh] border border-gray-200 bg-gray-100 rounded-md p-8 shadow-md">
            Hello
            <button
              onClick={() => setOpnAdd(!opnAdd)}
              className="rounded-full p-1 mx-2 border border-apricot bg-apricot shadow-sm text-center text-brown-800 font-extrabold text-lg cursor-pointer"
            >
              close
            </button>
          </div>
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

const budgetData = [
  { date: "June, 10, 2024", Amount: "1000" },
  { date: "June, 9, 2024", Amount: "1000" },
  { date: "June, 8, 2024", Amount: "1000" },
  { date: "June, 7, 2024", Amount: "1000" },
];
const walletData = [
  { date: "June, 2024", Amount: "1000" },
  { date: "May, 2024", Amount: "1000" },
  { date: "April, 2024", Amount: "1000" },
  { date: "March, 2024", Amount: "1000" },
];
