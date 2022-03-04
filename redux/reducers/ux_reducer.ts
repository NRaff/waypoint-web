import { UX_TYPES } from "redux/redux_types"
import { AUTH_ERRORS } from "utility/errorMessages"
import { Session, SessionAction } from "utility/types"

export const uiReducer = (state: any={}, {type}:any) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch(type) {
    case UX_TYPES.UI:
      return nextState
    default:
      return nextState
  }
}

// TODO: Add ui selectors
const { SESSION, ERRORS } = UX_TYPES
const defaultSession = {
  uid: '',
  displayName: '',
  photoUrl: ''
} as Session

export const sessionReducer = (
  state: Session = defaultSession, 
  {type, payload}: SessionAction) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch(type) {
    case SESSION.SIGN_UP:
      return payload
    case SESSION.LOGIN:
      return payload
    case SESSION.LOGOUT:
      return defaultSession
    default:
      return nextState
  }
}

// TODO: Add session selectors

const {AUTH} = ERRORS
export const authErrorsReducer = (state: any={}, {type}: any) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)
  // console.log(type)
  switch(type) {
    case AUTH.INVALID_EMAIL:
      nextState['email'] = AUTH_ERRORS.Email
      return nextState
    case AUTH.INVALID_PASSWORD:
      nextState['password'] = AUTH_ERRORS.Password
      return nextState
    case AUTH.BOTH:
      nextState['both credentials'] = AUTH_ERRORS.Both
      return nextState
    case AUTH.INVALID_CREDENTIALS:
      nextState['invalid'] = AUTH_ERRORS.Credentials
      return nextState
    case AUTH.USER_DOES_NOT_EXIST:
      nextState['no user'] = AUTH_ERRORS.NoUser
      return nextState
    case AUTH.SOMETHING_WRONG:
      nextState['default'] = AUTH_ERRORS.Default
      return nextState
    case AUTH.CLEAR_ERRORS:
      console.log('clear errors hit')
      return {}
    default:
      return nextState
  }
}

// TODO: Add errors selectors