import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Puzzle from './Puzzle';
import Error from './Error';
import NewGame from './NewGame';

const Routes = () => {
  return (
    <Router>
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={NewGame} />
            <Route path={'/play/:id'} component={Puzzle} />
            <Route component={Error} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;