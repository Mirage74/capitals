import { combineReducers } from 'redux';
import { ListCptTypes } from '../../actions';
import {getArrayRandom} from "../../axfunc"

const {allCapitals} = require ('../../config')

const INITIAL_STATE = {
  capitals: getArrayRandom(16, allCapitals)
}

const currCapitals = (state = INITIAL_STATE.capitals, { type, payload }) => {
  switch (type) {
    case ListCptTypes.GET_CAPITALS:
      return payload;

    default:
      return state;
  }
}

export default combineReducers({
  currCapitals
})


// export default function (state = initialState, action) {
//   switch (action.type) {
//     case GET_CAPITALS:  
//       return {
//         ...state,
//         capitals: action.payload
//       }
//     default:
//       return state

//   }
// }
