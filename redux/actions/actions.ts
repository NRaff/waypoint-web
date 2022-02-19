import {Session} from '../../utility/types'
import {
  UX_TYPES
} from '../redux_types'

const {SESSION} = UX_TYPES
export const signupUser = (payload: Session) => ({
  type: SESSION.SIGN_UP,
  payload
})