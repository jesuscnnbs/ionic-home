import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from ".";

/**
 * Add a new Home to homes collection. Also add a new Month to months collection and a home Ref to users collection.
 * @param newHomeName
 */
export const createHome = async (newHomeName: string, userId: string) => {
  const monthRef = await addDoc(collection(db, "months"), {
    date: new Date(),
    payments: [],
  });
  const newHome = {
    name: newHomeName,
    monthlyCosts: [],
    userIds: [],
    monthIds: [monthRef],
  };
  const homeRef = await addDoc(collection(db, "homes"), newHome);
  await updateDoc(doc(db, "users", userId), {
    homes: arrayUnion(homeRef),
  });
};

/**
 * Get homes for currentUser
 * @returns
 */
export const getHomesOnce = async (userId: string) => {
  const q = query(collection(db, "homes"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  return querySnapshot;
};
