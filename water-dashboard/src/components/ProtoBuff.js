import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtoBuff = () =>{
    const navigate = useNavigate();
    const [name,setName] = useState("Name");
    const [age,setAge] = useState(10);
    const [street,setStreet] = useState("Street");
    const [city,setCity] = useState("City");
    const [state,setState] = useState("State");
    const [count,setCount] = useState(100);

    const handelName = (e) =>{
        setName(e.target.value);
    }
    const handelAge = (e) =>{
        setAge(e.target.value);
    }
    const handelStreet = (e) =>{
        setStreet(e.target.value);
    }
    const handelCity = (e) =>{
        setCity(e.target.value);
    }
    const handelState = (e) =>{
        setState(e.target.value);
    }
    const handelCount = (e) =>{
        setCount(e.target.value);
    }

    const handelClick = ()=>{
        const data = {
            name, age, state, street, city, count
        }
        console.log(data);
        navigate('/results');
    }

    return(
        <div className="container">
            <h3 className="text-info" style={{marginTop: '30px'}}>Demonstration of Protocol Buffers</h3>
            <div className="card my-4" style={{width:"70%"}}>
                <div className="card-body">
                    <div className="mb-3" >
                        <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" onChange={handelName}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="q" className="form-label">Age</label>
                        <input type="number" className="form-control" id="q" onChange={handelAge}/>
                    </div>
                    <hr />
                    <h5>Address</h5>
                    <div className="mb-4 my-2">
                        <div className="mb-3" >
                            <label htmlFor="exampleFormControlInput1" className="form-label">Street</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" onChange={handelStreet}/>
                        </div>
                        <div className="mb-3" >
                            <label htmlFor="exampleFormControlInput1" className="form-label">City</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" onChange={handelCity}/>
                        </div>
                        <div className="mb-3" >
                            <label htmlFor="exampleFormControlInput1" className="form-label">State</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" onChange={handelState}/>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="abc" className="form-label">Set Count </label>
                            <input type="number" className="form-control" id="abc" onChange={handelCount}/>
                        </div>
                        <div className="col-md-3">
                            <br />
                            <button type="button" class="btn btn-outline-info mx-3" onClick={handelClick}>Show Results</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProtoBuff;