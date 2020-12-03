import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components:
import login from "pages/Login";
import Register from "pages/Register";
import Main from "./Main";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/login"]} component={login} />
        <Route exact path="/register" component={Register} />
        <Route component={Main} />
      </Switch>
    </Router>
  );
}
