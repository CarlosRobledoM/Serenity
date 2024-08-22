import { db } from './firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

const collectionName = 'transcript';
const itemsCollection = collection(db, collectionName);

export const addItem = (obj) => {
  return addDoc(itemsCollection, obj).id;
};

export const deleteItem = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const updateItem = async (id, obj) => {
  await updateDoc(doc(db, collectionName, id), obj);
};

export const getItems = async () => {
  const result = await getDocs(query(itemsCollection));
  return result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};
