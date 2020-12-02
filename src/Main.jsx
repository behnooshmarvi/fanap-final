import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Cost from "pages/Cost";

export default function Main() {
  return (
    <>
     
        
        <Switch>
          <Route exact path={["/Cost"]} component={Cost} />
          <Route component={() => <h1>Not Found</h1>} />
        </Switch>
  
    </>
  );
  }
