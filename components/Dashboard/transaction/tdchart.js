import { Line } from 'react-chartjs-2';
import React from 'react'



const Chart=props=>{
    const DATA_COUNT = 7;
    const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

    const labels = [1,2,3,4,5,6,7,8];
    const data = {
    labels: labels,
    datasets: [
        {
        label: 'Financial Transactions',
        data: [11,22,33,44,77,55,0,66],
        borderColor: "aquablue",
        backgroundColor: "crimson",
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
        <Line data={data} config={config} width="100%" height="50vh" />
    )
}

export default Chart