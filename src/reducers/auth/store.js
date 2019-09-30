import { combineReducers } from 'redux';
import { AuthTypes } from '../../actions';

const INITIAL_STATE = {
  user: {}
}

const currUser = (state = INITIAL_STATE.user, { type, payload }) => {
  switch (type) {
    case AuthTypes.SET_USER:
      return payload;

    default:
      return state;
  }
}

export default combineReducers({
  currUser
})

