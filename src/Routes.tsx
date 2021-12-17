import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import React, { Component, ReactElement } from 'react';
import Landingpage from "./sites/landinpage/Landingpage";
import Graph from "./components/graph/Graph";
import DashboardLayout from './layouts/DashboardLayout';

// import Dashboard from "./sites/dashboard/Dashboard";
// import GraphTest from "./sites/dashboard/GraphTest";
import LoginPage from "./sites/loginpage/loginpage";
import RegisterPage from "./sites/registerPage/registerPage";
import PasswordForgottenPage from "./sites/passwordForgottenPage/passwordForgottenPage";
import CreatedAccountPage from "./sites/createdAccountPage/createdAccountPage";
import auth from "./services/Auth";

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
                    pathname: '/login',
                }}
            /> :

            <Route
                {...rest}
                render={(props: RouteProps) => <Component {...props} />}
            />


    );
}

function PublicRoutes(): ReactElement {
    return (
        <Switch>
            <RestrictedRoute
                exact
                path={'/'}
                component={Landingpage}
            />

            <RestrictedRoute
                exact
                path={'/graph-test'}
                component={Graph}
            />

            <RestrictedRoute
                path={'/dashboard'}
                component={DashboardLayout}
            >
            </RestrictedRoute>
            <Route
                exact
                path={'/login'}
                // isAuthorized={true}
                component={LoginPage}
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

            <Route
                exact
                path={'/login'}
                // isAuthorized={true}
                component={LoginPage}
            />

            <Route
                exact
                path={'/passwordForgotten'}
                // isAuthorized={true}
                component={PasswordForgottenPage}
            />

            <RestrictedRoute
                exact
                path={'/register'}
                // isAuthorized={true}
                component={RegisterPage}
            />

            <RestrictedRoute
                exact
                path={'/createdAccount'}
                // isAuthorized={true}
                component={CreatedAccountPage}
            />
        </Switch>
    );
}

export default PublicRoutes;
