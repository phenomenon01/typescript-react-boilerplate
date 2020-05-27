import {
  FETCH_USER,
  USER_AUTH_LOGOUT,
  AuthState,
  AuthActionTypes,
} from "./types";
const initialState: AuthState = {
  loading: true,
  user: null,
  isAuthenticated: false,
};

export default function (
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case FETCH_USER:
      return {
        loading: false,
        user: action.payload || null,
        isAuthenticated: action.payload !== null ? true : false,
      };
    case USER_AUTH_LOGOUT:
      return { loading: false, user: null, isAuthenticated: false };
    default:
      return state;
  }
}
