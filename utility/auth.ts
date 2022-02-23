import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  FacebookAuthProvider,
  OAuthProvider,
  Auth
} from 'firebase/auth'
import {
  getApps,
} from 'firebase/app'
import { Dispatch } from 'redux';
import { NewAuth, Session } from './types';
import { signupUser } from 'redux/actions/actions';
import { setupFirebase } from 'firebaseUtil/setup_firebase';
import { NextRouter } from 'next/router';

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

export function signupWithGoogle(dispatch: Dispatch, router: NextRouter) {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then(res => {
    const payload = {
      uid: res.user.uid,
      displayName: res.user.displayName
    } as Session
    console.log(res.user)
    dispatch(signupUser(payload))
  })
  .catch(error => {
    console.log(error)
  })
}

export function signupWithFacebook(dispatch: Dispatch, router: NextRouter) {
  const provider = new FacebookAuthProvider()
  signInWithPopup(auth, provider)
  .then(res => {
    const payload = {
      uid: res.user.uid,
      displayName: res.user.displayName
    } as Session
    console.log(res.user)
    dispatch(signupUser(payload))
  })
  .catch(error => {
    console.log(error)
  })
}

export function signupWithApple(dispatch: Dispatch, router: NextRouter) {
  const provider = new OAuthProvider('apple.com')
  signInWithPopup(auth, provider)
  .then(res => {
    const payload = {
      uid: res.user.uid,
      displayName: res.user.displayName
    } as Session
    console.log(res.user)
    dispatch(signupUser(payload))
  })
  .catch(error => {
    console.log(error)
  })
}