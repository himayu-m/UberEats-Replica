import { LOGIN } from "../constants/action-types";
import { LOGOUT } from "../constants/action-types";
import { ERROR } from "../constants/action-types";

export const loginUser = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};
export const errorUsecase = (payload) => {
  return {
    type: ERROR,
    payload,
  };
};
export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
