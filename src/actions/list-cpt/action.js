import * as ActionTypes from './constant';
import { backendPath } from '../../config'
import axios from 'axios'
import { getArrayRandom } from "../../axfunc"

const { allCapitals } = require('../../config')

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

export const setUsersList = (currList, lvlNum) => async (dispatch) => {
  const res = await axios.get(backendPath + `score/${lvlNum}`)
  //console.log("setUsersList res.data", res.data)
  dispatch({
    type: ActionTypes.SET_USERS_LIST,
    payload: res.data
  })
  return res.data
}




export const cutCountriesList = (newCpts) => async (dispatch) => {
  dispatch({
    type: ActionTypes.CUT_COUNTRIES_LIST,
    payload: newCpts
  })
}

export const updUser = (user) => async dispatch => {
  const configAx = {
    method: 'put',
    data: user
  }
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

