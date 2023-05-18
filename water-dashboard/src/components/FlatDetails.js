import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardDetails from "./CardDetails";

const FlatDetails = (props) =>{
    const location = useLocation();
    const data = location.state;
    const {flatNumber} = props;
    const [details,setDetails] = useState([]);
    const getDetails = async () =>{
        try{
            console.log(data+"   Bhushan\n")
            const flatDetails = await axios.get('http://localhost:5000/query/getFlatRecord',1);
            if(!flatDetails){
                alert('No records for Flat Number:'+flatNumber);
            }
            console.log(flatDetails.data);
            setDetails(flatDetails.data);
            console.log(details);
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <div className="container my-4" style={{width:'20rem'}}>
            <h5> FlatNumber: 1</h5>
            <ul className="list-group">
                {
                    details.map((element)=>{
                        return(
                            <CardDetails time={element.time} volume={element.volume}/>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default FlatDetails;