import "./App.css";
import Header from "./Components/Header";
import { useMediaQuery } from "react-responsive";
import { TabsSecLarge, TabsSecMedium, TabsSecSmall } from "./Components/Tabs";
import DataContextProvider from "./contexts/dataContext/DataContextProvider";

export default function App() {
  const isSmall = useMediaQuery({ query: "(max-width: 749px)" });
  const isMedium = useMediaQuery({
    query: "(min-width: 750px) and (max-width: 1199px )",
  });

  return (
    <div className="grid justify-center gap-2 min-h-[100vh] px-5">
      <Header />
      <DataContextProvider>
        {isSmall ? (
          <TabsSecSmall />
        ) : isMedium ? (
          <TabsSecMedium />
        ) : (
          <TabsSecLarge />
        )}
      </DataContextProvider>
    </div>
  );
}
