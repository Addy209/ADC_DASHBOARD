import { Input, message } from "antd";
import { gql } from "graphql-request";
import React from "react";
import styles from "./document.module.css";
import FileList from "./filelist";

const { Search } = Input;

const searchquery = gql`
  query ($text: String!) {
    search(text: $text) {
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
        username
      }
    }
  }
`;

const SearchFiles = (props) => {
  const [data, setData] = React.useState([]);
  const onSearch = (value) => {
    if (!value) {
      message.info("Type Something To Search");
      return 0;
    }
    props.client
      .request(searchquery, { text: value })
      .then((res) => {
        setData(res.search);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.searchfiles}>
      <div className={styles.search}>
        <Search
          placeholder="Search Files..."
          size="large"
          onSearch={onSearch}
          enterButton
        />
      </div>
      {data.length ? <FileList data={data} {...props} /> : null}
    </div>
  );
};

export default SearchFiles;
