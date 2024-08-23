/* eslint-disable react/prop-types */
import { useState } from "react";
import { numberWithCommas } from "./../../Utils/index";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

export const DropDownBudget = ({ el }) => {
  return (
    <div>
      <Popover placement="top-end">
        <PopoverHandler>
          <div className="text-xs sm:text-sm p-1 mx-5 flex items-center justify-between cursor-pointer">
            <div className="flex gap-6 items-center">
              <p className="h-6 w-6 md:w-8 md:h-8 rounded-full bg-greentea text-xs lg:text-sm flex justify-center items-center">
                {el.icon}
              </p>
              <p>{el.title}</p>
            </div>
            <p className="text-darkapricot">
              {numberWithCommas(el.amount)} IQD
            </p>
          </div>
        </PopoverHandler>
        <PopoverContent className="w-80 z-10 bg-gray-50 border border-gray-200 text-xs ml-5 shadow-md shadow-[#f0dcd174]">
          <p className="text-darkapricot mb-1">{el.dateAdded}</p>
          <p>{el.details}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const DropDownWallet = ({ el, i, data }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenOld, setIsOpenOld] = useState(false);

  //sum the amounts of the month // should be in the main data array
  const accumlator = () => {
    let sum = 0;
    data.forEach((el) => {
      sum += el.amount;
    });
    return sum;
  };
  const totalAmount = accumlator();

  return (
    <div>
      {i === 0 ? (
        <>
          <div
            className={`${
              isOpen &&
              "border-b-2 border-b-greentea text-green-600 font-medium"
            } text-xs sm:text-sm p-1 mx-5 flex items-center justify-between`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div>{el.date}</div>

            <div>
              <div className="text-darkapricot flex items-center gap-1">
                {!isOpen ? (
                  <>
                    <p>{numberWithCommas(totalAmount)} </p>
                    <FiChevronDown className="static" />
                  </>
                ) : (
                  <FiChevronUp className="static text-darkapricot" />
                )}
              </div>
            </div>
          </div>
          {isOpen && (
            <div className=" relative top-18 flex flex-col items-start  rounded-lg p-1 w-full ">
              {data.map((element, i) => (
                <div key={i} className="w-full">
                  <Popover placement="top-end">
                    <PopoverHandler>
                      <div className="flex w-full justify-between items-center hover:bg-yellow-50 hover:ml-2 cursor-pointer border-l-transparent border-l-8 border-b-2 border-b-gray-200 p-2">
                        <div className="flex gap-6 items-center">
                          <p className="h-6 w-6 md:w-8 md:h-8 rounded-full bg-greentea text-xs lg:text-sm flex justify-center items-center">
                            {element.icon}
                          </p>
                          <p>{element.title}</p>
                        </div>
                        <p className="text-darkapricot">
                          {numberWithCommas(element.amount)} IQD
                        </p>
                      </div>
                    </PopoverHandler>
                    <PopoverContent className="w-80 z-10 bg-gray-50 border border-gray-200 text-xs ml-2 shadow-md shadow-[#f0dcd174]">
                      <p className="text-darkapricot mb-1">
                        {element.dateAdded}
                      </p>
                      <p>{element.details}</p>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div
            className="text-xs sm:text-sm p-1 mx-5 flex items-center justify-between"
            onClick={() => setIsOpenOld((prev) => !prev)}
          >
            <div>{el.date}</div>

            <div>
              <div className="text-darkapricot flex items-center gap-1">
                {!isOpenOld ? (
                  <>
                    <p>{numberWithCommas(totalAmount)} </p>
                    <FiChevronDown className="static" />
                  </>
                ) : (
                  <FiChevronUp className="static text-darkapricot" />
                )}
              </div>
            </div>
          </div>
          {isOpenOld && (
            <div className=" relative top-18 flex flex-col items-start  rounded-lg p-1 w-full ">
              {data.map((element, i) => (
                <div key={i} className="w-full">
                  <Popover placement="top-end">
                    <PopoverHandler>
                      <div className="flex w-full justify-between items-center hover:bg-yellow-50 hover:ml-2 cursor-pointer border-l-transparent border-l-8 border-b-2 border-b-gray-200 p-2">
                        <div className="flex gap-6 items-center">
                          <p className="h-6 w-6 md:w-8 md:h-8 rounded-full bg-greentea text-xs lg:text-sm flex justify-center items-center">
                            {element.Icon}
                          </p>
                          <p>{element.title}</p>
                        </div>
                        <p className="text-darkapricot">
                          {numberWithCommas(element.amount)} IQD
                        </p>
                      </div>
                    </PopoverHandler>
                    <PopoverContent className="w-80 z-10 bg-gray-50 border border-gray-200 text-xs ml-2 shadow-md shadow-[#f0dcd174]">
                      <p className="text-darkapricot mb-1">
                        {element.dateAdded}
                      </p>
                      <p>{element.details}</p>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DropDownWallet;
