import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app, db } from "../../Firebase"; // Ensure you import your Firebase app
import { FirestoreContext } from "./FirestoreContext";

//export const useFirestore = () => useContext(FirestoreContext);

// eslint-disable-next-line react/prop-types
export function FirestoreProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [budget, setBudget] = useState(null);

  const db = getFirestore(app);

  // Fetch all data from Firestore on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsSnapshot = await getDocs(
          collection(db, "transactions")
        );
        const wishListSnapshot = await getDocs(collection(db, "wishList"));
        const budgetDoc = await getDocs(collection(db, "budget"));

        setTransactions(
          transactionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setWishList(
          wishListSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setBudget(budgetDoc.docs[0]?.data() || null);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [db]);

  const addTransaction = async (newTransaction) => {
    try {
      const docRef = await addDoc(
        collection(db, "transactions"),
        newTransaction
      );
      setTransactions([...transactions, { id: docRef.id, ...newTransaction }]);
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  const addWishListItem = async (newWishListItem) => {
    try {
      const docRef = await addDoc(collection(db, "wishList"), newWishListItem);
      setWishList([...wishList, { id: docRef.id, ...newWishListItem }]);
    } catch (error) {
      console.error("Error adding wish list item: ", error);
    }
  };

  const updateWishListItem = async (id, updatedWishListItem) => {
    try {
      const docRef = doc(db, "wishList", id);
      await updateDoc(docRef, updatedWishListItem);
      setWishList(
        wishList.map((item) =>
          item.id === id ? { ...item, ...updatedWishListItem } : item
        )
      );
    } catch (error) {
      console.error("Error updating wish list item: ", error);
    }
  };

  const deleteWishListItem = async (id) => {
    try {
      await deleteDoc(doc(db, "wishList", id));
      setWishList(wishList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting wish list item: ", error);
    }
  };

  const updateBudget = async (newBudget) => {
    try {
      const docRef = doc(db, "budget", "budgetId");
      await updateDoc(docRef, newBudget);
      setBudget(newBudget);
    } catch (error) {
      console.error("Error updating budget: ", error);
    }
  };

  const FirestoreValues = {
    transactions,
    wishList,
    budget,
    addTransaction,
    addWishListItem,
    updateWishListItem,
    deleteWishListItem,
    updateBudget,
  };

  return (
    <FirestoreContext.Provider value={FirestoreValues}>
      {children}
    </FirestoreContext.Provider>
  );
}
//import { collection, onSnapshot } from "firebase/firestore";

//   useEffect(() => {
//     const unsubscribeTransactions = onSnapshot(collection(db, "transactions"), (snapshot) => {
//       setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });

//     const unsubscribeWishList = onSnapshot(collection(db, "wishList"), (snapshot) => {
//       setWishList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });

//     const unsubscribeBudget = onSnapshot(doc(db, "budget", "budgetId"), (doc) => {
//       setBudget(doc.data());
//     });

//     return () => {
//       unsubscribeTransactions();
//       unsubscribeWishList();
//       unsubscribeBudget();
//     };
//   }, []);
