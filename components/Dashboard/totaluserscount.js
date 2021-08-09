import { Statistic, Card, Row, Col } from "antd";
import { FcBusinessman } from "react-icons/fc";
import styles from "./dashboard.module.css";
import React from "react";
import { GraphQLClient, gql } from "graphql-request";
import { BACKEND_URL } from "../../utils/constants";
import Cookies from "js-cookie";

const query = gql`
  query totalusers {
    totalusers {
      totalUpiUsers
      totalMbUsers
      updatedAt
    }
  }
`;

const TotalUser = (props) => {
  const [resp, setResp] = React.useState(null);

  React.useEffect(() => {
    if (props.loggedIn) {
      props.client.request(query).then((res) => {
        setResp(res.totalusers);
      });
    }
  }, []);

  return (
    <div className={styles.card}>
      <div
        className={styles.statvalues}
        style={{
          backgroundImage:
            "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
        }}
      >
        <Card>
          <Statistic
            title="Mobile Banking"
            value={resp ? resp.totalMbUsers : 0}
            valueStyle={{ color: "#2a9d8f" }}
            prefix={null}
          />
        </Card>
      </div>
      <div
        className={styles.statvalues}
        style={{
          backgroundImage:
            "linear-gradient(to right top, #5a749b, #5e75bc, #7871d6, #a464e6, #d945e7)",
        }}
      >
        <Card>
          <Statistic
            title="UPI"
            value={resp ? resp.totalUpiUsers : 0}
            valueStyle={{ color: "#a4133c" }}
            prefix={null}
          />
        </Card>
      </div>
    </div>
  );
};

export default TotalUser;
