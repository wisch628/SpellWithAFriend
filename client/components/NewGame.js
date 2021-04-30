import React from 'react';
import { connect } from 'react-redux';
import { createGameThunkCreator, joinGameThunkCreator } from '../redux/game';
import { createUserThunkCreator, getUserThunkCreator } from '../redux/userReducer';
import { Redirect } from 'react-router-dom';
import Login from './Login';

export class NewGame extends React.Component {
    constructor(){
        super();
        this.state = {
            color: 'Red', 
            userSelected: false, 
            gameCode: '', 
            redirect: false
        };
        this.handleChange=this.handleChange.bind(this);
        this.onClick=this.onClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClick(event) {
        event.preventDefault();
        if (this.props.match.path === "/new") {
            this.props.createGame(this.props.user.id, this.state.color);
        } else if (this.props.match.path === "/join") {
            this.props.joinGame(this.props.user.id, this.state.color, this.state.gameCode);
        }
        
    }

    render() {
        let userSelected = this.state.userSelected;
        return (
            <div>
                {this.state.redirect ? (<Redirect push to={`/allgames/${this.props.user.id}`}/>) : null}
                {userSelected === false ?
                <div> 
                    <Login path={this.props.match.path} redirect={()=> this.setState({redirect: true})}onDone={()=> this.setState({userSelected:true})} />
                </div> : 
                <div>
                    <label>Select your color</label>
                <select name="color" onChange={this.handleChange} value={this.state.color}>
                    <option value="Red">Red</option>
                    <option value="Orange">Orange</option>
                    <option value="Green">Green</option>
                    <option value="Blue">Blue</option>
                    <option value="Purple">Purple</option>
                </select>
                {this.props.match.path === '/join' ? (
                    <form onSubmit={this.onClick}>
                        <p>Enter the six digit code of the game you want to join</p>
                        <input placeholder="Game Code" type="text" name="gameCode" value={this.state.gameCode} onChange={this.handleChange} />
                        <button type="submit">Join a Game</button>
                    </form>
                ) : (
                    <button onClick={this.onClick}>Create a Game</button>
                )}
                
                </div>
                }
                
                
            </div>
        );
    }
}

const mapState = (state) => {
    return {
      game: state.game,
      user: state.user
    };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      createGame: (userId, color) => dispatch(createGameThunkCreator(userId, color, history)),
      createUser: (user) => dispatch(createUserThunkCreator(user)),
      getUser: (email) => dispatch(getUserThunkCreator(email)),
      joinGame: (userId, color, gameCode) => dispatch(joinGameThunkCreator(userId, color, gameCode, history))
    };
  };

export default connect(mapState, mapDispatch)(NewGame);