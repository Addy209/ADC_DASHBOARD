import React from "react";
import { Select, Divider, DatePicker, Space, Button, Typography } from "antd";
import styles from "./expenditure.module.css";
import Table from "./datatable";
import request, { GraphQLClient, gql } from "graphql-request";
import { BACKEND_URL, MONTH_NAMES } from "../../../utils/constants";
import Cookies from "js-cookie";
import ExcelExport from "./downloadcsv";

const { Option } = Select;
const { Title, Text } = Typography;

const expense_query = gql`
  query ($module: Int!, $fromdate: Date, $todate: Date) {
    expensedata(module: $module, fromDate: $fromdate, toDate: $todate) {
      date
      description
      module {
        code
        module
      }
      finTxn
      finRate
      finCost
      nonfinTxn
      nonfinRate
      nonfinCost
      baseAmt
      gstPercent
      gstAmt
      penalty
      finalPayment
      invoice
    }
  }
`;

const Expenditure = (props) => {
  const [respdata, setRespData] = React.useState(null);
  const [values, setValues] = React.useState({
    fromdate: null,
    todate: null,
    module: null,
  });

  const handleChange = (value) => {
    setValues({
      ...values,
      module: value,
    });
  };

  const dateChange = (date, dateString, id) => {
    let val = dateString;
    if (id === "F") {
      if (dateString === "") {
        val = null;
      }
      setValues({
        ...values,
        fromdate: val,
      });
    } else {
      if (dateString === "") {
        val = null;
      }
      setValues({
        ...values,
        todate: val,
      });
    }
  };

  const handleClick = () => {
    if (values.module) {
      props.client
        .request(expense_query, values)
        .then((data) => {
          setRespData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className={styles.exp_layout}>
        <Divider orientation="left">Filters</Divider>
        <div className={styles.filters}>
          <span>
            <Text>Module: &nbsp;</Text>
            <Select
              defaultValue="00"
              style={{ width: 180 }}
              onChange={(value) => handleChange(value)}
            >
              <Option value="00" disabled>
                ---Select Module---
              </Option>
              {props.module
                ? props.module.map((val, index) => (
                    <Option value={val.code} key={index}>
                      {val.module}
                    </Option>
                  ))
                : null}
            </Select>
          </span>

          <span>
            <Text>Month: &nbsp;</Text>
            <Space direction="horizontal">
              <DatePicker
                onChange={(date, dateString) =>
                  dateChange(date, dateString, "F")
                }
                picker="date"
                placeholder="From Month: "
              />
              <DatePicker
                onChange={(date, dateString) =>
                  dateChange(date, dateString, "T")
                }
                picker="date"
                placeholder="To Month: "
              />
            </Space>
          </span>
          <Button type="primary" onClick={handleClick}>
            Go
          </Button>
        </div>
        {respdata ? (
          <div>
            <Divider orientation="left">Data</Divider>
            <div className={styles.scroll}>
              <Table module={values.module} data={respdata.expensedata} />
            </div>
            <ExcelExport data={respdata.expensedata} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Expenditure;
