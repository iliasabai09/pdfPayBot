import firebase from "../firebase.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase);

export const createUser = async (body) => {
	const resp = await addDoc(collection(db, "users"), body);
};
