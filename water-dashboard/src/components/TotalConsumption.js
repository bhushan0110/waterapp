import axios from "axios";
import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";

const TotalConsumption = (props) =>{
    const [totalWater, setTotal] = useState(0);
    const [name,setName]= useState([]);
    const [number,setNumber]= useState([]);
    const [date,setDate] = useState(props.date);
    const getData = async () =>{
        try{
            const data = await axios.post('http://localhost:5000/query/getFlatDataTC',{date:date});
            const {name,number,totalComsumption} = data.data;
            console.log(data.data);
            setTotal(totalComsumption);
            setName(name);
            setNumber(number);

            console.log("Total C"+ totalComsumption);
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[])

    return (
        <div className="card my-3" >
            <div className="card-header">
                Total Consumption
            </div>
            <div className="card-body row">
                <div className="col-md-5">
                    <p className="card-text">Date:  {new Date(props.date).toLocaleDateString()}</p>
                    <p className="card-text">Water Consumed Today: {totalWater} liters</p>
                </div>
                <div className="col-md-7">
                    <PieChart name={name} number={number}/> 
                </div>
            </div>
        </div>
    );
};

export default TotalConsumption;