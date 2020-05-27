import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "store";
import Loadable from "react-loadable";

const PrivateRoute: React.FC<PrivateRoutePropsType> = ({
  isAuth = false,
  isAuthenticated,
  component: Component,
  redirect = "/login",
  ...rest
}: PrivateRoutePropsType) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth || isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect to={redirect} />
          )
      }
    />
  );
};

interface PrivateRoutePropsType {
  isAuthenticated: boolean;
  component: React.FC<any> | Loadable.LoadableComponent & React.ComponentType<any>;
  path: string;
  redirect?: string;
  isAuth?: boolean;
  exact?: boolean;
}

function mapStateToProps({ auth }: RootState): { isAuthenticated: boolean } {
  return { isAuthenticated: auth.isAuthenticated };
}

export default connect(mapStateToProps)(PrivateRoute);
