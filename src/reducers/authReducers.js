import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      // console.log(action.payload);
      // console.log(Object.keys(action.payload).length ? true : false);
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length ? true : false,
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
