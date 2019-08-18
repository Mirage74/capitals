import { combineReducers } from 'redux'

import auth from "./auth/store"
import listCapitals from "./list-cpt/store"


export default combineReducers({
  listCapitals,
  auth
})

