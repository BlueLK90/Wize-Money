import { db } from "./Firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const addTransaction = async (userId, transaction) => {
  const docRef = await addDoc(collection(db, "transactions"), {
    ...transaction,
    userId,
    createdAt: new Date(),
  });
  return docRef;
};

export const getTransactions = async (userId) => {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};
