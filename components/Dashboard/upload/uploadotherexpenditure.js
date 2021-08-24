import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  message,
  Upload,
} from "antd";
import styles from "../expenditure/expenditure.module.css";
import { TiUploadOutline } from "react-icons/ti";
import { GraphQLClient, gql } from "graphql-request";
import { BACKEND_URL } from "../../../utils/constants";
import Cookies from "js-cookie";

const expensecreate = gql`
  mutation (
    $baseamount: Int!
    $date: Date!
    $description: String!
    $finalamt: Int!
    $gst: Int!
    $gst_percent: Float!
    $module: ID!
    $penalty: Int!
    $invoice: Upload
  ) {
    createOtherExpense(
      date: $date
      module: $module
      description: $description
      baseAmt: $baseamount
      gstPercent: $gst_percent
      gstAmt: $gst
      penalty: $penalty
      finalPayment: $finalamt
      invoice: $invoice
    ) {
      success
    }
  }
`;

const OtherExpenditureForm = (props) => {
  const [state, setState] = useState({
    baseamount: "",
    gst_percent: 0,
    gst: "",
    penalty: 0,
    finalamt: 0,
  });

  const SetGST = (base, per = null, pen = null) => {
    const gst = per ?? state.gst_percent ?? 0;
    const penalty = pen ?? state.penalty ?? 0;
    const gst_amt = Math.round((base * gst) / 100);
    let final_amt = base + gst_amt - penalty;
    setState((state) => {
      return {
        ...state,
        baseamount: base,
        gst_percent: gst,
        gst: gst_amt,
        finalamt: final_amt,
        penalty: penalty,
      };
    });
  };

  const SetTheState = (values) => {
    setState((state) => {
      return { ...state, ...values };
    });
  };

  const handleChange = (values) => {
    let val = Object.values(values)[0];
    if (val === null) {
      val = 0;
    }
    switch (Object.keys(values)[0]) {
      case "baseamount": {
        SetTheState(values);
        if (state.gst_percent) {
          SetGST(val);
        }
        break;
      }
      case "gst_percent": {
        SetTheState(values);
        if (state.baseamount) {
          const res = state.baseamount;
          SetGST(res, val);
        }
        break;
      }
      case "penalty": {
        SetTheState(values);
        if (state.baseamount && state.gst_percent) {
          const res = state.baseamount;
          SetGST(res, state.gst_percent, val);
        }
        break;
      }
    }
  };

  const formSubmit = (values) => {
    const data = {
      ...state,
      ...values,
      date: values.date.toDate().toISOString().split("T")[0],
      invoice: values.invoice?.file ?? null,
    };

    props.client
      .request(expensecreate, data)
      .then((data) => {
        if (data.createOtherExpense.success) {
          message.success("Expense Saved Successfully");
        }
      })
      .catch((err) => {
        err.message.indexOf("|")
          ? message.error(err.message.substr(0, err.message.indexOf("|")))
          : console.log(err);
      });
  };

  return (
    <>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
          date: "",
          module: "",
          baseamount: "",
          gst_percent: "",
          penalty: "",
          description: "",
          invoice: null,
        }}
        onValuesChange={(values) => handleChange(values)}
        onFinish={formSubmit}
        size="large"
      >
        <div className={styles.expenditureform}>
          <div className={styles.expenditureform_field}>
            <Form.Item
              label="Date"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
            >
              <DatePicker
                picker="date"
                placeholder="Select Date of Expenditure"
                className={styles.setwidth}
              />
            </Form.Item>

            <Form.Item
              label="Base Amount"
              name="baseamount"
              rules={[
                {
                  required: true,
                  message: "Please input Base Amount!",
                },
              ]}
            >
              <InputNumber className={styles.setwidth} />
            </Form.Item>
            <Form.Item label="GST Amount">
              <InputNumber
                className={styles.setwidth}
                value={state.gst}
                disabled
              />
            </Form.Item>
            <Form.Item
              label={
                <strong style={{ fontSize: "large" }}>Final Payment</strong>
              }
            >
              <InputNumber
                className={styles.setwidth}
                min={0}
                value={state.finalamt}
                disabled
              />
            </Form.Item>
          </div>

          <div className={styles.expenditureform_field}>
            <Form.Item
              label="Module"
              name="module"
              rules={[
                {
                  required: true,
                  message: "Please Select Module!",
                },
              ]}
            >
              <Select className={styles.setwidth}>
                <Select.Option value="00">---Select Module---</Select.Option>
                {props.module.map((val, index) => (
                  <Select.Option value={val.code} key={index}>
                    {val.module}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="GST Percent"
              name="gst_percent"
              rules={[
                {
                  required: true,
                  message: "Please input GST%, Input 0 if None!",
                },
              ]}
            >
              <InputNumber
                className={styles.setwidth}
                min={0}
                max={100}
                step={0.01}
              />
            </Form.Item>

            <Form.Item
              label="Penalty"
              name="penalty"
              rules={[
                {
                  required: true,
                  message: "Please input Penalty, Input 0 if None!",
                },
              ]}
            >
              <InputNumber className={styles.setwidth} min={0} />
            </Form.Item>

            <Form.Item
              label="Expense Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input Expense Description!",
                },
              ]}
            >
              <Input className={styles.setwidth} min={0} />
            </Form.Item>
          </div>
        </div>
        <Form.Item wrapperCol={{ offset: 10, span: 8 }} name="invoice">
          <Upload {...props}>
            <Button type="primary" icon={<TiUploadOutline />}>
              Upload Invoice
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit" className={styles.setwidth}>
            Save Expenditure
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default OtherExpenditureForm;
