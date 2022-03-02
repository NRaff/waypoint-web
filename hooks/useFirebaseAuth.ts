import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "redux/actions/actions";
import { getSession } from "utility/auth";
import { Session } from "utility/types";


export default function useFirebaseAuth() {
  const dispatch = useDispatch()
  const auth = getAuth();
  const [authStatus, setAuthStatus] = useState(false)
  useEffect(watchAuth, [])

  function watchAuth() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setAuthStatus(true)
        dispatch(loginUser(getSession(user)))
        // ...
      } else {
        // User is signed out
        // ...
        setAuthStatus(false)
      }
    });
  }

  return authStatus
}