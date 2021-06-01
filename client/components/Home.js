import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import NewGame from './NewGame';
import Header from './Header';

class Home extends React.Component {

    render(){
        console.log(this.props);
        return (
            <div>
                <Header />
            <div className="home">
            <h1>{`Welcome, ${this.props.user.firstName}! What would you like to do today?`}</h1>
                <Link to="/new">
                    <button>Create a New Game</button>
                </Link>
                <Link to="/join">
                    <button>Join an Active Game</button>
                </Link>
                <Link to="/allgames">
                    <button>Load Your Active Games</button>
                </Link>
            </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      user: state.auth
    };
  };
  


export default connect(mapState, null)(Home)