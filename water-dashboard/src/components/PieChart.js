import React, { useEffect, useState } from "react";
import Charts from 'react-apexcharts';

const PieChart = (props) =>{
    const [number,setNumber] = useState([]);
    const [name,setName] = useState([]);

    useEffect(()=>{
        setName(props.name);
        setNumber(props.number);
    },[]);
    return(
            <Charts
                type="donut"
                series={props.number}
                width={300}
                height={300}
                options={{
                    labels: props.name
                }}
            />
    );
};

export default PieChart;