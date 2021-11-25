import { Redirect, Route, Switch } from "react-router-dom";
import React, { ReactElement } from 'react';
import dashboard from "./sites/dashboard/dashboard";
import LandingPage from "./sites/landinpage/landingpage";

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


function PublicRoutes(): ReactElement {
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
        </Switch>
    )
}

export default PublicRoutes;
