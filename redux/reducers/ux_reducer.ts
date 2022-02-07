import { UX_TYPES } from "redux/redux_types"

export const ui_reducer = (state: any={}, {type}:any) => {
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

export const session_reducer = (state: any={}, {type}: any) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch(type) {
    case UX_TYPES.SESSION:
      return nextState
    default:
      return nextState
  }
}

// TODO: Add session selectors

export const errors_reducer = (state: any={}, {type}: any) => {
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