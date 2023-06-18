import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [username, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const isUserLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
      } else {
        navigate("/");
        setUser(null);
      }
    });
  };

  const getUserID = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.uid;
      return uid;
    }
  };

  const getEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return user.email;
    }
  };

  const signout = () => {
    const auth = getAuth();
    return signOut(auth);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
      } else {
        setUser(null);
        console.log("User not found");
      }
    });
    return subscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        username,
        isUserLoggedIn,
        getUserID,
        signout,
        googleSignin,
        getEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  return useContext(AuthContext);
};
