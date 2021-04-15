import React from 'react';

export default function hexagon (props) {
    return (
        <div className={props.className} style={{cursor: 'pointer'}}>
            <div className="cell-top" />
            <div className="cell-center">
                <h5>{props.letter}</h5>
            </div>
            <div className="cell-bottom" />

        </div>
    )
}
