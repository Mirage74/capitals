import * as ActionTypes from './constant';

export const setDisplayName = (displayName) => async (dispatch) => {
//  console.log("action ", displayName)
 dispatch({
    type: ActionTypes.DISPLAY_NAME,
    payload: displayName
  })
}