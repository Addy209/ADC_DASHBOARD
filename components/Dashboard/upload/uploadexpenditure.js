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
    $fincost: Int!
    $finrate: Float!
    $fintxns: Int!
    $gst: Int!
    $gst_percent: Float!
    $module: ID!
    $nonfincost: Int!
    $nonfinrate: Float!
    $nonfintxns: Int!
    $penalty: Int!
    $invoice: Upload
  ) {
    createExpense(
      date: $date
      description: $description
      finTxn: $fintxns
      finRate: $finrate
      finCost: $fincost
      nonfinTxn: $nonfintxns
      nonfinRate: $nonfinrate
      nonfinCost: $nonfincost
      gstPercent: $gst_percent
      gstAmt: $gst
      penalty: $penalty
      baseAmt: $baseamount
      finalPayment: $finalamt
      module: $module
      invoice: $invoice
    ) {
      success
    }
  }
`;

const ExpenditureForm = (props) => {
  const [state, setState] = useState({
    fintxns: "",
    nonfintxns: "",
    finrate: 0.0,
    nonfinrate: 0.0,
    fincost: 0,
    nonfincost: 0,
    baseamount: "",
    gst_percent: 0,
    gst: "",
    penalty: 0,
    finalamt: 0,
  });

  const SetGST = (base, per = null, pen = null) => {
    const gst = per ?? state.gst_percent ?? 0;
    console.log(gst);
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
      case "fintxns": {
        SetTheState(values);
        if (state.finrate) {
          let res = Math.round(val * state.finrate);
          SetTheState({ fincost: res });
          res = res + state.nonfincost;
          SetTheState({ baseamount: res });
          if (state.gst_percent) {
            SetGST(res);
          }
        }
        break;
      }
      case "finrate": {
        SetTheState(values);
        if (state.fintxns) {
          let res = Math.round(state.fintxns * val);
          SetTheState({ fincost: res });
          res = res + state.nonfincost;
          SetTheState({ baseamount: res });
          if (state.gst_percent) {
            SetGST(res);
          }
        }
        break;
      }
      case "nonfintxns": {
        SetTheState(values);
        if (state.nonfinrate) {
          let res = Math.round(val * state.nonfinrate);
          SetTheState({ nonfincost: res });

          res = res + state.fincost;
          SetTheState({ baseamount: res });
          if (state.gst_percent) {
            SetGST(res);
          }
        }
        break;
      }
      case "nonfinrate": {
        SetTheState(values);
        if (state.nonfintxns) {
          let res = Math.round(state.nonfintxns * val);
          SetTheState({ nonfincost: res });

          res = res + state.fincost;
          SetTheState({ baseamount: res });
          if (state.gst_percent) {
            SetGST(res);
          }
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
        console.log(data);
        if (data.createExpense.success) {
          message.success("Expense Saved Successfully");
        }
      })
      .catch((err) => {
        message.error("Expense was not saved");
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
          module: "00",
          fintxns: 0,
          nonfintxns: 0,
          finrate: state.finrate,
          nonfinrate: state.nonfinrate,
          gst_percent: state.gst_percent,
          penalty: 0,
          description: "",
          invoice: null,
        }}
        onValuesChange={(values) => handleChange(values)}
        onFinish={formSubmit}
        size="large"
      >
        <div className={styles.expenditureform}>
          <div className={styles.expenditureform_field}>
            <Form.Item label="Date" name="date">
              <DatePicker
                picker="date"
                placeholder="Select Date of Expenditure"
                className={styles.setwidth}
              />
            </Form.Item>

            <Form.Item label="Financial Txns" name="fintxns">
              <InputNumber className={styles.setwidth} />
            </Form.Item>
            <Form.Item label="Rate" name="finrate">
              <InputNumber className={styles.setwidth} min={0} step={0.01} />
            </Form.Item>
            <Form.Item label="Financial Txns Cost">
              <InputNumber
                className={styles.setwidth}
                value={state.fincost}
                disabled
              />
            </Form.Item>
            <Form.Item label="Base Amount">
              <InputNumber
                className={styles.setwidth}
                value={state.baseamount}
                disabled
              />
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
            <Form.Item label="Module" name="module">
              <Select className={styles.setwidth}>
                <Select.Option value="00">---Select Module---</Select.Option>
                {props.module.map((val, index) => (
                  <Select.Option value={val.code} key={index}>
                    {val.module}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Non-Financial Txns" name="nonfintxns">
              <InputNumber className={styles.setwidth} />
            </Form.Item>
            <Form.Item label="Rate" name="nonfinrate">
              <InputNumber className={styles.setwidth} min={0} step={0.01} />
            </Form.Item>
            <Form.Item label="Non-Financial Txns Cost">
              <InputNumber
                className={styles.setwidth}
                disabled
                value={state.nonfincost}
              />
            </Form.Item>

            <Form.Item label="GST Percent" name="gst_percent">
              <InputNumber
                className={styles.setwidth}
                min={0}
                max={100}
                step={0.01}
              />
            </Form.Item>

            <Form.Item label="Penalty" name="penalty">
              <InputNumber className={styles.setwidth} min={0} />
            </Form.Item>

            <Form.Item label="Expense Description" name="description">
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

export default ExpenditureForm;
