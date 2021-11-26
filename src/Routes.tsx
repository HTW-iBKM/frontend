import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import React, {Component,ComponentProps, JSXElementConstructor, ReactElement} from 'react';
import Landingpage from "./sites/landinpage/Landingpage";
import Dashboard from "./sites/dashboard/Dashboard";
import GraphTest from "./sites/dashboard/GraphTest";

interface RestrictedRouteProps extends ComponentProps<JSXElementConstructor<any>> {
  isAuthorized: boolean;
}

function RestrictedRoute({isAuthorized, ...rest}: RestrictedRouteProps): ReactElement {
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps<{[x: string]: string | undefined;}>) =>
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
        </Switch>
    );
}

export default PublicRoutes;