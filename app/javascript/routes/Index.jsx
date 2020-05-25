import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Qualifications from "../components/Qualifications";
import Qualification from "../components/Qualification";
import NewQualification from "../components/NewQualification";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/qualifications" exact component={Qualifications} />
      <Route path="/qualification/:id" exact component={Qualification} />
      <Route path="/qualification" exact component={NewQualification} />
    </Switch>
  </Router>
);