import {GET_CAPITALS} from '../actions/types'
import {getArrayRandom} from "../axfunc"

const {allCapitals} = require ('../config')
getArrayRandom(16, allCapitals)


//let is = getArrayRandom(16, allCapitals)

const initialState =  {
  capitals: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CAPITALS:  
      //console.log("PAYLOAD : ", action.payload)
      return {
        ...state,
        capitals: action.payload
      }
    default:
      return state

  }
}

  


