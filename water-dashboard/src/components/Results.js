import React from "react";
import Chart from 'react-apexcharts';
const Results = () =>{
    return(
        <div className="container my-4 mx-auto">
            <div className="mx-auto">
                <Chart
                    type='line'
                    width={600}
                    height={400}
                    series={[
                        {
                            name: "Product",
                            data: [100,200,300,400,0,120]
                        }
                    ]}

                    options={{

                    }}
                ></Chart>
            </div>
        </div>
    );
};

export default Results;