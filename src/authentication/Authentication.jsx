import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};
const app = initializeApp(firebaseConfig);
export const AuthContext = createContext(null)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const createUser = (email, password) => {
        setLoading((true))
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const signIn = (email, password) => {
        setLoading((true))
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading((true))
        return signOut(auth);
    }
    useEffect(() => {
        setLoading((true))
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading((false))
        })
        return () => {
            unSubscribe();
        }
    }, [])
    const authInfo = { user, loading, createUser, logOut, signIn, googleSignIn }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
}
export default AuthProvider;