import {GET_CAPITALS} from './types'
import {getArrayRandom} from "../axfunc"

const {allCapitals} = require ('../config')

export const getCapitals = () => async dispatch => {
 dispatch({
    type: GET_CAPITALS,
    payload: getArrayRandom(16, allCapitals)
  })
}




//export const getCapitals = cpts => async dispatch => {
  //let arrR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  //console.log("PAYLOAD ACTIONS : ", cpts)
//  dispatch({
    //type: GET_CAPITALS,
    //payload: cpts
  //})
//}




