import {
  GoogleAuthProvider,
  OAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth'

const authProviders = {
  Google: () => new GoogleAuthProvider(),
  Apple: () => new OAuthProvider('apple.com'),
  Facebook: () => new FacebookAuthProvider()
}

export function setProvider(service: string): Function {
  switch(service) {
    case 'Google':
      return authProviders.Google
    case 'Apple':
      return authProviders.Apple
    case 'Facebook':
      return authProviders.Facebook
    default:
      return authProviders.Google
  }
}