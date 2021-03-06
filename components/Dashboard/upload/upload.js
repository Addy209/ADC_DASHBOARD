import React from "react";
import { Divider, Upload, Switch, message, Button, Tabs } from "antd";
import { FileAddOutlined, UploadOutlined } from "@ant-design/icons";
import styles from "../expenditure/expenditure.module.css";
import ExpenditureForm from "./uploadexpenditure";
import { BACKEND_URL } from "../../../utils/constants";
import { GraphQLClient, gql } from "graphql-request";
import Cookies from "js-cookie";
import RegisteredUsers from "./registeredusers";
import OtherExpenditureForm from "./uploadotherexpenditure";

const upload_query = gql`
  mutation addfile($file: Upload!) {
    upload(file: $file) {
      success
    }
  }
`;

const { TabPane } = Tabs;

const { Dragger } = Upload;

const UploadData = (props) => {
  const [switchval, setSwitchVal] = React.useState({
    daily: true,
    registeredusers: true,
    expense: false,
  });
  const [file, setFile] = React.useState(null);

  const handleSwitchChange = (value, id) => {
    switch (id) {
      case "d": {
        setSwitchVal((state) => {
          return {
            ...state,
            daily: value,
          };
        });
        break;
      }
      case "e": {
        setSwitchVal((state) => {
          return {
            ...state,
            expense: value,
            daily: !value,
            registeredusers: !value,
          };
        });
        break;
      }

      case "r": {
        setSwitchVal((state) => {
          return {
            ...state,
            registeredusers: value,
          };
        });
        break;
      }
    }
  };

  const onClick = () => {
    const info = file;
    const { status } = info.file;
    props.client
      .request(upload_query, {
        file: info.file,
      })
      .then((data) => {
        message.success("Record Saved Successfully!");
      })
      .catch((err) => {
        err.message.indexOf("|")
          ? message.error(err.message.substr(0, err.message.indexOf("|")))
          : console.log(err);
      });
  };

  const onDrop = (e) => {};

  return (
    <div>
      <Divider orientation="left">
        Daily Transaction Sheet Upload &nbsp;{" "}
        <Switch
          defaultChecked
          checked={switchval.daily}
          checkedChildren="On"
          unCheckedChildren="Off"
          onChange={(value) => handleSwitchChange(value, "d")}
        />
      </Divider>
      {switchval.daily ? (
        <div className={styles.upload}>
          <Dragger
            onChange={(info) => {
              setFile(info);
            }}
            onDrop={onDrop}
            className={styles.dragger}
          >
            <p className="ant-upload-drag-icon">
              <FileAddOutlined />
            </p>
            <p className="ant-upload-text">
              Click this area and select file to upload
            </p>
            <p className="ant-upload-hint">
              &nbsp;&nbsp;&nbsp;&nbsp;Please upload daily transaction report
              sheet.&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </Dragger>
          <div style={{ marginTop: "2vh" }}>
            <Button type="primary" onClick={onClick} icon={<UploadOutlined />}>
              Upload
            </Button>
          </div>
        </div>
      ) : null}

      <Divider orientation="left">
        Expenditure Upload &nbsp;{" "}
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          defaultChecked
          checked={switchval.registeredusers}
          onChange={(value) => handleSwitchChange(value, "r")}
        />
      </Divider>
      {switchval.registeredusers ? <RegisteredUsers {...props} /> : null}

      <Divider orientation="left">
        Expenditure Upload &nbsp;{" "}
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={switchval.expense}
          onChange={(value) => handleSwitchChange(value, "e")}
        />
      </Divider>

      {switchval.expense ? (
        <Tabs defaultActiveKey="1" type="card" size="large" centered>
          <TabPane tab="Non-Transactional Expense" key="1">
            <OtherExpenditureForm {...props} />
          </TabPane>
          <TabPane tab="Transactional Expense" key="2">
            <ExpenditureForm {...props} />
          </TabPane>
        </Tabs>
      ) : null}
    </div>
  );
};

export default UploadData;
