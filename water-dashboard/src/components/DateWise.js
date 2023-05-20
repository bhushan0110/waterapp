import axios from "axios";
import React, { useEffect, useState } from "react";
import FlatCard from "./FlatCard";

const DateWise = () =>{
    const [start,setStart] = useState(new Date().toISOString().split('T')[0]);
    const [end,setEnd] = useState(new Date().toISOString().split('T')[0]);
    const [days,setDays] = useState(31);
    const [flatData,setFlatData] = useState([]);

    const getData =async () =>{
        const data = await axios.post('http://localhost:5000/query/getCustomData',{start,end});
        const {flatSummary} = data.data;
        setFlatData(flatSummary);
    }

    const handelStart = (e) =>{
        setStart(e.target.value);
    }

    const handelEnd = (e) =>{
        setEnd(e.target.value);
    }

    const handelClick = () =>{
        const a=new Date(end);
        const b=new Date(start);
        const timeDiff = a.getTime() - b.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        setDays(daysDiff + 1);
        getData();
    }


    useEffect(()=>{
        getData();
    },[]);

    return(
        <div className="container my-3">
            <div style={{width: '60%'}}>
                <h5>Select Start Date:</h5>
                <input type="date" name="start" id="start" value={start} onChange={handelStart} />
                
                <h5 className="my-2">Select Ending Date:</h5>
                <input type="date" name="start" id="start" value={end} onChange={handelEnd}/>
                <br />
                <button type="button" className="btn btn-outline-info my-3" onClick={handelClick}>Search</button>
            </div>
            <div className="row">
                <h5>Custom Date Record</h5>
                {
                    (!flatData)?<div>Loading</div>:flatData.map((elements)=>{
                        return(
                            <div className="col-md-4 my-3" key={elements.flatNumber}>
                                <FlatCard flatNumber={elements.flatNumber} volume={elements.volume} members={elements.members} days={days}/>
                            </div>
                        );
                    })
                }
            </div>           
        </div>
    );
};

export default DateWise;