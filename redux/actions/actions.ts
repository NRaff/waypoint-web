import {Session} from '../../utility/types'
import {
  UX_TYPES
} from '../redux_types'

const {SESSION, ERRORS} = UX_TYPES
export const signupUser = (payload: Session) => ({
  type: SESSION.SIGN_UP,
  payload
})

export const loginUser = (payload: Session) => ({
  type: SESSION.LOGIN,
  payload
})

export const logoutUser = () => ({
  type: SESSION.LOGOUT
})

export const setAuthError = (type: string) => ({
  type
})