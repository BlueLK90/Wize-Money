/* eslint-disable react/prop-types */
import { useState } from "react";
import { numberWithCommas } from "./../../Utils/index";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const DropDownBudget = ({ el }) => {
  return (
    <div>
      <div className="text-xs sm:text-sm p-1 mx-5 flex items-center justify-between">
        <p>{el.date}</p>
        <p className=" text-darkapricot">{numberWithCommas(el.Amount)}</p>
      </div>
    </div>
  );
};

export const DropDownWallet = ({ el, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="text-xs sm:text-sm p-1 mx-5 flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div>{el.date}</div>

        <div>
          <div className="text-darkapricot flex items-center gap-1">
            {!isOpen ? (
              <>
                <p>{numberWithCommas(el.Amount)} </p>
                <FiChevronDown className="static" />
              </>
            ) : (
              <FiChevronUp className="static text-darkapricot" />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=" relative top-18 flex flex-col items-start rounded-lg p-1 w-full ">
          {data.map((element, i) => (
            <div
              key={i}
              className="flex w-full justify-between hover:bg-yellow-50 hover:ml-2 cursor-pointer border-l-transparent border-l-8 border-b-2 border-b-gray-200 p-2"
            >
              <p>{element.date}</p>
              <p className="text-darkapricot">
                {numberWithCommas(element.Amount)} IQD
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownWallet;
