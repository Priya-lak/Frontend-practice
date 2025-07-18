import React from "react";
import './firstCard.css';

function FirstCard(props){
return (
    <>
    <div className="card-1">
    <h2>Your Result</h2>
    <div className="overall-score-board"><div className="score">{props.overallScore}</div>of 100</div>

    <div className="review">{props.review}</div>
    <div className="review-details">{props.reviewDetails}</div>
    </div>
    </>
)
}

export default FirstCard;