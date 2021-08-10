import React from "react";
import { Card, Avatar, Tooltip } from "antd";
import {
  FileExcelTwoTone,
  FilePdfTwoTone,
  FilePptTwoTone,
  FileTextTwoTone,
  FileImageTwoTone,
  FileWordTwoTone,
  FileZipTwoTone,
  FileTwoTone,
} from "@ant-design/icons";
import { gql } from "graphql-request";
import {
  AiOutlineDownload,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { MEDIA_URL } from "../../../utils/constants";

const { Meta } = Card;

const gridStyle = {
  width: "20%",
  textAlign: "center",
};

const query = gql`
  query {
    sharedfiles {
      id
      name
      desc
      file
      type
      size
      private
      uploadedAt
      user {
        firstName
        lastName
      }
    }
  }
`;

const iconstyle = { fontSize: "15vh", padding: "5px" };

const SharedFiles = (props) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    props.client.request(query).then((resp) => {
      setData(resp?.sharedfiles);
    });
  }, []);

  return (
    <Card title="My Files">
      {data.map((val, index) => {
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
          icon = <FileImageTwoTone twoToneColor="#734B5E" style={iconstyle} />;
        } else if (val.type.includes("presentation")) {
          icon = <FilePptTwoTone twoToneColor="orange" style={iconstyle} />;
        } else if (val.type.includes("zip")) {
          icon = <FileZipTwoTone twoToneColor="#DFC5A4" style={iconstyle} />;
        } else if (val.type.includes("text")) {
          icon = <FileTextTwoTone twoToneColor="gray" style={iconstyle} />;
        } else if (val.type.includes("document")) {
          icon = <FileWordTwoTone twoToneColor="#4D7EA8" style={iconstyle} />;
        } else {
          icon = <FileTwoTone twoToneColor="#472C1B" style={iconstyle} />;
        }

        return (
          <Card.Grid style={gridStyle} key={index}>
            <Card
              style={{ width: 225 }}
              cover={icon}
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
            >
              <Meta
                title={<span style={{ margin: "2vh" }}>{val.name}</span>}
                description={val.desc}
              />
              <small>
                Uploaded By: {val?.user?.firstName + " " + val?.user?.lastName}
              </small>
            </Card>
          </Card.Grid>
        );
      })}
    </Card>
  );
};

export default SharedFiles;
