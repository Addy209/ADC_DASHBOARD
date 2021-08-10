import Head from "next/head";
import Image from "next/image";
import SiderDemo from "../../../components/Layout/layout";
import Document from "../../../components/Dashboard/documents/document";
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
    allproject {
      id
      devCompleted
      testCompleted
      signoff
      live
      module {
        module
      }
      priority {
        priority
      }
      name
      requestedby
      livedate
    }
  }
`;

const Home = (props) => {
  return <Document {...props} />;
};

// export async function getServerSideProps(context) {
//   const data = await request(BACKEND_URL, formdata_query);
//   return {
//     props: data,
//   };
// }

Home.Layout = SiderDemo;
export default Home;
