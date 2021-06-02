import React from 'react';
import { connect } from 'react-redux';

const WordContainer = (props) => {
    const correctWords = props.words || [];
    return (
        <div className="right-container">
        <p>Your team has found {correctWords.length || 0} words</p>
        <div className="word-container">
          {correctWords.length > 0
            ? correctWords.map((wordObject) => {
                const capitalized =
                  wordObject.word.charAt(0).toUpperCase() +
                  wordObject.word.slice(1);
                const user = props.gameUsers.filter(
                  (user) => user.id === wordObject.userId
                )[0];
                const color = user.games[0]["user-game-as"].color;
                return (
                  <p
                    className={["correct", color].join(" ")}
                    key={wordObject.id}
                  >
                    {capitalized}
                  </p>
                );
              })
            : "Start Guessing!"}
        </div>
      </div>
    )
}

const mapState = (state) => {
    return {
        words: state.words,
        gameUsers: state.gameUsers
    };
  };

  export default connect(mapState, null)(WordContainer);