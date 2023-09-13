import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

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
const google = new GoogleAuthProvider();
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
    return <FirebaseContext.Provider value={{ SignupWithEmail, SigninWithEmail, signinwithgoogle, isloggedin }}>
        {props.children}
    </FirebaseContext.Provider>

}