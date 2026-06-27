import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import api from "../axios/axios";

export const userService = {

  getUser: async (idUser: string) => {
    const response = await api.get(`user/get-data/${idUser}`);
    return response.data;
  },

  login: async (email: string, password: string) => {
    try {
      const login = await signInWithEmailAndPassword(auth, email, password);
      return login;
    } catch (error) {
      throw error;
    }
  },

  register: async (email: string, password: string, nome: string) => {
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(credentials.user, { displayName: nome });

      await setDoc(doc(db, "users", credentials.user.uid), {
        nome,
        email,
        criadoEm: new Date().toISOString(),
      });

      return credentials;
    } catch (error) {
      throw error;
    }
  },
  
  onAuthStateChanged(callback: (user: any) => void) {
    return onAuthStateChanged(auth, callback);
  },

  logout: async () => {
    await signOut(auth);
  },

 
};