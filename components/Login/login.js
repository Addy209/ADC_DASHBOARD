import React from "react";
import styles from "./login.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import Image from "next/image";
import { Typography } from "antd";
import { RiLoginBoxFill } from "react-icons/ri";
import { request, gql } from "graphql-request";
import { BACKEND_URL, URLS } from "../../utils/constants";
import * as actionTypes from "../../redux/actions/main";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const login_mut = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshExpiresIn
    }
  }
`;

const { Title } = Typography;

const Login = (props) => {
  const router = useRouter();
  if (props.loggedIn) {
    router.push(URLS.dashboard);
  }
  console.log(props);
  const onFinish = (values) => {
    props.client
      .request(login_mut, values)
      .then((data) => {
        console.log(data);
        Cookies.set("TOKEN", data.tokenAuth.token);
        props.login(true);
      })
      .catch((err) => {
        alert("Wrong Username or Password");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.logindiv}>
      <Title className={styles.title}>ADC Dashboard</Title>

      <div className={styles.loginbox}>
        <Image src="/cbi.jpg" height="100px" width="250px" />
        <Title level={2} className={styles.logintext}>
          Login
        </Title>
        <div className={styles.colors}>
          <Form
            name="basic"
            initialValues={{
              username: "",
              password: "",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Username*" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password*" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login&nbsp;{" "}
                <RiLoginBoxFill
                  fill="#fff"
                  size="20px"
                  className={styles.icon}
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.main.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (status) => dispatch(actionTypes.setToken(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
