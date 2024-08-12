import { useState } from "react";
import LogoImg from "../assets/LogoImg.png";
import UserIcon from "../assets/UserIcon.png";
import { FcAbout } from "react-icons/fc";
import { LuSettings } from "react-icons/lu";
import { MdOutlineColorLens } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@material-tailwind/react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

function Header() {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const menuItems = [
    {
      title: "Profile",
      icon: <CgProfile className="static text-orange-700 text-lg" />,
      options: "1",
    },
    {
      title: "Theme",
      icon: <MdOutlineColorLens className="static text-orange-700 text-lg" />,
      options: "1",
    },
    {
      title: "Settings",
      icon: <LuSettings className="static text-orange-700 text-lg" />,
      options: "1",
    },
    {
      title: "About",
      icon: <FcAbout className="static text-orange-700 text-lg" />,
      options: "1",
    },
  ];

  return (
    <header className="flex justify-between items-center mt-2 mb-2 sm:mb-4 ">
      <div>
        <img
          src={LogoImg}
          alt="Logo"
          className="h-10 md:h-10 drop-shadow-[1px_2px_3px_rgba(0,0,0,0.75)]"
        />
      </div>
      <img
        onClick={openDrawer}
        src={UserIcon}
        alt="user icon and options"
        className="h-9 w-9 md:h-11 md:w-11 object-cover border-2 border-orange-100 rounded-full cursor-pointer shadow-md"
      />

      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 p-4 text-center">
            <Typography variant="h5" color="blue-gray">
              WizeMoney
            </Typography>
          </div>
          {menuItems.map((el, i) => (
            <>
              <Accordion
                key={el.title}
                open={open === i + 1}
                icon={
                  <FiChevronDown
                    className={`static text-orange-700 text-lg mx-auto h-4 w-4 transition-transform ${
                      open === i + 1 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem
                  className="p-0 text-sm cursor-pointer rounded hover:bg-orange-100"
                  selected={open === i + 1}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(i + 1)}
                    className="justify-start gap-4 border-b-0 p-3 text-sm font-normal place-items-start"
                  >
                    <ListItemPrefix>{el.icon}</ListItemPrefix>
                    {el.title}
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0 pl-10">
                    <ListItem>
                      <ListItemPrefix>
                        <FiChevronRight
                          className="
                          static
                          text-orange-700
                          text-lg"
                        />
                      </ListItemPrefix>
                      {el.options}
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <hr className="my-2 border-blue-gray-50" />
            </>
          ))}
        </Card>
      </Drawer>
    </header>
  );
}

export default Header;

{
  /*<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
  <div className="mb-2 p-4">
    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">WizeMoney</h5>
  </div>
  <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
    <div role="button" tabindex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        <svg  className="h-5 w-5"></svg>
      </div>
      Blocks
    </div>
    <div role="button" tabindex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        <svg  className="h-5 w-5"></svg>
      </div>Books
    </div>
    <div role="button" tabindex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        <svg  className="h-5 w-5"></svg>
      </div>Example Pages
      </div>
    </div>
    <div role="button" tabindex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        <svg  className="h-5 w-5"></svg>
      </div>Profile
    </div>
    <div role="button" tabindex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        <svg  className="h-5 w-5"></svg>
      </div>Settings
    </div>
    <div role="button" tabindex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        <svg  className="h-5 w-5"></svg>
      </div>Log Out
    </div>
  </nav>
</div>
*/
}
