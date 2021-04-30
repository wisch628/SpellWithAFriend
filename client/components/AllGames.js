import React from 'react';
import { connect } from 'react-redux';
import { getUserThunkCreator } from '../redux/userReducer';
import { getAllGamesThunkCreator} from '../redux/allGames';
import { Link } from 'react-router-dom'; 

class AllGames extends React.Component {
    async componentDidMount(){
      await this.props.getAllGames(this.props.match.params.userId);
    }
    render() {
        const allGames = this.props.allGames.games || [];
        return (
            <div>
                {allGames.length === 0 ? (<p>You don't have any open games!</p>) : 
                (allGames.map(game => 
                    (<Link key={game.id} to={`/play/${game.id}/${this.props.allGames.id}`}>
                        <div>
                        <h1>Game {game.id}</h1>
                        <h3>Teammates: </h3>
                        {game.users.length === 0 ? (<p>Empty</p>) : (
                            (game.users.filter(user => user.id !==this.props.allGames.id).map(user => (
                            <p key={user.id}>{user.firstName} {user.lastName}</p>)
                        )))}
                        </div>
                    </Link>)))}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      allGames: state.allGames,
      user: state.user
    };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      getUser: (email) => dispatch(getUserThunkCreator(email)),
      getAllGames: (userId) => dispatch(getAllGamesThunkCreator(userId))
    };
  };

export default connect(mapState, mapDispatch)(AllGames);