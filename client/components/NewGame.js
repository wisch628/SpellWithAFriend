import React from 'react';
import { connect } from 'react-redux';
import { createGameThunkCreator } from '../redux/game';
import { createUserThunkCreator, getUserThunkCreator } from '../redux/userReducer';
import Login from './Login';


export class NewGame extends React.Component {
    constructor(){
        super();
        this.state = {
            color: 'red', 
            userSelected: false
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
        this.props.createGame(this.props.user.id, this.state.color);
    }

    render() {

        //if they are logged in, automatically just send them to a new game
        //otherwise, offer three options: login, sign up, play as guest
        let userSelected = this.state.userSelected;
        return (
            <div>
                {userSelected === false ?
                <div> 
                    <h1>If you want to save your game stats, either sign up or login as a user. Otherwise, you can continue as a guest!</h1>
                    <Login onDone={()=> this.setState({userSelected:true})} />
                </div> : 
                <div>
                    <label>Select your color</label>
                <select name="color" onChange={this.handleChange} value={this.state.color}>
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                </select>
                <button onClick={this.onClick}>Create a Game</button>
                </div>
                }
                
                
            </div>
        );
    }
}

const mapState = (state) => {
    return {
      game: state.gameId,
      user: state.user
    };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      createGame: (userId, color) => dispatch(createGameThunkCreator(userId, color, history)),
      createUser: (user) => dispatch(createUserThunkCreator(user)),
      getUser: (email) => dispatch(getUserThunkCreator(email))
    };
  };

export default connect(mapState, mapDispatch)(NewGame);