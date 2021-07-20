import { Line } from 'react-chartjs-2';
import React from 'react'



const TDChart=props=>{
    const DATA_COUNT = 7;
    const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

    const labels = [1,2,3,4,5,6,7];
    const data = {
    labels: labels,
    datasets: [
        {
        label: 'Mobile Banking',
        data: [11,22,33,44,77,55,66],
        borderColor: "red",
        backgroundColor: "red",
        },
        {
            label: 'UPI',
            data: [66,33,77,33,44,55,22],
            borderColor: "blue",
            backgroundColor: "blue",
        },
        {
            label: 'IMPS',
            data: [44,88,99,33,55,77,11],
            borderColor: "green",
            backgroundColor: "green",
        }
    ]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        },
      };

    return(
        <Line data={data} config={config} width="100%" height="60vh" />
    )
}

export default TDChart