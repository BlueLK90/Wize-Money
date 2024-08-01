import { useEffect, useRef, useState } from "react";

const Calculator = () => {
  const scrollableRef = useRef(null);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    <div
      ref={scrollableRef}
      className="w-96 h-48 overflow-auto border border-gray-300 p-2"
    >
      <p>Content that overflows and will be scrollable.</p>
      <p>Additional content to demonstrate scrolling...</p>
      <p>Even more content...</p>
      <p>Scroll to the bottom...</p>
      <p>Last section to be visible.1</p>
      <p>Scroll to the bottom...</p>
      <p>Last section to be visible.2</p>
      <p>Scroll to the bottom...</p>
      <p>Last section to be visible.3</p>
    </div>
  );
};

export default Calculator;

const Apptwo = () => {
  const [input, setInput] = useState(0);
  const [result, setResult] = useState(0);

  const calculationSigns = ["+", "-", "*", "/"];
  const handleClick = (value) => {
    setInput((prev) => {
      let checker = prev.toString();
      let lastChar = checker.slice(-1);
      if (
        calculationSigns.includes(lastChar) &&
        calculationSigns.includes(value)
      ) {
        return Number(checker), "", value, "";
      } else if (calculationSigns.includes(value)) {
        return prev, "", value, "";
      } else {
        return prev, value;
        //??? will it work with no paras?
      }
    });
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
    setInput(0);
    setResult(0);
  };

  const calculate = () => {
    try {
      setResult(eval(input));
      setInput(result); //check if it updates with the last result!
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="mb-4">
          <div className="text-right w-full h-20 scr text-xl mt-2">
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
          {["7", "8", "9", "/"].map((value) => (
            <button
              key={value}
              className="p-4 bg-gray-200 hover:bg-gray-300 rounded text-lg md:text-xl lg:text-2xl"
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          {["4", "5", "6", "*"].map((value) => (
            <button
              key={value}
              className="p-4 bg-gray-200 hover:bg-gray-300 rounded text-lg md:text-xl lg:text-2xl"
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          {["1", "2", "3", "-"].map((value) => (
            <button
              key={value}
              className="p-4 bg-gray-200 hover:bg-gray-300 rounded text-lg md:text-xl lg:text-2xl"
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
          {["0", ".", "=", "+"].map((value) => (
            <button
              key={value}
              className={`p-4 ${
                value === "="
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } rounded text-lg md:text-xl lg:text-2xl`}
              onClick={() => (value === "=" ? calculate() : handleClick(value))}
            >
              {value}
            </button>
          ))}
          <button
            className="col-span-2 p-4 bg-red-500 text-white hover:bg-red-600 rounded text-lg md:text-xl lg:text-2xl"
            onClick={clearResult}
          >
            C
          </button>
          <button
            className="col-span-2 p-4 bg-yellow-500 text-white hover:bg-yellow-600 rounded text-lg md:text-xl lg:text-2xl"
            onClick={backSpace}
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
};
