import styles from './dashboard.module.css'
import React from 'react'
import { Typography, Divider } from 'antd';
import {FiServer} from 'react-icons/fi'
import { ImMobile } from 'react-icons/im';
import {FcMoneyTransfer} from 'react-icons/fc'


const { Title, Text } = Typography;


const Count=props=>{

    return (
        <div className={styles.count} style={{background:props.rgb, background:props.lg}}>
            <div className={styles.values}>
            <Divider orientation="left" style={{color:"white"}}>{props.title}</Divider>
            < div className={styles.values_text}>
                <Title level={5} style={{color:"#ddd"}}>Total Txns :</Title>&nbsp;
                <Text keyboard className={styles.colorwhite}>{props.total}</Text>
            </div>
            < div className={styles.values_text}>
                <Title level={5} style={{color:"#ddd"}}>TD (TD%) :</Title>&nbsp;
                <Text keyboard className={styles.colorwhite}>{props.td} ({props.td_per}%)</Text>
            </div>
            < div className={styles.values_text}>
                <Title level={5} style={{color:"#ddd"}}>Business Decline :</Title>&nbsp;
                <Text keyboard className={styles.colorwhite}>{props.bd}</Text>
            </div>
            </div>


            <div className={styles.icon}>
                {props.title==="Mobile Banking"?<ImMobile fill="#fff" size="5rem" />:props.title==="UPI"?<FcMoneyTransfer fill="#fff" size="5rem" />:<FiServer fill="#fff" size="5rem" />}
            </div>
            
            </div>
    )
}

export default Count