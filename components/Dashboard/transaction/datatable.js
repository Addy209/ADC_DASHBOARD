import React from 'react'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


const  DataTable =props=> {

  console.log(props)

    const data=props.data
  
    let columns=[]
    if(props.module=="MB"){
     columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: '15%',
        
      },
      {
        title: 'Financial Txns',
        dataIndex: 'mbFintxns',
        key: 'mbFintxns',
        width: '15%',
        
        sorter: (a, b) => a.mbFintxns - b.mbFintxns,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Non-Financial Txns',
        dataIndex: 'mbNonfintxns',
        key: 'mbNonfintxns',
        width: '15%',
        sorter: (a, b) => a.mbNonfintxns - b.mbNonfintxns,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Total Txns',
        dataIndex: 'mbTotaltxn',
        key: 'mbTotaltxn',
        width: '15%',
        sorter: (a, b) => a.mbTotaltxn - b.mbTotaltxn,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'TD',
        dataIndex: 'mbTd',
        key: 'mbTd',
        width: '15%',
        sorter: (a, b) => a.mbTd - b.td,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'TD%',
        dataIndex: 'mbTdPercent',
        key: 'mbTdPercent',
        width: '10%',
        sorter: (a, b) => a.mbTdPercent - b.mbTdPercent,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'BD',
        dataIndex: 'mbBd',
        key: 'mbBd',
        width: '15%',
        sorter: (a, b) => a.bd - b.bd,
        sortDirections: ['descend', 'ascend'],
      }
    ];}

    else if(props.module=="UPI"){
      columns = [
       {
         title: 'Date',
         dataIndex: 'date',
         key: 'date',
         width: '15%',
         
       },
       {
         title: 'Financial Txns',
         dataIndex: 'upiFintxns',
         key: 'upiFintxns',
         width: '15%',
         
         sorter: (a, b) => a.upiFintxns - b.upiFintxns,
         sortDirections: ['descend', 'ascend'],
       },
       {
         title: 'Non-Financial Txns',
         dataIndex: 'upiNonfintxns',
         key: 'upiNonfintxns',
         width: '15%',
         sorter: (a, b) => a.upiNonfintxns - b.upiNonfintxns,
         sortDirections: ['descend', 'ascend'],
       },
       {
         title: 'Total Txns',
         dataIndex: 'upiTotaltxn',
         key: 'upiTotaltxn',
         width: '15%',
         sorter: (a, b) => a.upiTotaltxn - b.upiTotaltxn,
         sortDirections: ['descend', 'ascend'],
       },
       {
         title: 'TD',
         dataIndex: 'upiTd',
         key: 'upiTd',
         width: '15%',
         sorter: (a, b) => a.upiTd - b.upiTd,
         sortDirections: ['descend', 'ascend'],
       },
       {
         title: 'TD%',
         dataIndex: 'upiTdPercent',
         key: 'upiTdPercent',
         width: '10%',
         sorter: (a, b) => a.upiTdPercent - b.upiTdPercent,
         sortDirections: ['descend', 'ascend'],
       },
       {
         title: 'BD',
         dataIndex: 'upiBd',
         key: 'upiBd',
         width: '15%',
         sorter: (a, b) => a.upiBd - b.upiBd,
         sortDirections: ['descend', 'ascend'],
       }
     ];}
    else{
         columns = [
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
              width: '20%',
              sorter: (a, b) => a.date- b.date,
              sortDirections: ['descend', 'ascend'],
              
            },
            {
              title: 'Total Txns',
              dataIndex: 'impsTotaltxn',
              key: 'impsTotaltxn',
              width: '20%',
              sorter: (a, b) => a.impsTotaltxn - b.impsTotaltxn,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'TD',
              dataIndex: 'impsTd',
              key: 'impsTd',
              width: '20%',
              sorter: (a, b) => a.impsTd - b.impsTd,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'TD%',
              dataIndex: 'impsTdPercent',
              key: 'impsTdPercent',
              width: '20%',
              sorter: (a, b) => a.impsTdPercent - b.impsTdPercent,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'BD',
              dataIndex: 'impsBd',
              key: 'impsBd',
              width: '20%',
              sorter: (a, b) => a.impsBd - b.impsBd,
              sortDirections: ['descend', 'ascend'],
            }
          ];
  }

  return <Table columns={columns} dataSource={data} bordered/>;
}

export default DataTable