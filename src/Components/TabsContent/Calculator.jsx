import { useState } from "react";
import { FiDelete } from "react-icons/fi";

const btnStyle =
  "flex justify-center items-center h-12 w-12 p-4 shadow-sm shadow-gray-400 rounded-full text-xs md:text-sm lg:text-base font-medium text-darkapricot";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  var calSignClicked;
  const handleClickNum = (val) => {
    if (input === 0 || calSignClicked === true) {
      setInput(val);
      calSignClicked = false;
    } else {
      setInput((prev) => prev + val);
    }
  };
  const handleClickSign = (val) => {
    calSignClicked = true;
    setResult((prev) => {
      if (prev.slice(-1) !== val) {
        return prev.slice(0, -1) + val;
      } else {
        return prev + input + val;
      }
    });
  };

  const backSpace = () => {
    setInput(input.slice(0, -1));
  };

  const clearResult = () => {
    setInput("");
    setResult("");
  };

  const calculate = () => {
    try {
      setInput(eval(result));
      setResult(result + "=");
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="bg-gray-100 w-[95%] lg:w-[80%] mx-auto pb-4 rounded-md">
      <div className="bg-transparent px-4 pt-4 w-full max-w-xs sm:max-w-md md:max-w-lg">
        {/* screens div */}
        <div className="mb-1">
          <div className="text-right w-full h-40 xl:h-24 p-2 overflow-auto text-xl mt-2 border border-b-0 border-gray-300 rounded">
            {result}
          </div>
          <input
            type="text"
            className="w-full p-2 text-right text-2xl border border-gray-300 rounded"
            value={input}
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
              onClick={() => handleClickSign("/")}
            >
              /
            </button>
            {["7", "8", "9", "*"].map((value) => (
              <button
                key={value}
                className={btnStyle}
                onClick={() =>
                  value === "*" ? handleClickSign(value) : handleClickNum(value)
                }
              >
                {value}
              </button>
            ))}
            {["4", "5", "6", "-"].map((value) => (
              <button
                key={value}
                className={btnStyle}
                onClick={() =>
                  value === "-" ? handleClickSign(value) : handleClickNum(value)
                }
              >
                {value}
              </button>
            ))}
            {["1", "2", "3", "+"].map((value) => (
              <button
                key={value}
                className={btnStyle}
                onClick={() =>
                  value === "+" ? handleClickSign(value) : handleClickNum(value)
                }
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
                  value === "=" ? calculate() : handleClickNum(value)
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
