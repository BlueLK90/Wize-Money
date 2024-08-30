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

const TesterComponent = () => {
  //const { data, addDataWishList, deleteWishCard } = useContext(DataContext);
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="App">
      <h1>Firebase Google Authentication</h1>
      {currentUser ? (
        <div>
          <UserProfile />
          <SignOut />
          <div className=""></div>
        </div>
      ) : (
        <>
          <div className="flex items-center py-6">
            <p className="flex items-center gap-2  bg-red-50 p-2 mx-2 border border-red-400 text-red-500 rounded">
              <i>
                <FiAlertTriangle />
              </i>
              <em>
                Please be aware that without signing up/ Loging in; any data
                will be lost after reloading or leaving the page.
              </em>
            </p>
            <img
              src={UserIcon}
              alt="emptyUserIcon"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <SignIn />
        </>
      )}
      <TransactionsPage />
    </div>
  );
};

export default TesterComponent;
