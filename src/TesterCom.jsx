/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Collapse, Button, Card, CardBody } from "@material-tailwind/react";
import { FiEdit, FiEdit3, FiX } from "react-icons/fi";
import DataContext from "./contexts/dataContext/DataContext";
import { formattedDate, numberWithCommas } from "./Utils/index";
import AddWindow from "./Components/Other/AddWindow";

const WishCard = ({ element, deleteCard, editCard }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <div className="border border-gray-300 bg-gray-100 w-full my-2 rounded-md p-2 shadow-sm">
        <section className="grid" onClick={toggleOpen}>
          <p className="text-xs lg:text-sm text-green-600 pl-1">
            {element.dateAdded}
          </p>
          <div className="flex items-center gap-2 px-2">
            <p
              className={`flex-1 text-gray-900 text-sm lg:text-base ${
                element.img ? "py-0" : "py-2"
              }`}
            >
              {element.title}
            </p>
            {element.img && (
              <div className="flex-1">
                <img
                  src={element.img}
                  alt={element.title}
                  className="w-[75%] object-cover aspect-[4/3] p-3 ml-auto"
                />
              </div>
            )}
          </div>
          {element.price && (
            <p className="text-xs lg:text-sm text-darkapricot pt-1 pl-1">
              {numberWithCommas(element.price)} IQD
            </p>
          )}
        </section>

        <Collapse open={open} onClick={() => setOpen(true)}>
          <Card>
            <CardBody className="text-sm text-gray-900 bg-gray-100 px-1 py-0">
              {element.details ? (
                <div className="py-3 px-1">
                  <strong>Details: </strong>
                  {element.details}
                </div>
              ) : null}
              <div className="flex">
                <div className="ml-auto">
                  <button>
                    <FiEdit
                      onClick={editCard}
                      className="static text-darkapricot mx-1 text-base hover:text-green-400"
                    />
                  </button>
                  <button>
                    <FiX
                      onClick={deleteCard}
                      className="static text-darkapricot mx-1 text-base hover:text-green-400"
                    />
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </div>
  );
};

const TesterComponent = () => {
  const { data, addDataWishList, deleteWishCard } = useContext(DataContext);
  const [openAdd, setOpenAdd] = useState(false); //state for open/close add screen
  const [editIndex, setEditIndex] = useState(null); //edit item index

  //date formatting
  const { fullDate } = formattedDate();
  const dateSubmitted = fullDate; //default date

  const [newWish, setNewWish] = useState({
    title: "",
    img: "",
    details: "",
    price: "",
    dateAdded: dateSubmitted,
  }); // sec data state

  const addCard = () => {
    setOpenAdd(!openAdd);
    setNewWish({
      title: "",
      img: "",
      details: "",
      price: "",
      dateAdded: dateSubmitted,
    });
  }; //open/close add screen

  const deleteCard = (i) => {
    deleteWishCard(i);
  }; //delete card

  const editCard = (i) => {
    setOpenAdd(true);
    setNewWish(data.wishList[i]);
    setEditIndex(i);
  };

  const submitbtn = (e, newWish, editIndex) => {
    e.preventDefault();
    addDataWishList(newWish, editIndex);
    setNewWish({
      title: "",
      img: "",
      details: "",
      price: "",
      dateAdded: dateSubmitted,
    });
    setOpenAdd(false);
    setEditIndex(null);
  }; //submit form

  const fields = ["Title", "Price", "Details", "Image"];

  return (
    <div className="relative min-h-[70dvh]">
      {/* Add new data window */}
      {openAdd && (
        <AddWindow
          newItem={newWish}
          setNewItem={setNewWish}
          submitbtn={(e) => submitbtn(e, newWish, editIndex)}
          open={addCard}
          items={fields}
        />
      )}
      {/* Add new data btn */}
      <Button
        onClick={() => addCard()}
        className={`flex ml-auto mr-2 p-0 gap-2 bg-transparent shadow-none hover:text-green-400 hover:shadow-none hover:underline hover:underline-offset-4 capitalize text-darkapricot text-sm ${
          openAdd && "opacity-0"
        }`}
      >
        <FiEdit3 className="static" />
        add new wish
      </Button>

      {/* main list */}
      {data.wishList.map((el, i) => (
        <WishCard
          element={el}
          key={i}
          deleteCard={() => deleteCard(i)}
          editCard={() => editCard(i)}
        />
      ))}
      <br />
    </div>
  );
};

export default TesterComponent;
