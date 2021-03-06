import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined, LockOutlined } from "@ant-design/icons";
import { gql, GraphQLClient } from "graphql-request";
import { BACKEND_URL } from "../../../utils/constants";
import Cookies from "js-cookie";

const uploadMutation = gql`
  mutation ($id: ID!, $name: String!, $doc: Upload!) {
    documentUpload(project: $id, name: $name, document: $doc) {
      savedDocument {
        name
        uploadedAt
        document
      }
    }
  }
`;

const DocumentUpload = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const data = {
      ...values,
      doc: values.doc.file,
      id: props.id,
    };

    props.client
      .request(uploadMutation, data)
      .then((resp) => {
        form.resetFields();
        props.refetch(resp.documentUpload.savedDocument);
      })
      .catch((err) => {
        err.message.indexOf("|")
          ? message.error(err.message.substr(0, err.message.indexOf("|")))
          : console.log(err);
      });
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      initialValues={{
        name: "",
        doc: null,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please Enter Document Name!",
          },
        ]}
      >
        <Input placeholder="Document Name" />
      </Form.Item>
      <Form.Item
        name="doc"
        rules={[
          {
            required: true,
            message: "Please Select Document!",
          },
        ]}
      >
        <Upload maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to Select Document</Button>
        </Upload>
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            Upload
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default DocumentUpload;
