import {
  getActionType
} from "../utils";

export const prefix = "action.auth";
export const GET_CAPITALS = getActionType(prefix)("GET_CAPITALS");

