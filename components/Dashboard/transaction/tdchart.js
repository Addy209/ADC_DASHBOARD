import { Line } from 'react-chartjs-2';
import React from 'react'



const Chart=props=>{

    const labels = props.label
    const data = {
    labels: labels,
    datasets: [
        {
        label: props.name,
        data: props.data,
        borderColor: props.border,
        backgroundColor: props.border,
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
        <Line data={data} config={config}  height="90%" />
    )
}

export default Chart