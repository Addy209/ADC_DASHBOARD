import { List, Avatar } from 'antd';
import { gql, GraphQLClient } from 'graphql-request';
import Cookies from 'js-cookie';
import React from 'react';
import { BACKEND_URL, MONTH_NAMES, URLS } from '../../utils/constants';
import Link from 'next/link'


const deadlineQuery=gql`
query {
  deadlineProjects{
    id
    name
    livedate
    module{
      code
      module
    }
    priority{
      code
      priority
    }
  }
}
`

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 5',
  },
  {
    title: 'Ant Design Title 6',
  },
];

const OngoingProjects=props=>{

  const [critical, setCritical]=React.useState([])
  React.useEffect(()=>{
    new GraphQLClient(BACKEND_URL, {
      headers:{
        authorization:`JWT ${Cookies.get('JWT')}`
      }
    }).request(deadlineQuery).then(res=>{
      setCritical(res.deadlineProjects)
    })
  },[])

  return <>
  
  {critical?<List
    itemLayout="horizontal"
    dataSource={critical}
    renderItem={val => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={val.module.code==10?"/mb.png":val.module.code==20?"/upi.png":'/misc.png'} />}
          title={<Link href={URLS.project+"/"+val.id}>{val.name}</Link>}
          description={`Deadline: ${new Date(val.livedate).getDate()}-${MONTH_NAMES[new Date(val.livedate).getMonth()+1]}-${new Date(val.livedate).getFullYear()} and Priority: ${val.priority.priority}`}
        />
      </List.Item>
    )}
  />:null}
  </>

}


export default OngoingProjects