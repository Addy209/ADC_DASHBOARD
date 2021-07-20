import React from 'react'
import styles from './login.module.css'
import { Form, Input, Button, Checkbox } from 'antd';
import RiLoginCircleFill from 'react-icons/ri'
import Image from 'next/image'
import { Typography } from 'antd';
import {RiLoginBoxFill} from 'react-icons/ri'

const { Title } = Typography;

const Login=(props)=>{

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


    return (
        <div className={styles.logindiv}>
            <Title className={styles.title}>Digital ADC</Title>

            <div className={styles.loginbox}>
                <Image src="/cbi.jpg" height='100px' width='250px' />
                <Title level={2} className={styles.logintext}>Login</Title>
        <div className={styles.colors}>
        <Form
          name="basic"
          
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder="Username*"/>
          </Form.Item>
    
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password*"/>
          </Form.Item>
    
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login&nbsp; <RiLoginBoxFill fill='#fff' size='20px' className={styles.icon}/>
            </Button>
          </Form.Item>
        </Form>
        </div>
        </div>
        </div>
      );

}

export default Login