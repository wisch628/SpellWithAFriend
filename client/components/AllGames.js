import React from 'react';
import { connect } from 'react-redux';
import { getAllGamesThunkCreator} from '../redux/allGames';
import { Link } from 'react-router-dom'; 
import Header from './Header';

class AllGames extends React.Component {
    async componentDidMount(){
      await this.props.getAllGames(this.props.user.id);
    }
    render() {
        const allGames = this.props.allGames.games || [];
        return (
          <div>
            <Header />
          <h1>Your Active Games</h1>
            <div className="allGames">
                {allGames.length === 0 ? (<p>You don't have any open games!</p>) : 
                (allGames.map((game, index) => 
                    (<div className="oneGame">
                    <Link key={index+1} to={`/play/${game.id}/${this.props.allGames.id}`}>
                        <h1>Game {index+1}</h1>
                        {game.users.length === 1 ? (<p>Your team is empty!</p>) : (
                          <div>
                            <h3>Teammates: </h3>
                            {game.users.filter(user => user.id !==this.props.allGames.id).map(user => (
                            <p key={user.id}>{user.firstName} {user.lastName}</p>)
                            )
                        }
                        </div>)}
                        </Link>
                        </div>
                    )))}
            </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      allGames: state.allGames,
      user: state.auth
    };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      getAllGames: (userId) => dispatch(getAllGamesThunkCreator(userId))
    };
  };

export default connect(mapState, mapDispatch)(AllGames);