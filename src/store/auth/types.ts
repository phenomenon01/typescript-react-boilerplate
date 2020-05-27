export const FETCH_USER = "FETCH_USER";
export const USER_AUTH_LOGOUT = "USER_AUTH_LOGOUT";

export interface AuthState {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  pic?: string;
}

interface FetchUserAction {
  type: typeof FETCH_USER;
  payload: User | null;
}

interface LogoutAction {
  type: typeof USER_AUTH_LOGOUT;
}

export type AuthActionTypes = FetchUserAction | LogoutAction;
