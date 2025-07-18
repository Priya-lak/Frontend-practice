import React from "react";
import './secondCard.css';

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
            return (<li className='score-item' id={score.category}>
              <img className="score-img"src={score.icon}/>
              <div className="score-name">{score.category}</div>
              <div className="score-value">
              {score.score} <span style={{ fontWeight: "normal" }}>/ 100</span>
            </div>
            </li>);
          })}
        </ul>
        <button id="continue-btn">Continue</button>
      </div>
    </>
  );
}

export default SecondCard;
