import React from 'react'
import { Select, Divider, DatePicker, Space, Button, Typography } from 'antd';
import styles from '../expenditure/expenditure.module.css'
import DataTable from './datatable';
import Chart from './tdchart';
import {GraphQLClient, gql} from 'graphql-request'
import {BACKEND_URL, MONTH_NAMES} from '../../../utils/constants'
import Cookies from 'js-cookie';

const { Option } = Select;
const {Title, Text} =Typography

const query=gql`
query getTransaction($fromdate:Date, $todate:Date){
  transaction(fromdate:$fromdate, todate:$todate){
    date
    mbFintxns
    mbNonfintxns
    mbTotaltxn
    mbTd
    mbTdPercent
    mbBd
    upiFintxns
    upiNonfintxns
    upiTotaltxn
    upiTd
    upiTdPercent
    upiBd
    impsTotaltxn
    impsTd
    impsTdPercent
    impsBd
  }
}`

const Transaction=props=>{

  const [reprensent, setRepresent]=React.useState("table")
  const [respdata, setRespData]= React.useState(null)
  const [values, setValues]=React.useState({
    fromdate:null,
    todate:null,
    module:null
  })

    const handleChange=(value,mod) =>{
        console.log(`selected ${value}`);
        if(mod==="M"){
          if(value==="00"){
            return null
          }
          switch(value){
            case "MB":{
              setValues({
                ...values,
                module:value
              })
              break;
            }
            case "UPI":{
              setValues({
                ...values,
                module:value
              })
              break;
            }
            case "IMPS":{
              setValues({
                ...values,
                module:value
              })
              break
            }
            default:{
              return null
            }
          }
        }
        else{
          setRepresent(value)
        }
      }

      const dateChange=(date, dateString,id) =>{
        let val=dateString
        if(id==="F"){
          if (dateString===""){
            val=null
          }
          setValues({
            ...values,
            fromdate:val
          })
        }
        else{
          if (dateString===""){
            val=null
          }
          setValues({
            ...values,
            todate:val
          })
        }

        console.log(values)
      }

      const handleClick=()=>{
        console.log(values)
          const client= new GraphQLClient(BACKEND_URL,{
            headers:{
              authorization: `JWT ${Cookies.get('JWT')}`
            }
          })

          const variables={
            fromdate:values.fromdate,
            todate:values.todate
          }
          client.request(query,variables).then(data=>{
            let arr=data.transaction.map((val, index)=>{
              const date=new Date(val.date)
              const formattedDate=`${date.getDate()}-${MONTH_NAMES[date.getMonth()+1]}-${date.getFullYear()}`
              return {
                ...val,
                date:formattedDate
              }
            })
            setRespData(arr)
            console.log(respdata)
            })      }

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
    <Button type="primary" onClick={handleClick}>Go</Button>
    </div>
    
    {respdata?
    reprensent==="table"?
    <div>
    <Divider orientation="left">Tabular Representation</Divider>


    <DataTable module={values.module} data={respdata} className={styles.scoll}/>


    </div>:
    <div className={styles.graph}>
    <Divider orientation="left">Graphical Representation</Divider>
    
    {values.module!=="IMPS"?
    <div className={styles.upper_graph}>



    <div className={styles.chart}>
    <Chart 
    module={values.module} 
    name="Financial Transactions" 
    label={respdata.map(val=>val.date)}
    data={respdata.map(val=>values.module==="MB"?val.mbFintxns:val.upiFintxns)}
    point="red"
    border="rgba(242,108,167,0.6)"
    />
    </div>
    <div className={styles.chart}>
    <Chart 
    module={values.module}
    name="Non-Financial Transactions" 
    label={respdata.map(val=>val.date)}
    data={respdata.map(val=>values.module==="MB"?val.mbNonfintxns:val.upiNonfintxns)}
    point="aquablue"
    border="rgba(148,123,211,0.6)"
     />
    </div>
    </div>:null}

    <div className={styles.upper_graph}>
    <div className={styles.chart}>
    <Chart 
    module={values.module}
    name="Total Transactions" 
    label={respdata.map(val=>val.date)}
    data={respdata.map(val=>values.module==="MB"?val.mbTotaltxn:values.module==="UPI"?val.upiTotaltxn:val.impsTotaltxn)}
    point="voilet"
    border="rgba(63,125,38 ,0.6)"
    />
    </div>
    <div className={styles.chart}>
    <Chart 
    module={values.module}
    name="Business Decline" 
    label={respdata.map(val=>val.date)}
    data={respdata.map(val=>values.module==="MB"?val.mbBd:values.module==="UPI"?val.upiBd:val.impsBd)}
    point="tomato"
    border="rgba(241,154,62,0.6)"
    />
    </div>
    </div>


    <div className={styles.lower_graph}>
    <div className={styles.chart}>
    <Chart 
    module={values.module}
    name="Technical Decline" 
    label={respdata.map(val=>val.date)}
    data={respdata.map(val=>values.module==="MB"?val.mbTd:values.module==="UPI"?val.upiTd:val.impsTd)}
    point="black"
    border="rgba(214,87,128,0.6)"
    />
    </div>
    <div className={styles.chart}>
    <Chart 
    module={values.module}
    name="Technical Decline Percentage" 
    label={respdata.map(val=>val.date)}
    data={respdata.map(val=>values.module==="MB"?val.mbTdPercent:values.module==="UPI"?val.upiTdPercent:val.impsTdPercent)}
    point="gold"
    border="rgba(116,79,198,0.6)"
    />
    </div>
    </div>
    </div>:null}


    </div>
    </>
)
}

export default Transaction