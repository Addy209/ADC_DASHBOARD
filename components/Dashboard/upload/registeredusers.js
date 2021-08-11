import React, { useState, useEffect } from "react";
import { Form, InputNumber, Button, DatePicker, message, Modal } from "antd";
import { UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { gql, GraphQLClient } from "graphql-request";
import { BACKEND_URL } from "../../../utils/constants";
import Cookies from "js-cookie";
import styles from "../expenditure/expenditure.module.css";
import { connect } from "react-redux";
import { IoCompassOutline } from "react-icons/io5";
import * as actionTypes from "../../../redux/actions/main";

const uploadMutation = gql`
  mutation ($date: Date!, $mbIncremental: Int!, $upiIncremental: Int!) {
    addIncrementalUser(
      date: $date
      mbinc: $mbIncremental
      upiinc: $upiIncremental
    ) {
      totalusers {
        date
        mb
        upi
      }
    }
  }
`;

const { confirm } = Modal;

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
    const mbinc = data.mbIncremental - props.regusers.mb;
    const upiinc = data.upiIncremental - props.regusers.upi;
    if (mbinc <= 0 || upiinc <= 0) {
      confirm({
        title: "Please confirm the data?",
        icon: <ExclamationCircleOutlined />,
        content:
          "One or More Incremental Values are coming in negative. Do you want to proceed?",
        onOk() {
          props.client
            .request(uploadMutation, data)
            .then((resp) => {
              message.success("Users Count Updated Successfully");
              form.resetFields();
              props.reg(resp.addIncrementalUser.totalusers);
            })
            .catch((err) => {
              message.error("Duplicate Entry Found");
            });
        },
        onCancel() {
          return 0;
        },
      });
    } else {
      props.client
        .request(uploadMutation, data)
        .then((resp) => {
          message.success("Users Count Updated Successfully");
          form.resetFields();
          props.reg(resp.addIncrementalUser.totalusers);
        })
        .catch((err) => {
          message.error("Duplicate Entry Found");
        });
    }
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
              message: "Please Provide MB Total User Registration Count",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: 200 }}
            placeholder="Total MB Users Registered"
          />
        </Form.Item>

        <Form.Item
          name="upiIncremental"
          rules={[
            {
              required: true,
              message: "Please Provide UPI Total User Registration Count",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: 200 }}
            placeholder="Total UPI Users Registered"
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

const mapDispatchToProps = (dispatch) => ({
  reg: (regusers) => dispatch(actionTypes.setRegUsers(regusers)),
});

const mapStateToProps = (state) => ({
  regusers: state.main.regusers,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredUsers);
