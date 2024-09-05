import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  updateDoc,
  setDoc,
  doc,
} from 'firebase/firestore';

const collectionName = 'users'; //"users" / "frobledo818@gmail.com"
const subCollectionName = 'sessions';

export const addUser = async (idUser, obj) => {
  return await setDoc(doc(db, collectionName, idUser), obj).id;
};

export const addSession = async (idUser, obj) => {
  const itemsCollection = collection(
    db,
    collectionName,
    idUser,
    subCollectionName,
  );
  const sesion = await addDoc(itemsCollection, obj);
  return sesion.id;
};

export const deleteItem = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const updateItem = async (collectionName, id, obj) => {
  await updateDoc(doc(db, collectionName, id), obj);
};

export const getUsers = async () => {
  const itemsCollection = collection(db, collectionName);
  const result = await getDocs(query(itemsCollection));
  return result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

export const getSessions = async (idUser) => {
  const itemsCollection = collection(
    db,
    collectionName,
    idUser,
    subCollectionName,
  );
  const result = await getDocs(query(itemsCollection));
  return result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};
