/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { FaCar, FaLaughBeam } from "react-icons/fa";
import { GiMedicalPack } from "react-icons/gi";
import { IoGiftSharp, IoHome } from "react-icons/io5";
import {
  MdCategory,
  MdChildCare,
  MdFaceRetouchingNatural,
  MdPets,
  MdPhoneAndroid,
  MdRestaurant,
  MdSportsBasketball,
  MdWork,
} from "react-icons/md";
import { PiPottedPlantFill } from "react-icons/pi";
import { formattedDate } from "../../Utils";

const categoryIcons = [
  { value: "home", icon: <IoHome /> },
  { value: "work", icon: <MdWork /> },
  { value: "pets", icon: <MdPets /> },
  { value: "car", icon: <FaCar /> },
  { value: "phone", icon: <MdPhoneAndroid /> },
  { value: "food", icon: <MdRestaurant /> },
  { value: "health", icon: <GiMedicalPack /> },
  { value: "fun", icon: <FaLaughBeam /> },
  { value: "selfcare", icon: <MdFaceRetouchingNatural /> },
  { value: "sports", icon: <MdSportsBasketball /> },
  { value: "kids", icon: <MdChildCare /> },
  { value: "gifts", icon: <IoGiftSharp /> },
  { value: "plants", icon: <PiPottedPlantFill /> },
  { value: "others", icon: <MdCategory /> },
];
const inputStyle =
  "col-span-2 bg-blue-gray-50 rounded-md px-3 py-1 outline outline-0 focus:outline-0 shadow-sm";

const CategoryInput = ({ setNew }) => {
  const [open, setOpen] = useState(false);
  const [categ, setCateg] = useState("");

  const handleSelect = useCallback(
    (el) => {
      setCateg(el);
      setOpen(false);
      setNew(el);
    },
    [setNew]
  );

  return (
    <div className="relative col-span-2 flex ">
      <input
        type="text"
        id="category"
        name="category"
        placeholder="--Choose a Category--"
        value={categ.value || ""}
        readOnly
        className={`w-full ${inputStyle}`}
        onClick={() => setOpen(!open)}
        required
      />
      {open && (
        <div className="absolute z-30 top-full min-w-[180px] overflow-auto rounded-md border-t-0 border border-deep-orange-50 bg-gray-100 p-3 text-sm shadow-md shadow-blue-gray-500/10">
          <ul className="grid grid-cols-3 gap-x-4 gap-y-1 outline-none outline-0">
            {categoryIcons.map((el) => (
              <div
                key={el.value}
                className="flex flex-col justify-center items-center"
              >
                <button
                  className="relative font-medium text-center transition-all w-10 h-10 rounded-lg text-base bg-blue-500 text-white shadow-none hover:shadow-lg focus:opacity-[0.85] focus:shadow-none"
                  value={el.value}
                  onClick={() => handleSelect(el)}
                >
                  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {el.icon}
                  </span>
                </button>
                <p>{el.value}</p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const AddWindow = ({ newItem, setNewItem, submitbtn, open, items }) => {
  const [amountInput, setAmountInput] = useState("");

  const handleChange = useCallback(
    (e) => {
      if (e.target.name === "dateAdded") {
        setNewItem((prev) => ({
          ...prev,
          dateAdded: formattedDate(e.target.value),
        }));
      } else {
        setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    },
    [setNewItem]
  );

  const handleChangeNumber = useCallback(
    (e, multiplier) => {
      let inputValue = e.target.value;
      setAmountInput(inputValue);
      setNewItem((prev) => ({
        ...prev,
        amount: Number(inputValue) * multiplier,
      }));
    },
    [setNewItem]
  );

  const handleCategoryChange = useCallback(
    (el) => {
      setNewItem((prev) => ({ ...prev, category: el.value, icon: el.icon }));
    },
    [setNewItem]
  );

  const handleSubmit = (e) => {
    submitbtn(e, newItem);
    setAmountInput("");
  };

  const inputFields = {
    Title: (
      <>
        <label htmlFor="title" className="text-gray-900">
          Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className={inputStyle}
          value={newItem.title}
          onChange={handleChange}
          required
        />
      </>
    ),
    Details: (
      <>
        <label htmlFor="details" className="text-gray-900">
          Details:
        </label>
        <textarea
          id="details"
          name="details"
          className={inputStyle}
          value={newItem.details}
          onChange={handleChange}
        />
      </>
    ),
    Price: (
      <>
        <label htmlFor="price" className="text-gray-900">
          Price:
        </label>
        <input
          type="text"
          id="price"
          name="price"
          className={inputStyle}
          value={newItem.price}
          onChange={handleChange}
        />
      </>
    ),
    AmountIn: (
      <>
        <label htmlFor="amount" className="text-gray-900">
          Amount:
        </label>
        <input
          type="number"
          id="amountIn"
          name="amount"
          className={inputStyle}
          value={amountInput}
          onChange={(e) => handleChangeNumber(e, 1)}
          required
        />
      </>
    ),
    AmountOut: (
      <>
        <label htmlFor="amount" className="text-gray-900">
          Amount:
        </label>
        <input
          type="number"
          id="amountOut"
          name="amount"
          className={inputStyle}
          value={amountInput}
          onChange={(e) => handleChangeNumber(e, -1)}
          required
        />
      </>
    ),
    Date: (
      <>
        <label htmlFor="dateAdded" className="text-gray-900">
          Date:
        </label>
        <input
          type="date"
          id="dateAdded"
          name="dateAdded"
          className={inputStyle}
          value={newItem.dateAdded}
          onChange={handleChange}
        />
      </>
    ),
    Category: (
      <>
        <label htmlFor="category" className="text-gray-900">
          Category:
        </label>
        <CategoryInput setNew={handleCategoryChange} />
      </>
    ),
    Image: (
      <>
        <label htmlFor="img" className="text-gray-900">
          Image:
        </label>
        <label className="block">
          <input
            type="file"
            id="img"
            className="block max-w-52 text-gray-500 overflow-hidden text-ellipsis
                py-1 px-0 rounded-lg border-0 
                text-sm file:rounded-lg file:px-2.5 file:py-1.5 file:mr-1 file:sm:px-4
              "
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const imgUrl = URL.createObjectURL(file);
                setNewItem((prev) => ({
                  ...prev,
                  img: imgUrl,
                }));
              }
            }}
          />
        </label>
      </>
    ),
  };

  return (
    <div className="absolute z-10 w-full min-h-[70dvh] border border-gray-200 bg-gray-50 rounded-md p-8 shadow-md">
      <form
        className="grid grid-cols-3 gap-2 items-center"
        onSubmit={handleSubmit}
      >
        {items.map((item) => inputFields[item])}
        <div className="h-16 col-span-3"></div>

        {/* btns div */}
        <div className="col-span-3 h-10 flex justify-center gap-8">
          <button
            type="button"
            className="bg-blue-gray-900 text-sm w-32 rounded-full text-white font-semibold"
            onClick={() => open()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-pale text-sm w-32 rounded-full text-darkapricot font-semibold"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWindow;
