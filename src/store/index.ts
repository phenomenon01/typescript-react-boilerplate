import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { routerReducer } from "react-router-redux";
import reduxThunk from "redux-thunk";
import authReducer from "./auth/reducers";

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//for redux debug mode in development
const composeEnhancers = process.env.REACT_APP_REDUX_DEV_TOOL
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
