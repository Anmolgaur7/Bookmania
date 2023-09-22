import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, getFirestore, getDocs, getDoc, doc, updateDoc,deleteDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyD8P9YXnnRufPOkospj38ULUvWHnlCEc_g",
    authDomain: "bookmania1-9fe62.firebaseapp.com",
    projectId: "bookmania1-9fe62",
    storageBucket: "bookmania1-9fe62.appspot.com",
    messagingSenderId: "944184768924",
    appId: "1:944184768924:web:6a5aba88c6fa9a17523059"
  };
  

const app = initializeApp(firebaseConfig);
const firebaseauth = getAuth(app)
const firestore = getFirestore(app)
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider()
const storage = getStorage(app)
export const useFirebase = () => useContext(FirebaseContext)
export const FirebaseProvider = (props) => {
    const [user, setuser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(firebaseauth, (user) => {
            if (user) setuser(user);
            else setuser(null);
        })
    }, [])
    const signout = () => {
        signOut(firebaseauth)
    }
    const getbooks = () => {
        return getDocs(collection(firestore, 'books'))
    }
    const bookbyid = async (id) => {
        const doc1 = doc(firestore, 'books', id)
        const result = await getDoc(doc1);
        return result;
    }
    const getimageurl = (path) => {
        return getDownloadURL(ref(storage, path))

    }
    const addnewlisting = async (name, isbn, price, cover) => {
        const imageurl = ref(storage, `uploads/images/${Date.now()}-${cover.name}`)
        const uploadurl = await uploadBytes(imageurl, cover)
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbn,
            price,
            Imageurl: uploadurl.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayname: user.displayName
        })
    }
    const placeorder = async (bookid, qty) => {
        const ref = collection(firestore, "books", `${bookid}`, "orders")
        const res = await addDoc(ref, {
            userID: user.uid,
            userEmail: user.email,
            displayname: user.displayName,
            quantity: Number(qty)
        });
        return res
    }
    const delbook = async(id)=>{
    const cityref=doc(firestore,'books',id)
    const res=await deleteDoc(cityref)
      return res
    }
    const getorders = async (bookID) => {
        const collectionref = collection(firestore, "books", bookID, "orders")
        const res = await getDocs(collectionref)
        return res;
    };
    const fetchmyorders = async (userID) => {
        const collections = collection(firestore, "books")
        const q = query(collections, where("userID", "==", userID))
        const result = await getDocs(q)
        return result;
    }
    const isloggedin = user ? true : false;
    const signinwithgoogle = () => {
      const res=signInWithPopup(firebaseauth, google)
      return res
    }
    const signinwithfb = () => {
       const res=  signInWithPopup(firebaseauth, facebook)
       return res
    }

    const SignupWithEmail = (email, password) => {
        const res = createUserWithEmailAndPassword(firebaseauth, email, password);
        return res
    }
    const SigninWithEmail = (email, password) => {
        const res = signInWithEmailAndPassword(firebaseauth, email, password)
        return res
    }
    console.log(user);
    return <FirebaseContext.Provider value={{ SignupWithEmail, getorders, fetchmyorders, SigninWithEmail, placeorder, signinwithgoogle, addnewlisting, signout,delbook ,signinwithfb, bookbyid, user, isloggedin, getbooks, getimageurl }}>
        {props.children}
    </FirebaseContext.Provider>

}