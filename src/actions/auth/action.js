import * as ActionTypes from './constant';

export const setUser = (user) => async (dispatch) => {
 dispatch({
    type: ActionTypes.SET_USER,
    payload: user
  })
}