import { Modal, Button, Input } from "antd";
import { gql } from "graphql-request";
import React from "react";
import { FcSearch } from "react-icons/fc";
import styles from "./projects.module.css";
import SearchResult from "./searchResults";

const { Search } = Input;

const nodisplay = { style: { display: "none" } };

const searchquery = gql`
  query ($text: String!) {
    searchproject(text: $text) {
      id
      name
      description
      module {
        code
        module
      }
      livedate
    }
  }
`;

const SearchModal = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);

  const setModal1Visible = (modal1Visible) => {
    setVisible(modal1Visible);
  };

  const onSearch = (value) => {
    if (!value) {
      message.info("Type Something To Search");
      return 0;
    }
    props.client.request(searchquery, { text: value }).then((res) => {
      setData(res.searchproject);
    });
  };
  return (
    <>
      <Button
        type="default"
        onClick={() => setModal1Visible(true)}
        size="large"
      >
        <FcSearch />
        &nbsp; Search Project
      </Button>
      <Modal
        style={{ top: "10vh" }}
        title="Search Project"
        visible={visible}
        cancelButtonProps={nodisplay}
        okButtonProps={nodisplay}
        onCancel={() => setModal1Visible(false)}
        footer={null}
      >
        <div className={styles.searchfiles}>
          <div className={styles.search}>
            <Search
              placeholder="Search Files..."
              size="large"
              onSearch={onSearch}
              enterButton
            />
          </div>
          {data.length ? <SearchResult data={data} /> : null}
        </div>
      </Modal>
    </>
  );
};

export default SearchModal;
