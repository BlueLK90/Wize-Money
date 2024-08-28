/* eslint-disable react/no-unknown-property */
import DataContext from "../../contexts/dataContext/DataContext";
import "./RadialBar.css";
import { useState, useEffect, useContext } from "react";

// eslint-disable-next-line react/prop-types
const ProgressBar = ({ remaining, type }) => {
  const { data, totalIncome } = useContext(DataContext);
  const [counter, setCounter] = useState(0);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    if (type === "budget") {
      const start = data.budgetData.budgetAmount;
      const percantage = (remaining / start) * 100;
      setAmount(Math.round(percantage));
    } else {
      const percantage = ((totalIncome - remaining) / totalIncome) * 100;
      setAmount(Math.round(percantage));
    }
    setTimeout(() => {
      setCounter((prev) => {
        if (prev < { amount }) {
          return prev + 1;
        } else {
          clearTimeout();
        }
      });
    }, 30);
  }, [
    counter,
    amount,
    remaining,
    type,
    data.budgetData.budgetAmount,
    totalIncome,
  ]);
  return (
    <div className="relative grid justify-center items-center h-[20vw] w-[20vw] sm:h-32 sm:w-32 rounded-full drop-shadow-lg">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="stroke-current text-gray-50"
          strokeWidth="14"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          filter="url(#extra-shadow)"
        />
        {/* Progress circle */}
        <circle
          className="progress-ring__circle"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={`calc(251.2px - (251.2px * ${amount}) / 100)`}
        />
        <defs>
          <linearGradient id="Gradient-color" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="20%" stopColor="#C9E5AB" />
            <stop offset="80%" stopColor="#F8C2A6" />
          </linearGradient>
          <filter
            id="extra-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feFlood floodColor="lightgray" result="flood" />
            <feComposite
              in="flood"
              in2="SourceAlpha"
              operator="in"
              result="mask"
            />
            <feMorphology
              in="mask"
              operator="dilate"
              radius="0.5"
              result="dilated"
            />
            <feGaussianBlur in="dilated" stdDeviation="2" result="blurred" />
            <feComposite
              in="blurred"
              in2="SourceAlpha"
              operator="out"
              result="shadow"
            />
            <feComposite in="SourceGraphic" in2="shadow" operator="over" />
          </filter>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute w-full text-center text-[.6rem] sm:text-sm">
        <p>Remaining:</p>
        <p>{type === "budget" ? remaining : totalIncome - remaining} IQD</p>
      </div>
    </div>
  );
};

export default ProgressBar;
