import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const GameTopNav = (props) => {
  return (
    <nav className="top">
      <h3>
        {props.data.displayWeekday} {props.data.displayDate}
      </h3>
      <h3>Player: {props.user.firstName}</h3>
      <h3>
        Color:{" "}
        <span
          className={
            props.gameUsers.filter(
              (user) => user.id === props.user.id
            )[0].games[0]["user-game-as"].color
          }
        >
          {
            props.gameUsers.filter(
              (user) => user.id === props.user.id
            )[0].games[0]["user-game-as"].color
          }
        </span>
      </h3>
      <button onClick={() => props.togglePopUp("seen")}>Invite Friends</button>
      <Link to={`/allgames`}>
        <button>Load other games</button>{" "}
      </Link>
      <Link to="/data">
        <button>View your stats</button>
      </Link>
      <button onClick={() => props.togglePopUp("team")}>Your Team</button>
    </nav>
  );
};


const mapState = (state) => {
    return {
      data: state.data,
      gameUsers: state.gameUsers,
      user: state.auth
    };
  };
  
  export default connect(mapState, null)(GameTopNav);