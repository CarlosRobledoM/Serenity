import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

export const addItem = (collectionName, obj) => {
  const itemsCollection = collection(db, collectionName);
  return addDoc(itemsCollection, obj).id;
};

export const deleteItem = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const updateItem = async (collectionName, id, obj) => {
  await updateDoc(doc(db, collectionName, id), obj);
};

export const getItems = async (collectionName) => {
  const itemsCollection = collection(db, collectionName);
  const result = await getDocs(query(itemsCollection));
  return result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};
