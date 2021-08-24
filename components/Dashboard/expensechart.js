import { Bar } from "react-chartjs-2";
import React from "react";
import SiderDemo from "../Layout/layout";
import { client, MONTH_NAMES } from "../../utils/constants";
import { GraphQLClient, gql } from "graphql-request";
import { BACKEND_URL } from "../../utils/constants";
import Cookies from "js-cookie";
import { message } from "antd";

const query = gql`
  query {
    sixmonthdata
  }
`;

const ExpenseBarChart = (props) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (props.loggedIn) {
      props.client
        .request(query)
        .then((resp) => {
          const expenseobj = JSON.parse(resp.sixmonthdata);

          const lbl = expenseobj.map((val) => {
            return `${MONTH_NAMES[val.date__month]}-${val.date__year}`;
          });
          const label = [...new Set(lbl)];
          const value = [];
          for (let i = 0; i < expenseobj.length; i++) {
            let obj = {};
            for (let j = 0; j < expenseobj.length; j++) {
              if (expenseobj[i]?.date__month === expenseobj[j]?.date__month) {
                obj["label"] = `${MONTH_NAMES[expenseobj[i]?.date__month]}-${
                  expenseobj[i]?.date__year
                }`;
                if (expenseobj[j]?.module === 10) {
                  obj["mb"] = expenseobj[j]?.final_payment__sum;
                } else if (expenseobj[j]?.module === 20) {
                  obj["upi"] = expenseobj[j]?.final_payment__sum;
                } else {
                  obj["misc"] = expenseobj[j]?.final_payment__sum;
                }
              }
            }
            if (obj) {
              value.push(obj);
            }
          }

          let uniquevals = [];
          let uniqueobj = {};
          for (let i in value) {
            const date = value[i].label;
            uniqueobj[date] = value[i];
          }
          for (let i in uniqueobj) {
            uniquevals.push(uniqueobj[i]);
          }
          setData(uniquevals);
        })
        .catch((err) => {
          err.message.indexOf("|")
            ? message.error(err.message.substr(0, err.message.indexOf("|")))
            : console.log(err);
        });
    }
  }, []);

  const labels = data.map((val) => val.label);
  const dataval = {
    labels: labels,
    datasets: [
      {
        label: "Mobile Banking",
        data: data.map((val) => (val.mb ? val.mb : 0)),
        backgroundColor: "#2a9d8f",
      },
      {
        label: "UPI",
        data: data.map((val) => (val.upi ? val.upi : 0)),
        backgroundColor: "#a4133c",
      },
      {
        label: "Misc",
        data: data.map((val) => (val.misc ? val.misc : 0)),
        backgroundColor: "rgba(30,85,92,0.75)",
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };

  return <Bar data={dataval} config={config} height="85%" />;
};

export default ExpenseBarChart;
