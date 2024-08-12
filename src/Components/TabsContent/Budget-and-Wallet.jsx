/* eslint-disable react/prop-types */
import ProgressBar from "./../Other/RadialBar";
import AddButton from "./../Other/AddButton";
import DetailsCard from "./../Other/DetailsCard";

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

export const Budget = ({ size }) => {
  return (
    <div className={size === "isLarge" ? "grid grid-cols-2 gap-12 mt-2 " : ""}>
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
            <p>2 Days</p>
          </div>
          <div
            className={`${two} col-span-2`}
            role="button"
            style={{ cursor: "pointer" }}
          >
            Edit My Budget
          </div>
          <div className={`${three} col-span-4`}>
            <p>Exceeded Budget</p>
            <p>2 Days</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <hr className="flex-grow border-t border-greentea ml-2" />
          <span className="mx-2">
            <AddButton />
          </span>
        </div>
        <DetailsCard windowView="budget" />
      </div>
    </div>
  );
};

export const Wallet = ({ size }) => {
  return (
    <div className={size === "isLarge" ? "grid grid-cols-2 gap-12 mt-2 " : ""}>
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
            <p>1000</p>
          </div>
          <div className={`${two} col-span-3`}>
            <p>Debts:</p>
            <p>1000</p>
          </div>
          <div className={`${three} col-span-3`}>
            <p>Due Payments:</p>
            <p>1000</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <hr className="flex-grow border-t border-greentea ml-2" />
          <span className="mx-2">
            <AddButton />
          </span>
        </div>
        <DetailsCard windowView="wallet" />
      </div>
    </div>
  );
};
