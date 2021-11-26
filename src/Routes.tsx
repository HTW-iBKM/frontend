import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import React, { Component, ReactElement } from 'react';
import Landingpage from "./sites/landinpage/Landingpage";
import Dashboard from "./sites/dashboard/Dashboard";
import GraphTest from "./sites/dashboard/GraphTest";
// import { Redirect, Route, Switch } from "react-router-dom";
// import React from 'react';
// import dashboard from "./sites/dashboard/dashboard";
// import LandingPage from "./sites/landinpage/landingpage";
import LoginPage from "./sites/loginpage/loginpage";
import RegisterPage from "./sites/registerPage/registerPage";
import PasswordForgottenPage from "./sites/passwordForgottenPage/passwordForgottenPage";
import CreatedAccountPage from "./sites/createdAccountPage/createdAccountPage";

interface RestrictedRouteProps extends RouteProps {
    isAuthorized: boolean;
}

function RestrictedRoute({ isAuthorized, ...rest }: RestrictedRouteProps): ReactElement {
    return (
        <Route
            {...rest}
            render={(props: RouteProps) =>
                isAuthorized ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: {
                                from: props.location,
                            },
                        }}
                    />
                )
            }
        />
    );
}

function PublicRoutes(): ReactElement {
    return (
        <Switch>
            <RestrictedRoute
                exact
                path={'/'}
                isAuthorized={true}
                component={Landingpage}
            />

            <RestrictedRoute
                exact
                path={'/graph-test'}
                isAuthorized={true}
                component={GraphTest}
            />

            <RestrictedRoute
                path={'/dashboard'}
                isAuthorized={true}
                component={Dashboard}
            >
            </RestrictedRoute>
            <RestrictedRoute
                exact
                path={'/login'}
                isAuthorized={true}
                component={LoginPage}
            />

            <RestrictedRoute
                exact
                path={'/passwordForgotten'}
                isAuthorized={true}
                component={PasswordForgottenPage}
            />

            <RestrictedRoute
                exact
                path={'/register'}
                isAuthorized={true}
                component={RegisterPage}
            />

            <RestrictedRoute
                exact
                path={'/createdAccount'}
                isAuthorized={true}
                component={CreatedAccountPage}
            />
        </Switch>
    );
}

export default PublicRoutes;