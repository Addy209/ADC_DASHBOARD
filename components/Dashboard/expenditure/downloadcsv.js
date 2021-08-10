import React from "react";
import { CSVLink } from "react-csv";
import styles from "./expenditure.module.css";
import { Button } from "antd";
import { SiMicrosoftexcel } from "react-icons/si";
import { MONTH_NAMES } from "../../../utils/constants";

const headers = [
  { label: "Date", key: "date" },
  { label: "Payment Description", key: "description" },
  { label: "Module", key: "module" },
  { label: "Financial Transactions (A)", key: "fintxns" },
  { label: "Financial Transaction Rate (B)", key: "finrate" },
  { label: "Financial Transaction Cost (C=A*B)", key: "fincost" },
  { label: "Non-Financial Transactions (D)", key: "nonfintxns" },
  { label: "Non-Financial Transaction Rate (E)", key: "nonfinrate" },
  { label: "Non-Financial Transaction Cost (F=D*E)", key: "nonfincost" },
  { label: "Base Amount (G=C+F)", key: "baseamt" },
  { label: "Gst Percent (H)", key: "gst_per" },
  { label: "GST (I=G*H/100)", key: "gstamt" },
  { label: "Penalty (J)", key: "penalty" },
  { label: "Final Payment(G+I-J)", key: "finalpayment" },
];

const ExcelExport = (props) => {
  let data = props.data.map((val, index) => ({
    key: index,
    date: `${new Date(val.date).getDate()}-${
      MONTH_NAMES[new Date(val.date).getMonth() + 1]
    }-${new Date(val.date).getFullYear()}`,
    description: val.description,
    module: val.module.module,
    fintxns: val.finTxn,
    finrate: val.finRate,
    fincost: val.finCost,
    nonfintxns: val.nonfinTxn,
    nonfinrate: val.nonfinRate,
    nonfincost: val.nonfinCost,
    baseamt: val.baseAmt,
    gst_per: val.gstPercent,
    gstamt: val.gstAmt,
    penalty: val.penalty,
    finalpayment: val.finalPayment,
  }));

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={`Expenditure Report-${new Date().toDateString()}.xls`}
    >
      <div className={styles.xlsbutton}>
        <Button size="large" type="primary">
          Download Report in Excel&nbsp;{" "}
          <SiMicrosoftexcel size="20px" style={{ verticalAlign: "middle" }} />
        </Button>
        <br />
      </div>
    </CSVLink>
  );
};

export default ExcelExport;
