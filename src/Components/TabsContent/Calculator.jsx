import { useEffect, useRef, useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const scrollableRef = useRef();

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, []); // Empty dependency array to run only once on mount

  const calculationSigns = ["+", "-", "*", "/"];
  const handleClick = (value) => {
    if (input === 0) {
      setInput(value);
    } else {
      setInput((prev) => {
        let checker = prev.toString();
        let lastChar = checker.slice(-1);
        if (
          calculationSigns.includes(lastChar) &&
          calculationSigns.includes(value)
        ) {
          return Number(checker) + "" + value + "";
        } else if (calculationSigns.includes(value)) {
          return prev + "" + value + "";
        } else {
          return prev + value;
          //??? will it work with no paras?
        }
      });
    }
    setResult(input); //check if it updates with every input!
  };

  const backSpace = () => {
    setInput((prev) => {
      let str = prev.toString();
      let str2 = str.slice(0, -1);
      return str === "" ? "" : Number(str);
    });
  };

  const clearResult = () => {
    setInput("");
    setResult("");
  };

  const calculate = () => {
    try {
      setResult(eval(input));
      setInput(""); //check if it updates with the last result!
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="mb-4">
          <div
            ref={scrollableRef}
            className="text-right w-full h-20 overflow-auto scr text-xl mt-2"
          >
            {result}
          </div>
          <input
            type="text"
            className="w-full p-2 text-right text-2xl border border-gray-300 rounded"
            value={input}
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            className="p-4 bg-black text-white hover:bg-gray-800 rounded text-lg md:text-xl lg:text-2xl"
            onClick={clearResult}
          >
            AC
          </button>
          <button
            className="p-4 bg-darkapricot text-white hover:bg-apricot rounded text-lg md:text-xl lg:text-2xl"
            onClick={backSpace}
          >
            Del
          </button>
          <button
            key={"+/-"}
            className="p-4 bg-apricot hover:bg-gray-300 rounded text-lg md:text-xl lg:text-2xl"
            onClick={() => setResult(result * -1)}
          >
            +/-
          </button>
          <button
            key={"/"}
            className="p-4 bg-apricot hover:bg-gray-300 rounded text-lg md:text-xl lg:text-2xl"
            onClick={() => handleClick("/")}
          >
            /
          </button>
          {["7", "8", "9", "*"].map((value) => (
            <button
              key={value}
              className={`p-4
              ${value === "*" ? "bg-apricot" : "bg-gray-200"}
               hover:bg-gray-300 rounded text-lg md:text-xl lg:text-2xl`}
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          {["4", "5", "6", "-"].map((value) => (
            <button
              key={value}
              className={`p-4
                ${value === "-" ? "bg-apricot" : "bg-gray-200"}
                 hover:bg-gray-300 rounded text-lg md:text-xl lg:text-2xl`}
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          {["1", "2", "3", "+"].map((value) => (
            <button
              key={value}
              className={`p-4
                ${value === "+" ? "bg-apricot" : "bg-gray-200"}
                 hover:bg-gray-300 rounded text-lg md:text-xl lg:text-2xl`}
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          {[".", "0", "="].map((value) => (
            <button
              key={value}
              className={`p-4 ${
                value === "="
                  ? "bg-darkapricot text-white col-span-2"
                  : value === "."
                  ? "bg-gray-200 hover:bg-gray-300 font-bold"
                  : "bg-gray-200 hover:bg-gray-300"
              } rounded text-lg md:text-xl lg:text-2xl`}
              onClick={() => (value === "=" ? calculate() : handleClick(value))}
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
