import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { Dispatch } from 'redux';
import { NewAuth, Session } from './types';
import { signupUser } from 'redux/actions/actions';

const auth = getAuth();
auth.useDeviceLanguage()

export function createUserEP(payload: NewAuth, dispatch: Dispatch) {
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

export function signupWithGoogle(dispatch: Dispatch) {
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