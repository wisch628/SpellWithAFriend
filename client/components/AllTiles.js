import React, { useState } from "react";
import { connect } from "react-redux";
import Hexagon from "./Hexagon";

const AllTiles = (props) => {
  const center = props.data.centerLetter;
  const firstArray = props.data.outerLetters.map((letter) =>
    letter.toUpperCase()
  );
  const [outside, setOutside] = useState(firstArray);

  function shuffleLetters() {
    setOutside([...outside].sort((a, b) => 0.5 - Math.random()));
  }

  return (
    <div>
      <button type="button" onClick={shuffleLetters}>
        Shuffle Letters
      </button>
      <p>{outside[0]}</p>
      <div className="game-container" onClick={props.letterClick}>
        <div className="game-wrapper">
          <Hexagon letter={outside[0]} className={["hex", "odd"].join(" ")} />
          <Hexagon letter={outside[1]} className="hex" />
          <Hexagon letter={outside[2]} className={["hex", "odd"].join(" ")} />
        </div>
        <div className="game-wrapper">
          <Hexagon letter={outside[3]} className={["hex", "odd"].join(" ")} />
          <Hexagon
            letter={center.toUpperCase()}
            className={["hex", "center"].join(" ")}
          />
          <Hexagon letter={outside[4]} className={["hex", "odd"].join(" ")} />
        </div>
        <div className={["game-wrapper", "special"].join(" ")}>
          <Hexagon letter={outside[5]} className="hex" />
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapState, null)(AllTiles);
