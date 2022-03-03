import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile,
  User,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {
  getApps,
} from 'firebase/app'
import { Dispatch } from 'redux';
import { NewAuth, Session, SignInAuth } from './types';
import { signupUser } from 'redux/actions/actions';
import { setupFirebase } from 'firebaseUtil/setup_firebase';
import { NextRouter } from 'next/router';
import { setProvider } from './authTypes';

if (getApps().length === 0) {
  setupFirebase()
}

const auth = getAuth();
auth.useDeviceLanguage()
// TODO: Start watching auth status
  // redirect to home if user exists, plus update session state in redux
  // redirect to landing otherwise

export function signInEP({email, password}: SignInAuth, router: NextRouter) {
  console.log(email)
  console.log(password)
  signInWithEmailAndPassword(auth, email, password)
  .then(credential => {
    console.log('Supposed Success')
    console.log(credential.user)
    router.push('/home')
  })
  .catch(err => {
    console.log(err)
    console.log('There was an issue logging in')
    //pass some errors up to ux state
  })
}

export function createUserEP(
    {email, displayName, password}: NewAuth, 
    dispatch: Dispatch, 
    router: NextRouter
  ) {
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
          displayName: user.displayName,
          photoUrl: user.photoURL
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
        photoUrl: res.user.photoURL
      } as Session
      dispatch(signupUser(payload))
      router.push('/home')
    })
    .catch(error => {
      console.log(error)
    })
}

export function signOut() {
  auth.signOut()
}

export function getSession(user: User) {
  const {uid, displayName, photoURL} = user
  return {
    uid,
    displayName,
    photoUrl: photoURL
  } as Session
}