import Header from "./Components/Header";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import { TabsSecLarge, TabsSecMedium, TabsSecSmall } from "./Components/Tabs";

export default function App() {
  const isSmall = useMediaQuery({ query: "(max-width: 799px)" });
  const isMedium = useMediaQuery({
    query: "(min-width: 800px) and (max-width: 1199px )",
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

{
  /* <div className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-12 gap-3 border border-black m-4">
      <div className="bg-light-green-100 col-span-2 text-center p-2 border border-black">
            1
          </div>
          <div className="bg-light-green-500 text-center p-2 border border-black">
            11
          </div>
          <div className="bg-light-green-600 col-start-1 col-end-4 text-center p-2 border border-black">
            12
          </div>
      </div>*/
}
