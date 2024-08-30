import { useContext, useState } from "react";
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
import { FiAlertOctagon, FiChevronDown, FiChevronRight } from "react-icons/fi";
import AuthContext from "../contexts/firebaseContext/AuthContext";
import { GrGithub, GrLinkedin, GrMail } from "react-icons/gr";

function Header() {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const userImg = currentUser ? currentUser.photoURL : UserIcon;
  const altDescription = currentUser
    ? currentUser.displayName
    : "emptyUserIcon";
  const menuItems = [
    {
      title: currentUser ? currentUser.displayName : "Profile",
      icon: currentUser ? (
        <img
          src={userImg}
          alt={altDescription}
          className="h-8 w-8 object-cover border border-blue-50 rounded-full cursor-pointer shadow-md"
        />
      ) : (
        <CgProfile className="static text-orange-700 text-lg" />
      ),
      options: currentUser ? <SignOut /> : <SignIn />,
    },
    {
      title: "About",
      icon: (
        <FcAbout
          className={`static text-lg ${currentUser ? "mx-2 my-1.5" : "m-0"}`}
        />
      ),
      options: <AboutSec />,
    },
  ];

  return (
    <header className="relative mt-5 md:mt-6">
      <div className="flex justify-between items-center mb-1 mx-1">
        {/* Logo Img */}
        <img
          src={LogoImg}
          alt="Logo"
          className="h-8 md:h-11 lg:h-10 drop-shadow-[1px_2px_3px_rgba(0,0,0,0.75)]"
        />
        <img
          onClick={openDrawer}
          src={userImg}
          alt={altDescription}
          className="h-8 w-8 md:h-11 md:w-11 object-cover border border-blue-50 rounded-full cursor-pointer shadow-md"
        />
      </div>
      {currentUser ? null : (
        <p className="flex items-center gap-2 text-sm mx-4 p-2 max-w-fit ml-auto bg-red-50 border border-red-400 text-red-500 rounded">
          <i>
            <FiAlertOctagon />
          </i>
          <em>
            Please note that if you don&apos;t sign up or log in, any data will
            be lost when you reload or leave the page.
          </em>
        </p>
      )}

      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 p-4 text-center">
            <Typography
              variant="h5"
              color="blue-gray"
              className="tracking-widest text-darkapricot"
            >
              WizeMoney
            </Typography>
          </div>
          {menuItems.map((el, i) => (
            <div key={el.title}>
              <Accordion
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
                    className="justify-start gap-6 border-b-0 p-3 text-sm font-normal place-items-start"
                  >
                    <ListItemPrefix>{el.icon}</ListItemPrefix>
                    <p className="mr-auto">{el.title}</p>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1 ">
                  <List>
                    <ListItem className="p-0 hover:bg-transparent">
                      {el.options}
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <hr className="my-2 border-blue-gray-50" />
            </div>
          ))}
        </Card>
      </Drawer>
    </header>
  );
}

export default Header;

const SignOut = () => {
  const { logout } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-400 ml-[10%] text-white font-medium text-sm py-1.5 px-20 rounded"
    >
      Sign Out
    </button>
  );
};
const SignIn = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-blue-400 ml-[10%] text-white font-medium text-sm py-1.5 px-10 rounded"
    >
      Sign in with Google
    </button>
  );
};
const AboutSec = () => {
  return (
    <div className="flex gap-6 text-xl mx-auto">
      <a
        href="https://github.com/BlueLK90"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GrGithub className="hover:drop-shadow-lg text-black" />
      </a>
      <a
        href="https://www.linkedin.com/in/nehad-jm"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GrLinkedin className="hover:drop-shadow-lg text-blue-800" />
      </a>
      <a
        href="mailto:nehad.jassim.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GrMail className="hover:drop-shadow-lg text-red-800" />
      </a>
    </div>
  );
};
