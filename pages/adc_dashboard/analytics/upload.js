import Head from "next/head";
import Image from "next/image";
import SiderDemo from "../../../components/Layout/layout";
import UploadData from "../../../components/Dashboard/upload/upload";
import { request, gql } from "graphql-request";
import { BACKEND_URL } from "../../../utils/constants";
import Cookies from "js-cookie";

const formdata_query = gql`
  query {
    module {
      code
      module
    }
  }
`;

const Home = (props) => {
  return <UploadData {...props} />;
};

export async function getServerSideProps(context) {
  const data = await request(BACKEND_URL, formdata_query);
  return {
    props: data,
  };
}

Home.Layout = SiderDemo;
export default Home;
