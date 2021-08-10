import Head from "next/head";
import Image from "next/image";
import SiderDemo from "../../../components/Layout/layout";
import Projects from "../../../components/Dashboard/projects/projects";
import { request, gql } from "graphql-request";
import { BACKEND_URL } from "../../../utils/constants";

const formdata_query = gql`
  query {
    module {
      code
      module
    }
    priority {
      code
      priority
    }
  }
`;

const Home = (props) => {
  return <Projects {...props} />;
};

export async function getServerSideProps(context) {
  const data = await request(BACKEND_URL, formdata_query);
  return {
    props: data,
  };
}

Home.Layout = SiderDemo;
export default Home;
