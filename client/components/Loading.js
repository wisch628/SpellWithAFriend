import React from 'react';

const Loading = (props) => {
  
    return (
      <div className="loader-container">
        <div className="loader">
        <div className="loader-bar" style={{width:`${props.progress}%`}}/>
      </div>
        <span className="loading-text">
          {props.message ? props.message : "Loading..."}
        </span>
      </div>
    )
  }

  export default Loading;