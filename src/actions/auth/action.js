import * as ActionTypes from './constant';
import { backendPath } from '../../config'
import axios from 'axios'

export const setUser = (user) => async (dispatch) => {
 dispatch({
    type: ActionTypes.SET_USER,
    payload: user
  })
}

export const updUser = (user) => async dispatch => {
  const configAx = {
    method: 'put',
    data: user
  }
  await axios.put(backendPath + `${user.displayName}`, configAx)
    .catch(err => {
      console.log("error updating user : ", err)
    })

  const res = await axios.get(backendPath + `${user.displayName}`)
  dispatch({
    type: ActionTypes.UPDATE_USER,
    payload: res.data

  })
  return res.data
}