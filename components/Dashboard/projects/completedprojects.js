import { Collapse } from 'antd';
import React from 'react'
import {CheckCircleTwoTone} from '@ant-design/icons'

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CompletedProjects=props=>{
    return (
        <Collapse accordion>
    <Panel header="This is panel header 1" extra={<CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:"1.2rem"}} />} key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" extra={<CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:"1.2rem"}}/>} key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" extra={<CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:"1.2rem"}}/>} key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
    )
}

export default CompletedProjects