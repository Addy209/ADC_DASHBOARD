import React from 'react'
import { Select, Divider, DatePicker, Space, Button, Typography } from 'antd';
import styles from '../expenditure/expenditure.module.css'
import DataTable from './datatable';
import Chart from './tdchart';


const { Option } = Select;
const {Title, Text} =Typography

const Transaction=props=>{

  const [reprensent, setRepresent]=React.useState("table")
  const [respdata, setRespData]= React.useState(1)

    const handleChange=(value,mod) =>{
        console.log(`selected ${value}`);
        if(mod==="M"){

        }
        else{
          setRepresent(value)
        }
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
    <Select defaultValue="00" style={{ width: 180 }} onChange={(value)=>handleChange(value, "M")}>
        <Option value="00" disabled>---Select Module---</Option>  
      <Option value="MB">Mobile Banking</Option>
      <Option value="UPI">UPI</Option>
      <Option value="IMPS">IMPS</Option>
    </Select>
    </span>

    <span>
    <Text>Date: &nbsp;</Text>
    <Space direction="horizontal">
    <DatePicker onChange={(date, dateString)=>dateChange(date, dateString,'F')} picker="date" placeholder="From Date: "/>
    <DatePicker onChange={(date, dateString)=>dateChange(date, dateString,'T')} picker="date" placeholder="To Date: "/>
    </Space>
    </span>

    <span>
    <Text>View Data As: &nbsp;</Text>
    <Select defaultValue="table" style={{ width: 180 }} onChange={(value)=>handleChange(value,"R")}>
      <Option value="table">Table</Option>
      <Option value="graph">Graph</Option>
      
    </Select>
    </span>
    <Button type="primary">Go</Button>
    </div>
    {respdata?
    reprensent==="table"?
    <div>
    <Divider orientation="left">Tabular Representation</Divider>
    <DataTable module="UPI" className={styles.scoll}/>
    </div>:
    <div className={styles.graph}>
    <Divider orientation="left">Graphical Representation</Divider>
    <div className={styles.upper_graph}>
    <div className={styles.chart}>
    <Chart module="UPI" />
    </div>
    <div className={styles.chart}>
    <Chart module="UPI" />
    </div>
    </div>
    <div className={styles.lower_graph}>
    <div className={styles.chart}>
    <Chart module="UPI" />
    </div>
    <div className={styles.chart}>
    <Chart module="UPI" />
    </div>
    </div>
    </div>:null}


    </div>
    </>
)
}

export default Transaction