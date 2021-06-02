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
    this.props.write(event.target.value)
  }

  async handleSubmit(event) {
    event.preventDefault();
    const message = this.props.newMessageEntry;
    await this.props.post(this.props.game.id, message, this.props.user.id);
    // this.setState({
    //   currentMessage: ''
    // })

  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="currentMessage"
            placeholder="Say something nice..."
            value={this.props.newMessageEntry}
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

const mapStateToProps = (state) => {
  return {
    newMessageEntry: state.newMessageEntry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    post: (gameId, message, userId) => dispatch(gotNewMessageFromServerThunkCreator(gameId, message, userId)),
    write: (string) => dispatch(writeNewMessage(string))
  };
}

 export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);