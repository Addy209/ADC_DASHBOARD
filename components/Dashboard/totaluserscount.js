import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import styles from './dashboard.module.css'
import React from 'react';
import { GraphQLClient,gql } from 'graphql-request';
import { BACKEND_URL } from '../../utils/constants';
import Cookies from 'js-cookie';

const query=gql`
query totalusers{
    totalusers{
      totalUpiUsers
      totalMbUsers
      updatedAt
    }
}

`



const TotalUser=props=>{
    const [resp, setResp]=React.useState(null)

    React.useEffect(()=>{
        if(props.loggedIn){
            new GraphQLClient(BACKEND_URL,{
              headers:{
                  authorization:`JWT ${Cookies.get('JWT')}`
              }
          }).request(query).then(res=>{
              setResp(res.totalusers)
            })
          }
    },[])

  return (<div className={styles.card}>
    <Row gutter={16}>
      <Col>
        <Card>
          <Statistic
            title="Mobile Banking"
            value={resp?resp.totalMbUsers:0}
            valueStyle={{ color: '#2a9d8f' }}
          />
        </Card>
        </Col>

        <Col gutter={16}>
        <Card>
          <Statistic
            title="UPI"
            value={resp?resp.totalUpiUsers:0}
            valueStyle={{ color: '#a4133c' }}
          />
        </Card>
      </Col>
      </Row>
    
  </div>)}

  export default TotalUser