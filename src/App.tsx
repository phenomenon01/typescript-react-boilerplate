import React from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import history from "routerHistory";
import Loadable from "react-loadable";
import PrivateRoute from "components/PrivateRoute";
import useAuth from "components/useAuth";

const LoadingModal = () => <div>Loading</div>;

const AsyncLogin = Loadable({
  loader: () => import("./views/Login"),
  loading: LoadingModal,
});

const AsyncDashboard = Loadable({
  loader: () => import("./views/Dashboard"),
  loading: LoadingModal,
});

const App:React.FC<AppPropsType> = (props:AppPropsType) => {
  return (
    <Router history={history}>
        <Switch>
          <PrivateRoute path="/" component={AsyncDashboard} exact />
          <PrivateRoute
            path="/login"
            isAuth={!props.isAuthenticated}
            redirect="/"
            component={AsyncLogin}
            exact
          />
          <Route path="/page-not-found" component={AsyncDashboard} exact />
          <Redirect from="*" to="/page-not-found" />
        </Switch>
    </Router>
  );
};

interface AppPropsType {
  isAuthenticated:boolean
}

export default useAuth(App);
