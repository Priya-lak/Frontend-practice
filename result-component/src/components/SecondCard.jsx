import React from "react";

function SecondCard(props) {
  return (
    <>
      <div className="card-2">
        <h2>Summary</h2>

        <ul>
          {props.scores.map((score) => {
            {
              console.log("score", score);
            }
            return (<li id={score.category}>
              <img className="score-img"src={score.icon}/>
              <div className="score-name">{score.category}</div>
              <div className="score-value">{score.score}</div>
            </li>);
          })}
        </ul>
        <button id="continue-btn">Continue</button>
      </div>
    </>
  );
}

export default SecondCard;
