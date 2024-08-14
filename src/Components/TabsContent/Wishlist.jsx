/* eslint-disable react/prop-types */
import { useState } from "react";
import { Collapse, Button, Card, CardBody } from "@material-tailwind/react";
import { FiEdit, FiEdit3, FiX } from "react-icons/fi";
import monitor from "../../assets/monitor.jpg";
import { formattedDate, numberWithCommas } from "../../Utils/index";
import AddWindow from "../Other/AddWindow";

const WishCard = ({ element, deleteCard }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <div className="border border-gray-300 bg-gray-100 w-full my-2 rounded-md p-2 shadow-sm">
        <section className="grid" onClick={toggleOpen}>
          <p className="text-xs lg:text-sm text-green-500 pl-1">
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
                    <FiEdit className="static text-darkapricot mx-1 text-base hover:text-green-400" />
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

const Wishlist = () => {
  const [openAdd, setOpenAdd] = useState(false); //state for open/close add screen

  //date formatting
  const dateSubmitted = formattedDate(); //default date

  // main data arr
  const [WishListData, setWishListData] = useState([
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidkeyunt",
      img: "",
      details: "",
      price: "",
      dateAdded: "Aug. 1, 2024",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      img: "",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidkeyunt",
      price: "100000",
      dateAdded: "Aug. 2, 2024",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      img: monitor,
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidkeyunt",
      price: "100000",
      dateAdded: "Aug. 3, 2024",
    },
  ]);

  const [newWish, setNewWish] = useState({
    title: "",
    img: "",
    details: "",
    price: "",
    dateAdded: dateSubmitted,
  }); // sec data state

  const addCard = () => {
    setOpenAdd(!openAdd);
  }; //open/close add screen

  const deleteCard = (i) => {
    const arr = [...WishListData];
    arr.splice(i, 1);
    setWishListData(arr);
  }; //delete card

  const submitbtn = (e, newWish) => {
    e.preventDefault();
    setWishListData([...WishListData, newWish]);
    setNewWish({
      title: "",
      img: "",
      details: "",
      price: "",
      dateAdded: dateSubmitted,
    });
    setOpenAdd(false);
  }; //submit form

  const fields = ["Title", "Price", "Details", "Image"];

  return (
    <div className="relative">
      {/* Add new data window */}
      {openAdd && (
        <AddWindow
          newItem={newWish}
          setNewItem={setNewWish}
          submitbtn={submitbtn}
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
      {WishListData.map((el, i) => (
        <WishCard element={el} key={i} deleteCard={() => deleteCard(i)} />
      ))}
      <br />
    </div>
  );
};

export default Wishlist;

//date input
/*  date input
  <label htmlFor="dateAdded" className="text-gray-900">
    Date:
  </label>
  <input
    type="date"
    name="date"
    className={inputStyle}
    defaultValue={dateSubmitted}
    value={newWish.dateAdded}
    onChange={(e) =>
      setNewWish({
        ...newWish,
        dateAdded: setDateSubmitted(e.target.value),
      })
    }
  />*/

//for pending and done ... upgrading stage
/*import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";*/
{
  /* <Tabs value="Pending" className="">
<div>
  <TabsHeader className="bg-gray-300 w-64">
    <Tab key={"Pending"} value="Pending">
      Pending
    </Tab>
    <Tab key={"Done"} value="Done">
      Done
    </Tab>
  </TabsHeader>
</div>
<div>
  <TabsBody className="border border-red-100">
    <TabPanel key={"Pending"} value="Pending">
      <div
        onClick={toggleOpen}
        className="border border-gray-400 bg-gray-100 w-full rounded-md p-2"
      >
        Wish No.1
        <Collapse open={open}>
          <Card className="w-full rounded-tl-none rounded-tr-none">
            <CardBody className="p-2 rounded-tl-none">
              <div>
                Use our Tailwind CSS collapse for your website. You can
                use if for accordion, collapsible items and much more
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <br />
      <div className="grid justify-center">
        <Button className="flex gap-2 bg-transparent shadow-none hover:shadow-sm capitalize text-darkapricot text-sm">
          <FiEdit3 className="static" />
          add new wish
        </Button>
      </div>
    </TabPanel>
    <TabPanel key={"Done"} value="Done">
      Done
    </TabPanel>
  </TabsBody>
</div>
</Tabs> */
}
