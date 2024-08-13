import { useState } from "react";
import { FiDelete } from "react-icons/fi";
import { numberWithCommas } from "../../Utils";

const btnStyle =
  "flex justify-center items-center h-12 w-12 p-4 shadow-sm shadow-gray-400 rounded-full text-base font-medium text-darkapricot hover:opacity-70";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  //const [reset, setReset] = useState(false); //startover
  const [calculating, setCalculating] = useState(""); //manage the sizes of input screens

  const mathSigns = ["+", "-", "*", "/", "."];

  const handleClick = (val) => {
    if (mathSigns.includes(val) && input === "") {
      return;
    }

    if (mathSigns.includes(val) && mathSigns.includes(input.slice(-1))) {
      setCalculating(calculating.slice(0, -1) + val);
      setInput(input.slice(0, -1) + val);
    } else {
      setCalculating(calculating + val);
      setInput(input + val);
    }

    if (!mathSigns.includes(val)) {
      setResult(eval(input + val));
    }
  }; // +-*/ btn

  const calculate = () => {
    try {
      if (mathSigns.includes(input.slice(-1))) {
        setCalculating(calculating.slice(0, -1) + "=");
        setInput(eval(input.slice(0, -1)));
      } else {
        setCalculating(calculating + " =");
        setInput(eval(input));
        setResult("");
      }
    } catch (error) {
      setResult("Error");
    }
  }; // = btn

  const backSpace = () => {
    setCalculating(calculating.slice(0, -1));
    setInput(input.slice(0, -1));
  }; //backspace btn

  const clearResult = () => {
    setCalculating("");
    setInput("");
    setResult("");
  }; //clear all btn

  return (
    <div className="bg-gray-100 w-[95%] lg:w-[80%] mx-auto pb-4 rounded-md">
      <div className="bg-transparent px-4 pt-4 w-full max-w-xs sm:max-w-md md:max-w-lg">
        {/* screens div */}
        <div className="mb-1">
          <div className="bg-white/50 border border-b-0 border-gray-300 rounded p-2 mt-2 text-xl text-right w-full h-40 xl:h-24 overflow-auto">
            <p className="h-[75%] text-green-500">{numberWithCommas(result)}</p>
            <p className="text-sm text-green-300">
              {numberWithCommas(calculating)}
            </p>
          </div>
          <input
            type="text"
            className="w-full p-2 text-right text-2xl text-green-700 border border-gray-300 rounded"
            value={numberWithCommas(input) || "0"}
            readOnly
          />
        </div>
        {/* buttons div */}
        <div className="w-[95%] mx-auto">
          <div className="grid grid-cols-4 gap-2.5 p-4">
            <button
              className={`${btnStyle} bg-gray-600 text-white`}
              onClick={clearResult}
            >
              C
            </button>
            <button
              className={`${btnStyle} bg-darkapricot text-white`}
              onClick={backSpace}
            >
              <FiDelete className="static text-xl" />
            </button>
            <button
              key={"+/-"}
              className={btnStyle}
              onClick={() => setInput(input * -1)}
            >
              +/-
            </button>
            <button
              key={"/"}
              className={btnStyle}
              onClick={() => handleClick("/")}
            >
              /
            </button>
            {["7", "8", "9", "*"].map((value) => (
              <button
                key={value}
                className={btnStyle}
                onClick={() => handleClick(value)}
              >
                {value}
              </button>
            ))}
            {["4", "5", "6", "-"].map((value) => (
              <button
                key={value}
                className={btnStyle}
                onClick={() => handleClick(value)}
              >
                {value}
              </button>
            ))}
            {["1", "2", "3", "+"].map((value) => (
              <button
                key={value}
                className={btnStyle}
                onClick={() => handleClick(value)}
              >
                {value}
              </button>
            ))}
            {[".", "0", "="].map((value) => (
              <button
                key={value}
                className={`${btnStyle} ${
                  value === "="
                    ? "bg-darkapricot text-white ml-1 w-[90%] col-span-2"
                    : value === "."
                    ? "font-extrabold"
                    : ""
                }`}
                onClick={() =>
                  value === "=" ? calculate() : handleClick(value)
                }
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
