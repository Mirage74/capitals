import {
  getActionType
} from "../utils";

export const prefix = "action.auth";
export const GET_CAPITALS = getActionType(prefix)("GET_CAPITALS");
export const SET_COUNTRIES_LIST = getActionType(prefix)("SET_COUNTRIES_LIST");
export const CUT_COUNTRIES_LIST = getActionType(prefix)("CUT_COUNTRIES_LIST");
export const SET_USERS_LIST = getActionType(prefix)("SET_USERS_LIST");




