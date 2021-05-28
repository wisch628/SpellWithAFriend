import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { logOutThunk } from '../redux/auth';

function Header (props) {
    return (
        <div>
            {props.user.id && 
            <Link to="/" onClick={props.logOut}>Logout</Link>
            }
            <div className="header">
                <p>Inspired By</p>
                <img id="nylogo" src="https://contributorrewards.com/wordpress/wp-content/uploads/2020/07/NYT-Games_Wordmark-1.png"/>
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
      user: state.auth
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
        logOut: () => 
            dispatch(logOutThunk())
  }
}

export default connect(mapState, mapDispatch)(Header);