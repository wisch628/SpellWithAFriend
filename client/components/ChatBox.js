import React from 'react';
//import Message from './Message';
//import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux';
import {fetchMessagesThunkCreator, gotNewMessageFromServerThunkCreator} from '../redux/messages';

class MessagesList extends React.Component {
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
        [event.target.name]: event.target.value
    })
    }
  
    async handleSubmit(event) {
      event.preventDefault();
      const message = this.state.currentMessage;
      console.log(message);
      await this.props.post(this.props.game.id, message, this.props.user.id);
      await this.setState({
        currentMessage: ''
      })
  
    }
  

  async componentDidMount() {
    await this.props.fetchInitialMessages(Number(this.props.game.id));
  }

  render() {
    const messages = this.props.messages || [];
console.log(this.props)
    return (
      <div>
        <div className="messageContainer">
          {messages.length > 0 ? (messages.map((message) => 
          ( 
            message.userId === this.props.user.id ? (
            <div key={message.id} className="my-message">
              <h4>You</h4>
              <p>{ message.content }</p>
            </div>) : (
              <div key={message.id} className="message">
                <h4>{ message.user.firstName }</h4>
                <p>{ message.content }</p>
            </div>
            )
          ))) : (null)}
        </div>
        <form id="new-message-form" onSubmit={this.handleSubmit}>
          <input
            className="fnew-message-form"
            type="text"
            name="currentMessage"
            placeholder="Start chatting!"
            value={this.state.currentMessage}
            onChange = {this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
      </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    game: state.game,
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialMessages: (gameId) => dispatch(fetchMessagesThunkCreator(gameId)),
    post: (gameId, message, userId) => dispatch(gotNewMessageFromServerThunkCreator(gameId, message, userId))
};
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);