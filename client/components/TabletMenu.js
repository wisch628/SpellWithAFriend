import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOutThunk } from "../redux/auth";

const TabletMenu = (props) => {
  return (
    <div className="sideMenu">
      <h4 id="playerName">
        Player:{" "}
        <span
          className={
            props.gameUsers.filter((user) => user.id === props.user.id)[0]
              .games[0]["user-game-as"].color
          }
        >
          {
            props.user.firstName
          }
        </span>
      </h4>
      <Link onClick={() => props.togglePopUp("seen")}>
        <h4>Invite Friends</h4>
      </Link>

      <Link to={`/allgames`}>
        <h4>Load other games</h4>
      </Link>
      <Link onClick={() => props.togglePopUp("team")}>
        <h4>Your Team</h4>
      </Link>
      <Link onClick={props.logOut} to="/">
        <h4>Logout</h4>
      </Link>
    </div>
  );
};

const mapState = (state) => {
    return {
      gameUsers: state.gameUsers,
      user: state.auth
    };
  };

const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(logOutThunk()),
  };
};

export default connect(mapState, mapDispatch)(TabletMenu);
