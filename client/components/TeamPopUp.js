import React from 'react';
import { connect } from 'react-redux';

const TeamPopUp = (props) => {
    return (
        <div className={['word-container', 'team'].join(' ')} >
            {props.gameUsers.length>1 ? 
              props.gameUsers.filter(user => user.id !== props.user.id).map(user => {
              const color = user.games[0]['user-game-as'].color;
              return (
                <p className={['correct', color].join(' ')} key={user.id}>{user.firstName}</p>
            )}) : (
              <div>
                <p>Your team is empty!</p>
                <button onClick={() => props.togglePopUp('seen')}>Invite Friends</button>
              </div>)}
          </div>
    )
}

const mapState = (state) => {
    return {
      gameUsers: state.gameUsers,
      user: state.auth
    };
  };

  export default connect(mapState, null)(TeamPopUp);