import { UX_TYPES } from "redux/redux_types"
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
const { SESSION } = UX_TYPES
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
    default:
      return nextState
  }
}

// TODO: Add session selectors

export const errorsReducer = (state: any={}, {type}: any) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch(type) {
    case UX_TYPES.ERRORS:
      return nextState
    default:
      return nextState
  }
}

// TODO: Add errors selectors