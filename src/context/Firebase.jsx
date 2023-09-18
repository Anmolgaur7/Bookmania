import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, getFirestore, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBE3Eta3BaRUBDyMtv_YkVvuTAJ5m8Wctw",
    authDomain: "bookmania-15201.firebaseapp.com",
    projectId: "bookmania-15201",
    storageBucket: "bookmania-15201.appspot.com",
    messagingSenderId: "904717084412",
    appId: "1:904717084412:web:cde51dabffde492bd2d979"
};
const notify = () => toast("User Already Exists");
const app = initializeApp(firebaseConfig);
const firebaseauth = getAuth(app)
const firestore = getFirestore(app)
const google = new GoogleAuthProvider();
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
        signInWithPopup(firebaseauth, google).catch((error) => {
            console.error(error.code);
        })
    }
    const SignupWithEmail = (email, password) => {
        createUserWithEmailAndPassword(firebaseauth, email, password).catch((error) => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('User already exits.');
                    break;
                case 'auth/weak-password':
                    alert("Weak password")
                    break;
                default:
                    console.error('An error occurred:', error);
                    break;
            }
        });
    }
    const SigninWithEmail = (email, password) => {
        signInWithEmailAndPassword(firebaseauth, email, password).catch((error) => {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Wrong Password');
                    break;
                case 'auth/user-not-found':
                    alert("Please register First")
                    break;
                default:
                    console.error('An error occurred:', error);
                    break;
            }
        });
    }
    console.log(user);
    return <FirebaseContext.Provider value={{ SignupWithEmail, getorders, fetchmyorders, SigninWithEmail, placeorder, signinwithgoogle, addnewlisting, signout, bookbyid, user, isloggedin, getbooks, getimageurl }}>
        {props.children}
    </FirebaseContext.Provider>

}