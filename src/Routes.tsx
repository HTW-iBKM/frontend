import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import React, { Component, ReactElement, useState } from 'react';
import Landingpage from "./sites/landinpage/Landingpage";
import LoginPage from "./sites/loginpage/loginpage";
import RegisterPage from "./sites/registerPage/registerPage";
import PasswordForgottenPage from "./sites/passwordForgottenPage/passwordForgottenPage";
import CreatedAccountPage from "./sites/createdAccountPage/createdAccountPage";
import Dashboard from "./sites/dashboard/Dashboard";
import GraphDetails from './sites/graph-details/GraphDetails';

import auth from "./services/Auth";
import { ToastContext, ToastContextInterface, ToastInterface } from "./context/ToastContext";

// interface RestrictedRouteProps extends RouteProps {
//     isAuthorized: boolean;
// }

function RestrictedRoute({ ...rest }): ReactElement {
    const isAuthenticated = auth.isAuthenticated();
    return (
        !isAuthenticated ?
            <Redirect
                exact
                to={{
                    pathname: '',
                }}
            /> :

            <Route
                {...rest}
                render={(props: RouteProps) => <Component {...props} />}
            />
    );
}

function PublicRoutes(): ReactElement {
    const [toasts, setToasts] = useState<ToastInterface[]>([]);
    const defaultToastContext: ToastContextInterface = {
        toasts,
        setToasts
    }

    return (
        <ToastContext.Provider value={defaultToastContext}>
            <Switch>
                <Route
                    exact
                    path={'/'}
                    component={Landingpage}
                />

                <RestrictedRoute
                    exact
                    path={'/graph-details'}
                    component={GraphDetails}
                />

                <RestrictedRoute
                    path={'/dashboard'}
                    component={Dashboard}
                >
                </RestrictedRoute>
                <Route
                    exact
                    path={'/login'}
                    // isAuthorized={true}
                    component={(() => {
                        const component = LoginPage;
                        return component;
                    })()}
                />

                <Route
                    exact
                    path={'/passwordForgotten'}
                    // isAuthorized={true}
                    component={PasswordForgottenPage}
                />

                <Route
                    exact
                    path={'/register'}
                    // isAuthorized={true}
                    component={RegisterPage}
                />

                <Route
                    exact
                    path={'/createdAccount'}
                    // isAuthorized={true}
                    component={CreatedAccountPage}
                />

                <Redirect to={'/'} />
            </Switch>
        </ToastContext.Provider >
    );
}

export default PublicRoutes;
