import React from "react";

const CardDetails = (props) =>{
    let date = new Date().toDateString();
    const {time,volume} = props;
    return(
        <div className="card my-2" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">Date: {date}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">time:{time}</h6>
                <p className="card-text">Voulme Consumed:<strong>{volume}</strong> liters</p>

            </div>
        </div>
    );
};

export default CardDetails;