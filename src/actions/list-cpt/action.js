import * as ActionTypes from './constant';
import { backendPath } from '../../config'
import axios from 'axios'
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

export const cutCountriesList = (cpts, index) => async (dispatch) => {
  let newCpts = [...cpts]
  newCpts.splice(index, 1)
  dispatch({
     type: ActionTypes.CUT_COUNTRIES_LIST,
     payload: newCpts
   })
 }

 export const updUser = (user) => async dispatch => {
  //console.log(user)
  const configAx = {
    method: 'put',
    data: user
  }

    
  //const res = await axios.put(backendPath + `user/edit/${user.displayName}`, configAx)
  const res = await axios.put(backendPath + `${user.displayName}`, configAx)
  .catch(err => {
    console.log("error updating user : ", err)
  })
  dispatch({
    type: ActionTypes.UPDATE_USER,
    payload: res.data
    
  })
  return res.data
}
 
