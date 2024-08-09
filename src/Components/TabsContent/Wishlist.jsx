/* eslint-disable react/prop-types */
import { useState } from "react";
import { Collapse, Button, Card, CardBody } from "@material-tailwind/react";
import { FiEdit, FiEdit3, FiX } from "react-icons/fi";
import monitor from "../../assets/monitor.jpg";
import { numberWithCommas } from "../../Utils/index";

const WishListData = [
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    img: "",
    details: "",
    price: "",
    dateAdded: "Aug. 1, 2024",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    img: "",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    price: "100000",
    dateAdded: "Aug. 2, 2024",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    img: monitor,
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    price: "100000",
    dateAdded: "Aug. 3, 2024",
  },
];

const WishCard = ({ element }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  return (
    <div>
      <div
        onClick={toggleOpen}
        className="border border-gray-200 bg-gray-100 w-full my-2 rounded-md p-2 shadow-md"
      >
        <section className="grid">
          <p className="text-xs">{element.dateAdded}</p>
          <div className="flex items-center gap-2 px-2">
            <p
              className={`flex-1 text-gray-900 text-sm ${
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
                  className="w-[75%] object-cover p-3 ml-auto"
                />
              </div>
            )}
          </div>
          {element.price && (
            <p className="text-xs pt-1">
              {numberWithCommas(element.price)} IQD
            </p>
          )}
        </section>

        <Collapse open={open}>
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
                    <FiEdit className="static text-darkapricot mx-1 text-lg hover:text-green-400" />
                  </button>
                  <button>
                    <FiX className="static text-darkapricot mx-1 text-lg hover:text-green-400" />
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
  //const [imageLoader, setLoader] = useState(null);
  //const [error, setError] = useState(null);

  return (
    <div className="max-w-[450px]">
      <Button className="flex ml-auto mr-2 p-0 gap-2 bg-transparent shadow-none hover:text-green-400 hover:shadow-none hover:underline hover:underline-offset-4 capitalize text-darkapricot text-sm">
        <FiEdit3 className="static" />
        add new wish
      </Button>

      {WishListData.map((el, i) => (
        <WishCard element={el} key={i} />
      ))}
      <br />
    </div>
  );
};

export default Wishlist;

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
