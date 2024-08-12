import Header from "./Components/Header";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import { TabsSecLarge, TabsSecMedium, TabsSecSmall } from "./Components/Tabs";

export default function App() {
  const isSmall = useMediaQuery({ query: "(max-width: 749px)" });
  const isMedium = useMediaQuery({
    query: "(min-width: 750px) and (max-width: 1199px )",
  });

  return (
    <div className="grid justify-center gap-2 min-h-dvh px-5">
      <Header />
      {isSmall ? (
        <TabsSecSmall />
      ) : isMedium ? (
        <TabsSecMedium />
      ) : (
        <TabsSecLarge />
      )}
    </div>
  );
}
