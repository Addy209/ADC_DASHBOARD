import { Collapse, Table } from 'antd';
import React from 'react'
import 
{WarningTwoTone,
ExclamationCircleTwoTone,
CheckCircleTwoTone,
CloseCircleTwoTone
} from '@ant-design/icons'
import Link from 'next/link';
import { URLS, MONTH_NAMES } from '../../../utils/constants';

const { Panel } = Collapse;

const one_day_ms=86400000

const OngoingProjects=props=>{

  const columns = [
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'age',
    },
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'age',
    },
    {
      title: 'Requested By',
      dataIndex: 'requested',
      key: 'age',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'age',
    },
    
    {
      title: 'Is Development Complete',
      dataIndex: 'dev_com',
      key: 'address',
      render: function fun(val){ return val?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
    },
    {
      title: 'Is Testing Complete',
      dataIndex: 'test_com',
      key: 'address',
      render: function fun(val){ return val?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
    },
    {
      title: 'Sign Off',
      dataIndex: 'signoff',
      key: 'address',
      render: function fun(val){ return val?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
    },
    {
      title: 'Is Live',
      dataIndex: 'live',
      key: 'action',
      render: function fun(val){ return val?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
    },
  ];

    return (
        <Collapse accordion>
          {props.data.map((val,index)=>{
            const data = [
              {
                key: 1,
                module:val?.module?.module,
                name: <Link href={URLS.project+"/"+val.id}>{val.name}</Link>,
                requested: val.requestedby,
                deadline: `${new Date(val.livedate).getDate()}-${MONTH_NAMES[new Date(val.livedate).getMonth()+1]}-${new Date(val.livedate).getFullYear()}`,
                dev_com:val.devCompleted,
                test_com:val.testCompleted,
                signoff:val.signoff,
                live:val.live
              },
            ];
            let ongoingicon=null
            const today=new Date()
            const deadline=new Date(val.livedate)
            const diffintime=deadline.getTime()-today.getTime()
            const diffindays=Math.round(diffintime/one_day_ms)
            console.log(diffintime, diffindays)
            if(diffintime<0){
              ongoingicon=<><ExclamationCircleTwoTone twoToneColor="#eb2f96" style={{fontSize:"1.2rem"}} /></>
            }
            else if(diffindays<15){
              ongoingicon=<WarningTwoTone twoToneColor={diffindays<5?"#eb2f96":"#ffcc00"} style={{fontSize:"1.2rem"}} />
            }
            return (<Panel key={index} header={val.name} extra={
              props.icon==="completed"?
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:"1.2rem"}}/>:
              
              ongoingicon}>
            <Table columns={columns} dataSource={data} pagination={false} bordered/>
          </Panel>)

            
          })}
        </Collapse>
    )
}

export default OngoingProjects

