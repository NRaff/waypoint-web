import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile,
  User,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { AuthErrorCodes } from 'firebase/auth';
import {
  getApps,
} from 'firebase/app'
import { Dispatch } from 'redux';
import { NewAuth, Session, SignInAuth } from './types';
import { setAuthError, signupUser } from 'redux/actions/actions';
import { setupFirebase } from 'config/setup_firebase';
import { NextRouter } from 'next/router';
import { setProvider } from './authTypes';
import { UX_TYPES } from 'redux/redux_types';

if (getApps().length === 0) {
  setupFirebase()
}

const {ERRORS} = UX_TYPES
const {AUTH} = ERRORS
const auth = getAuth();
auth.useDeviceLanguage()
// TODO: Start watching auth status
  // redirect to home if user exists, plus update session state in redux
  // redirect to landing otherwise

function validateCredentials(email: string, password: string): [boolean, string] {
  const validatedEmail = isValidEmail(email)
  const validatedPassword = isValidPassword(password)
  switch (true) {
    case !validatedEmail && !validatedPassword:
      return [false, AUTH.BOTH]
    case !validatedEmail:
      return [false, AUTH.INVALID_EMAIL]
    case !validatedPassword:
      return [false, AUTH.INVALID_PASSWORD]
    default:
      return [true, AUTH.SOMETHING_WRONG]
  }
}

function isValidEmail(email: string) {
  const lemail = email.toLowerCase()
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return validRegex.test(lemail)
}

function isValidPassword(password: string) {
  const lettersReg = /[a-zA-Z]/
  const numbersReg = /[0-9]/
  return password.length >= 7 && lettersReg.test(password) && numbersReg.test(password)
}

function mapFirebaseError(error: string) {
  switch(error) {
    case AuthErrorCodes.USER_DELETED:
      return AUTH.USER_DOES_NOT_EXIST
    default:
      return AUTH.SOMETHING_WRONG
  }
}

export function signInEP({email, password}: SignInAuth, dispatch: Dispatch, router: NextRouter) {
  const [hasValidCredentials, type] = validateCredentials(email, password)
  console.log(type)
  if(!hasValidCredentials) {
    dispatch(setAuthError(AUTH.CLEAR_ERRORS))
    dispatch(setAuthError(type))
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then(credential => {
        dispatch(setAuthError(AUTH.CLEAR_ERRORS))
        router.push('/home')
      })
      .catch(({code}) => {
        //pass some errors up to ux state
        dispatch(setAuthError(AUTH.CLEAR_ERRORS))
        dispatch(setAuthError(mapFirebaseError(code)))
      })
  }
}

export function createUserEP(
    {email, displayName, password}: NewAuth, 
    dispatch: Dispatch, 
    router: NextRouter
  ) {
    const [hasValidCredentials, type] = validateCredentials(email, password)
    if(!hasValidCredentials) {
      dispatch(setAuthError(AUTH.CLEAR_ERRORS))
      dispatch(setAuthError(type))
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: displayName
          })
            .then(() => {
              console.log('Display name updated.')
              const payload = {
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL
              } as Session
              dispatch(signupUser(payload))
              dispatch(setAuthError(AUTH.CLEAR_ERRORS))
              router.push('/home')
            })
            .catch(() => {
              console.log('there was an issue updating display name')
            })
        })
        .catch(({code}) => {
          dispatch(setAuthError(AUTH.CLEAR_ERRORS))
          dispatch(setAuthError(mapFirebaseError(code)))
        });
    }
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
      dispatch(setAuthError(AUTH.CLEAR_ERRORS))
      router.push('/home')
    })
    .catch(({code}) => {
      dispatch(setAuthError(AUTH.CLEAR_ERRORS))
      dispatch(setAuthError(mapFirebaseError(code)))
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