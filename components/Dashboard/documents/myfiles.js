import React from "react";
import { Card, message, Tooltip } from "antd";
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
    myfiles {
      id
      name
      desc
      file
      type
      size
      private
      uploadedAt
    }
  }
`;

const deletemutation = gql`
  mutation ($id: ID!) {
    deletefile(id: $id) {
      files {
        id
        name
        desc
        file
        type
        size
        private
        uploadedAt
      }
    }
  }
`;

const publishmutation = gql`
  mutation ($id: ID!) {
    publish(id: $id) {
      success
    }
  }
`;

const iconstyle = { fontSize: "15vh", padding: "5px" };

const MyFiles = (props) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (props.upload) {
      setData(props.upload);
    }
  }, [props.upload]);

  React.useEffect(() => {
    if (props.loggedIn) {
      props.client
        .request(query)
        .then((resp) => {
          setData(resp?.myfiles);
        })
        .catch((err) => {
          err.message.indexOf("|")
            ? message.error(err.message.substr(0, err.message.indexOf("|")))
            : console.log(err);
        });
    }
  }, []);

  const handlePublish = (id, index) => {
    props.client
      .request(publishmutation, { id: id })
      .then((resp) => {
        if (resp.publish) {
          const file = [...data];
          file[index].private = !file[index].private;
          setData(file);
        }
      })
      .catch((err) => {
        err.message.indexOf("|")
          ? message.error(err.message.substr(0, err.message.indexOf("|")))
          : console.log(err);
      });
  };

  const handleDelete = (id) => {
    props.client
      .request(deletemutation, { id: id })
      .then((resp) => {
        setData(resp.deletefile.files);
      })
      .catch((err) => {
        err.message.indexOf("|")
          ? message.error(err.message.substr(0, err.message.indexOf("|")))
          : console.log(err);
      });
  };

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
        } else if (val.type.includes("html")) {
          icon = <Html5TwoTone twoToneColor="#FC490B" style={iconstyle} />;
        } else if (val.type.includes("text")) {
          icon = <FileTextTwoTone twoToneColor="gray" style={iconstyle} />;
        } else if (val.type.includes("document")) {
          icon = <FileWordTwoTone twoToneColor="#4D7EA8" style={iconstyle} />;
        } else {
          icon = <FileTwoTone twoToneColor="#472C1B" style={iconstyle} />;
        }

        let private_icon = null;
        if (val.private) {
          private_icon = (
            <Tooltip title="Share Document With All">
              <AiOutlineEye
                key="visible"
                size="2rem"
                onClick={() => handlePublish(val.id, index)}
              />
            </Tooltip>
          );
        } else {
          private_icon = (
            <Tooltip title="Make Document Private ">
              <AiOutlineEyeInvisible
                key="invisible"
                size="2rem"
                onClick={() => handlePublish(val.id, index)}
              />
            </Tooltip>
          );
        }

        return (
          <Card.Grid style={gridStyle} key={index}>
            <Card
              style={{ width: 225 }}
              cover={icon}
              actions={[
                <Tooltip title="Delete File" key="delete">
                  <AiOutlineDelete
                    size="2rem"
                    onClick={() => handleDelete(val.id)}
                  />
                </Tooltip>,
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
                private_icon,
              ]}
            >
              <Meta
                title={<span style={{ margin: "2vh" }}>{val.name}</span>}
                description={val.desc}
              />
            </Card>
          </Card.Grid>
        );
      })}
    </Card>
  );
};

export default MyFiles;
