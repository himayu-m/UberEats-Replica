import { LOGIN } from "../constants/action-types";
import { LOGOUT } from "../constants/action-types";
import { ERROR } from "../constants/action-types";

const initialState = {
  user: {},
  token: ""
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("Inside reducer :", action.payload);
      state = {
        user: action.payload.user,
        token: action.payload.token}
      return state;
    case ERROR:
      return {
        ...state,
        result: action.payload,
      };
    case LOGOUT:
      return {
        state: {},
      };

    default:
      return {...state};
  }
};

export default loginReducer;
