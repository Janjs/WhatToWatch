
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";

import LandingPage from "pages/LandingPage.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/"
        render={props => <LandingPage {...props} />}
      />
       <Redirect from="/Janjs/WhatToWatch" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
