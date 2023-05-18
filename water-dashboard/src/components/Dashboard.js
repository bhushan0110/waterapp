import React, {useEffect,useState} from "react";
import axios from 'axios';
import FlatCard from "./FlatCard";
import Spinner from "./Spinner";

const Dashboard = ()=>{
    const [flat,setFlat] = useState([]);
    const [loading,setLoading] = useState(false);
    let timeOut=null;

    const getData = async()=>{
        try{
            const data = await axios.get('http://localhost:5000/query/getFlatData');
            if(!data){
                alert('No flat data');
            }
            console.log(data); 
            setFlat(data.data.flatSummary);
        }
        catch(err){
            console.log(err);
        }
    };
    
    useEffect(()=>{
        getData();
    },[]);

    const stopQuery = async () =>{
        clearInterval(timeOut);
        alert('Streaming stopped');
        getData();
        setLoading(false);
        try{
            const data = await axios.post('http://localhost:5000/dbFunction/stop-streaming');
            if(data){
                console.log(data);
            }
        }
        catch(err){
            console.log(err);
        }
    };

    const startQuery = ()=>{
        try{
            alert('Started Streaming');
            setLoading(true);
            timeOut = setInterval( async ()=>{
                const data = await axios.post('http://localhost:5000/dbFunction/stream-to-bigquery');
                if(!data){
                    alert('Some Error occured');
                }
            },5000)
        }
        catch(err){
            console.log(err);
        }
    };    

    const resetData = async () =>{
        try{
            const reset = await axios.delete('http://localhost:5000/dbFunction/resetCurrentData');
            if(reset){
                alert('Data reseted');
                getData();
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="container my-4">
            <div className="container">
                <h4 className="my-3">Generate Data</h4>
                <button type="button" className="btn btn-lg btn-outline-success mx-2" onClick={startQuery}>Start</button>
                <button type="button" className="btn btn-lg btn-outline-danger mx-2" onClick={stopQuery}>Stop</button>
                <button type="button" className="btn btn-lg btn-outline-warning mx-2" onClick={resetData}>Reset</button>
            </div>
            <div className="container mx-auto" style={{width:'200px'}}>
                {
                    loading && <Spinner/>
                }
            </div>
            <div className="container row my-5">
                <hr/>
                <h4>Water Management</h4>
                <h5>Flat Summary</h5>
                {
                    !flat?<div>Loading</div>:flat.map((elements)=>{
                        return(
                            <div className="col-md-4 my-3" key={elements.flatNumber}>
                                <FlatCard flatNumber={elements.flatNumber} volume={elements.volume}/>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};

export default Dashboard;