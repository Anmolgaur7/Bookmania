import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage,ref,uploadBytes } from "firebase/storage";
const FirebaseContext = createContext(null);
const firebaseConfig = {
    apiKey: "AIzaSyBE3Eta3BaRUBDyMtv_YkVvuTAJ5m8Wctw",
    authDomain: "bookmania-15201.firebaseapp.com",
    projectId: "bookmania-15201",
    storageBucket: "bookmania-15201.appspot.com",
    messagingSenderId: "904717084412",
    appId: "1:904717084412:web:cde51dabffde492bd2d979"
};
const app = initializeApp(firebaseConfig);
const firebaseauth = getAuth(app)
const firestore = getFirestore(app)
const google = new GoogleAuthProvider();
const storage= getStorage(app)

export const useFirebase = () => useContext(FirebaseContext)
export const FirebaseProvider = (props) => {
    const [user, setuser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(firebaseauth, (user) => {
            if (user) {
                setuser(user)
            }
            else {
                setuser(null)
            }
        })
    }, [])
    const addnewlisting = async (name,isbn,price,cover) => {
    const imageurl=ref(storage,`uploads/images/${Date.now()}-${cover.name}`)
     const uploadurl =await uploadBytes(imageurl,cover)
     await addDoc(collection(firestore,'books'),{
        name,
        isbn,
        price,
        Imageurl:uploadurl.ref.fullPath,
        userID:user.uid,
        userEmail:user.email,
        displayname:user.displayName
     }) 
    }

    const isloggedin = user ? true : false;
    const signinwithgoogle = () => {
        signInWithPopup(firebaseauth, google)
    }
    const SignupWithEmail = (email, password) => {
        createUserWithEmailAndPassword(firebaseauth, email, password)
    }
    const SigninWithEmail = (email, password) => {
        signInWithEmailAndPassword(firebaseauth, email, password)
    }
    return <FirebaseContext.Provider value={{ SignupWithEmail, SigninWithEmail, signinwithgoogle,addnewlisting, isloggedin }}>
        {props.children}
    </FirebaseContext.Provider>

}