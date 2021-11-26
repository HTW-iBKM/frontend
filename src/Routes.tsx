import { Redirect, Route, Switch } from "react-router-dom";
import React from 'react';
import dashboard from "./sites/dashboard/dashboard";
import LandingPage from "./sites/landinpage/landingpage";
import LoginPage from "./sites/loginpage/loginpage";
import RegisterPage from "./sites/registerPage/registerPage";
import PasswordForgottenPage from "./sites/passwordForgottenPage/passwordForgottenPage";

function RestrictedRoute({ component: Component, isAuthorized, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={(props) =>
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


function PublicRoutes() {
    return (
        <Switch>
            <RestrictedRoute
                exact
                path={'/'}
                isAuthorized={true}
                component={LandingPage}
            />

            <RestrictedRoute
                exact
                path={'/dashboard'}
                isAuthorized={true}
                component={dashboard}
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
        </Switch>
    )
}

export default PublicRoutes;