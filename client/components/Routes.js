import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Puzzle from './Puzzle';
import Error from './Error';
import NewGame from './NewGame';
import Login from './Login';
import Home from './Home';

const Routes = () => {
  return (
    <Router>
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/new" component={NewGame} />
            <Route path={'/play/:gameId/:userId'} component={Puzzle} />
            <Route component={Error} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;