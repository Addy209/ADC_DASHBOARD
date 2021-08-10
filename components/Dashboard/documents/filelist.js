import { List, Tooltip } from "antd";
import styles from "./document.module.css";
import {
  AiOutlineDownload,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {
  FileExcelTwoTone,
  FilePdfTwoTone,
  FilePptTwoTone,
  FileTextTwoTone,
  FileImageTwoTone,
  FileWordTwoTone,
  FileZipTwoTone,
  FileTwoTone,
  Html5TwoTone,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { MEDIA_URL } from "../../../utils/constants";

const iconstyle = { fontSize: "7vh", padding: "5px" };

const FileList = (props) => {
  const list = props.data;
  return (
    <div className={styles.resultlist}>
      <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(val, index) => {
          let icon = null;
          if (val.type.includes("pdf")) {
            icon = <FilePdfTwoTone twoToneColor="tomato" style={iconstyle} />;
          } else if (
            val.type.includes("sheet") ||
            val.type.includes("excel") ||
            val.type.includes("csv")
          ) {
            icon = <FileExcelTwoTone twoToneColor="green" style={iconstyle} />;
          } else if (val.type.includes("image")) {
            icon = (
              <FileImageTwoTone twoToneColor="#734B5E" style={iconstyle} />
            );
          } else if (val.type.includes("presentation")) {
            icon = <FilePptTwoTone twoToneColor="orange" style={iconstyle} />;
          } else if (val.type.includes("zip")) {
            icon = <FileZipTwoTone twoToneColor="#DFC5A4" style={iconstyle} />;
          } else if (val.type.includes("html")) {
            icon = <Html5TwoTone twoToneColor="#FC490B" style={iconstyle} />;
          } else if (val.type.includes("text")) {
            icon = <FileTextTwoTone twoToneColor="gray" style={iconstyle} />;
          } else if (val.type.includes("document")) {
            icon = <FileWordTwoTone twoToneColor="#4D7EA8" style={iconstyle} />;
          } else {
            icon = <FileTwoTone twoToneColor="#472C1B" style={iconstyle} />;
          }

          return (
            <List.Item
              actions={[
                <Tooltip title="Download File" key="download">
                  <a
                    href={`${MEDIA_URL}${val.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <AiOutlineDownload size="2rem" />
                  </a>
                </Tooltip>,
              ]}
              key={index}
            >
              <List.Item.Meta
                avatar={icon}
                title={val.name}
                description={`${val.desc} | Uploaded By: ${
                  val.user?.firstName + " " + val.user?.lastName
                }`}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.main.username,
});

export default connect(mapStateToProps)(FileList);
