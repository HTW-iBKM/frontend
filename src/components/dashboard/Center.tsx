import React, {ReactElement} from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";

function Center(): ReactElement {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.path}>
        Hello
      </Route>

      <Route exact path={`${match.path}/files`}>
        files
      </Route>
    </Switch>
  )
}
export default Center