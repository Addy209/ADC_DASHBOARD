import { Bar } from 'react-chartjs-2';
import React from 'react'
import SiderDemo from '../Layout/layout';

const ExpenseBarChart=props=>{

      const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

    const labels = [1,2,3,4,5,6,7];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
        data: [11,22,33,44,77,55,66],
      backgroundColor: "red",
    },
    {
      label: 'Dataset 2',
        data: [66,33,77,33,44,55,22],
      backgroundColor: "blue",
    },
    {
      label: 'Dataset 3',
    data: [44,88,99,33,55,77,11],
      backgroundColor:"green",
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