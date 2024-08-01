/* eslint-disable react/prop-types */
import { useState } from "react";
import { numberWithCommas } from "./../../Utils/index";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const DropDownBudget = ({ el }) => {
  return (
    <div>
      <button className=" p-1 w-80 flex items-center justify-between rounded-lg">
        {el.date}
        <p className=" text-orange-700">{el.Amount}</p>
      </button>
    </div>
  );
};

export const DropDownWallet = ({ el, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="border border-red-500 p-1 w-full flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="border border-green-500">{el.date}</div>

        <div>
          {!isOpen ? (
            <>
              <div className="text-orange-700 border border-blue-500 flex items-center gap-1">
                <p>{numberWithCommas(el.Amount)} </p>

                <FiChevronDown className="static" />
              </div>
            </>
          ) : (
            <div>
              <FiChevronUp className="static text-orange-700" />
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className=" relative top-18 flex flex-col items-start rounded-lg p-1 w-80 ">
          {data.map((element, i) => (
            <div
              key={i}
              className="flex w-full justify-between hover:bg-yellow-50 hover:ml-2 cursor-pointer border-l-transparent border-l-8 border-b-2 border-b-gray-200 p-2"
            >
              <p>{element.date}</p>
              <p className="text-orange-700">{element.Amount} IQD</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownWallet;
