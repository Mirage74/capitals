import * as ActionTypes from './constant';
//import { getRegisterInfo, getUserInfo } from '../../reducers/auth/select';
import {getArrayRandom} from "../../axfunc"

const {allCapitals} = require ('../../config')

export const getCapitals = () => async (dispatch) => {
 dispatch({
    type: ActionTypes.GET_CAPITALS,
    payload: getArrayRandom(16, allCapitals)
  })
}