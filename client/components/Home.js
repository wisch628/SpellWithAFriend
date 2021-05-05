import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import NewGame from './NewGame';
import Header from './Header';

export default class Home extends React.Component {

    render(){
        return (
            <div>
                <Header />
            <div className="home">
            <h1>Welcome to the multi-player Spelling Bee! How would you like to begin?</h1>
                <Link to="/new">
                    <button>Create a New Game</button>
                </Link>
                <Link to="/join">
                    <button>Join an Active Game</button>
                </Link>
                <Link to="/games">
                    <button>Load Your Active Games</button>
                </Link>
            </div>
            </div>
        )
    }
}