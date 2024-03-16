import firebase from "../firebase.js";
import Product from "../models/product.model.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase);


export const createUser = async (body) => {
	const resp = await addDoc(collection(db, "users"), body);
};

export const getProducts = async (req, res, next) => {
	try {
		const products = await getDocs(collection(db, "users"));
		const productArray = [];
		
		if (products.empty) {
			res.status(400).send("No Products found");
		} else {
			products.forEach((doc) => {
				const product = new Product(
					doc.id,
					doc.data().name,
					doc.data().price,
					doc.data().retailer,
					doc.data().amountInStock
				);
				productArray.push(product);
			});
			
			res.status(200).send(productArray);
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};


export const getProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		const product = doc(db, "products", id);
		const data = await getDoc(product);
		if (data.exists()) {
			res.status(200).send(data.data());
		} else {
			res.status(404).send("product not found");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};


export const updateProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const product = doc(db, "products", id);
		await updateDoc(product, data);
		res.status(200).send("product updated successfully");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

export const deleteProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		await deleteDoc(doc(db, "products", id));
		res.status(200).send("product deleted successfully");
	} catch (error) {
		res.status(400).send(error.message);
	}
};
