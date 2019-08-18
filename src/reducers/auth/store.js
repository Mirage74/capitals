import { combineReducers } from 'redux';
import { AuthTypes } from '../../actions';

const INITIAL_STATE = {
  displayName: ""
}

const currDisplayName = (state = INITIAL_STATE.displayName, { type, payload }) => {
  switch (type) {
    case AuthTypes.DISPLAY_NAME:
      return payload;

    default:
      return state;
  }
}

export default combineReducers({
  currDisplayName
})

