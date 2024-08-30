import "./App.css";
import Header from "./Components/Header";
import { useMediaQuery } from "react-responsive";
import { TabsSecLarge, TabsSecMedium, TabsSecSmall } from "./Components/Tabs";
import DataContextProvider from "./contexts/dataContext/DataContextProvider";
import { AuthProvider } from "./contexts/firebaseContext/AuthContextProvider";
import { FirestoreProvider } from "./contexts/FirestoreContext/FirestoreProvider";

export default function App() {
  const isSmall = useMediaQuery({ query: "(max-width: 749px)" });
  const isMedium = useMediaQuery({
    query: "(min-width: 750px) and (max-width: 1199px )",
  });

  return (
    <AuthProvider>
      <FirestoreProvider>
        <DataContextProvider>
          <div className="grid justify-center gap-2 min-h-[100vh] px-5">
            <Header />
            {isSmall ? (
              <TabsSecSmall />
            ) : isMedium ? (
              <TabsSecMedium />
            ) : (
              <TabsSecLarge />
            )}
          </div>
        </DataContextProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}
