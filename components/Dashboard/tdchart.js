import { Line } from 'react-chartjs-2';
import React from 'react'



const TDChart=props=>{

    const labels = props?.data.map((val)=>val.date);
    
    const data = {
    labels: labels,
    datasets: [
        {
        label: 'Mobile Banking',
        data: props.data.map((val)=>val.mbTdPercent),
        borderColor: "rgba(219,58,52,0.6)",
        backgroundColor: "gold",
        },
        {
            label: 'UPI',
            data: props.data.map((val)=>val.upiTdPercent),
            borderColor: "rgba(154,120,247,0.6)",
            backgroundColor: "black",
        },
        {
            label: 'IMPS',
            data: props.data.map((val)=>val.impsTdPercent),
            borderColor: "rgba(69,115,82,0.6)",
            backgroundColor: "tomato",
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