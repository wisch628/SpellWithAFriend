import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Puzzle from './Puzzle';
import Error from './Error';
import NewGame from './NewGame';
import Login from './Login';
import Home from './Home';
import AllGames from './AllGames';
import Data from './Data';
import {me} from '../redux/auth';

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
  const { isLoggedIn } = this.props;
  return (
    <Router>
      <div>
        <main>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new" component={NewGame} />
            <Route exact path="/join" component={NewGame} />
            <Route exact path="/allgames/" component={AllGames} />
            <Route exact path="/data" component={Data} />
            <Route path={'/play/:gameId/'} component={Puzzle} />
            <Route component={Error} />
          </Switch>
        ) : (
          <Switch>
          <Route path="/" component={Login} />
          <Redirect to="/" />
          </Switch>

        )
        
        }
        </main>
      </div>
    </Router>
  );
}
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);