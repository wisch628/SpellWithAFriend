import React, { Component } from 'react';
import {writeNewMessage, gotNewMessageFromServerThunkCreator} from '../redux/messages';
import { connect } from 'react-redux';

class NewMessageEntry extends Component {
constructor() {
  super();
  this.state = {
    currentMessage: ''
  }
  this.handleChange=this.handleChange.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
}
  handleChange(event) {
    this.setState({
      [event.target.name]: (event.target.value)
  })
  }

  async handleSubmit(event) {
    event.preventDefault();
    const message = this.state.currentMessage;
    await this.props.post(this.props.game.id, message, this.props.user.id);

  }

  render () {
    console.log(this.state);
    console.log(this.props, 'props');
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="currentMessage"
            placeholder="Say something nice..."
            value={this.state.currentMessage}
            onChange = {this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    post: (gameId, message, userId) => dispatch(gotNewMessageFromServerThunkCreator(gameId, message, userId))
  };
}

 export default connect(null, mapDispatchToProps)(NewMessageEntry);