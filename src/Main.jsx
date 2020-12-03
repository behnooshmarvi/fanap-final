import React from "react";
import { Switch, Route } from "react-router-dom";

import CostContainer from "pages/Cost";

export default function Main() {
  return (
    <>
      <Switch>
        <Route exact path={["/Cost"]} component={CostContainer} />
        <Route component={() => <h1>Not Found</h1>} />
      </Switch>
    </>
  );
}
