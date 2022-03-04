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

export const errorsReducer = (state: any={}, {type}: any) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch(type) {
    case ERRORS.INVALID_EMAIL:
      nextState['email'] = AUTH_ERRORS.Email
      return nextState
    case ERRORS.INVALID_PASSWORD:
      nextState['password'] = AUTH_ERRORS.Password
      return nextState
    case ERRORS.BOTH:
      nextState['both credentials'] = AUTH_ERRORS.Both
      return nextState
    case ERRORS.INVALID_CREDENTIALS:
      nextState['invalid'] = AUTH_ERRORS.Credentials
      return nextState
    case ERRORS.USER_DOES_NOT_EXIST:
      nextState['no user'] = AUTH_ERRORS.NoUser
      return nextState
    case ERRORS.SOMETHING_WRONG:
      nextState['default'] = AUTH_ERRORS.Default
      return nextState
    case ERRORS.CLEAR_ERRORS:
      return {}
    default:
      return nextState
  }
}

// TODO: Add errors selectors