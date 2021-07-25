import { Bar } from 'react-chartjs-2';
import React from 'react'
import SiderDemo from '../Layout/layout';

const ExpenseBarChart=props=>{

      const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

    const labels = props.data.map(val=>val.label);
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Mobile Banking',
        data: props.data.map(val=>val.mb?val.mb:0),
      backgroundColor: "rgba(241,81,82,0.75)",
    },
    {
      label: 'UPI',
        data: props.data.map(val=>val.upi?val.upi:0),
      backgroundColor: "rgba(36,123,160,0.75)",
    },
    {
      label: 'Misc',
    data: props.data.map(val=>val.misc?val.misc:0),
      backgroundColor:"rgba(30,85,92,0.75)",
    },
  ]
};

const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };

return <Bar data={data} config={config} width="100%" height="60vh" />
}

export default ExpenseBarChart