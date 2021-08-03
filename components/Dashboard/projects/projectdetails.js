import React from 'react'
import { Descriptions, Badge } from 'antd';
import {
    CloseCircleTwoTone,
    CheckCircleTwoTone
} from '@ant-design/icons'

const ProjectDetails=props=>{

    return (
        <div>
    <Descriptions
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="Module">{props.values.module.module}</Descriptions.Item>
      <Descriptions.Item label="Project Name">{props.values.name}</Descriptions.Item>
      <Descriptions.Item label="Developement Complete Date">{props.values.devCompleteDate}</Descriptions.Item>
      <Descriptions.Item label="Development Completed">
        {props.values.devCompleted?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
      </Descriptions.Item>
      <Descriptions.Item label="Testing Start Date">{props.values.testStartDate}</Descriptions.Item>
      <Descriptions.Item label="Testing Complete Date">{props.values.testCompleteDate}</Descriptions.Item>
      <Descriptions.Item label="Testing Completed">
      {props.values.testCompleted?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
      </Descriptions.Item>
      <Descriptions.Item label="Live Date">{props.values.livedate}</Descriptions.Item>
      <Descriptions.Item label="Priority">{props.values.priority.priority}</Descriptions.Item>
      <Descriptions.Item label="Requested By">{props.values.requestedby}</Descriptions.Item>
      <Descriptions.Item label="Signoff">
      {props.values.signoff?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
      </Descriptions.Item>
      <Descriptions.Item label="Is Live">
      {props.values.live?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
      </Descriptions.Item>
    </Descriptions>
    <Descriptions
      bordered
    >
        <Descriptions.Item label="Project Description">
        {props.values.description}
      </Descriptions.Item>

    </Descriptions>
  </div>
    )
}

export default ProjectDetails