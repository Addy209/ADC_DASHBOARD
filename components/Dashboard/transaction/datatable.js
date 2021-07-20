import React from 'react'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 323312124,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

class DataTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  
  render() {
      let columns=[]
    if(this.props.module!=="IMPS"){
     columns = [
      {
        title: 'Date',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        
      },
      {
        title: 'Financial Txns',
        dataIndex: 'age',
        key: 'age',
        width: '15%',
        
        sorter: (a, b) => a.age - b.age,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Non-Financial Txns',
        dataIndex: 'age',
        key: 'age',
        width: '15%',
        sorter: (a, b) => a.age - b.age,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Total Txns',
        dataIndex: 'age',
        key: 'age',
        width: '15%',
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'TD',
        dataIndex: 'age',
        key: 'age',
        width: '10%',
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'TD%',
        dataIndex: 'age',
        key: 'age',
        width: '10%',
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'BD',
        dataIndex: 'age',
        key: 'age',
        width: '15%',
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
      }
    ];}
    else{
         columns = [
            {
              title: 'Date',
              dataIndex: 'name',
              key: 'name',
              width: '20%',
              
            },
            {
              title: 'Total Txns',
              dataIndex: 'age',
              key: 'age',
              width: '20%',
              sorter: (a, b) => a.address.length - b.address.length,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'TD',
              dataIndex: 'age',
              key: 'age',
              width: '20%',
              sorter: (a, b) => a.address.length - b.address.length,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'TD%',
              dataIndex: 'age',
              key: 'age',
              width: '20%',
              sorter: (a, b) => a.address.length - b.address.length,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'BD',
              dataIndex: 'age',
              key: 'age',
              width: '20%',
              sorter: (a, b) => a.address.length - b.address.length,
              sortDirections: ['descend', 'ascend'],
            }
          ];
    }
    return <Table columns={columns} dataSource={data} bordered/>;
  }
}

export default DataTable