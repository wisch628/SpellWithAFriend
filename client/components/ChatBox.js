import React from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux';
import {fetchMessagesThunkCreator} from '../redux/messages';

class MessagesList extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    await this.props.fetchInitialMessages(Number(this.props.game.id));
  }

  render() {
    const messages = this.props.messages || [];
    console.log('messages', messages);
    return (
      <div>
        <ul className='media-list'>
          {messages.length > 0 ? (messages[0].map((message) => 
          (
            <Message message={message} key={message.id} />
          ))) : (null)}
        </ul>
        <NewMessageEntry user={this.props.user} game={this.props.game} />
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
    fetchInitialMessages: (gameId) => dispatch(fetchMessagesThunkCreator(gameId))};
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);