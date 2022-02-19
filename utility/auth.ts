import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { NewAuth } from './types';

const auth = getAuth();
auth.useDeviceLanguage()

export function createUserEP(payload: NewAuth) {
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

export function signupWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then(res => {
    console.log(res.user)
  })
  .catch(error => {
    console.log(error)
  })


}