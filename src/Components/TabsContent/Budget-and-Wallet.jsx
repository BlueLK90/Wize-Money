import ProgressBar from "./../Other/RadialBar";
import AddButton from "./../Other/AddButton";
import DetailsCard from "./../Other/DetailsCard";

const mainSec =
  "text-xs xs:text-sm lg:text-base bg-gray-100 grid gap-y-6 text-center border border-gray-300 rounded-lg shadow-sm py-4 my-2";
const budgetMeter = "flex justify-around items-center";
const spendingDetails = "flex justify-between";
const SecondarySec = "grid gap-2 text-center pb-4 border-b border-b-gray-400";
const one =
  "bg-gray-100 shadow-sm py-2 my-2 border border-gray-300 rounded-l-lg rounded-r-sm";
const two = "bg-gray-100 shadow-sm py-2 my-2 border border-gray-300 rounded-sm";
const three =
  "bg-gray-100 shadow-sm py-2 my-2 border border-gray-300 rounded-l-sm rounded-r-lg";

export const Budget = () => {
  return (
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
      <div
        className={SecondarySec}
        style={{ gridTemplateColumns: "1.5fr 1fr 1.5fr" }}
      >
        <div className={one}>
          <p>maintained Budget</p>
          <p>2 Days</p>
        </div>
        <div className={two} role="button" style={{ cursor: "pointer" }}>
          Edit your Budget
        </div>
        <div className={three}>
          <p>Exceeded Budget</p>
          <p>2 Days</p>
        </div>
      </div>
      <div className="relative">
        <AddButton />
        <DetailsCard windowView="budget" />
      </div>
    </div>
  );
};

export const Wallet = () => {
  return (
    <>
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
      <div
        className={SecondarySec}
        style={{ gridTemplateColumns: "1.5fr 1fr 1fr" }}
      >
        <div className={one}>
          <p>This Month Income:</p>
          <p>1000</p>
        </div>
        <div className={two}>
          <p>Debts +:</p>
          <p>1000</p>
        </div>
        <div className={three}>
          <p>Debts -:</p>
          <p>1000</p>
        </div>
      </div>
      <div className="relative w-full">
        <AddButton />
        <DetailsCard windowView="wallet" />
      </div>
    </>
  );
};
