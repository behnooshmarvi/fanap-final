import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthProvider } from "providers/auth";
import login from "pages/Login";
import Register from "pages/Register";
import Main from "components/Main";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
  //   <AuthProvider>
  //   <CssBaseline />
  //   <ToastContainer />
     <Router>
     <Switch>
       <Route exact path="/login" component={login} />
     <Route exact path="/register" component={Register} />
     <Route component={Main} />
     </Switch>
 </Router>
  // </AuthProvider>
  // )
  );
}
