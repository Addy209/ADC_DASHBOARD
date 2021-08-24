import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Divider, Checkbox, message } from "antd";
import { UploadOutlined, LockOutlined } from "@ant-design/icons";
import { gql, GraphQLClient } from "graphql-request";
import { BACKEND_URL } from "../../../utils/constants";
import Cookies from "js-cookie";
import styles from "./document.module.css";
import FileTabs from "./files";

const uploadMutation = gql`
  mutation create($desc: String!, $file: Upload!, $private: Boolean!) {
    savefile(desc: $desc, file: $file, private: $private) {
      files {
        id
        name
        desc
        file
        type
        size
        private
        uploadedAt
        user {
          username
        }
      }
    }
  }
`;

const Document = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [upload, setUpload] = useState([]);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const data = {
      ...values,
      file: values.file.file,
    };
    if (data.file.size > 10485760) {
      message.error("Max Allowed Upload File Size is 10MB");
      return 0;
    }
    props.client
      .request(uploadMutation, data)
      .then((resp) => {
        form.resetFields();
        setUpload(resp?.savefile?.files);
      })
      .catch((err) => {
        err.message.indexOf("|")
          ? message.error(err.message.substr(0, err.message.indexOf("|")))
          : console.log(err);
      });
  };

  return (
    <div className={styles.document}>
      <Divider orientation="left">Upload Documents</Divider>
      <div className={styles.upload}>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          initialValues={{
            desc: "",
            file: null,
            private: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="file"
            rules={[
              {
                required: true,
                message: "Please Select Document!",
              },
            ]}
          >
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>
                Click to Select Document
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="desc"
            rules={[
              {
                required: true,
                message: "Please Enter Document Description!",
              },
            ]}
          >
            <Input placeholder="Document Description" />
          </Form.Item>
          <Form.Item name="private" valuePropName="checked">
            <Checkbox>Private Document</Checkbox>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Upload
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
      <Divider orientation="left">Files</Divider>
      <div>
        <FileTabs upload={upload} {...props} />
      </div>
    </div>
  );
};

export default Document;
