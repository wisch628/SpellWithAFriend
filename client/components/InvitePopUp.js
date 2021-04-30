import React from 'react';

export default class InvitePopUp extends React.Component {
    constructor () {
        super();
        this.handleClick=this.handleClick.bind(this);
    }
    
    handleClick () {
        this.props.togglePopUp();
    }

    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                    &times;
                    </span>
                        <h3>Your game code is:</h3>
                        <h3 className="Blue">{this.props.game.code}</h3>
                        <p>Send this code to friends for them to join your game!</p>
                        <br />
                </div>
            </div>
        );
    }
}