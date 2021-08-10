import React from "react";
import { PolarArea } from "react-chartjs-2";
import styles from "./dashboard.module.css";
import { GraphQLClient, gql } from "graphql-request";
import { BACKEND_URL } from "../../utils/constants";
import Cookies from "js-cookie";

const countQuery = gql`
  query counts {
    counts
  }
`;

const ProjectChart = (props) => {
  const [counts, setCounts] = React.useState(null);
  React.useEffect(() => {
    if (props.loggedIn) {
      props.client.request(countQuery).then((resp) => {
        const parsedresp = JSON.parse(resp.counts);
        setCounts(parsedresp);
      });
    }
  }, []);

  const data = {
    labels: ["Completed", "Ongoing", "Critical"],
    datasets: [
      {
        label: "All Projects Overview",
        data: [counts?.completed, counts?.ongoing, counts?.critical],
        backgroundColor: [
          "rgba(54, 162, 235,0.5)",
          "rgba(255, 205, 86,0.5)",
          "rgba(255, 99, 132,0.5)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "polarArea",
    data: data,
    options: {},
  };

  return <PolarArea {...config} />;
};

export default ProjectChart;
