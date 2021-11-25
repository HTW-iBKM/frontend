import React, {ReactElement} from "react";
import {Route, HashRouter, Switch, useRouteMatch} from "react-router-dom";

function Center(): ReactElement {
  const match = useRouteMatch();
  console.log((match.path));
  return (
    <Switch>
      <Route path={match.path}>
        Hello
      </Route>

      <Route path={`${match.path}/files`} component={() => {return(<div>Files</div>)}}>
      </Route>
    </Switch>
  )
}
export default Center