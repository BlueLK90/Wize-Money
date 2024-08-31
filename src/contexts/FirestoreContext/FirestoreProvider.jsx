import { useEffect, useMemo, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { app, db } from "../../Firebase"; // Ensure you import your Firebase app
import { FirestoreContext } from "./FirestoreContext";

//export const useFirestore = () => useContext(FirestoreContext);

// eslint-disable-next-line react/prop-types
export function FirestoreProvider({ children }) {
  const [fsData, setFsData] = useState([null]);
  //   const [transactions, setTransactions] = useState([]);
  //   const [wishList, setWishList] = useState([]);
  //   const [budget, setBudget] = useState({
  //     budgetAmount: 0,
  //     remaining: 0,
  //     dateStart: "",
  //     dateEnd: "",
  //   });

  // Fetch all data from Firestore on component mount
  const FetchData = (docId) => {
    const docRef = doc(db, "userData", docId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setFsData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });

    return unsubscribe; // return the unsubscribe function to stop listening when the component unmounts
  };

  const fsAddTransaction = async (docId, month, transaction) => {
    try {
      const docRef = doc(db, "userData", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Document exists, update the transaction data
        const currentData = docSnap.data();
        const updatedTransactions = currentData.transactionData?.[month] || [];
        updatedTransactions.push(transaction);

        await updateDoc(docRef, {
          [`transactionData.${month}`]: updatedTransactions,
        });
        console.log("Transaction added successfully.");
      } else {
        // Document does not exist, create it with the transaction data
        const newTransactionData = {
          transactionData: {
            [month]: [transaction],
          },
        };

        await setDoc(docRef, newTransactionData);
        console.log("Document created and transaction added successfully.");
      }
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  const fsAddBudget = async (docId, budgetData) => {
    const docRef = doc(db, "userData", docId);
    await updateDoc(docRef, {
      budgetData,
    });
  };

  // Add a new wish card
  const fsAddWishcard = async (docId, wishCard) => {
    const docRef = doc(db, "userData", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentData = docSnap.data();
      const updatedWishList = currentData.wishList || [];
      updatedWishList.push(wishCard);
      await updateDoc(docRef, {
        wishList: updatedWishList,
      });
    }
  };

  // Edit an existing wish card
  const fsEditWishcard = async (docId, index, updatedWishCard) => {
    const docRef = doc(db, "userData", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentData = docSnap.data();
      const updatedWishList = currentData.wishList || [];
      updatedWishList[index] = updatedWishCard;
      await updateDoc(docRef, {
        wishList: updatedWishList,
      });
    }
  };

  // Delete an existing wish card
  const fsDeleteWishcard = async (docId, index) => {
    const docRef = doc(db, "userData", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentData = docSnap.data();
      const updatedWishList = currentData.wishList || [];
      updatedWishList.splice(index, 1);
      await updateDoc(docRef, {
        wishList: updatedWishList,
      });
    }
  };

  // Calculate total income
  const fsTotalIncome = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      return transaction.amount > 0 ? acc + transaction.amount : acc;
    }, 0);
  };

  // Calculate total expenses
  const fsTotalExpense = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      return transaction.amount < 0 ? acc + transaction.amount : acc;
    }, 0);
  };

  const FirestoreValues = {
    fsData,
    FetchData,
    fsAddTransaction,
    fsAddBudget,
    fsAddWishcard,
    fsEditWishcard,
    fsDeleteWishcard,
    fsTotalIncome,
    fsTotalExpense,
  };

  return (
    <FirestoreContext.Provider value={FirestoreValues}>
      {children}
    </FirestoreContext.Provider>
  );
}

// const addTransaction = async (newTransaction, monthYear) => {
//     try {
//       // Add the transaction to Firestore and get the document reference
//       const transactionsRef = collection(db, "transactions");
//       const docRef = await addDoc(transactionsRef, newTransaction);

//       // Include the Firestore document ID with the transaction data
//       const transactionWithId = { id: docRef.id, ...newTransaction };

//       // Update the transactions state, grouping by monthYear
//       setTransactions((prevTransactions) => ({
//         ...prevTransactions,
//         [monthYear]: [
//           transactionWithId,
//           ...(prevTransactions[monthYear] || []),
//         ],
//       }));
//       console.log("Transaction added to local state for monthYear:", monthYear);
//     } catch (error) {
//       console.error("Error adding transaction: ", error);
//     }
//   };
//   const updateBudget = async (newBudget) => {
//     try {
//       const docRef = doc(db, "budget", "budgetId");
//       await setDoc(docRef, newBudget);
//       setBudget(newBudget);
//     } catch (error) {
//       console.error("Error updating budget: ", error);
//     }
//   };
//   const addWishListItem = async (newWishListItem) => {
//     try {
//       const docRef = await addDoc(collection(db, "wishList"), newWishListItem);
//       setWishList([...wishList, { id: docRef.id, ...newWishListItem }]);
//     } catch (error) {
//       console.error("Error adding wish list item: ", error);
//     }
//   };

//   const updateWishListItem = async (id, updatedWishListItem) => {
//     try {
//       const docRef = doc(db, "wishList", id);
//       await updateDoc(docRef, updatedWishListItem);
//       setWishList(
//         wishList.map((item) =>
//           item.id === id ? { ...item, ...updatedWishListItem } : item
//         )
//       );
//     } catch (error) {
//       console.error("Error updating wish list item: ", error);
//     }
//   };

//   const deleteWishListItem = async (id) => {
//     try {
//       await deleteDoc(doc(db, "wishList", id));
//       setWishList(wishList.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error("Error deleting wish list item: ", error);
//     }
//   };

//   const fsTotalExpenses = useMemo(() => {
//     return transactions
//       .filter((transaction) => transaction.amount < 0)
//       .reduce(
//         (total, transaction) => total + parseFloat(transaction.amount),
//         0
//       );
//   }, [transactions]);

//   const fsTotalIncome = useMemo(() => {
//     return transactions
//       .filter((transaction) => transaction.amount > 0)
//       .reduce(
//         (total, transaction) => total + parseFloat(transaction.amount),
//         0
//       );
//   }, [transactions]);

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
