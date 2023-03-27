import React from "react";
import "./Info.css";

function Info({infoText}) {

    return (
        <div className="info">
            <h3>Info:</h3>
            <p>{infoText}</p>
        </div>
    )
}

export default Info;