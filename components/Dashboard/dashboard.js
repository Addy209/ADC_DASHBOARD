import React from 'react'
import { Layout, Menu, Divider } from 'antd';
import styles from './dashboard.module.css'
import Count from './counts';
import TDChart from './tdchart';
import ExpenseBarChart from './expensechart';
import SiderDemo from '../Layout/layout';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard =(props)=> {
  
const [collapsed,setCollapse]=React.useState(false)

  const onCollapse = () => {
      console.log(collapsed)
    setCollapse(val=>{
        return !val
    } );
  };

return (
          
            <div className={styles.site}>
                <div className={styles.counter}>
                <Divider orientation="left">Daily Transaction Statistics</Divider>
                    <Count  title="Mobile Banking" rgb="rgb(0,215,255)" lg="linear-gradient(to left, #0f2027, #203a43, #2c5364)"/>
                    <Count  title="UPI" rgb="rgb(204,39,195)" lg="linear-gradient(to left, #093028, #237a57)"/>
                    <Count  title="IMPS" rgb="rgb(195,230,62)" lg="linear-gradient(to left, #42275a, #734b6d)"/>
                    

                </div>
                <div className={styles.charts}>
                    <div className={styles.weeklytd}>
                <Divider orientation="left">Weekly TD% Pattern</Divider>
                <TDChart />
                </div>
                <div className={styles.sixmonthexpense}>
                <Divider orientation="left">Past Six Months Expenditures</Divider>
                <ExpenseBarChart />
                </div>
                
                </div>
              
            </div>
          
    );
  }

export default Dashboard