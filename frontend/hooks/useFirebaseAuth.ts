import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginUser,
  logoutUser,
} from "frontend/redux/actions/actions";
import { getSession } from "shared/utility/auth";
import { useRouter } from "next/router";

export default function useFirebaseAuth() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [authStatus, setAuthStatus] = useState(false);
  const router = useRouter();
  useEffect(watchAuth, []);

  function watchAuth() {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setAuthStatus(true);
        dispatch(loginUser(getSession(user)));
        router.push("/home");
        // ...
      } else {
        // User is signed out
        // ...
        setAuthStatus(false);
        dispatch(logoutUser());
        router.push("/auth/login");
      }
    });
    return unsubscribe;
  }

  return authStatus;
}
