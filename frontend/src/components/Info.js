import React from "react";
import "./Info.css";

function Info({setInfoText}) {

    return (
        <div className="info">
            <h3>Info:</h3>
            <p>{setInfoText()}</p>
        </div>
    )
}

export default Info;