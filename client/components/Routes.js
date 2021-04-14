import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Sample from './Sample';
import Error from './Error';
import Nav from './Nav';

const Routes = () => {
  return (
    <Router>
      <div>
        <Nav />
        <main>
          <Switch>
            <Route
            exact path="/" render={() =>
            (<h1>
              Hello World!
             </h1>
            )} />
            <Route exact path="/sample" component={Sample} />
            <Route component={Error} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;