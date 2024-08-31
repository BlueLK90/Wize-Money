/* eslint-disable react/prop-types */
//import { useContext, useState } from "react";
//import DataContext from "./contexts/dataContext/DataContext";

import { useContext, useState, useEffect } from "react";
import AuthContext from "./contexts/firebaseContext/AuthContext";
import { addTransaction, getTransactions } from "./FireStore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  Firestore,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import UserIcon from "./assets/UserIcon.png";
import { FiAlertTriangle } from "react-icons/fi";
import { auth, db } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FirestoreContext } from "./contexts/FirestoreContext/FirestoreContext";

export const TesterCom = () => {
  const { FetchData, fsAddTransaction, fsTotalIncome, fsData } =
    useContext(FirestoreContext);

  useEffect(() => {
    // Replace "uniqueDocumentID" with your document ID
    const unsubscribe = FetchData("uniqueDocumentID");

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, [FetchData]);

  const handleAddTransaction = () => {
    const newTransaction = {
      dateAdded: "2024-08-20",
      amount: 5000,
      title: "New Transaction",
      details: "details here",
      category: "Misc",
      icon: "MdMiscellaneous",
    };
    fsAddTransaction("uniqueDocumentID2", "Aug. 2024", newTransaction);
  };

  const handleCalculateIncome = () => {
    const transactions = fsData?.transactionData["Aug. 2024"] || [];
    const income = fsTotalIncome(transactions);
    console.log("Total Income: ", income);
  };

  return (
    <div>
      <h1 className="text-xl">My Firestore Data</h1>
      <button
        className="p-2 border border-red-400"
        onClick={handleAddTransaction}
      >
        Add Transaction
      </button>
      <button
        className="p-2 border border-red-700"
        onClick={handleCalculateIncome}
      >
        Calculate Income
      </button>
      {/* Add more handlers for other actions */}
      <pre>{JSON.stringify(fsData, null, 2)}</pre>
    </div>
  );
};

// const { currentUser } = useContext(AuthContext);
//   const { budget } = useContext(FirestoreContext);
//   // useEffect(() => {
//   //   if (currentUser) {
//   //     const transactionsRef = collection(
//   //       db,
//   //       "users",
//   //       currentUser.uid,
//   //       "transactions"
//   //     );

//   //     const unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
//   //       const fetchedTransactions = snapshot.docs.map((doc) => ({
//   //         id: doc.id,
//   //         ...doc.data(),
//   //       }));
//   //       console.log("Fetched Transactions:", fetchedTransactions);
//   //       setTransactions(fetchedTransactions);
//   //     });

//   //     // Clean up the listener when the component unmounts
//   //     return () => unsubscribe();
//   //   }
//   // }, [currentUser]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (currentUser) {
//       await addTransaction(currentUser.uid, form);
//       setTransactions((prev) => {
//         transactions(form, ...prev);
//       });
//     } else {
//       onAdd(form);
//     }
//   };
//   const dataList = currentUser ? transactions : transactionsData;
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           placeholder="Title"
//         />
//         <input
//           type="number"
//           value={form.amount}
//           onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
//           placeholder="Amount"
//         />
//         <button type="submit">Add Transaction</button>
//       </form>
//       {dataList.length > 0 ? (
//         transactions.map((transaction, index) => (
//           <div key={index}>
//             <p>
//               {transaction.title}: {transaction.amount}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p>No transactions found</p>
//       )}
//     </>
//   );
// };

// export const TransactionsPage = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [localTransactions, setLocalTransactions] = useState([]);

//   const handleAddTransaction = async (transaction) => {
//     if (currentUser) {
//       // Save to Firestore if user is logged in
//       // db.collection("users")
//       //   .doc(currentUser.uid)
//       //   .collection("transactions")
//       //   .add(transaction)
//       //   .then(() => {
//       //     console.log("Transaction added to Firestore");
//       //   });
//       await addDoc(
//         collection(db, "users", currentUser.uid, "transactions"),
//         transaction
//       );
//     } else {
//       // Save locally if user is not logged in
//       setLocalTransactions((prev) => [...prev, transaction]);
//     }
//   };

//   return (
//     <div>
//       {!currentUser && (
//         <div className="warning-banner">
//           <p>Your data wont be stored permanently unless you log in.</p>
//         </div>
//       )}
//       <AddTransactions
//         onAdd={handleAddTransaction}
//         transactionsData={currentUser ? [] : localTransactions} // Load from Firestore if logged in
//       />
//     </div>
//   );
// };

// //from gemeni

// // export const MyComponent = () => {
// //   const { currentUser } = useContext(AuthContext);
// //   const [userData, setUserData] = useState(null);

// //   useEffect(() => {
// //     // 1. Fetch user data on login
// //     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         // User is logged in
// //         fetchUserData(currentUser.uid);
// //       } else {
// //         // User is logged out
// //         setUserData(null);
// //       }
// //     });

// //     // 2. Fetch user data whenever a doc is added
// //     const unsubscribeFirestore = onSnapshot(
// //       query(collection(db, 'users'), where('userId', '==', auth.currentUser?.uid)), // Use 'userId' here
// //       (snapshot) => {
// //         if (snapshot.docChanges().length > 0 && auth.currentUser) { // Check if user is logged in
// //           // A document has been added, updated, or deleted
// //           fetchUserData(auth.currentUser.uid);
// //         }
// //       }
// //     );

// //     // Cleanup functions
// //     return () => {
// //       unsubscribeAuth();
// //       unsubscribeFirestore();
// //     };
// //   }, []);

// //   // Define the fetchUserData function here
// //   const fetchUserData = async (uid) => {
// //     try {
// //       const docRef = doc(db, 'users', uid); // Use 'uid' here
// //       const docSnap = await getDoc(docRef);
// //       if (docSnap.exists()) {
// //         setUserData(docSnap.data());
// //       } else {
// //         // Handle case where user document doesn't exist
// //         console.log('No such document!');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //     }
// //   };

// //   return (
// //     // ... your component JSX
// //   );
// // };
