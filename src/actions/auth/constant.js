import {
  getActionType
} from "../utils";

export const prefix = "action.user-info";
export const DISPLAY_NAME = getActionType(prefix)("DISPLAY_NAME");