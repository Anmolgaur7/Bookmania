import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";

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
const firebaseauth=getAuth(app)


export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
    const SignupWithEmail=(email,password)=>{
        createUserWithEmailAndPassword(firebaseauth,email,password)
    }
    const SigninWithEmail=(email,password)=>{
        signInWithEmailAndPassword(firebaseauth,email,password)
    }
    return <FirebaseContext.Provider value={{SignupWithEmail,SigninWithEmail}}>
        {props.children}
    </FirebaseContext.Provider>

}