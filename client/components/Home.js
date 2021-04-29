import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 

export default class Home extends React.Component {

    render(){
        return (
            <div>
            <h1>Welcome to the multi-player Spelling Bee! How would you like to begin?</h1>
                <Link to="/new">
                <button>Create a Game</button>
                </Link>
                <button>Join a Game</button>
            </div>
        )
    }
}