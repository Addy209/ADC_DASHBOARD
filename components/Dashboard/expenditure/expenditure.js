import React from 'react'
import { Select, Divider, DatePicker, Space, Button, Typography } from 'antd';
import styles from './expenditure.module.css'
import Table from './datatable';

const { Option } = Select;
const {Title, Text} =Typography

const Expenditure=props=>{

    const handleChange=(value) =>{
        console.log(`selected ${value}`);
      }

      function dateChange(date, dateString,id) {
        console.log(date, dateString, id);
      }

return(
    <>
    <div className={styles.exp_layout}>
    <Divider orientation="left">Filters</Divider>
    <div className={styles.filters}>
    <span>
    <Text>Module: &nbsp;</Text>
    <Select defaultValue="00" style={{ width: 180 }} onChange={(value)=>handleChange(value)}>
        <Option value="00" disabled>---Select Module---</Option>  
      <Option value="MB">Mobile Banking</Option>
      <Option value="UPI">UPI</Option>
      <Option value="Misc">Misc.</Option>
    </Select>
    </span>

    <span>
    <Text>Month: &nbsp;</Text>
    <Space direction="horizontal">
    <DatePicker onChange={(date, dateString)=>dateChange(date, dateString,'F')} picker="month" placeholder="From Month: "/>
    <DatePicker onChange={(date, dateString)=>dateChange(date, dateString,'T')} picker="month" placeholder="To Month: "/>
    </Space>
    </span>
    <Button type="primary">Go</Button>
    </div>
    <div>
    <Divider orientation="left">Data</Divider>
    <div className={styles.scroll}>
    <Table />
    </div>
    </div>


    </div>
    </>
)
}

export default Expenditure