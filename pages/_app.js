import "../styles/globals.css";
import "antd/dist/antd.css";
import React from "react";
import { wrapper } from "../redux/store";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import * as actionTypes from "../redux/actions/main";

import { GraphQLClient } from "graphql-request";
import { BACKEND_URL } from "../utils/constants";

function MyApp(props) {
  const { Component, pageProps } = props;
  let client = null;
  try {
    if (Cookies.get("TOKEN")) {
      client = new GraphQLClient(BACKEND_URL, {
        headers: {
          authorization: `JWT ${Cookies.get("TOKEN")}`,
        },
      });
    } else {
      client = new GraphQLClient(BACKEND_URL);
    }
  } catch (e) {}
  React.useEffect(() => {
    if (!props.loggedIn) {
      const val = Cookies.get("TOKEN");
      if (val) {
        props.login(true);
      }
    }
  }, [props]);

  const Layout = Component?.Layout ?? React.Fragment;
  const Client = React.createContext();

  return (
    <Client.Provider value={client}>
      <Layout>
        <Component
          {...props.pageProps}
          loggedIn={props.loggedIn}
          client={client}
        />
      </Layout>
    </Client.Provider>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.main.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (status) => dispatch(actionTypes.setToken(status)),
});

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(MyApp)
);
