import React from "react";
import {useNavigate} from 'react-router-dom';
const FlatCard = (props) =>{
    const navigate = useNavigate();
    const {flatNumber,volume} = props;
    const data={
        flatNumber:flatNumber
    };

    const handelClick = () =>{
        navigate('/flatDetails',{state:data});
    };

    const date = new Date().toDateString();

    return(
        <div className="card">
            <div className={volume>100?"card-header bg-warning":"card-header"} >
                FlatNumber: {flatNumber}
            </div>
            <div className="card-body">
                <h5 className="card-title">Volume Consumed:{volume} liters</h5>
                <p className="card-text">Date: {date}</p>
                <button type="button" className="btn btn-outline-info" onClick={handelClick}>More Details</button>
            </div>
        </div>
    );
};

export default FlatCard;
