import React, {ReactElement} from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";

function Center(): ReactElement {
  const match = useRouteMatch();
  console.log((match.path));
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