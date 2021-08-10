import React from "react";
import { Tabs, Radio } from "antd";
import MyFiles from "./myfiles";
import SharedFiles from "./sharedfiles";
import { FcSearch } from "react-icons/fc";
import SearchFiles from "./search";

const { TabPane } = Tabs;

const FileTabs = (props) => {
  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" size="large" centered>
        <TabPane tab="My Files" key="1">
          <MyFiles {...props} />
        </TabPane>
        <TabPane tab="Shared Files" key="2">
          <SharedFiles {...props} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FcSearch size="20px" />
              &nbsp; Search Files
            </span>
          }
          key="3"
        >
          <SearchFiles {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FileTabs;
