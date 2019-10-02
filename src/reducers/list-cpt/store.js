import { combineReducers } from 'redux';
import { ListCptTypes } from '../../actions';
import {getArrayRandom} from "../../axfunc"
//import { getStoredState } from 'redux-persist';

const {allCapitals} = require ('../../config')


const INITIAL_STATE = {
  capitals: getArrayRandom(16, allCapitals),
  countriesList: [],
  usersList: [{}, {}, {}]
}

const currCapitals = (state = INITIAL_STATE.capitals, { type, payload }) => {
  switch (type) {
    case ListCptTypes.GET_CAPITALS:
      //console.log("reducer currCapitals", payload)
      return payload

    default:
      return state
  }
}

const currCountriesList = (state = INITIAL_STATE.countriesList, { type, payload }) => {
  switch (type) {
    case ListCptTypes.SET_COUNTRIES_LIST:
      return payload;
    case ListCptTypes.CUT_COUNTRIES_LIST:
      return payload

    default:
      return state
  }
}

const currUserList = (state = INITIAL_STATE.usersList, { type, payload }) => {
  console.log("reducer userlist", payload)
  console.log("reducer type", type)
  switch (type) {
    case ListCptTypes.SET_USERS_LIST:
      return payload
    default:
      return state
  }
}


export default combineReducers({
  currCapitals,
  currCountriesList,
  currUserList
})