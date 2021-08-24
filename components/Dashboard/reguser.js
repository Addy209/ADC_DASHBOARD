import { Statistic, Row, Col, message } from "antd";
import { gql } from "graphql-request";
import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../redux/actions/main";
import { MONTH_NAMES } from "../../utils/constants";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const query = gql`
  query {
    totaluser {
      date
      mb
      upi
    }
    latestinc {
      date
      incMbusers
      incUpiusers
    }
  }
`;

const RegUsers = (props) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    if (props.loggedIn) {
      props.client
        .request(query)
        .then((res) => {
          console.log(res.totaluser);
          setData(res);
          props.reg(res.totaluser);
        })
        .catch((err) => {
          err.message.indexOf("|")
            ? message.error(err.message.substr(0, err.message.indexOf("|")))
            : console.log(err);
        });
    }
  }, []);
  return (
    <>
      {data ? (
        <Row gutter={16}>
          <Col span={4}>
            <Statistic
              title="Date"
              value={`${new Date(data.totaluser.date).getDate()}-${
                MONTH_NAMES[new Date(data.totaluser.date).getMonth() + 1]
              }-${new Date(data.totaluser.date).getFullYear()}`}
            />
          </Col>
          <Col span={5}>
            <Statistic
              title="Total Users in Mobile Banking"
              value={data.totaluser.mb}
            />
          </Col>
          <Col span={5}>
            <Statistic title="Total Users in UPI" value={data.totaluser.upi} />
          </Col>
          <Col span={5}>
            <Statistic
              title="MB Incremental "
              value={Math.abs(data.latestinc.incMbusers)}
              valueStyle={
                data.latestinc.incMbusers > 0
                  ? { color: "#3f8600" }
                  : { color: "#cf1322" }
              }
              prefix={
                data.latestinc.incMbusers > 0 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
            />
          </Col>
          <Col span={5}>
            <Statistic
              title="UPI Incremental"
              value={Math.abs(data.latestinc.incUpiusers)}
              valueStyle={
                data.latestinc.incUpiusers > 0
                  ? { color: "#3f8600" }
                  : { color: "#cf1322" }
              }
              prefix={
                data.latestinc.incUpiusers > 0 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
            />
          </Col>
        </Row>
      ) : null}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  reg: (regusers) => dispatch(actionTypes.setRegUsers(regusers)),
});

export default connect(null, mapDispatchToProps)(RegUsers);
