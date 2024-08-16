import { db } from './firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

const collectionName = 'items';
const itemsCollection = collection(db, collectionName);

export const addItem = (obj) => {
  return addDoc(itemsCollection, obj).id;
};

export const getItems = async () => {
  const result = await getDocs(query(itemsCollection));
  return result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};
