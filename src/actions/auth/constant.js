import {
  getActionType
} from "../utils";

export const prefix = "action.user-info";
export const SET_USER = getActionType(prefix)("SET_USER");
export const UPDATE_USER = getActionType(prefix)("UPDATE_USER");