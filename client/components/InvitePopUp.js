import React from "react";
import { connect } from "react-redux";

const InvitePopUp = (props) => {
  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.togglePopUp('seen')}>
          &times;
        </span>
        <h3>Your game code is:</h3>
        <h3 className="Blue">{props.game.code}</h3>
        <p>Send this code to friends for them to join your game!</p>
        <br />
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    game: state.game,
  };
};

export default connect(mapState, null)(InvitePopUp);
