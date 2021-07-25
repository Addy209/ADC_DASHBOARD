import React from 'react'
import { Layout, Menu, Divider } from 'antd';
import styles from './dashboard.module.css'
import Count from './counts';
import TDChart from './tdchart';
import ExpenseBarChart from './expensechart';
import request, { GraphQLClient,gql } from 'graphql-request';
import { BACKEND_URL, MONTH_NAMES } from '../../utils/constants';
import Cookies from 'js-cookie';
import { ValuesOfCorrectTypeRule } from 'graphql';

const today_query=gql`
query today{
  todaydata{
    date
    mbTotaltxn
    mbTd
    mbTdPercent
    mbBd
    upiTotaltxn
    upiTd
    upiTdPercent
    upiBd
    impsTotaltxn
    impsTd
    impsTdPercent
    impsBd
    
  }
  fifteendaytd{
    date
    mbTdPercent
    upiTdPercent
    impsTdPercent
    mbTotaltxn
    upiTotaltxn
    impsTotaltxn
  }
  sixmonthdata
}
`

const { Header, Content, Footer, Sider } = Layout;

const Dashboard =(props)=> {

  const [resp, setResp]=React.useState(null)
  const [expensedata, setExpenseData]= React.useState([])
  
const [collapsed,setCollapse]=React.useState(false)

React.useEffect(()=>{
const client=new GraphQLClient(BACKEND_URL,{
  headers:{
    authorization: `JWT ${Cookies.get('JWT')}`
  }
})

client.request(today_query).then(data=>{
  console.log(data)
  setResp(data)
  const expenseobj=JSON.parse(data.sixmonthdata)
  console.log(expenseobj)

  const lbl=expenseobj.map(val=>{
    return `${MONTH_NAMES[val.date__month]}-${val.date__year}`
  })
  const label=[...new Set(lbl)]
  const value=[]
  for(let i=0;i<expenseobj.length;i++){
    let obj={}
    for(let j=0;j<expenseobj.length;j++){
      if(expenseobj[i]?.date__month===expenseobj[j]?.date__month){
        obj['label']=`${MONTH_NAMES[expenseobj[i]?.date__month]}-${expenseobj[i]?.date__year}`
        if(expenseobj[j]?.module===10){
          obj['mb']=expenseobj[j]?.final_payment__sum
        }
        else if(expenseobj[j]?.module===20){
          obj['upi']=expenseobj[j]?.final_payment__sum
        }
        else{
          obj['misc']=expenseobj[j]?.final_payment__sum
        }

      }
      }
      if(obj){
        value.push(obj)
        }
    }

    let uniquevals=[]
    let uniqueobj={}
    for(let i in value){
      const date=value[i].label
      uniqueobj[date]=value[i]
    }
    for(let i in uniqueobj){
      uniquevals.push(uniqueobj[i])
    }
    console.log(uniquevals)
    setExpenseData(uniquevals)





  
  
})



},[])

  const onCollapse = () => {
      console.log(collapsed)
    setCollapse(val=>{
        return !val
    } );
  };

  let date=null

  if(resp){
    const d=new Date(resp?.todaydata?.date)
    date=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
  }


return (
      
        <div className={styles.site}>
                <div className={styles.counter}>
                <Divider orientation="left">Transaction Statistics of {date}</Divider>
                    <Count  
                    title="Mobile Banking" 
                    rgb="rgb(0,215,255)" 
                    lg="linear-gradient(to left, #0f2027, #203a43, #2c5364)"
                    total={resp?.todaydata?.mbTotaltxn}
                    td={resp?.todaydata?.mbTd}
                    td_per={resp?.todaydata?.mbTdPercent}
                    bd={resp?.todaydata?.mbBd}
                    />
                    <Count  
                    title="UPI" 
                    rgb="rgb(204,39,195)" 
                    lg="linear-gradient(to left, #093028, #237a57)"
                    total={resp?.todaydata?.upiTotaltxn}
                    td={resp?.todaydata?.upiTd}
                    td_per={resp?.todaydata?.upiTdPercent}
                    bd={resp?.todaydata?.upiBd}
                    />
                    <Count  
                    title="IMPS" 
                    rgb="rgb(195,230,62)" 
                    lg="linear-gradient(to left, #42275a, #734b6d)"
                    total={resp?.todaydata?.impsTotaltxn}
                    td={resp?.todaydata?.impsTd}
                    td_per={resp?.todaydata?.impsTdPercent}
                    bd={resp?.todaydata?.impsBd}
                    />
                    

                </div>
                <div className={styles.charts}>
                    <div className={styles.weeklytd}>
                <Divider orientation="left">Past Fifteen Days TD% Pattern</Divider>
                <TDChart data={resp?resp.fifteendaytd:[]} />
                </div>
                <div className={styles.sixmonthexpense}>
                <Divider orientation="left">Six Month Expenditure</Divider>
                <ExpenseBarChart data={expensedata} />
                </div>
                
                </div>
              
            </div>
        
    );
  }

export default Dashboard