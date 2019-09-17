import * as ActionTypes from './constant';
import {getArrayRandom} from "../../axfunc"

const {allCapitals} = require ('../../config')

export const getCapitals = () => async (dispatch) => {
 dispatch({
    type: ActionTypes.GET_CAPITALS,
    payload: getArrayRandom(16, allCapitals)
  })
}

export const setCountriesList = (countriesList) => async (dispatch) => {
 dispatch({
    type: ActionTypes.SET_COUNTRIES_LIST,
    payload: countriesList
  })
}

export const cutCountriesList = (index) => async (dispatch) => {
  dispatch({
     type: ActionTypes.CUT_COUNTRIES_LIST,
     payload: index
   })
 }


 
