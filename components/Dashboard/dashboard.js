import React from 'react'
import { Layout, Menu, Divider } from 'antd';
import styles from './dashboard.module.css'
import Count from './counts';
import TDChart from './tdchart';
import ExpenseBarChart from './expensechart';
import { GraphQLClient,gql } from 'graphql-request';
import { BACKEND_URL, MONTH_NAMES } from '../../utils/constants';
import Cookies from 'js-cookie';
import Deadline from './deadline';
import ProjectChart from './projectchart';
import UsersCount from './userscount';
import TotalUser from './totaluserscount';

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
  
}
`

const { Header, Content, Footer, Sider } = Layout;

const Dashboard =(props)=> {
  console.log(props)

  const [resp, setResp]=React.useState(null)
  const [expensedata, setExpenseData]= React.useState([])
  
const [collapsed,setCollapse]=React.useState(false)

React.useEffect(()=>{
  if(props.loggedIn)
{const client=new GraphQLClient(BACKEND_URL,{
  headers:{
    authorization: `JWT ${Cookies.get('JWT')}`
  }
})

client.request(today_query).then(data=>{
  console.log(data)
  setResp(data) 
  
})}



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
    date=`${d.getDate()}-${MONTH_NAMES[d.getMonth()+1]}-${d.getFullYear()}`
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

                <div className={styles.stats}>
                  <Divider orientation="left">Total Registered Users</Divider>
                    <div className={styles.totalusers}>
                    <TotalUser {...props} />
                    </div>
                    


                  </div>
                  <div className={styles.weeklytd}>
                  <Divider orientation="left">Past Fifteen Days Registered Users Trend</Divider>
                  <UsersCount {...props}/>
                  </div>



                <div className={styles.charts}>
                    <div className={styles.weeklytd}>
                <Divider orientation="left">Past Thirty Days TD% Pattern</Divider>
                <TDChart {...props}/>
                </div>
                <div className={styles.weeklytd}>
                <Divider orientation="left">Past One Year Expenditure</Divider>
                <ExpenseBarChart {...props} />
                </div>
                
                </div>




                <div className={styles.projects}>
                    <div className={styles.projectstats}>
                <Divider orientation="left">Projects Statistics</Divider>
                <div className={styles.pie}>
                <ProjectChart />
                </div>
                
               
                </div>
                <div className={styles.projectstats}>
                <Divider orientation="left">Projects Approaching Deadline</Divider>
                <Deadline />
                </div>
                
                </div>
              
            </div>
        
    );
  }

export default Dashboard