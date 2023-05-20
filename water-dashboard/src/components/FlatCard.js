import React from "react";
import {useNavigate} from 'react-router-dom';
const FlatCard = (props) =>{
    const navigate = useNavigate();
    const {flatNumber,volume,members,days,d1} = props;
    const data={
        flatNumber:flatNumber
    };



    const handelClick = () =>{
        console.log(days);
        navigate('/flatDetails',{state:data});
    };
    let date = new Date(d1).toDateString();


    return(
        <div className="card">
            <div className={volume>(30*members*days)?"card-header bg-warning":"card-header"} >
                FlatNumber: {flatNumber}
            </div>
            <div className="card-body">
                <h5 className="card-title">Volume Consumed:{volume} liters</h5>
                <p className="card-text">Date: {date}</p>
                <p className="card-text">Members Count: {members}</p>
                <button type="button" className="btn btn-outline-info" onClick={handelClick}>More Details</button>
            </div>
        </div>
    );
};

export default FlatCard;
