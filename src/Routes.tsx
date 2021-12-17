import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import React, { Component, ReactElement } from 'react';
import Landingpage from "./sites/landinpage/Landingpage";
import LoginPage from "./sites/loginpage/loginpage";
import RegisterPage from "./sites/registerPage/registerPage";
import PasswordForgottenPage from "./sites/passwordForgottenPage/passwordForgottenPage";
import CreatedAccountPage from "./sites/createdAccountPage/createdAccountPage";
import Dashboard from "./sites/dashboard/Dashboard";
import GraphDetails from './sites/graph-details/GraphDetails';

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
                path={'/graph-details'}
                isAuthorized={true}
                component={GraphDetails}
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
