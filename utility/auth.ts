import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  FacebookAuthProvider,
  OAuthProvider,
} from 'firebase/auth'
import {
  getApps,
} from 'firebase/app'
import { Dispatch } from 'redux';
import { NewAuth, Session } from './types';
import { signupUser } from 'redux/actions/actions';
import { setupFirebase } from 'firebaseUtil/setup_firebase';
import { NextRouter } from 'next/router';
import { setProvider } from './authTypes';

if (getApps().length === 0) {
  setupFirebase()
}
const auth = getAuth();
auth.useDeviceLanguage()

export function createUserEP(payload: NewAuth, dispatch: Dispatch, router: NextRouter) {
  const {email, password, displayName} = payload
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      updateProfile(user, {
        displayName: displayName
      })
      .then( () => {
        console.log('Display name updated.')
        const payload = {
          uid: user.uid,
          displayName: user.displayName
        } as Session
        dispatch(signupUser(payload))
        router.push('/home')
      })
      .catch( () => {
        console.log('there was an issue updating display name')
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export function signupWithService(
  service: string, 
  dispatch: Dispatch, 
  router: NextRouter) {
    const provider = setProvider(service)()
    signInWithPopup(auth, provider)
    .then(res => {
      const payload = {
        uid: res.user.uid,
        displayName: res.user.displayName,
      } as Session
      dispatch(signupUser(payload))
      router.push('/home')
    })
    .catch(error => {
      console.log(error)
    })
}