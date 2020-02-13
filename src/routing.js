import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from './components/login/login';
import PlanetList from './components/planetsList/planetList';

function Routing() {
    return(
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/planets" component={PlanetList} />
          {/* by default goes to login  */}
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default Routing;


