import Head from "next/head";
import Image from "next/image";
import SiderDemo from "../../components/Layout/layout";
import Dashboard from "../../components/Dashboard/dashboard";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { URLS } from "../../utils/constants";
import React from "react";

const Home = (props) => {
  // const router=useRouter()
  // if(!props.loggedIn){
  //     router.push(URLS.home)
  // }
  console.log(props);
  return <Dashboard {...props} />;
};

const mapStateToProps = (state) => ({
  loggedIn: state.main.loggedIn,
});

Home.Layout = SiderDemo;
export default connect(mapStateToProps)(Home);
