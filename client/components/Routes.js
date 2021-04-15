import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Puzzle from './Puzzle';
import Error from './Error';

const Routes = () => {
  return (
    <Router>
      <div>
        <main>
          <Switch>
            <Route
            exact path="/" render={() =>
            (<h1>
              Hello World!
             </h1>
            )} />
            <Route exact path="/play" component={Puzzle} />
            <Route component={Error} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;