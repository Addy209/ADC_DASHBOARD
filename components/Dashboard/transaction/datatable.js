import React from 'react'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


const  DataTable =props=> {

  console.log(props)

    const data=props.data
  
    let columns=[]
    if(props.module!=="IMPS"){
     columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: '15%',
        
      },
      {
        title: 'Financial Txns',
        dataIndex: 'fintxn',
        key: 'fintxn',
        width: '15%',
        
        sorter: (a, b) => a.fintxn - b.fintxn,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Non-Financial Txns',
        dataIndex: 'nonfintxn',
        key: 'nonfintxn',
        width: '15%',
        sorter: (a, b) => a.nonfintxn - b.nonfintxn,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Total Txns',
        dataIndex: 'totaltxn',
        key: 'totaltxn',
        width: '15%',
        sorter: (a, b) => a.totaltxn - b.totaltxn,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'TD',
        dataIndex: 'td',
        key: 'td',
        width: '15%',
        sorter: (a, b) => a.td - b.td,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'TD%',
        dataIndex: 'td_per',
        key: 'td_per',
        width: '10%',
        sorter: (a, b) => a.td_per - b.td_per,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'BD',
        dataIndex: 'bd',
        key: 'bd',
        width: '15%',
        sorter: (a, b) => a.bd - b.bd,
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
              dataIndex: 'totaltxn',
              key: 'totaltxn',
              width: '20%',
              sorter: (a, b) => a.totaltxn - b.totaltxn,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'TD',
              dataIndex: 'td',
              key: 'td',
              width: '20%',
              sorter: (a, b) => a.td - b.td,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'TD%',
              dataIndex: 'td_per',
              key: 'td_per',
              width: '20%',
              sorter: (a, b) => a.td_per - b.td_per,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'BD',
              dataIndex: 'bd',
              key: 'bd',
              width: '20%',
              sorter: (a, b) => a.bd - b.bd,
              sortDirections: ['descend', 'ascend'],
            }
          ];
  }

  return <Table columns={columns} dataSource={data} bordered/>;
}

export default DataTable