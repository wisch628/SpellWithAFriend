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
      <div className="messageContainer">
        <div className="innerMessages">
          {messages.length > 0 ? (messages.map((message) => 
          ( 
            message.userId === this.props.user.id ? (
            <div key={message.id} className={['my-message', 'message', this.props.gameUsers.filter(user => user.id === message.userId)[0].games[0]['user-game-as'].color].join(' ')}>
              <h4>You</h4>
              <p>{ message.content }</p>
            </div>) : (
              <div key={message.id} className={['message', this.props.gameUsers.filter(user => user.id === message.userId)[0].games[0]['user-game-as'].color].join(' ')}>
                {console.log(this.props.gameUsers.filter(user => user.id === message.userId)[0].games[0]['user-game-as'].color)}
                <h4>{ message.user.firstName }</h4>
                <p >{ message.content }</p>
            </div>
            )
          ))) : (null)}
        </div>
        <form id="new-message-form" className="new-message-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="currentMessage"
            placeholder="Write your message"
            value={this.state.currentMessage}
            onChange = {this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Send</button>
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
    messages: state.messages,
    gameUsers: state.gameUsers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialMessages: (gameId) => dispatch(fetchMessagesThunkCreator(gameId)),
    post: (gameId, message, userId) => dispatch(gotNewMessageFromServerThunkCreator(gameId, message, userId)),
    getGameUsers: (gameId) => dispatch(getGameUsersThunkCreator(gameId))
};
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);