import { List, Avatar } from "antd";
import React from "react";
import Link from "next/Link";
import { MONTH_NAMES, URLS } from "../../../utils/constants";

const SearchResult = (props) => {
  return (
    <List
      size="large"
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={(val, index) => {
        const d = new Date(val.livedate);
        const date = `${d.getDate()}-${
          MONTH_NAMES[d.getMonth() + 1]
        }-${d.getFullYear()}`;
        return (
          <Link key={index} href={`${URLS.project}/${val.id}`}>
            <List.Item style={{ cursor: "pointer" }}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      val.module.code == 10
                        ? "/mb.png"
                        : val.module.code == 20
                        ? "/upi.png"
                        : "/misc.png"
                    }
                  />
                }
                title={val.name}
                description={`${val.description} | Module: ${val.module.module} | Live Date: ${date}`}
              />
            </List.Item>
          </Link>
        );
      }}
    />
  );
};

export default SearchResult;
