import React from 'react';
import { connect } from 'react-redux';
import { createGameThunkCreator } from '../redux/game';


export class NewGame extends React.Component {
    constructor(){
        super();
        this.state = {
            color: 'red'
        };
        this.handleChange=this.handleChange.bind(this);
        this.onClick=this.onClick.bind(this);
    }

    // componentDidMount() {
    //    // this.setState({color: 'red'})
    // }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClick(event) {
        event.preventDefault();
        this.props.createGame({color: this.state.color});
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Welcome to the Spelling Bee! Click below to make a new game</h1>
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
        );
    }
}

const mapState = (state) => {
    return {
      game: state.gameId
    };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      createGame: (color) => dispatch(createGameThunkCreator(color, history))
    };
  };

export default connect(mapState, mapDispatch)(NewGame);