import { Line } from 'react-chartjs-2';
import React from 'react'
import { GraphQLClient,gql } from 'graphql-request';
import { BACKEND_URL } from '../../utils/constants';
import Cookies from 'js-cookie';

const query=gql`
query{
fifteendaytd{
  date
  mbTdPercent
  upiTdPercent
  impsTdPercent
  mbTotaltxn
  upiTotaltxn
  impsTotaltxn
}
}
`

const TDChart=props=>{

    const [data,setData]=React.useState([])

    React.useEffect(()=>{
      if(props.loggedIn){
        new GraphQLClient(BACKEND_URL,{
          headers:{
              authorization:`JWT ${Cookies.get('JWT')}`
          }
      }).request(query).then(resp=>{
          setData(resp.fifteendaytd)
        })
      }
    },[])

    const labels = data.map((val)=>val.date);
    
    const dataval = {
    labels: labels,
    datasets: [
        {
        label: 'Mobile Banking',
        data: data.map((val)=>val.mbTdPercent),
        borderColor: "rgba(219,58,52,0.6)",
        backgroundColor: "gold",
        },
        {
            label: 'UPI',
            data: data.map((val)=>val.upiTdPercent),
            borderColor: "rgba(154,120,247,0.6)",
            backgroundColor: "black",
        },
        {
            label: 'IMPS',
            data: data.map((val)=>val.impsTdPercent),
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
        <Line data={dataval} config={config} width="100%" height="60vh" />
    )
}

export default TDChart