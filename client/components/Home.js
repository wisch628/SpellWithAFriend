import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import NewGame from './NewGame';
import Header from './Header';
import Login from './Login';

class Home extends React.Component {

    render(){
        const { isLoggedIn } = this.props;
        return (
            <div className="home">
                <Header />
            <div>
            <img className="bee" src={window.location.origin + '/bee-clipart.png'}/>
            {isLoggedIn ? (
     <div>
     <h1>{`Welcome, ${this.props.user.firstName}!`}</h1>
      <h2>What would you like to do today?</h2>
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
            ) : (
            <Login />        
            )}
        
            </div>
            <footer>
            <p>Built by <a target="blank" href="https://www.linkedin.com/in/hannah-wischnia/">Hannah Wischnia</a></p>
            </footer>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      user: state.auth,
      isLoggedIn: !!state.auth.id
    };
  };
  


export default connect(mapState, null)(Home)