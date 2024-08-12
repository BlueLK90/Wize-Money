import { useEffect, useRef, useState } from "react";
import { FiDelete } from "react-icons/fi";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const scrollableRef = useRef();

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, []); // Empty dependency array to run only once on mount
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
    <div className="flex justify-center rounded-lg bg-transparent">
      <div className="bg-transparent p-4 shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="mb-4">
          <div
            ref={scrollableRef}
            className=" text-right w-full h-32 overflow-auto text-xl mt-2 border border-b-0 border-gray-400 rounded"
          >
            {result}
          </div>
          <input
            type="text"
            className="w-full p-2 text-right text-2xl border border-gray-400 rounded"
            value={input}
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            className="p-4 bg-gray-600 shadow-sm shadow-black text-white rounded text-lg md:text-xl lg:text-2xl"
            onClick={clearResult}
          >
            C
          </button>
          <button
            className="p-4 bg-darkapricot shadow-sm shadow-black text-white rounded"
            onClick={backSpace}
          >
            <FiDelete className="static text-xl" />
          </button>
          <button
            key={"+/-"}
            className="p-4 bg-apricot shadow-sm shadow-black rounded text-lg md:text-xl lg:text-2xl"
            onClick={() => setInput(input * -1)}
          >
            +/-
          </button>
          <button
            key={"/"}
            className="p-4 bg-apricot shadow-sm shadow-black rounded text-lg md:text-xl lg:text-2xl"
            onClick={() => handleClickSign("/")}
          >
            /
          </button>
          {["7", "8", "9", "*"].map((value) => (
            <button
              key={value}
              className={`p-4 shadow-sm shadow-black
              ${
                value === "*" ? "bg-apricot" : "bg-gray-200"
              } rounded text-lg md:text-xl lg:text-2xl`}
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
              className={`p-4 shadow-sm shadow-black
                ${
                  value === "-" ? "bg-apricot" : "bg-gray-200"
                } rounded text-lg md:text-xl lg:text-2xl`}
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
              className={`p-4
                ${
                  value === "+" ? "bg-apricot" : "bg-gray-200"
                } rounded text-lg md:text-xl lg:text-2xl shadow-sm shadow-black`}
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
              className={`p-4 shadow-sm shadow-black ${
                value === "="
                  ? "bg-darkapricot text-white col-span-2 "
                  : value === "."
                  ? "bg-gray-200 font-bold "
                  : "bg-gray-200 border "
              } rounded text-lg md:text-xl lg:text-2xl`}
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
  );
};

export default Calculator;
