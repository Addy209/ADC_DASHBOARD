import { Line } from "react-chartjs-2";
import React from "react";
import { GraphQLClient, gql } from "graphql-request";
import { BACKEND_URL } from "../../utils/constants";
import Cookies from "js-cookie";

const query = gql`
  query {
    incuserdata {
      date
      incMbusers
      incUpiusers
    }
  }
`;

const UsersCount = (props) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (props.loggedIn) {
      props.client
        .request(query)
        .then((resp) => {
          setData(resp.incuserdata);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const labels = data.map((val) => val.date);

  const dataval = {
    labels: labels,
    datasets: [
      {
        label: "Mobile Banking",
        data: data.map((val) => val.incMbusers),
        borderColor: "#2a9d8f",
        backgroundColor: "#2a9d8f",
      },
      {
        label: "UPI",
        data: data.map((val) => val.incUpiusers),
        borderColor: "#a4133c",
        backgroundColor: "#a4133c",
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    },
  };

  return <Line data={dataval} config={config} height="85%" />;
};

export default UsersCount;
