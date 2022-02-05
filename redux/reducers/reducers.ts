import { combineReducers } from "redux";
import * as types from "../redux_types"

//base reducer
const baseReducer = (state:any = 0, {type}:any) => {
  switch (type) {
    case types.BASE:
      return state + 1
    default:
      return state
  }
}

export default combineReducers(baseReducer)