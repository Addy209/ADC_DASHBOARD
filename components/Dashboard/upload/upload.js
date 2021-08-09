import React from "react";
import { Divider, Upload, Switch, message, Button } from "antd";
import { FileAddOutlined, UploadOutlined } from "@ant-design/icons";
import styles from "../expenditure/expenditure.module.css";
import ExpenditureForm from "./uploadexpenditure";
import { BACKEND_URL } from "../../../utils/constants";
import { GraphQLClient, gql } from "graphql-request";
import Cookies from "js-cookie";
import RegisteredUsers from "./registeredusers";

const upload_query = gql`
  mutation addfile($file: Upload!) {
    upload(file: $file) {
      success
    }
  }
`;

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
    console.log(switchval);
  };

  const onClick = () => {
    const info = file;
    const { status } = info.file;
    props.client
      .request(upload_query, {
        file: info.file,
      })
      .then((data) => {
        message.success(
          `${info.file.name} file data captured successfully. Have you updated users count? `
        );
      })
      .catch((err) => {
        message.error(
          "Duplicate Entry Found!, If correction is needed, Please do it from Admin Panel"
        );
      });
  };

  const onDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  return (
    <div>
      <Divider orientation="left">
        Daily Transaction Sheet Upload &nbsp;{" "}
        <Switch
          defaultChecked={switchval.daily}
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
          defaultChecked={switchval.registeredusers}
          onChange={(value) => handleSwitchChange(value, "r")}
        />
      </Divider>
      {switchval.registeredusers ? <RegisteredUsers {...props} /> : null}

      <Divider orientation="left">
        Expenditure Upload &nbsp;{" "}
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          defaultChecked={switchval.expense}
          onChange={(value) => handleSwitchChange(value, "e")}
        />
      </Divider>
      {switchval.expense ? <ExpenditureForm {...props} /> : null}
    </div>
  );
};

export default UploadData;
