import {Redirect, Route, Switch} from "react-router-dom";
import React, {Component, ReactElement} from 'react';
import GraphTest from "./sites/dashboard/GraphTest";
import LandingPage from "./sites/landinpage/landingpage";
import Dashboard from "./sites/dashboard/Dashboard";

function RestrictedRoute({ component: Component, isAuthorized, ...rest }: any): ReactElement {
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
        </Switch>
    )
}

export default PublicRoutes;