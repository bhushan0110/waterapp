import React from "react";
import axios from 'axios';

const Dashboard = ()=>{
    let timeOut;
    const startQuery = ()=>{
        try{
            timeOut = setTimeout( async ()=>{
                const data = await axios.post('/stream-to-bigquery');
                if(!data){
                    alert('Some Error occured');
                }
            },5000)
        }
        catch(err){
            console.log(err);
        }
    };
    
    const stopQuery = () =>{
        clearTimeout(timeOut);
    };

    return(
        <div className="container my-4">
            <div>
                <button type="button" class="btn btn-lg btn-outline-success mx-2" onClick={startQuery}>Start</button>
                <button type="button" class="btn btn-lg btn-outline-danger mx-2" onClick={stopQuery}>Stop</button>
            </div>
            <div className="container row">
                
            </div>
        </div>
    );
};

export default Dashboard;