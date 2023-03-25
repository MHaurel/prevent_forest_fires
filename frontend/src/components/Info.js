import React from "react";
import "./Info.css";

function Info({prediction}) {

    var predictionText = null;
    if (parseInt(prediction) === 0) {
        predictionText = "The model has not predicted wildfire in this area."
    } else if (parseInt(prediction) === 1) {
        predictionText = "The model has predicted that a wildfire is highly probable in this area."
    }

    return (
        <div className="info">
            <h3>Info:</h3>
            <p>{predictionText}</p>
        </div>
    )
}

export default Info;