import Wishlist from "./TabsContent/Wishlist";
import CalendarComponent from "./TabsContent/Calendar";
import Calculator from "./TabsContent/Calculator";
import { useContext, useState } from "react";
import { Budget, Wallet } from "./TabsContent/Budget-and-Wallet";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DataContext from "../contexts/dataContext/DataContext";
//import { FirestoreContext } from "../contexts/FirestoreContext/FirestoreContext";
//import AuthContext from "../contexts/firebaseContext/AuthContext";

export const TabsSecLarge = () => {
  const { data } = useContext(DataContext);
  const [activeTabOne, setActiveTabOne] = useState(
    data.budgetData.budgetAmount != null || data.budgetData.budgetAmount <= 0
      ? "Wallet"
      : "Budget"
  );
  const [activeTabTwo, setActiveTabTwo] = useState("Wishlist");
  const tabs = [
    { id: 1, value: "Budget", content: <Budget screenSize="isLarge" /> },
    { id: 2, value: "Wallet", content: <Wallet screenSize="isLarge" /> },
    { id: 3, value: "Wishlist", content: <Wishlist /> },
    { id: 4, value: "Calendar", content: <CalendarComponent /> },
    { id: 5, value: "Calculator", content: <Calculator /> },
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      <Tabs
        value={activeTabOne}
        className="bg-white-0 col-span-2 w-[64vw] max-w-[78rem] min-h-[85dvh] p-2 rounded-lg mb-2"
      >
        <TabsHeader
          className="rounded-none border-b bg-transparent p-0 ml-2"
          indicatorProps={{
            className:
              "text-white bg-transparent border-b-2 border-darkapricot shadow-none rounded-none",
          }}
        >
          {tabs.map((el, i) => {
            if (i < 2) {
              return (
                <Tab
                  className={
                    activeTabOne === el.value
                      ? "w-[15vw] max-w-44 text-darkapricot text-md lg:text-lg font-semibold rounded-t-md py-2.5 "
                      : "w-[15vw] max-w-44 text-gray-500 text-md lg:text-lg py-2.5 px-1 "
                  }
                  key={el.id}
                  value={el.value}
                  onClick={() => setActiveTabOne(el.value)}
                >
                  {el.value}
                </Tab>
              );
            }
          })}
        </TabsHeader>
        <TabsBody className="pt-4">
          {tabs.map((el, i) => {
            if (i < 2) {
              return (
                <TabPanel key={el.id} value={el.value}>
                  {el.content}
                </TabPanel>
              );
            }
          })}
        </TabsBody>
      </Tabs>
      {/* ---------------- */}
      {/* ---------------- */}
      <Tabs
        value={activeTabTwo}
        className="bg-white-0 w-[32vw] max-w-[38rem] min-h-[85dvh] p-2 rounded-lg mb-2"
      >
        <TabsHeader
          className="rounded-none border-b bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-darkapricot shadow-none rounded-none",
          }}
        >
          {tabs.map((el, i) => {
            if (i > 1) {
              return (
                <Tab
                  className={
                    activeTabTwo === el.value
                      ? "text-darkapricot text-base lg:text-lg font-semibold rounded-t-md py-2.5"
                      : "text-gray-500 text-base lg:text-lg py-2.5 px-1"
                  }
                  key={el.id}
                  value={el.value}
                  onClick={() => setActiveTabTwo(el.value)}
                >
                  {el.value}
                </Tab>
              );
            }
          })}
        </TabsHeader>
        <TabsBody className="pt-4">
          {tabs.map((el, i) => {
            if (i > 1) {
              return (
                <TabPanel key={el.id} value={el.value}>
                  {el.content}
                </TabPanel>
              );
            }
          })}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export const TabsSecMedium = () => {
  const { data } = useContext(DataContext);
  const [activeTabOne, setActiveTabOne] = useState(
    data.budgetData.budgetAmount != null || data.budgetData.budgetAmount <= 0
      ? "Wallet"
      : "Budget"
  );
  const [activeTabTwo, setActiveTabTwo] = useState("Wishlist");
  const tabs = [
    { id: 1, value: "Budget", content: <Budget screenSize="isMedium" /> },
    { id: 2, value: "Wallet", content: <Wallet screenSize="isMedium" /> },
    { id: 3, value: "Wishlist", content: <Wishlist /> },
    { id: 4, value: "Calendar", content: <CalendarComponent /> },
    { id: 5, value: "Calculator", content: <Calculator /> },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      <Tabs
        value={activeTabOne}
        className="bg-white-0 w-[47vw] max-w-[550px] min-h-[85dvh] p-2 rounded-lg mb-2"
      >
        <TabsHeader
          className="rounded-none border-b bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-darkapricot shadow-none rounded-none",
          }}
        >
          {tabs.map((el, i) => {
            if (i < 2) {
              return (
                <Tab
                  className={
                    activeTabOne === el.value
                      ? "text-darkapricot text-base lg:text-lg font-semibold rounded-t-md py-2.5 lg:py-3.5"
                      : "text-gray-500 text-base lg:text-lg py-2.5 px-1 lg:py-3.5"
                  }
                  key={el.id}
                  value={el.value}
                  onClick={() => setActiveTabOne(el.value)}
                >
                  {el.value}
                </Tab>
              );
            }
          })}
        </TabsHeader>
        <TabsBody>
          {tabs.map((el, i) => {
            if (i < 2) {
              return (
                <TabPanel key={el.id} value={el.value}>
                  {el.content}
                </TabPanel>
              );
            }
          })}
        </TabsBody>
      </Tabs>
      {/* ---------------- */}
      {/* ---------------- */}
      <Tabs
        value={activeTabTwo}
        className="bg-white-0 w-[47vw] max-w-[550px] min-h-[85dvh] p-2 rounded-lg mb-2"
      >
        <TabsHeader
          className="rounded-none border-b bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-darkapricot shadow-none rounded-none",
          }}
        >
          {tabs.map((el, i) => {
            if (i > 1) {
              return (
                <Tab
                  className={
                    activeTabTwo === el.value
                      ? "text-darkapricot text-base lg:text-lg font-semibold rounded-t-md py-2.5 lg:py-3.5"
                      : "text-gray-500 text-base lg:text-lg py-2.5 px-1 lg:py-3.5"
                  }
                  key={el.id}
                  value={el.value}
                  onClick={() => setActiveTabTwo(el.value)}
                >
                  {el.value}
                </Tab>
              );
            }
          })}
        </TabsHeader>
        <TabsBody>
          {tabs.map((el, i) => {
            if (i > 1) {
              return (
                <TabPanel key={el.id} value={el.value}>
                  {el.content}
                </TabPanel>
              );
            }
          })}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export const TabsSecSmall = () => {
  const { data } = useContext(DataContext);
  // const { currentUser } = useContext(AuthContext);
  // const { budget } = useContext(FirestoreContext);
  // const BAmount = currentUser
  //   ? budget.budgetAmount
  //   : data.budgetData.budgetAmount;
  const [activeTab, setActiveTab] = useState(
    data.budgetData.budgetAmount != null || data.budgetData.budgetAmount <= 0
      ? "Wallet"
      : "Budget"
  );
  const tabs = [
    { id: 1, value: "Budget", content: <Budget screenSize="isSmall" /> },
    { id: 2, value: "Wallet", content: <Wallet screenSize="isSmall" /> },
    { id: 3, value: "Wishlist", content: <Wishlist /> },
    { id: 4, value: "Calendar", content: <CalendarComponent /> },
    { id: 5, value: "Calculator", content: <Calculator /> },
  ];
  return (
    <Tabs
      value={activeTab}
      className="bg-white-0 w-[94vw] max-w-[500px] min-h-[85dvh] p-2 rounded-lg mb-2"
    >
      <TabsHeader
        className="rounded-none border-b bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-darkapricot shadow-none rounded-none",
        }}
      >
        {tabs.map((el) => {
          return (
            <Tab
              className={
                activeTab === el.value
                  ? "text-darkapricot text-xs sm:text-sm md:text-base font-semibold rounded-t-md py-1.5"
                  : "text-gray-500 py-2 px-1 text-xs sm:text-sm md:text-base"
              }
              key={el.id}
              value={el.value}
              onClick={() => setActiveTab(el.value)}
            >
              {el.value}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody>
        {tabs.map((el) => {
          return (
            <TabPanel key={el.id} value={el.value}>
              {el.content}
            </TabPanel>
          );
        })}
      </TabsBody>
    </Tabs>
  );
};
