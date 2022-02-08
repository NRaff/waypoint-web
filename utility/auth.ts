import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth();

export function createUserEP(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}