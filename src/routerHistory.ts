import { createBrowserHistory } from "history";
//@ts-ignore
import { syncHistoryWithStore } from "react-router-redux";
import store from "./store";

const history = createBrowserHistory();
//@ts-ignore
export default syncHistoryWithStore(history, store);

export const nativeHistory = history;
