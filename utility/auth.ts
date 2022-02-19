import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

var auth = getAuth();


// TODO: consider changing options passed in to a payload 
// TODO: (simplifies crossover between login and signup actions)
export function createUserEP(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // TODO: use user.updateProfile to set display name and other details
      // TODO: would be good to set a default profile image
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}