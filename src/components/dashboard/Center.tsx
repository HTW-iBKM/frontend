import React, {ReactElement} from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";

function Center(): ReactElement {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.path}>
        Mount Dashboard Home Component here
      </Route>

      <Route exact path={`${match.path}/files`}>
        Mount File Component here
      </Route>
    </Switch>
  )
}


export default Center