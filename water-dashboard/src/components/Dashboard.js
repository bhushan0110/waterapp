import React, {useEffect,useState} from "react";
import axios from 'axios';
import FlatCard from "./FlatCard";
import Spinner from "./Spinner";
import TotalConsumption from "./TotalConsumption";

const Dashboard = ()=>{
    const [flat,setFlat] = useState([]);
    const [loading,setLoading] = useState(false);
    const [dat, setDat] = useState(new Date().toISOString().split('T')[0]);

    const getData = async()=>{
        try{
            const data = await axios.post('http://localhost:5000/query/getFlatData',{date: dat});
            if(!data){
                alert('No flat data');
            }
            setFlat(data.data.flatSummary);
            console.log(flat);
        }
        catch(err){
            console.log(err);
        }
    };

    const stopQuery = async () =>{
        setLoading(false);
        try{
            const data = await axios.post('http://localhost:5000/dbFunction/stop-streaming');
            if(data){
                console.log(data);
            }
            getData();
        }
        catch(err){
            console.log(err);
        }
    };
  
    const startQuery =async ()=>{
        try{
            alert('Started Streaming');
            setLoading(true);
            const data = await axios.post('http://localhost:5000/dbFunction/stream-to-bigquery',{date:dat});
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    };    

    const handelDate =  (e) =>{
        setDat(new Date(e.target.value).toISOString().split('T')[0]);
        console.log(dat);
    }


    useEffect(()=>{
        getData();
    },[]);

    return(
        <div className="container my-4">
            <div className="container">
                <h5 className="my-3">Generate Data</h5>

                <div className='conatiner my-3' style={{width:'20rem'}}>
                    <label htmlFor="date1" className="form-label">Select Date</label>
                    <input type="date" value={dat} className="form-control" id="date1" onChange={handelDate}/>
                    <button  type="button" className="btn btn-outline-info my-3" onClick={getData}>Get Data</button>
                </div>
                
                <button type="button" className="btn btn-lg btn-outline-success mx-2" onClick={startQuery}>Start</button>
                <button type="button" className="btn btn-lg btn-outline-danger mx-2" onClick={stopQuery}>Stop</button>
            </div>
            <div className="container mx-auto" style={{width:'200px'}}>
                {
                    loading && <Spinner/>
                }
            </div>
            <div className="container row my-5">
                <hr/>
                <h4>Water Management</h4>
                    <TotalConsumption date={dat}/>
                <h5>Flat Summary</h5>
                {
                    (!flat)?<div>Loading</div>:flat.map((elements)=>{
                        return(
                            <div className="col-md-4 my-3" key={elements.flatNumber}>
                                <FlatCard flatNumber={elements.flatNumber} volume={elements.volume} members={elements.members} days={1} d1={dat}/>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};

export default Dashboard;