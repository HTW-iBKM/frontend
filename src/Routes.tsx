import {Redirect, Route, RouteProps, Switch} from "react-router-dom";
import React, {Component,ReactElement} from 'react';
import Landingpage from "./sites/landinpage/Landingpage";
import Dashboard from "./sites/dashboard/Dashboard";
import Graph from "./sites/dashboard/Graph";

interface RestrictedRouteProps extends RouteProps {
  isAuthorized: boolean;
}

function RestrictedRoute({isAuthorized, ...rest}: RestrictedRouteProps): ReactElement {
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
                component={Graph}
            />

            <RestrictedRoute
              path={'/dashboard'}
              isAuthorized={true}
              component={Dashboard}
            >
          </RestrictedRoute>
        </Switch>
    );
}

export default PublicRoutes;
