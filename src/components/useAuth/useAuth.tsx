import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "store";
import { fetchUser } from "store/auth/actions";

const useAuth = (ChildComponent: React.FC<any>) => {
    const ComposedComponent: React.FC<any> = ({ fetchUser, ...props }) => {

        useEffect(() => {
            fetchUser();
        }, [fetchUser])

        return <>{!props.isAuthLoading ? (
            <ChildComponent {...props} />
        ) : (
                ""
            )}</>;
    }

    return connect(mapStateToProps, { fetchUser })(
        ComposedComponent
    );
};

function mapStateToProps({ auth }: RootState): { isAuthLoading: boolean; isAuthenticated: boolean } {
    return {
        isAuthLoading: auth.loading,
        isAuthenticated: auth.isAuthenticated
    };
}

export default useAuth;
