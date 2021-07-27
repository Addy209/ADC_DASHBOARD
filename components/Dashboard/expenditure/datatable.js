import React from 'react'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { OmitProps } from 'antd/lib/transfer/ListBody';
import {  MONTH_NAMES } from '../../../utils/constants';

const DataTable=props=> {
  const [state,setState] = React.useState({
    searchText: '',
    searchedColumn: '',
  });

  let searchInput=null

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };

    const data=props.data.map((val,index)=>({
      key:index,
      date:`${new Date(val.date).getDate()}-${MONTH_NAMES[new Date(val.date).getMonth()+1]}-${new Date(val.date).getFullYear()}`,
      description:val.description,
      fintxns:val.finTxn,
      nonfintxns:val.nonfinTxn,
      baseamt:val.baseAmt,
      gst:val.gstPercent,
      gstamt:val.gstAmt,
      penalty:val.penalty,
      finalpayment:val.finalPayment


    }))

    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: '10%',
        ...getColumnSearchProps('date'),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width:'30%',
        ...getColumnSearchProps('description')
      },
      {
        title: 'Financial Txns',
        dataIndex: 'fintxns',
        key: 'fintxns',
        width: '15%',
        sorter: (a, b) => a.fintxns - b.fintxns,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Non Financial Txn',
        dataIndex: 'nonfintxns',
        key: 'nonfintxns',
        width: '15%',
        sorter: (a, b) => a.nonfintxns - b.nonfintxns,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Base Amount',
        dataIndex: 'baseamt',
        key: 'baseamt',
        width: '10%',
        sorter: (a, b) => a.baseamt- b.baseamt,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'GST',
        dataIndex: 'gstamt',
        key: 'gstamt',
        width: '10%',
        sorter: (a, b) => a.gstamt - b.gstamt,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Penalty',
        dataIndex: 'penalty',
        key: 'penalty',
        width: '15%',
        sorter: (a, b) => a.penalty- b.penalty,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Final Payment',
        dataIndex: 'finalpayment',
        key: 'finalpayment',
        width: '25%',
        sorter: (a, b) => a.finalpayment - b.finalpayment,
        sortDirections: ['descend', 'ascend'],
      },
    ];
    return <Table columns={columns} dataSource={data} bordered/>;
}

export default DataTable