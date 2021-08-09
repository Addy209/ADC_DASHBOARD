import React, { useState, useEffect } from "react";
import { Form, InputNumber, Button, DatePicker, message } from "antd";
import { UploadOutlined, LockOutlined } from "@ant-design/icons";
import { gql, GraphQLClient } from "graphql-request";
import { BACKEND_URL } from "../../../utils/constants";
import Cookies from "js-cookie";
import styles from "../expenditure/expenditure.module.css";

const uploadMutation = gql`
  mutation ($date: Date!, $mbIncremental: Int!, $upiIncremental: Int!) {
    addIncrementalUser(
      date: $date
      mbinc: $mbIncremental
      upiinc: $upiIncremental
    ) {
      success
    }
  }
`;

const RegisteredUsers = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const data = {
      ...values,
      date: values.date.toDate().toISOString().split("T")[0],
    };

    props.client
      .request(uploadMutation, data)
      .then((resp) => {
        console.log(resp);
        message.success("Users Count Updated Successfully");
        form.resetFields();
      })
      .catch((err) => {
        message.error("Duplicate Entry Found");
      });
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      initialValues={{
        date: null,
        upiIncremental: null,
        mbIncremental: null,
      }}
      size="large"
      onFinish={onFinish}
    >
      <div className={styles.registeredusers}>
        <Form.Item
          name="date"
          rules={[
            {
              required: true,
              message: "Please Enter a Date!",
            },
          ]}
        >
          <DatePicker picker="date" />
        </Form.Item>
        <Form.Item
          name="mbIncremental"
          rules={[
            {
              required: true,
              message: "Please Provide MB Incremental User Registration Count",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: 200 }}
            placeholder="MB Incremental Registered Users"
          />
        </Form.Item>

        <Form.Item
          name="upiIncremental"
          rules={[
            {
              required: true,
              message: "Please Provide UPI Incremental User Registration Count",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: 200 }}
            placeholder="UPI Incremental Registered Users"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Upload
            </Button>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

export default RegisteredUsers;
