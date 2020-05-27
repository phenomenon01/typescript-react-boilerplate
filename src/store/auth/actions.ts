import axios from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";
import { User, FETCH_USER, USER_AUTH_LOGOUT, AuthActionTypes } from "./types";

export const fetchUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: (action: AuthActionTypes) => void) => {
  try {
    const { data } = await axios.get("/api/user");
    dispatch({
      type: FETCH_USER,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_USER,
      payload: null,
    });
  }
};

export const logoutUser = (
  cb?: (a: string | null, b?: boolean) => void
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch: (action: AuthActionTypes) => void
) => {
  try {
    const { data } = await axios.post("/auth/logout");
    if (data) {
      dispatch({
        type: USER_AUTH_LOGOUT,
      });
      cb && cb(null, true);
    } else {
      cb && cb("Server Error!");
    }
  } catch (e) {
    if (e.response && e.response.status === 401)
      dispatch({
        type: USER_AUTH_LOGOUT,
      });
    cb && cb(e.response && e.response.data ? e.response.data : "Server Error");
  }
};

export const loginUser = (
  body: User,
  cb?: (a: string | null, b?: boolean) => void
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch: (action: AuthActionTypes) => void
) => {
  try {
    const { data } = await axios.post("/auth/login", body);
    if (data) {
      dispatch({
        type: FETCH_USER,
        payload: data,
      });
      cb && cb(null, true);
    } else {
      cb && cb("Server Error!");
    }
  } catch (e) {
    cb && cb(e.response && e.response.data ? e.response.data : "Server Error");
  }
};
