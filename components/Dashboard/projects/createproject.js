import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Switch , message} from 'antd';
import styles from './projects.module.css'
import { gql, GraphQLClient } from 'graphql-request';
import { BACKEND_URL, URLS } from '../../../utils/constants';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import moment from 'moment';

const createQuery=gql `
mutation($module:ID!, $name:String!, $description:String!, $priority:ID!, $requestedBy:String!, $developmentCompleteDate:Date!, $developmentCompleted:Boolean!, 
  $testingStartDate:Date!, $testingCompleteDate:Date!, $testingComplete:Boolean!,  $liveDate:Date!, $signoff:Boolean!, $live:Boolean!) {
  createProject(module: $module, name: $name, description: $description, priority: $priority, requestedby: $requestedBy, devComDate:$developmentCompleteDate , 
  devCompleted: $developmentCompleted, testStartDate: $testingStartDate, testCompleteDate: $testingCompleteDate, testCompleted: $testingComplete, signoff: $signoff, livedate: $liveDate, live: $live) {
    project{
      id
    }
  }
}
`

const updateQuery=gql`
mutation updatePro($id:ID!, $module:ID!, $name:String!, $description:String!, $priority:ID!, $requestedBy:String!, $developmentCompleteDate:Date!, $developmentCompleted:Boolean!, 
  $testingStartDate:Date!, $testingCompleteDate:Date!, $testingComplete:Boolean!,  $liveDate:Date!, $signoff:Boolean!, $live:Boolean!) {
  updateProject(id:$id, module: $module, name: $name, description: $description, priority: $priority, requestedby: $requestedBy, devComDate:$developmentCompleteDate , 
  devCompleted: $developmentCompleted, testStartDate: $testingStartDate, testCompleteDate: $testingCompleteDate, testCompleted: $testingComplete, signoff: $signoff, livedate: $liveDate, live: $live) {
    project{
      id
        module {
          code
          module
        }
        name
        description
        priority {
          code
          priority
        }
        devCompleteDate
        devCompleted
        testStartDate
        testCompleteDate
        testCompleted
        requestedby
        signoff
        livedate
        live
        projectDocument {
            
          name
          document
          uploadedAt
        }
    }
  }
}
`
const dateformat='YYYY-MM-DD'

const CreateProject = (props) => {
  const router=useRouter()
  const onFinish=values=>{
    let data={
      ...values,
      developmentCompleteDate:values.developmentCompleteDate.toDate().toISOString().split('T')[0],
      testingStartDate:values.testingStartDate.toDate().toISOString().split('T')[0],
      testingCompleteDate:values.testingCompleteDate.toDate().toISOString().split('T')[0],
      liveDate:values.liveDate.toDate().toISOString().split('T')[0],
    }
    

    const client=new GraphQLClient(BACKEND_URL,{
      headers:{
        authorization:`JWT ${Cookies.get('JWT')}`
      }
    })
    if (props?.values?.id){
      data={
        ...data,
        id:props.values.id
      }
      console.log(data)
      client.request(updateQuery,data).then(res=>{
        message.success("Project Updated Successfully")
        console.log(res)
        props.refetch(res.updateProject)
      }).catch(err=>{
        message.error("Something Went Wrong")
      })
    }
    else{
      
      client.request(createQuery,data).then(res=>{
        message.success("Project Saved Successfully")
        setTimeout(()=>{
          router.push(`${URLS.project}/${res.createProject.project.id}`)

        },5000)
      }).catch(err=>{
        message.error("Something Went Wrong")
      })
    }
  }

  console.log(props.module)

  return (
    <>
    
      <Form
        labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 13,
          }}
        initialValues={{
          module: props?.values?.module.code??"00",
          name:props?.values?.name??"",
          description:props?.values?.description??"",
          priority:props?.values?.priority.code??"00",
          requestedBy:props?.values?.requestedby??"",
          developmentCompleteDate:moment(props?.values?.devCompleteDate,dateformat)??null,
          developmentCompleted:props?.values?.devCompleted??false,
          testingStartDate:moment(props?.values?.testStartDate,dateformat)??null,
          testingCompleteDate:moment(props?.values?.testCompleteDate, dateformat)??null,
          testingComplete:props?.values?.testCompleted??false,
          liveDate:moment(props?.values?.livedate,dateformat)??null,
          signoff:props?.values?.signoff??false,
          live:props?.values?.live??false

        }}
        onFinish={onFinish}
        
        size="large"
      >
          <div className={styles.projectform}>
          <div className={styles.subforms}>
        <Form.Item label="Module" name="module">
            <Select>
                <Select.Option value="00" disabled>---Select Module---</Select.Option>
                {props?.data.module.map((val,index)=>{
                  return (<Select.Option value={val.code} key={index}>{val.module}</Select.Option>)
                })}
            </Select>
        </Form.Item>
        <Form.Item label="Project Name" name="name">
          <Input placeholder="Project Name" />
        </Form.Item>
        <Form.Item label="Project Description" name="description">
          <Input.TextArea placeholder="Project Description" cols="40" rows="4"/>
        </Form.Item>
        <Form.Item label="Priority" name="priority">
        <Select>
                <Select.Option value="00" disabled>---Select Priority---</Select.Option>
                {props?.data.priority.map((val,index)=>{
                  return <Select.Option value={val.code} key={index}>{val.priority}</Select.Option>
                })}
            </Select>
        </Form.Item>
        <Form.Item label="Requested By" name="requestedBy">
          <Input placeholder="Requested By Whom?" />
        </Form.Item>
        <Form.Item label="Development Complete Date" name="developmentCompleteDate">
          <DatePicker picker="date" />
        </Form.Item>
        </div>
        <div className={styles.subforms}>
        
        <Form.Item label="Development Completed?" name="developmentCompleted" valuePropName="checked">
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>
        <Form.Item label="Testing Start Date" name="testingStartDate">
          <DatePicker picker="date" />
        </Form.Item>
        <Form.Item label="Testing Complete Date" name="testingCompleteDate">
          <DatePicker picker="date" />
        </Form.Item>
        <Form.Item label="Testing Complete?" name="testingComplete" valuePropName="checked">
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>
        <Form.Item label="Live Date" name="liveDate">
          <DatePicker picker="date" />
        </Form.Item>
        <Form.Item label="Sign Off?" name="signoff" valuePropName="checked">
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>
        <Form.Item label="Live?" name="live" valuePropName="checked">
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>
        </div>
        
      </div>
      <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.submitbtn}>{props.mode==="update"?"Update Project":"Create New Project"}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProject